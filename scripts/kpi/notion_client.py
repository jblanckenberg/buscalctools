"""Notion API client — POSTs an idempotent weekly KPI digest to a single page.

Docs: https://developers.notion.com/reference/intro
Auth: integration token (operator provisions out-of-band — see prereqs §1.5).

Idempotency strategy:
  1. List the page's children blocks.
  2. Find the heading_2 block whose text starts with "Week ending <week>".
  3. Archive that heading and every block after it until the next heading_2.
  4. Append the fresh digest blocks via PATCH /v1/blocks/{page_id}/children.

This way, re-running the ETL on the same week REPLACES the prior digest
rather than duplicating it.
"""
from __future__ import annotations

from typing import Any

import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry


def _build_session() -> requests.Session:
    s = requests.Session()
    retry = Retry(
        total=3,
        backoff_factor=1.5,
        status_forcelist=(429, 500, 502, 503, 504),
        allowed_methods=("GET", "PATCH", "POST"),
        raise_on_status=False,
    )
    s.mount("https://", HTTPAdapter(max_retries=retry))
    return s


class NotionClient:
    BASE_URL = "https://api.notion.com/v1"

    def __init__(self, cfg: dict[str, Any], session: requests.Session | None = None):
        self.token: str = cfg["integration_token"]
        self.page_id: str = cfg["page_id"]
        self.api_version: str = cfg.get("api_version", "2022-06-28")
        self._session = session or _build_session()

    @classmethod
    def from_config(cls, cfg: dict[str, Any]) -> "NotionClient":
        return cls(cfg)

    def _headers(self) -> dict[str, str]:
        return {
            "Authorization": f"Bearer {self.token}",
            "Notion-Version": self.api_version,
            "Content-Type": "application/json",
        }

    def _list_children(self, block_id: str) -> list[dict]:
        """Walk paginated children of a block."""
        children: list[dict] = []
        cursor: str | None = None
        while True:
            url = f"{self.BASE_URL}/blocks/{block_id}/children"
            params = {"page_size": 100}
            if cursor:
                params["start_cursor"] = cursor
            r = self._session.get(url, params=params, headers=self._headers(), timeout=30)
            r.raise_for_status()
            payload = r.json()
            children.extend(payload.get("results", []))
            if not payload.get("has_more"):
                break
            cursor = payload.get("next_cursor")
        return children

    def _archive_block(self, block_id: str) -> None:
        url = f"{self.BASE_URL}/blocks/{block_id}"
        r = self._session.patch(url, json={"archived": True}, headers=self._headers(), timeout=30)
        r.raise_for_status()

    def _archive_blocks_for_week(self, week_ending: str) -> list[str]:
        """Find the heading_2 for this week + all blocks until the next
        heading_2; archive them. Returns the list of archived block IDs."""
        children = self._list_children(self.page_id)
        marker = f"Week ending {week_ending}"
        archived: list[str] = []
        in_target = False
        for block in children:
            if block.get("type") == "heading_2":
                heading_text = ""
                rich_texts = block.get("heading_2", {}).get("rich_text", [])
                if rich_texts:
                    heading_text = rich_texts[0].get("plain_text", "")
                if heading_text.startswith(marker):
                    in_target = True
                    archived.append(block["id"])
                    self._archive_block(block["id"])
                    continue
                if in_target:
                    # Hit the next week's heading — stop archiving
                    break
            if in_target:
                archived.append(block["id"])
                self._archive_block(block["id"])
        return archived

    def _build_digest_blocks(self, summary: dict) -> list[dict]:
        """Return the list of Notion block dicts to append for this week's digest."""
        week = summary["week_ending"]
        rows = summary["rows"]
        deltas = summary.get("deltas", {})

        # Group rows by site for table-style output
        by_site: dict[str, dict[str, int]] = {}
        for r in rows:
            by_site.setdefault(r["site"], {})[r["kpi"]] = int(r["value"])

        blocks: list[dict] = []

        # Heading
        blocks.append({
            "object": "block",
            "type": "heading_2",
            "heading_2": {"rich_text": [{"type": "text", "text": {"content": f"Week ending {week} — KPI Snapshot"}}]},
        })

        # One paragraph per site, with KPI list
        for site in sorted(by_site.keys()):
            site_kpis = by_site[site]
            site_deltas = deltas.get(site, {})
            lines = [f"{site}"]
            for kpi in ("monthly_views", "pages_indexed", "referring_sources", "top10_keywords", "newsletter_subscribers", "commits_7d"):
                if kpi in site_kpis:
                    val = f"{site_kpis[kpi]:,}"
                    delta = site_deltas.get(kpi, "")
                    delta_str = f" ({delta})" if delta else ""
                    lines.append(f"  • {kpi}: {val}{delta_str}")
            blocks.append({
                "object": "block",
                "type": "paragraph",
                "paragraph": {"rich_text": [{"type": "text", "text": {"content": "\n".join(lines)}}]},
            })

        # Operator notes section — manually filled in Notion before circulation
        blocks.append({
            "object": "block",
            "type": "heading_3",
            "heading_3": {"rich_text": [{"type": "text", "text": {"content": "Operator notes — fill in before sending"}}]},
        })
        for label in ("Primary outcome shipped (y/n + 1 line)", "Top 3 wins", "Top 3 things that didn't work", "Next week's primary outcome"):
            blocks.append({
                "object": "block",
                "type": "heading_3",
                "heading_3": {"rich_text": [{"type": "text", "text": {"content": label}}]},
            })
            for _ in range(3):
                blocks.append({
                    "object": "block",
                    "type": "bulleted_list_item",
                    "bulleted_list_item": {"rich_text": [{"type": "text", "text": {"content": " "}}]},
                })

        return blocks

    def post_weekly_digest(self, summary: dict) -> None:
        """Archive any prior digest for this week, then append a fresh one."""
        self._archive_blocks_for_week(summary["week_ending"])
        children = self._build_digest_blocks(summary)
        url = f"{self.BASE_URL}/blocks/{self.page_id}/children"
        # Notion limits one request to 100 children blocks; chunk if needed.
        chunk_size = 100
        for i in range(0, len(children), chunk_size):
            chunk = children[i : i + chunk_size]
            r = self._session.patch(url, json={"children": chunk}, headers=self._headers(), timeout=30)
            r.raise_for_status()
