// bizapp/tests/e2e/jsonld-rendered.test.ts
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const BUILT_DIR_CANDIDATES = [
  path.resolve(__dirname, "../../out"),
  path.resolve(__dirname, "../../.next/server/app"),
];

function findBuiltHtml(slug: string): string | null {
  for (const base of BUILT_DIR_CANDIDATES) {
    const candidates = [
      path.join(base, `${slug}.html`),
      path.join(base, slug, "index.html"),
    ];
    for (const c of candidates) {
      if (fs.existsSync(c)) return fs.readFileSync(c, "utf8");
    }
  }
  return null;
}

function extractJsonLd(html: string): unknown[] {
  const out: unknown[] = [];
  const re = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    try {
      out.push(JSON.parse(m[1]));
    } catch {
      // skip malformed
    }
  }
  return out;
}

const SAMPLE_SLUGS = [
  "break-even-calculator",
  "profit-margin-calculator",
  "roi-calculator",
];

describe("rendered JSON-LD per calculator page", () => {
  for (const slug of SAMPLE_SLUGS) {
    describe(slug, () => {
      const html = findBuiltHtml(slug);

      it("built HTML exists", () => {
        expect(html, `built HTML for ${slug} not found — run 'npm run build' first`).not.toBeNull();
      });

      if (!html) return;

      const blocks = extractJsonLd(html);
      const types = blocks.map((b: any) => b["@type"]).filter(Boolean);

      it("contains SoftwareApplication JSON-LD", () => {
        expect(types).toContain("SoftwareApplication");
      });
      it("contains HowTo JSON-LD", () => {
        expect(types).toContain("HowTo");
      });
      it("contains FAQPage JSON-LD", () => {
        expect(types).toContain("FAQPage");
      });
      it("contains BreadcrumbList JSON-LD", () => {
        expect(types).toContain("BreadcrumbList");
      });
    });
  }
});
