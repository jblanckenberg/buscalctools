"""Google Search Console client.

Docs: https://developers.google.com/webmaster-tools/v1/searchanalytics/query
Auth: service account (operator provisions out-of-band — see prereqs §1.4).

The googleapiclient discovery service is built once per client; tests inject
a pre-built mock via the `service` constructor arg, so no network or auth
fires during pytest.
"""
from __future__ import annotations

from datetime import date, timedelta
from pathlib import Path
from typing import Any


def _build_service(service_account_json: str):
    """Lazy-build a real GSC service (called only outside tests)."""
    from google.oauth2 import service_account
    from googleapiclient.discovery import build

    creds = service_account.Credentials.from_service_account_file(
        service_account_json,
        scopes=["https://www.googleapis.com/auth/webmasters.readonly"],
    )
    return build("searchconsole", "v1", credentials=creds, cache_discovery=False)


class GSCClient:
    """Wrapper for GSC searchanalytics queries — pages-indexed + top-N rankings."""

    def __init__(self, cfg: dict[str, Any], service=None):
        self.cfg = cfg
        self.threshold: int = int(cfg.get("top_keyword_position_threshold", 10))
        if service is not None:
            self._service = service
        else:
            self._service = _build_service(cfg["service_account_json"])

    @classmethod
    def from_config(cls, cfg: dict[str, Any], repo_root: Path | None = None) -> "GSCClient":
        # Resolve service-account path relative to repo root if needed.
        sa_path = cfg["service_account_json"]
        if repo_root is not None and not Path(sa_path).is_absolute():
            sa_path = str((repo_root / sa_path).resolve())
        cfg_resolved = {**cfg, "service_account_json": sa_path}
        return cls(cfg_resolved)

    def _query(self, site_url: str, dimensions: list[str]) -> dict:
        end = date.today()
        start = end - timedelta(days=29)
        body = {
            "startDate": start.isoformat(),
            "endDate": end.isoformat(),
            "dimensions": dimensions,
            "rowLimit": 25000,
        }
        return self._service.searchanalytics().query(siteUrl=site_url, body=body).execute()

    def fetch_pages_indexed(self, site_url: str) -> int:
        """Distinct pages that received at least one impression in the last 30d.

        GSC won't return a row for a page with zero impressions, so row count
        equals the count of pages Google has indexed *and* shown. Pages indexed
        but never impressed slip through — operator monitors via Coverage report
        in GSC UI for the absolute number, not via API.
        """
        payload = self._query(site_url, ["page"])
        return len(payload.get("rows", []))

    def fetch_top10_keywords(self, site_url: str) -> int:
        """Count of distinct queries where the site's average position is in
        the top N (default 10) over the last 30 days."""
        payload = self._query(site_url, ["query"])
        rows = payload.get("rows", [])
        return sum(1 for r in rows if r.get("position", 999) <= self.threshold)
