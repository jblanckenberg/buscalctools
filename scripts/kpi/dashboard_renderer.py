"""Render the offline KPI dashboard HTML.

Pure-stdlib templating via string.Template — no Jinja, no f-string injection
risk because all interpolated values pass through json.dumps() or html.escape().

The output is fully self-contained except for the Chart.js CDN script tag,
which is loaded by the browser at view time. The chart *data* is baked into
a <script type="application/json"> block — so the dashboard renders correctly
offline once the Chart.js bundle is cached.
"""
from __future__ import annotations

import html
import json
from pathlib import Path
from string import Template
from typing import Iterable

from kpi.csv_writer import KPI_KEYS

KPI_LABELS = {
    "monthly_views": "Monthly views",
    "pages_indexed": "Pages indexed",
    "referring_sources": "Referring sources",
    "top10_keywords": "Top-10 keywords",
    "newsletter_subscribers": "Newsletter subs",
    "commits_7d": "Commits / 7d",
}


def build_series(rows: list[dict]) -> dict:
    """Pivot flat rows into {site: {kpi: [{week_ending, value}, ...]}}."""
    series: dict = {}
    for r in rows:
        site = r["site"]
        kpi = r["kpi"]
        series.setdefault(site, {}).setdefault(kpi, []).append({
            "week_ending": r["week_ending"],
            "value": r["value"],
        })
    # Ensure each series is sorted by week_ending
    for site_data in series.values():
        for kpi_series in site_data.values():
            kpi_series.sort(key=lambda pt: pt["week_ending"])
    return series


def _format_delta(current: int, prior: int | None) -> tuple[str, str]:
    """Return (css_class, display_string)."""
    if prior is None or prior == 0:
        return ("delta flat", "—")
    pct = ((current - prior) / prior) * 100
    if pct > 0.5:
        return ("delta up", f"▲ +{pct:.1f}%")
    if pct < -0.5:
        return ("delta down", f"▼ {pct:.1f}%")
    return ("delta flat", "▬ flat")


def _kpi_cards_html(series: dict) -> str:
    if not series:
        return '<div class="kpi-card"><div class="label">No data</div><div class="value">—</div><div class="site">No KPI snapshots yet — run kpi_etl.py --apply once a week of data exists.</div></div>'
    cards: list[str] = []
    for site in sorted(series.keys()):
        site_data = series[site]
        for kpi in KPI_KEYS:
            points = site_data.get(kpi, [])
            if not points:
                current = 0
                prior = None
            else:
                current = points[-1]["value"]
                prior = points[-2]["value"] if len(points) >= 2 else None
            css_class, delta_str = _format_delta(current, prior)
            label = html.escape(KPI_LABELS.get(kpi, kpi))
            cards.append(
                f'<div class="kpi-card">'
                f'<div class="label">{label}</div>'
                f'<div class="value">{current:,}</div>'
                f'<div class="{css_class}">{delta_str}</div>'
                f'<div class="site">{html.escape(site)}</div>'
                f'</div>'
            )
    return "\n      ".join(cards)


def render_dashboard(
    rows: list[dict],
    out_path: Path,
    template_path: Path,
    generated_at: str,
) -> Path:
    """Render the full dashboard HTML to `out_path`. Atomic via .tmp + os.replace."""
    series = build_series(rows)
    week_endings = sorted({r["week_ending"] for r in rows})
    week_ending = week_endings[-1] if week_endings else "—"
    week_count = len(week_endings)

    payload = {"series": series, "generated_at": generated_at}
    data_json = json.dumps(payload, separators=(",", ":"), sort_keys=True)

    template = Template(template_path.read_text(encoding="utf-8"))
    html_text = template.substitute(
        generated_at=html.escape(generated_at),
        week_ending=html.escape(week_ending),
        week_count=week_count,
        kpi_cards=_kpi_cards_html(series),
        data_json=data_json,
    )

    out_path.parent.mkdir(parents=True, exist_ok=True)
    tmp = out_path.with_suffix(".html.tmp")
    tmp.write_text(html_text, encoding="utf-8")
    import os
    os.replace(tmp, out_path)
    return out_path
