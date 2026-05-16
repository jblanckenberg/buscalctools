"""KPI ETL orchestrator — runs every Friday morning (SAST) via Task Scheduler.

Usage:
    python kpi_etl.py                  # dry-run, log only
    python kpi_etl.py --apply          # write CSV + dashboard + post to Notion
    python kpi_etl.py --apply --skip-notion
    python kpi_etl.py --apply --week 2026-08-14
    python kpi_etl.py --config my_config.json --apply

Architecture:
    1. Pull metrics from Plausible / GSC / GitHub / config (newsletter).
    2. Write a per-week CSV snapshot (idempotent).
    3. Read every historical snapshot, render the offline dashboard HTML.
    4. POST an idempotent digest to the operator's Notion page.

Exit codes:
    0  success (or successful dry-run)
    1  config error
    2  partial failure (one upstream API failed; CSV/HTML still written)
    3  hard failure (config missing or unrecoverable)
"""
from __future__ import annotations

import argparse
import json
import logging
import sys
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

from kpi.csv_writer import write_snapshot, read_all_snapshots, KPI_KEYS
from kpi.dashboard_renderer import render_dashboard
from kpi.github_client import GitHubClient
from kpi.gsc_client import GSCClient
from kpi.notion_client import NotionClient
from kpi.plausible_client import PlausibleClient

REPO_ROOT = Path(__file__).resolve().parent.parent  # bizapp/
DEFAULT_CONFIG = REPO_ROOT / "scripts" / "kpi_config.json"
TEMPLATE = REPO_ROOT / "scripts" / "kpi_dashboard_template.html"

logger = logging.getLogger("kpi_etl")


def _setup_logging() -> None:
    logging.basicConfig(
        format="%(asctime)s [%(levelname)s] %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
        level=logging.INFO,
    )


def compute_week_ending(today: date) -> str:
    """Return the most recent Friday on or before `today`, formatted YYYY-MM-DD.

    Monday = 0, Friday = 4. If today is a Friday, return today; otherwise step
    back to the prior Friday.
    """
    weekday = today.weekday()
    days_back = (weekday - 4) % 7  # 0 if Friday, 6 if Saturday → wraps to prior Friday
    if days_back == 0 and weekday != 4:
        days_back = 7
    return (today - timedelta(days=days_back)).isoformat()


def load_config(path: Path) -> dict:
    if not path.is_file():
        raise SystemExit(f"Config not found: {path}\n"
                         f"Copy {DEFAULT_CONFIG.with_name('kpi_config.example.json')} → {path} and fill in values.")
    return json.loads(path.read_text(encoding="utf-8"))


def _safe(errors: list[str], label: str, fn, *args):
    """Call fn(*args) returning 0 + appending to errors on any exception."""
    try:
        return fn(*args)
    except Exception as e:
        errors.append(f"{label}: {e}")
        return 0


def collect_rows(cfg: dict) -> tuple[list[dict], list[str]]:
    """Pull all KPIs from upstream services. Returns (rows, errors).
    Missing values default to 0 so the CSV stays well-formed."""
    rows: list[dict] = []
    errors: list[str] = []

    plausible = PlausibleClient.from_config(cfg["plausible"])
    for site in cfg["plausible"].get("sites", []):
        d = site["domain"]
        rows.append({"site": d, "kpi": "monthly_views",
                     "value": _safe(errors, f"plausible.monthly_views[{d}]", plausible.fetch_monthly_pageviews, d)})
        rows.append({"site": d, "kpi": "referring_sources",
                     "value": _safe(errors, f"plausible.referring_sources[{d}]", plausible.fetch_referring_sources, d)})

    gsc = GSCClient.from_config(cfg["gsc"], repo_root=REPO_ROOT)
    for site in cfg["gsc"].get("sites", []):
        url = site["site_url"]
        d = url.replace("sc-domain:", "")
        rows.append({"site": d, "kpi": "pages_indexed",
                     "value": _safe(errors, f"gsc.pages_indexed[{url}]", gsc.fetch_pages_indexed, url)})
        rows.append({"site": d, "kpi": "top10_keywords",
                     "value": _safe(errors, f"gsc.top10_keywords[{url}]", gsc.fetch_top10_keywords, url)})

    github = GitHubClient.from_config(cfg["github"])
    plausible_labels = {s["label"]: s["domain"] for s in cfg["plausible"].get("sites", [])}
    for repo in cfg["github"].get("repos", []):
        site_d = plausible_labels.get(repo["label"], repo["label"])
        rows.append({"site": site_d, "kpi": "commits_7d",
                     "value": _safe(errors, f"github.commits_7d[{repo['slug']}]", github.fetch_commits_7d, repo["slug"])})

    # Newsletter (manual): mirror the single config value across each site.
    subs = int(cfg.get("newsletter", {}).get("current_subscribers", 0))
    for site in cfg["plausible"].get("sites", []):
        rows.append({"site": site["domain"], "kpi": "newsletter_subscribers", "value": subs})

    return rows, errors


def compute_deltas(rows_current: list[dict], rows_prior: list[dict]) -> dict:
    """Return {site: {kpi: '+X.X%' | '-X.X%' | 'flat' | '+new' | '—'}}"""
    prior_lookup: dict[tuple[str, str], int] = {
        (r["site"], r["kpi"]): int(r["value"]) for r in rows_prior
    }
    deltas: dict[str, dict[str, str]] = {}
    for r in rows_current:
        site, kpi, val = r["site"], r["kpi"], int(r["value"])
        prior = prior_lookup.get((site, kpi))
        if prior is None:
            deltas.setdefault(site, {})[kpi] = "—"
            continue
        if prior == 0:
            deltas.setdefault(site, {})[kpi] = "+new" if val > 0 else "—"
            continue
        pct = ((val - prior) / prior) * 100
        sign = "+" if pct >= 0 else ""
        deltas.setdefault(site, {})[kpi] = f"{sign}{pct:.1f}%"
    return deltas


def run(config_path: Path, apply: bool, week_override: str | None, skip_notion: bool) -> int:
    _setup_logging()
    try:
        cfg = load_config(config_path)
    except SystemExit as e:
        logger.error(str(e))
        return 3

    week_ending = week_override or compute_week_ending(date.today())
    logger.info("Week ending: %s (apply=%s, skip_notion=%s)", week_ending, apply, skip_notion)

    rows, errors = collect_rows(cfg)
    for err in errors:
        logger.warning("Upstream error: %s", err)

    # Log a one-line summary
    summary_line = " | ".join(
        f"{r['site']}/{r['kpi']}={r['value']}" for r in rows if r["kpi"] in ("monthly_views", "pages_indexed")
    )
    logger.info("Snapshot: %s", summary_line)

    if not apply:
        logger.info("Dry-run — skipping CSV write, dashboard render, Notion post")
        return 0 if not errors else 2

    snapshot_dir_str = cfg["dashboard"]["snapshot_dir"]
    snapshot_dir = Path(snapshot_dir_str)
    if not snapshot_dir.is_absolute():
        snapshot_dir = (REPO_ROOT / snapshot_dir).resolve()
    csv_path = write_snapshot(snapshot_dir, week_ending, rows)
    logger.info("Wrote CSV: %s", csv_path)

    out_html_str = cfg["dashboard"]["output_html"]
    out_html = Path(out_html_str)
    if not out_html.is_absolute():
        out_html = (REPO_ROOT / out_html).resolve()
    all_rows = read_all_snapshots(snapshot_dir)
    generated_at = datetime.now(timezone.utc).astimezone().isoformat(timespec="seconds")
    render_dashboard(all_rows, out_html, template_path=TEMPLATE, generated_at=generated_at)
    logger.info("Wrote dashboard: %s", out_html)

    # Compute prior-week deltas for the Notion digest
    prior_rows = [r for r in all_rows if r["week_ending"] != week_ending]
    if prior_rows:
        last_prior_week = sorted({r["week_ending"] for r in prior_rows})[-1]
        prior_only = [r for r in prior_rows if r["week_ending"] == last_prior_week]
    else:
        prior_only = []
    deltas = compute_deltas(rows, prior_only)

    if not skip_notion:
        notion = NotionClient.from_config(cfg["notion"])
        summary = {"week_ending": week_ending, "rows": rows, "deltas": deltas}
        try:
            notion.post_weekly_digest(summary)
            logger.info("Posted Notion digest for week %s", week_ending)
        except Exception as e:
            logger.error("Notion post failed: %s", e)
            return 2
    else:
        logger.info("Skipping Notion post (--skip-notion)")

    return 0 if not errors else 2


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="KPI ETL — pull, snapshot, render, notify.")
    parser.add_argument("--config", type=Path, default=DEFAULT_CONFIG, help="Path to kpi_config.json")
    parser.add_argument("--apply", action="store_true", help="Write CSV, render dashboard, POST to Notion")
    parser.add_argument("--week", type=str, default=None, help="Override week-ending YYYY-MM-DD")
    parser.add_argument("--skip-notion", action="store_true", help="Skip the Notion POST step")
    args = parser.parse_args(argv)
    return run(config_path=args.config, apply=args.apply, week_override=args.week, skip_notion=args.skip_notion)


if __name__ == "__main__":
    sys.exit(main())
