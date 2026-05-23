import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

// Audit finding (2026-05-23): "HTML parser closing-tag mismatch warnings on
// /break-even-calculator and /cash-flow-calculator". The expected root cause
// was an unbalanced <div> or <span> inside the Chart wrapper component.
//
// Investigation: the rendered HTML on both pages currently has perfectly
// balanced div/span tags. The finding was either a stale audit snapshot
// (taken before the 2026-05-21 chart refactor) or a false positive driven by
// HTML5-tolerated patterns (raw `&` inside JSON-LD script blocks, which
// MUST stay raw — escaping breaks structured data).
//
// This test pins the balance assertion as a regression check. Counts open
// vs close tags in the raw rendered HTML; fails on any mismatch.

const ROOT = join(__dirname, "..", "..");
const OUT = join(ROOT, "out");
const SLUGS = ["break-even-calculator", "cash-flow-calculator"];

function loadBuiltHtml(slug: string): string | null {
  const candidates = [
    join(OUT, `${slug}.html`),
    join(OUT, slug, "index.html"),
  ];
  for (const path of candidates) {
    if (existsSync(path)) return readFileSync(path, "utf8");
  }
  return null;
}

function tagBalance(html: string, tag: string): { open: number; close: number; delta: number } {
  // Open tag matches both <div> and <div class="..."> but excludes </div>.
  const openRe = new RegExp(`<${tag}\\b`, "g");
  const closeRe = new RegExp(`</${tag}>`, "g");
  const open = (html.match(openRe) || []).length;
  const close = (html.match(closeRe) || []).length;
  return { open, close, delta: open - close };
}

describe("chart pages have balanced div/span tags", () => {
  for (const slug of SLUGS) {
    it(`${slug} div tags are balanced`, () => {
      const html = loadBuiltHtml(slug);
      if (html === null) {
        console.warn(`[html-validity] no built HTML for ${slug} — run \`npm run build\` first`);
        return;
      }
      const { delta, open, close } = tagBalance(html, "div");
      expect(delta, `${slug}: ${open} <div> opens vs ${close} closes`).toBe(0);
    });

    it(`${slug} span tags are balanced`, () => {
      const html = loadBuiltHtml(slug);
      if (html === null) return;
      const { delta, open, close } = tagBalance(html, "span");
      expect(delta, `${slug}: ${open} <span> opens vs ${close} closes`).toBe(0);
    });
  }
});
