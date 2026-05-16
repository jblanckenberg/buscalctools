#!/usr/bin/env python3
"""
Post-build verifier for /compare/<slug>/ pages.

Runs after `npm run build`. Confirms that each published comparison page:
  1. exists at out/compare/<slug>/index.html
  2. contains its `data-comparison-embed="<calcSlug>"` marker
  3. contains at least one JSON-LD <script type="application/ld+json"> tag
  4. contains the Article schema "@type": "Article"
  5. contains the FAQPage schema "@type": "FAQPage"

Exits non-zero if any check fails.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = REPO_ROOT / "out" / "compare"

# Mirror lib/comparisons.ts COMPARISONS entries (status=published only).
# Source of truth lives in TypeScript; this list must be kept in sync manually.
PUBLISHED = [
    ("best-profit-margin-calculators-2026", "profit-margin-calculator"),
    ("quickbooks-vs-free-profit-margin-calculator", "profit-margin-calculator"),
    ("best-break-even-calculators-2026", "break-even-calculator"),
    ("dcf-vs-multiples-small-business-valuation", "business-valuation-calculator"),
]


def check_page(slug: str, calc_slug: str) -> list[str]:
    errors: list[str] = []
    # Next.js 16 emits <slug>.html at the parent dir for SSG routes; older
    # output mode used <slug>/index.html. Accept either.
    candidates = [
        OUT_DIR / f"{slug}.html",
        OUT_DIR / slug / "index.html",
    ]
    page = next((p for p in candidates if p.exists()), None)
    if page is None:
        return [f"[{slug}] missing built file (tried: {', '.join(str(c) for c in candidates)})"]

    html = page.read_text(encoding="utf-8", errors="replace")

    marker = f'data-comparison-embed="{calc_slug}"'
    if marker not in html:
        errors.append(f"[{slug}] missing embed marker: {marker}")

    ldjson_blocks = re.findall(
        r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>',
        html,
        flags=re.DOTALL,
    )
    if not ldjson_blocks:
        errors.append(f"[{slug}] no JSON-LD <script> tags found")

    parsed_types: list[str] = []
    for block in ldjson_blocks:
        try:
            data = json.loads(block.strip())
        except json.JSONDecodeError:
            continue
        if isinstance(data, dict):
            t = data.get("@type")
            if isinstance(t, str):
                parsed_types.append(t)
            elif isinstance(t, list):
                parsed_types.extend(x for x in t if isinstance(x, str))

    if "Article" not in parsed_types:
        errors.append(f"[{slug}] missing Article JSON-LD (found types: {parsed_types})")
    if "FAQPage" not in parsed_types:
        errors.append(f"[{slug}] missing FAQPage JSON-LD (found types: {parsed_types})")

    return errors


def main() -> int:
    if not OUT_DIR.exists():
        print(f"FAIL: build output not found at {OUT_DIR}. Run `npm run build` first.")
        return 1

    all_errors: list[str] = []
    for slug, calc_slug in PUBLISHED:
        errs = check_page(slug, calc_slug)
        if errs:
            all_errors.extend(errs)
        else:
            print(f"OK   {slug}  (embed={calc_slug})")

    if all_errors:
        print()
        print("FAILURES:")
        for e in all_errors:
            print(f"  - {e}")
        return 1

    print()
    print(f"VERIFIER OK — {len(PUBLISHED)} comparison pages valid.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
