import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

// Regression guard for the rendered HTML of /break-even-calculator. The page's
// previous DataForSEO audit flagged "Mismatched closing tag at line 370" — Task 4's
// diagnosis (reports/2026-05-21-break-even-html-validation-diagnosis.md) confirmed
// that was a STALE_AUDIT against Next.js's <meta/> / <link/> void-element
// serialisation, not a real nesting bug. This test guards against the day a real
// structural mismatch lands.
describe("break-even-calculator rendered HTML is well-formed", () => {
  const candidates = [
    path.resolve(__dirname, "../../out/break-even-calculator.html"),
    path.resolve(__dirname, "../../out/break-even-calculator/index.html"),
    path.resolve(__dirname, "../../.next/server/app/break-even-calculator.html"),
  ];
  const file = candidates.find((c) => fs.existsSync(c));

  it("built HTML file exists", () => {
    expect(file, "run 'npm run build' first").toBeDefined();
  });

  if (!file) return;
  const html = fs.readFileSync(file, "utf8");

  // Count opens vs closes for each structural tag. Void elements (meta, link, br,
  // input, img, source, etc.) are NOT in this list — they have no closing tag by
  // definition, and Next.js's <meta/> XHTML-style serialisation is not a real bug.
  it("has no mismatched section/ul/ol/dl/article/div/li/dt/dd tags", () => {
    for (const tag of ["section", "ul", "ol", "dl", "article", "div", "li", "dt", "dd", "nav", "header", "main", "footer", "details", "summary", "table", "tbody", "tr", "td", "th"]) {
      const open = (html.match(new RegExp(`<${tag}(?:\\s|>)`, "g")) || []).length;
      const close = (html.match(new RegExp(`</${tag}>`, "g")) || []).length;
      expect(open, `<${tag}> tag mismatch: ${open} open vs ${close} close`).toBe(close);
    }
  });
});
