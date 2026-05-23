"""One-off: wrap each H2 section of an MDX file in <section>...</section> to
break the >60-direct-children DOM warning. Idempotent — skips files where
the first H2 is already wrapped in a <section>.

Targets the audit-flagged blog post:
  content/blog/profit-margin-vs-markup-difference.mdx (96 direct children)

Usage:
  python scripts/wrap_mdx_h2_sections.py content/blog/<slug>.mdx
"""
from __future__ import annotations

import sys
from pathlib import Path


def wrap_h2_sections(text: str) -> str:
    lines = text.splitlines(keepends=True)
    h2_indexes = [i for i, line in enumerate(lines) if line.startswith("## ") and not line.startswith("### ")]
    if not h2_indexes:
        return text

    # Idempotency: if the line before the first H2 is already a <section>,
    # assume the file is already wrapped.
    first = h2_indexes[0]
    if first > 0 and lines[first - 1].strip().startswith("<section"):
        return text

    out: list[str] = []
    section_boundaries = set(h2_indexes)
    in_section = False
    for i, line in enumerate(lines):
        if i in section_boundaries:
            if in_section:
                out.append("</section>\n\n")
            out.append('<section className="mdx-section">\n\n')
            in_section = True
        out.append(line)
    if in_section:
        # Append final closing tag at end of file.
        # Ensure exactly one trailing newline before the tag.
        if not out[-1].endswith("\n"):
            out.append("\n")
        out.append("\n</section>\n")
    return "".join(out)


def main() -> None:
    if len(sys.argv) != 2:
        sys.exit("usage: wrap_mdx_h2_sections.py <path-to-mdx>")
    path = Path(sys.argv[1])
    before = path.read_text(encoding="utf-8")
    after = wrap_h2_sections(before)
    if after == before:
        print(f"{path}: no change (idempotent)")
        return
    path.write_text(after, encoding="utf-8")
    delta = after.count("<section") - before.count("<section")
    print(f"{path}: added {delta} <section> wrappers")


if __name__ == "__main__":
    main()
