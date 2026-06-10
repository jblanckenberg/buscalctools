"""Walk both sites' rendered calc pages and emit a schema-presence CSV.

Output: a CSV with one row per calculator page across both sites, columns indicating
whether each of WebApplication / SoftwareApplication / FAQPage / BreadcrumbList / HowTo
JSON-LD types is present. Phase 2 uses the False cells to scope a parity backfill.

Run from anywhere:
    python scripts/audit_schema.py
"""
import csv
import re
from pathlib import Path

BC_OUT = Path(r"C:\websites\BizProfitCalc\bizapp\out")
FC_ROOT = Path(r"C:\FIN_CALC_SITE\Finance_Calculator_Hub")
OUT = Path(__file__).resolve().parent.parent / "docs" / "schema_audit_2026-05-15.csv"

TYPES = ("WebApplication", "SoftwareApplication", "FAQPage", "BreadcrumbList", "HowTo")

EXCLUDES = frozenset({"node_modules", ".git", "__pycache__", ".next", "_next"})

# BC's Next.js export emits flat `<slug>.html` files, plus a few internals we skip.
BC_HTML_SKIP = frozenset({"_not-found.html", "404.html", "yandex_ab67bbbed12622c3.html"})


def audit(html: str) -> dict[str, bool]:
    return {t: bool(re.search(rf'"@type"\s*:\s*"{t}"', html)) for t in TYPES}


def collect() -> list[dict]:
    rows: list[dict] = []
    if BC_OUT.is_dir():
        for p in BC_OUT.rglob("*.html"):
            if any(part in EXCLUDES for part in p.parts):
                continue
            if p.name in BC_HTML_SKIP:
                continue
            rel = p.relative_to(BC_OUT).as_posix()
            if p.name == "index.html":
                parent = p.relative_to(BC_OUT).parent.as_posix()
                slug = "/" if parent in ("", ".") else parent
            else:
                slug = rel[:-5]  # strip .html
            rows.append({"site": "BC", "slug": slug, **audit(p.read_text(encoding="utf-8"))})
    if FC_ROOT.is_dir():
        for p in FC_ROOT.glob("*/index.html"):
            if any(part in EXCLUDES for part in p.parts):
                continue
            slug = p.parent.name
            rows.append({"site": "FC", "slug": slug, **audit(p.read_text(encoding="utf-8"))})
        # FC root index too
        root_index = FC_ROOT / "index.html"
        if root_index.is_file():
            rows.append({"site": "FC", "slug": "/", **audit(root_index.read_text(encoding="utf-8"))})
    return sorted(rows, key=lambda r: (r["site"], r["slug"]))


if __name__ == "__main__":
    rows = collect()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    with OUT.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["site", "slug", *TYPES])
        writer.writeheader()
        writer.writerows(rows)
    print(f"Wrote {len(rows)} rows to {OUT}")

