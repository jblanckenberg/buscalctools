import json
from datetime import date
from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest

import kpi_etl


def test_compute_week_ending_friday_returns_same_day():
    # 2026-08-14 is a Friday
    assert kpi_etl.compute_week_ending(date(2026, 8, 14)) == "2026-08-14"


def test_compute_week_ending_saturday_returns_prior_friday():
    # 2026-08-15 is a Saturday → returns 2026-08-14
    assert kpi_etl.compute_week_ending(date(2026, 8, 15)) == "2026-08-14"


def test_compute_week_ending_thursday_returns_prior_friday():
    # 2026-08-13 is a Thursday → returns 2026-08-07 (the prior Friday)
    assert kpi_etl.compute_week_ending(date(2026, 8, 13)) == "2026-08-07"


def test_compute_week_ending_monday_returns_prior_friday():
    # 2026-08-17 is a Monday → returns 2026-08-14
    assert kpi_etl.compute_week_ending(date(2026, 8, 17)) == "2026-08-14"


def test_compute_deltas_returns_percentage_strings():
    rows_current = [
        {"site": "bc.com", "kpi": "monthly_views", "value": 12450},
        {"site": "bc.com", "kpi": "pages_indexed", "value": 86},
    ]
    rows_prior = [
        {"site": "bc.com", "kpi": "monthly_views", "value": 10000},
        {"site": "bc.com", "kpi": "pages_indexed", "value": 80},
    ]
    deltas = kpi_etl.compute_deltas(rows_current, rows_prior)
    assert deltas["bc.com"]["monthly_views"] == "+24.5%"
    assert deltas["bc.com"]["pages_indexed"] == "+7.5%"


def test_compute_deltas_handles_no_prior():
    deltas = kpi_etl.compute_deltas([{"site": "bc.com", "kpi": "monthly_views", "value": 100}], [])
    assert deltas["bc.com"]["monthly_views"] == "—"


def test_compute_deltas_handles_zero_prior():
    rows_current = [{"site": "bc.com", "kpi": "monthly_views", "value": 100}]
    rows_prior = [{"site": "bc.com", "kpi": "monthly_views", "value": 0}]
    deltas = kpi_etl.compute_deltas(rows_current, rows_prior)
    assert deltas["bc.com"]["monthly_views"] == "+new"


def test_load_config_resolves_relative_paths(tmp_path: Path):
    cfg_path = tmp_path / "config.json"
    cfg_path.write_text(json.dumps({
        "plausible": {"api_key": "x", "base_url": "https://x", "sites": []},
        "gsc": {"service_account_json": "fake.json", "sites": [], "top_keyword_position_threshold": 10},
        "github": {"personal_access_token": "", "repos": []},
        "notion": {"integration_token": "x", "page_id": "x", "api_version": "2022-06-28"},
        "newsletter": {"source": "manual", "current_subscribers": 0},
        "dashboard": {"output_html": "out/dashboard.html", "snapshot_dir": "docs/kpi"},
    }), encoding="utf-8")
    cfg = kpi_etl.load_config(cfg_path)
    assert cfg["plausible"]["api_key"] == "x"


@pytest.fixture
def stubbed_run(tmp_path, monkeypatch):
    """Returns a (cfg_path, snapshot_dir, out_html, fake_notion) tuple with all
    upstream clients pre-stubbed to deterministic values."""
    cfg_path = tmp_path / "config.json"
    snapshot_dir = tmp_path / "docs" / "kpi"
    out_html = tmp_path / "out" / "dashboard.html"
    cfg_path.write_text(json.dumps({
        "plausible": {"api_key": "x", "base_url": "https://x", "sites": [{"domain": "bc.com", "label": "BC"}]},
        "gsc": {"service_account_json": "fake.json", "sites": [{"site_url": "sc-domain:bc.com", "label": "BC"}], "top_keyword_position_threshold": 10},
        "github": {"personal_access_token": "", "repos": [{"slug": "owner/repo", "label": "BC"}]},
        "notion": {"integration_token": "x", "page_id": "x", "api_version": "2022-06-28"},
        "newsletter": {"source": "manual", "current_subscribers": 100},
        "dashboard": {"output_html": str(out_html), "snapshot_dir": str(snapshot_dir)},
    }), encoding="utf-8")

    fakes = {
        "plausible": MagicMock(fetch_monthly_pageviews=MagicMock(return_value=12450),
                               fetch_referring_sources=MagicMock(return_value=42)),
        "gsc": MagicMock(fetch_pages_indexed=MagicMock(return_value=86),
                         fetch_top10_keywords=MagicMock(return_value=18)),
        "github": MagicMock(fetch_commits_7d=MagicMock(return_value=23)),
        "notion": MagicMock(),
    }
    monkeypatch.setattr(kpi_etl, "PlausibleClient", MagicMock(from_config=MagicMock(return_value=fakes["plausible"])))
    monkeypatch.setattr(kpi_etl, "GSCClient", MagicMock(from_config=MagicMock(return_value=fakes["gsc"])))
    monkeypatch.setattr(kpi_etl, "GitHubClient", MagicMock(from_config=MagicMock(return_value=fakes["github"])))
    monkeypatch.setattr(kpi_etl, "NotionClient", MagicMock(from_config=MagicMock(return_value=fakes["notion"])))
    return cfg_path, snapshot_dir, out_html, fakes["notion"]


def test_run_dry_run_does_not_write(stubbed_run):
    cfg_path, snapshot_dir, out_html, fake_notion = stubbed_run
    rc = kpi_etl.run(config_path=cfg_path, apply=False, week_override="2026-08-14", skip_notion=False)
    assert rc == 0
    assert not out_html.exists()
    assert not (snapshot_dir / "2026-08-14.csv").exists()
    fake_notion.post_weekly_digest.assert_not_called()


def test_run_apply_writes_csv_and_html_and_calls_notion(stubbed_run):
    cfg_path, snapshot_dir, out_html, fake_notion = stubbed_run
    rc = kpi_etl.run(config_path=cfg_path, apply=True, week_override="2026-08-14", skip_notion=False)
    assert rc == 0
    assert (snapshot_dir / "2026-08-14.csv").exists()
    assert out_html.exists()
    fake_notion.post_weekly_digest.assert_called_once()
    summary = fake_notion.post_weekly_digest.call_args.args[0]
    assert summary["week_ending"] == "2026-08-14"
    assert any(r["kpi"] == "monthly_views" and r["value"] == 12450 for r in summary["rows"])


def test_run_skip_notion_does_not_call_notion(stubbed_run):
    cfg_path, _, _, fake_notion = stubbed_run
    rc = kpi_etl.run(config_path=cfg_path, apply=True, week_override="2026-08-14", skip_notion=True)
    assert rc == 0
    fake_notion.post_weekly_digest.assert_not_called()
