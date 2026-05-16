"""Plausible client tests — no real HTTP, all mocked."""
import json
from pathlib import Path
from unittest.mock import MagicMock

import pytest
from kpi.plausible_client import PlausibleClient

FIXTURES = Path(__file__).parent / "fixtures"


def load_fixture(name: str) -> dict:
    return json.loads((FIXTURES / name).read_text(encoding="utf-8"))


@pytest.fixture
def cfg():
    return {
        "api_key": "test-key",
        "base_url": "https://plausible.io/api/v1",
        "sites": [{"domain": "buscalctools.com", "label": "BusCalcTools"}],
    }


def _mock_session(payloads: list[dict]) -> MagicMock:
    """Returns a MagicMock session whose `.get(...)` returns each payload in order."""
    session = MagicMock()
    responses = []
    for p in payloads:
        r = MagicMock()
        r.status_code = 200
        r.json.return_value = p
        r.raise_for_status = MagicMock()
        responses.append(r)
    session.get.side_effect = responses
    return session


def test_fetch_monthly_pageviews_returns_int(cfg):
    session = _mock_session([load_fixture("plausible_aggregate.json")])
    client = PlausibleClient(cfg, session=session)
    result = client.fetch_monthly_pageviews("buscalctools.com")
    assert result == 12450
    # Verify the right endpoint was hit
    call = session.get.call_args
    assert "stats/aggregate" in call.args[0]
    assert call.kwargs["params"]["site_id"] == "buscalctools.com"
    assert call.kwargs["params"]["period"] == "30d"
    assert call.kwargs["params"]["metrics"] == "pageviews"


def test_fetch_monthly_pageviews_uses_bearer_auth(cfg):
    session = _mock_session([load_fixture("plausible_aggregate.json")])
    client = PlausibleClient(cfg, session=session)
    client.fetch_monthly_pageviews("buscalctools.com")
    headers = session.get.call_args.kwargs["headers"]
    assert headers["Authorization"] == "Bearer test-key"


def test_fetch_referring_sources_excludes_direct(cfg):
    session = _mock_session([load_fixture("plausible_sources.json")])
    client = PlausibleClient(cfg, session=session)
    result = client.fetch_referring_sources("buscalctools.com")
    # Direct / None should be excluded; remaining 6 sources counted
    assert result == 6


def test_fetch_referring_sources_handles_empty(cfg):
    session = _mock_session([{"results": []}])
    client = PlausibleClient(cfg, session=session)
    assert client.fetch_referring_sources("buscalctools.com") == 0


def test_from_config_constructs_session(cfg):
    client = PlausibleClient.from_config(cfg)
    assert client.api_key == "test-key"
    assert client.base_url == "https://plausible.io/api/v1"
