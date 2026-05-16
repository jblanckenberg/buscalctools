"""GitHub commits-per-week proxy for development velocity.

Docs: https://docs.github.com/en/rest/commits/commits#list-commits
Auth: optional. Public repos work unauth (60 req/hr). Set
`personal_access_token` in kpi_config.json for private repos or to bump to
5000 req/hr.

We only care about the count, not commit content; a single GET with
?per_page=100 returns up to 100 commits, which is more than enough for a
trailing 7-day window on a one-developer project.
"""
from __future__ import annotations

from datetime import datetime, timedelta, timezone
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


class GitHubClient:
    BASE_URL = "https://api.github.com"

    def __init__(self, cfg: dict[str, Any], session: requests.Session | None = None):
        self.token: str = (cfg.get("personal_access_token") or "").strip()
        self._session = session or _build_session()

    @classmethod
    def from_config(cls, cfg: dict[str, Any]) -> "GitHubClient":
        return cls(cfg)

    def _headers(self) -> dict[str, str]:
        h = {"Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28"}
        if self.token:
            h["Authorization"] = f"token {self.token}"
        return h

    def fetch_commits_7d(self, repo_slug: str) -> int:
        """Return commit count over the trailing 7 days for `owner/repo`."""
        since = (datetime.now(timezone.utc) - timedelta(days=7)).strftime("%Y-%m-%dT%H:%M:%SZ")
        url = f"{self.BASE_URL}/repos/{repo_slug}/commits"
        params = {"since": since, "per_page": 100}
        r = self._session.get(url, params=params, headers=self._headers(), timeout=30)
        r.raise_for_status()
        payload = r.json()
        if not isinstance(payload, list):
            return 0
        return len(payload)
