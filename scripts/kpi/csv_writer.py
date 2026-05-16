"""Per-week CSV snapshot writer + reader.

The CSV format is:
    week_ending,site,kpi,value

Idempotent: re-writing the same week_ending overwrites the file rather than
appending, so re-runs are safe. Atomic writes via .tmp + os.replace().
"""
from __future__ import annotations

import csv
import os
from pathlib import Path
from typing import Iterable

# The full KPI vocabulary the rest of the system depends on. Adding a KPI =
# editing this tuple + the orchestrator + the dashboard template.
KPI_KEYS: tuple[str, ...] = (
    "monthly_views",
    "pages_indexed",
    "referring_sources",
    "top10_keywords",
    "newsletter_subscribers",
    "commits_7d",
)

CSV_FIELDS = ("week_ending", "site", "kpi", "value")


def write_snapshot(snapshot_dir: Path, week_ending: str, rows: Iterable[dict]) -> Path:
    """Write a single week's snapshot file. Atomic via .tmp + os.replace.

    Each row in `rows` must have keys: site, kpi, value. The week_ending value
    is injected from the parameter so callers don't have to repeat it.
    """
    snapshot_dir.mkdir(parents=True, exist_ok=True)
    target = snapshot_dir / f"{week_ending}.csv"
    tmp = target.with_suffix(".csv.tmp")
    with tmp.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=CSV_FIELDS)
        writer.writeheader()
        for row in rows:
            writer.writerow({
                "week_ending": week_ending,
                "site": row["site"],
                "kpi": row["kpi"],
                "value": row["value"],
            })
    os.replace(tmp, target)
    return target


def read_all_snapshots(snapshot_dir: Path) -> list[dict]:
    """Read every *.csv in snapshot_dir and return one big sorted list of rows.

    Sorted by (week_ending ASC, site ASC, kpi ASC) so trend lines are stable.
    """
    if not snapshot_dir.is_dir():
        return []
    rows: list[dict] = []
    for csv_path in sorted(snapshot_dir.glob("*.csv")):
        with csv_path.open("r", newline="", encoding="utf-8") as f:
            for r in csv.DictReader(f):
                # Coerce value back to int for downstream charting math
                try:
                    r["value"] = int(r["value"])
                except (TypeError, ValueError):
                    r["value"] = 0
                rows.append(r)
    rows.sort(key=lambda r: (r["week_ending"], r["site"], r["kpi"]))
    return rows
