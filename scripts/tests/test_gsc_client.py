"""GSC client tests — service object is mocked, no real OAuth."""
import json
from pathlib import Path
from unittest.mock import MagicMock

import pytest
from kpi.gsc_client import GSCClient

FIXTURES = Path(__file__).parent / "fixtures"


def load_fixture(name: str) -> dict:
    return json.loads((FIXTURES / name).read_text(encoding="utf-8"))


@pytest.fixture
def cfg():
    return {
        "service_account_json": "fake-path.json",
        "sites": [{"site_url": "sc-domain:buscalctools.com", "label": "BusCalcTools"}],
        "top_keyword_position_threshold": 10,
    }


def _mock_service(query_responses: list[dict]) -> MagicMock:
    """Build a mock GSC service whose .searchanalytics().query().execute()
    returns each payload in order."""
    service = MagicMock()
    query_method = service.searchanalytics.return_value.query
    executes = []
    for payload in query_responses:
        execute_mock = MagicMock(return_value=payload)
        executes.append(execute_mock)
    # Each call to query() returns a chained .execute() that pops from queue
    query_method.side_effect = [MagicMock(execute=ex) for ex in executes]
    return service


def test_fetch_pages_indexed_counts_distinct_rows(cfg):
    service = _mock_service([load_fixture("gsc_pages.json")])
    client = GSCClient(cfg, service=service)
    result = client.fetch_pages_indexed("sc-domain:buscalctools.com")
    assert result == 3


def test_fetch_pages_indexed_handles_empty(cfg):
    service = _mock_service([{"responseAggregationType": "byPage"}])
    client = GSCClient(cfg, service=service)
    assert client.fetch_pages_indexed("sc-domain:buscalctools.com") == 0


def test_fetch_top10_keywords_counts_below_threshold(cfg):
    service = _mock_service([load_fixture("gsc_queries.json")])
    client = GSCClient(cfg, service=service)
    # gsc_queries.json has positions: 6.1, 8.4, 11.2, 14.8, 9.7
    # Below threshold 10: 6.1, 8.4, 9.7 → 3 rows
    result = client.fetch_top10_keywords("sc-domain:buscalctools.com")
    assert result == 3


def test_query_uses_30day_window(cfg):
    service = _mock_service([load_fixture("gsc_pages.json")])
    client = GSCClient(cfg, service=service)
    client.fetch_pages_indexed("sc-domain:buscalctools.com")
    call_kwargs = service.searchanalytics.return_value.query.call_args.kwargs
    body = call_kwargs["body"]
    # startDate must be 29 days before endDate (rolling 30d window)
    from datetime import date, timedelta
    end = date.fromisoformat(body["endDate"])
    start = date.fromisoformat(body["startDate"])
    assert (end - start) == timedelta(days=29)
    assert body["dimensions"] == ["page"]
    assert call_kwargs["siteUrl"] == "sc-domain:buscalctools.com"


def test_threshold_is_configurable():
    cfg = {
        "service_account_json": "fake.json",
        "sites": [],
        "top_keyword_position_threshold": 3,
    }
    service = _mock_service([load_fixture("gsc_queries.json")])
    client = GSCClient(cfg, service=service)
    # Only positions <= 3 → none in fixture
    assert client.fetch_top10_keywords("sc-domain:buscalctools.com") == 0
