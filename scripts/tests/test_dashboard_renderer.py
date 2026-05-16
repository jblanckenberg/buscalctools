import json
from pathlib import Path

import pytest
from kpi.dashboard_renderer import render_dashboard, build_series

TEMPLATE_PATH = Path(__file__).parent.parent / "kpi_dashboard_template.html"


def _make_rows(week: str, bc: dict, fc: dict) -> list[dict]:
    """Expand {kpi: value} dicts into the canonical flat-row shape."""
    rows = []
    for site, vals in (("buscalctools.com", bc), ("finncalc.com", fc)):
        for kpi, value in vals.items():
            rows.append({"week_ending": week, "site": site, "kpi": kpi, "value": value})
    return rows


@pytest.fixture
def two_week_rows():
    w1 = _make_rows("2026-08-07",
                    {"monthly_views": 10000, "pages_indexed": 80, "top10_keywords": 15,
                     "newsletter_subscribers": 100, "referring_sources": 35, "commits_7d": 18},
                    {"monthly_views": 7000, "pages_indexed": 50, "top10_keywords": 9,
                     "newsletter_subscribers": 70, "referring_sources": 22, "commits_7d": 9})
    w2 = _make_rows("2026-08-14",
                    {"monthly_views": 12450, "pages_indexed": 86, "top10_keywords": 18,
                     "newsletter_subscribers": 127, "referring_sources": 42, "commits_7d": 23},
                    {"monthly_views": 8210, "pages_indexed": 54, "top10_keywords": 11,
                     "newsletter_subscribers": 84, "referring_sources": 28, "commits_7d": 12})
    return w1 + w2


def test_build_series_pivots_by_site_and_kpi(two_week_rows):
    series = build_series(two_week_rows)
    assert "buscalctools.com" in series
    assert "finncalc.com" in series
    bc_views = series["buscalctools.com"]["monthly_views"]
    assert len(bc_views) == 2
    assert bc_views[0] == {"week_ending": "2026-08-07", "value": 10000}
    assert bc_views[1] == {"week_ending": "2026-08-14", "value": 12450}


def test_render_dashboard_writes_html_file(tmp_path: Path, two_week_rows):
    out = tmp_path / "dashboard.html"
    render_dashboard(two_week_rows, out, template_path=TEMPLATE_PATH, generated_at="2026-08-14T09:00:00+02:00")
    html = out.read_text(encoding="utf-8")
    # Sanity: the JSON payload was baked in
    assert '<script id="kpi-data"' in html
    assert "12450" in html
    # Chart.js CDN reference present
    assert "cdn.jsdelivr.net/npm/chart.js" in html
    # Week-ending header substituted
    assert "2026-08-14" in html


def test_render_dashboard_kpi_cards_show_delta(tmp_path: Path, two_week_rows):
    out = tmp_path / "dashboard.html"
    render_dashboard(two_week_rows, out, template_path=TEMPLATE_PATH, generated_at="2026-08-14T09:00:00+02:00")
    html = out.read_text(encoding="utf-8")
    # 12450 is up 24.5% from 10000 — verify the delta arrow class is present
    assert "delta up" in html


def test_render_dashboard_handles_single_week(tmp_path: Path):
    rows = [
        {"week_ending": "2026-08-14", "site": "buscalctools.com", "kpi": "monthly_views", "value": 12450},
    ]
    out = tmp_path / "dashboard.html"
    render_dashboard(rows, out, template_path=TEMPLATE_PATH, generated_at="2026-08-14T09:00:00+02:00")
    html = out.read_text(encoding="utf-8")
    # Single-week run: delta should be "flat" (no prior value)
    assert "delta flat" in html or "delta up" not in html


def test_render_dashboard_handles_empty(tmp_path: Path):
    out = tmp_path / "dashboard.html"
    render_dashboard([], out, template_path=TEMPLATE_PATH, generated_at="2026-08-14T09:00:00+02:00")
    html = out.read_text(encoding="utf-8")
    assert "No KPI snapshots yet" in html


def test_data_json_is_valid_json(tmp_path: Path, two_week_rows):
    out = tmp_path / "dashboard.html"
    render_dashboard(two_week_rows, out, template_path=TEMPLATE_PATH, generated_at="2026-08-14T09:00:00+02:00")
    html = out.read_text(encoding="utf-8")
    # Extract the JSON block and parse it
    start = html.find('<script id="kpi-data" type="application/json">') + len('<script id="kpi-data" type="application/json">')
    end = html.find("</script>", start)
    payload = json.loads(html[start:end])
    assert "series" in payload
    assert payload["series"]["buscalctools.com"]["monthly_views"][1]["value"] == 12450
