import json
from pathlib import Path
from unittest.mock import MagicMock

import pytest
from kpi.github_client import GitHubClient

FIXTURES = Path(__file__).parent / "fixtures"


def load_fixture(name: str) -> list:
    return json.loads((FIXTURES / name).read_text(encoding="utf-8"))


@pytest.fixture
def cfg():
    return {
        "personal_access_token": "",
        "repos": [{"slug": "jamesblanckenberg/BizProfitCalc", "label": "BC"}],
    }


def _mock_session(payload: list, status: int = 200) -> MagicMock:
    session = MagicMock()
    r = MagicMock()
    r.status_code = status
    r.json.return_value = payload
    r.raise_for_status = MagicMock()
    session.get.return_value = r
    return session


def test_fetch_commits_7d_returns_count(cfg):
    session = _mock_session(load_fixture("github_commits.json"))
    client = GitHubClient(cfg, session=session)
    result = client.fetch_commits_7d("jamesblanckenberg/BizProfitCalc")
    assert result == 3


def test_fetch_commits_7d_uses_since_param(cfg):
    session = _mock_session(load_fixture("github_commits.json"))
    client = GitHubClient(cfg, session=session)
    client.fetch_commits_7d("jamesblanckenberg/BizProfitCalc")
    params = session.get.call_args.kwargs["params"]
    assert "since" in params
    # Verify ISO 8601 with Z suffix
    assert params["since"].endswith("Z")
    assert params["per_page"] == 100


def test_fetch_commits_7d_handles_empty(cfg):
    session = _mock_session([])
    client = GitHubClient(cfg, session=session)
    assert client.fetch_commits_7d("jamesblanckenberg/BizProfitCalc") == 0


def test_unauth_when_token_blank(cfg):
    session = _mock_session([])
    client = GitHubClient(cfg, session=session)
    client.fetch_commits_7d("jamesblanckenberg/BizProfitCalc")
    headers = session.get.call_args.kwargs["headers"]
    assert "Authorization" not in headers


def test_uses_token_when_provided():
    cfg = {"personal_access_token": "ghp_xxx", "repos": []}
    session = _mock_session([])
    client = GitHubClient(cfg, session=session)
    client.fetch_commits_7d("owner/repo")
    headers = session.get.call_args.kwargs["headers"]
    assert headers["Authorization"] == "token ghp_xxx"
