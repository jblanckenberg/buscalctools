# KPI ETL — Operator Setup

Pulls weekly KPIs from Plausible + Google Search Console + GitHub, snapshots to CSV, renders an offline HTML dashboard, and posts a digest to Notion.

## One-time setup

Follow the §1 Prerequisites checklist in `docs/superpowers/plans/2026-05-15-phase6-kpi-dashboard.md` to provision Plausible API key, GSC service account, Notion integration, and (optional) GitHub PAT. Then:

```bash
cd C:\BizProfitCalc\bizapp\scripts
pip install requests python-dateutil google-api-python-client google-auth
copy kpi_config.example.json kpi_config.json
notepad kpi_config.json   # replace every <PLACEHOLDER>
```

## Smoke test

```bash
python kpi_etl.py            # dry-run; expect one-line "Snapshot: ..." log
python kpi_etl.py --apply    # writes CSV + dashboard + posts to Notion
```

After `--apply` verify:
- `..\docs\kpi\<this Friday>.csv` exists.
- `..\out\dashboard.html` opens with 6 line charts (single point on first run).
- `Weekly KPI Reviews` Notion page has a fresh `Week ending YYYY-MM-DD — KPI Snapshot` heading.

## Schedule

Import `kpi_etl_TaskScheduler.xml` via Task Scheduler → Action → Import Task. Trigger fires weekly, Friday 09:00 SAST.

## Weekly Friday rhythm

1. ~09:05 — open Notion `Weekly KPI Reviews`. Auto-snapshot is ready.
2. Fill in the four operator-notes sections (primary outcome y/n, top 3 wins, top 3 didn't-work, next week's primary).
3. Open dashboard at `..\out\dashboard.html` (or `https://buscalctools.com/dashboard.html` after the next deploy).
4. Update `newsletter.current_subscribers` in `kpi_config.json` from the Beehiiv dashboard.

## CLI reference

```
python kpi_etl.py                                 # dry-run
python kpi_etl.py --apply                         # full run
python kpi_etl.py --apply --skip-notion           # local dev
python kpi_etl.py --apply --week 2026-08-14       # backfill
python kpi_etl.py --config alt.json --apply       # alt config
```

Exit codes: `0` success, `2` partial (one upstream failed, CSV/HTML still written), `3` hard failure (config missing).

## Idempotency

Re-running on the same week overwrites the CSV, re-renders the dashboard from all CSVs, and archives + replaces the Notion digest for that week. Safe to re-run any time.
