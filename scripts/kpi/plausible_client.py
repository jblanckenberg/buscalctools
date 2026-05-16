"""Plausible Stats API client.

Docs: https://plausible.io/docs/stats-api
Auth: Bearer token (Settings → API Keys; needs stats:read:* scope).

The Plausible API is HTTP/JSON; one request returns one period's aggregate
or one breakdown. This client makes one request per metric so the orchestrator
can compose the row set without coupling.
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
        allowed_methods=("GET",),
        raise_on_status=False,
    )
    s.mount("https://", HTTPAdapter(max_retries=retry))
    return s


class PlausibleClient:
    """Thin wrapper over the Plausible Stats v1 API."""

    def __init__(self, cfg: dict[str, Any], session: requests.Session | None = None):
        self.api_key: str = cfg["api_key"]
        self.base_url: str = cfg["base_url"].rstrip("/")
        self._session = session or _build_session()

    @classmethod
    def from_config(cls, cfg: dict[str, Any]) -> "PlausibleClient":
        return cls(cfg)

    def _headers(self) -> dict[str, str]:
        return {"Authorization": f"Bearer {self.api_key}"}

    def fetch_monthly_pageviews(self, domain: str) -> int:
        """Return total pageviews for the last 30 days."""
        url = f"{self.base_url}/stats/aggregate"
        params = {"site_id": domain, "period": "30d", "metrics": "pageviews"}
        r = self._session.get(url, params=params, headers=self._headers(), timeout=30)
        r.raise_for_status()
        payload = r.json()
        return int(payload.get("results", {}).get("pageviews", {}).get("value", 0))

    def fetch_referring_sources(self, domain: str) -> int:
        """Return count of distinct non-direct referring sources (last 30 days).

        This is the strategy-doc §8 'referring domains' KPI proxy. True
        backlink counts require Ahrefs/Semrush; this is a free-tier alternative.
        """
        url = f"{self.base_url}/stats/breakdown"
        params = {
            "site_id": domain,
            "period": "30d",
            "property": "visit:source",
            "metrics": "visitors",
            "limit": 100,
        }
        r = self._session.get(url, params=params, headers=self._headers(), timeout=30)
        r.raise_for_status()
        payload = r.json()
        rows = payload.get("results", [])
        # "Direct / None" is the canonical Plausible label for direct traffic.
        non_direct = [row for row in rows if row.get("source") not in ("Direct / None", "Direct/None", None, "")]
        return len(non_direct)
