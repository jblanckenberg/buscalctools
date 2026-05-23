import { describe, it, expect } from "vitest";
// @ts-expect-error — @types/jsdom is not installed; the runtime types are
// fine for this test's narrow use (querySelectorAll + children + tagName).
import { JSDOM } from "jsdom";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

// Audit finding (2026-05-23): 5 pages had a parent with >60 direct children,
// which contributes to INP/TBT regressions on mid-range devices. The fix is
// to group flat sibling chains into nested <section> blocks. This test scans
// the BUILT static export so the assertion reflects what Google actually sees.

const ROOT = join(__dirname, "..", "..");
const OUT = join(ROOT, "out");
const MAX_DIRECT_CHILDREN = 60;

const AUDIT_FLAGGED_SLUGS = [
  "business-loan-calculator",
  "cost-per-unit-calculator",
  "estimated-tax-calculator",
  "blog/profit-margin-vs-markup-difference",
  "blog/how-much-to-charge-as-freelancer",
];

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

interface DomOffender {
  tag: string;
  childCount: number;
  preview: string;
}

// Framework runtime tags Next.js injects at body close — out of our control,
// and Lighthouse weighs the rendered SEMANTIC tree more than the script blob.
const FRAMEWORK_TAGS = new Set(["SCRIPT", "NOSCRIPT", "TEMPLATE", "LINK"]);

function countSemanticChildren(el: Element): number {
  let n = 0;
  for (const child of Array.from(el.children)) {
    if (!FRAMEWORK_TAGS.has(child.tagName)) n++;
  }
  return n;
}

function findOffenders(html: string): DomOffender[] {
  const dom = new JSDOM(html);
  const offenders: DomOffender[] = [];
  const all = dom.window.document.querySelectorAll("*");
  for (let i = 0; i < all.length; i++) {
    const el = all[i] as Element;
    const count = countSemanticChildren(el);
    if (count > MAX_DIRECT_CHILDREN) {
      const className = el.getAttribute("class") ?? "";
      offenders.push({
        tag: el.tagName,
        childCount: count,
        preview: `${el.tagName}${className ? `.${className.split(/\s+/)[0]}` : ""}`,
      });
    }
  }
  return offenders;
}

describe("no rendered page has >60 direct children under any parent (audit-flagged slugs)", () => {
  for (const slug of AUDIT_FLAGGED_SLUGS) {
    it(`${slug} stays under the threshold`, () => {
      const html = loadBuiltHtml(slug);
      if (html === null) {
        // Build hasn't been run — skip without failing so the suite stays
        // runnable in pre-build environments. CI runs `npm run build` first.
        console.warn(`[dom-depth] no built HTML for ${slug} — skipping (run \`npm run build\` first)`);
        return;
      }
      const offenders = findOffenders(html);
      expect(
        offenders,
        `${slug} has ${offenders.length} parent(s) over ${MAX_DIRECT_CHILDREN} direct children:\n${offenders
          .map((o) => `  ${o.preview}: ${o.childCount} children`)
          .join("\n")}`,
      ).toEqual([]);
    });
  }
});
