import csv
from pathlib import Path

import pytest
from kpi.csv_writer import write_snapshot, read_all_snapshots, KPI_KEYS


@pytest.fixture
def sample_rows():
    return [
        {"site": "buscalctools.com", "kpi": "monthly_views", "value": 12450},
        {"site": "buscalctools.com", "kpi": "pages_indexed", "value": 86},
        {"site": "finncalc.com", "kpi": "monthly_views", "value": 8210},
    ]


def test_write_snapshot_creates_file(tmp_path: Path, sample_rows):
    path = write_snapshot(tmp_path, "2026-08-14", sample_rows)
    assert path.exists()
    assert path.name == "2026-08-14.csv"


def test_write_snapshot_writes_header_and_rows(tmp_path: Path, sample_rows):
    write_snapshot(tmp_path, "2026-08-14", sample_rows)
    text = (tmp_path / "2026-08-14.csv").read_text(encoding="utf-8").splitlines()
    assert text[0] == "week_ending,site,kpi,value"
    assert text[1] == "2026-08-14,buscalctools.com,monthly_views,12450"


def test_write_snapshot_is_idempotent(tmp_path: Path, sample_rows):
    write_snapshot(tmp_path, "2026-08-14", sample_rows)
    write_snapshot(tmp_path, "2026-08-14", sample_rows)
    text = (tmp_path / "2026-08-14.csv").read_text(encoding="utf-8").splitlines()
    # Header + 3 rows = 4 lines, not 7
    assert len(text) == 4


def test_write_snapshot_atomic_via_tmp(tmp_path: Path, sample_rows):
    """The writer should write to .tmp + os.replace, not in-place."""
    write_snapshot(tmp_path, "2026-08-14", sample_rows)
    # No leftover .tmp files after successful write
    leftovers = list(tmp_path.glob("*.tmp"))
    assert leftovers == []


def test_read_all_snapshots_returns_sorted(tmp_path: Path):
    (tmp_path / "2026-08-14.csv").write_text(
        "week_ending,site,kpi,value\n2026-08-14,bc.com,monthly_views,100\n",
        encoding="utf-8",
    )
    (tmp_path / "2026-08-07.csv").write_text(
        "week_ending,site,kpi,value\n2026-08-07,bc.com,monthly_views,80\n",
        encoding="utf-8",
    )
    rows = read_all_snapshots(tmp_path)
    # Sorted by week_ending ascending
    assert [r["week_ending"] for r in rows] == ["2026-08-07", "2026-08-14"]


def test_read_all_snapshots_handles_empty_dir(tmp_path: Path):
    assert read_all_snapshots(tmp_path) == []


def test_kpi_keys_are_canonical():
    """KPI_KEYS is the contract the dashboard renderer relies on."""
    assert KPI_KEYS == (
        "monthly_views",
        "pages_indexed",
        "referring_sources",
        "top10_keywords",
        "newsletter_subscribers",
        "commits_7d",
    )
