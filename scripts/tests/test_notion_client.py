import json
from pathlib import Path
from unittest.mock import MagicMock

import pytest
from kpi.notion_client import NotionClient

FIXTURES = Path(__file__).parent / "fixtures"


def load_fixture(name: str) -> dict:
    return json.loads((FIXTURES / name).read_text(encoding="utf-8"))


@pytest.fixture
def cfg():
    return {
        "integration_token": "ntn_test",
        "page_id": "test-page-id",
        "api_version": "2022-06-28",
    }


@pytest.fixture
def kpi_summary():
    return {
        "week_ending": "2026-08-14",
        "rows": [
            {"site": "buscalctools.com", "kpi": "monthly_views", "value": 12450},
            {"site": "buscalctools.com", "kpi": "pages_indexed", "value": 86},
            {"site": "finncalc.com", "kpi": "monthly_views", "value": 8210},
        ],
        "deltas": {
            "buscalctools.com": {"monthly_views": "+24.5%", "pages_indexed": "+7.5%"},
            "finncalc.com": {"monthly_views": "+17.3%"},
        },
    }


def _mock_session(get_payload: dict, response_payloads: list[dict] | None = None) -> MagicMock:
    session = MagicMock()
    get_resp = MagicMock(status_code=200)
    get_resp.json.return_value = get_payload
    get_resp.raise_for_status = MagicMock()
    session.get.return_value = get_resp

    patch_resp = MagicMock(status_code=200)
    patch_resp.json.return_value = {}
    patch_resp.raise_for_status = MagicMock()
    session.patch.return_value = patch_resp
    return session


def test_archive_existing_week_block_finds_match(cfg, kpi_summary):
    session = _mock_session(load_fixture("notion_blocks.json"))
    client = NotionClient(cfg, session=session)
    archived_ids = client._archive_blocks_for_week("2026-08-14")
    # Both blocks following the matching heading_2 should be archived
    # (heading + everything until next heading_2 or end of children)
    assert "current-block-id-ccc" in archived_ids
    assert "current-block-id-ddd" in archived_ids
    assert "old-block-id-aaa" not in archived_ids
    assert "old-block-id-bbb" not in archived_ids


def test_archive_existing_week_block_no_match(cfg):
    session = _mock_session(load_fixture("notion_blocks.json"))
    client = NotionClient(cfg, session=session)
    archived_ids = client._archive_blocks_for_week("2026-09-01")
    assert archived_ids == []


def test_post_weekly_digest_uses_correct_endpoint(cfg, kpi_summary):
    session = _mock_session({"results": [], "has_more": False})
    client = NotionClient(cfg, session=session)
    client.post_weekly_digest(kpi_summary)
    # PATCH to /v1/blocks/{page_id}/children to append
    patch_url = session.patch.call_args.args[0]
    assert "blocks/test-page-id/children" in patch_url
    body = session.patch.call_args.kwargs["json"]
    assert "children" in body


def test_post_weekly_digest_includes_kpi_table_rows(cfg, kpi_summary):
    session = _mock_session({"results": [], "has_more": False})
    client = NotionClient(cfg, session=session)
    client.post_weekly_digest(kpi_summary)
    body = session.patch.call_args.kwargs["json"]
    # Flatten all text content
    all_text = json.dumps(body)
    assert "12,450" in all_text or "12450" in all_text
    assert "buscalctools.com" in all_text
    assert "+24.5%" in all_text


def test_post_weekly_digest_includes_operator_notes_section(cfg, kpi_summary):
    session = _mock_session({"results": [], "has_more": False})
    client = NotionClient(cfg, session=session)
    client.post_weekly_digest(kpi_summary)
    body_str = json.dumps(session.patch.call_args.kwargs["json"])
    assert "Top 3 wins" in body_str
    assert "didn't work" in body_str or "did not work" in body_str
    assert "Next week's primary outcome" in body_str


def test_uses_notion_version_header(cfg, kpi_summary):
    session = _mock_session({"results": [], "has_more": False})
    client = NotionClient(cfg, session=session)
    client.post_weekly_digest(kpi_summary)
    headers = session.patch.call_args.kwargs["headers"]
    assert headers["Notion-Version"] == "2022-06-28"
    assert headers["Authorization"] == "Bearer ntn_test"


def test_idempotent_run_archives_then_posts(cfg, kpi_summary):
    """Full flow: existing block for the same week gets archived, then a
    fresh digest is appended."""
    session = _mock_session(load_fixture("notion_blocks.json"))
    client = NotionClient(cfg, session=session)
    client.post_weekly_digest(kpi_summary)
    # Both stale blocks were PATCHed with archived: true
    archive_calls = [c for c in session.patch.call_args_list if c.kwargs.get("json", {}).get("archived") is True]
    assert len(archive_calls) == 2
    # Plus one append call
    append_calls = [c for c in session.patch.call_args_list if "children" in c.args[0]]
    assert len(append_calls) == 1
