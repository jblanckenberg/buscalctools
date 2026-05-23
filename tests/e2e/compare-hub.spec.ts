// bizapp/tests/e2e/compare-hub.spec.ts
//
// e2e check for the /compare hub page. Mirrors the pattern used by
// jsonld-rendered.test.ts: parses the static-exported HTML in out/ and
// asserts the markup contract the hub must satisfy.
//
// Run with:  npm run build && npx vitest run tests/e2e/compare-hub.spec.ts
//
// Tied to plan task 0.1 — closes the /compare 404 audit finding (the
// route was declared in sitemap.xml but had no page).
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { PUBLISHED_COMPARISONS } from "@/lib/comparisons";

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

function extractJsonLd(html: string): any[] {
  const out: any[] = [];
  const re = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    try {
      out.push(JSON.parse(m[1]));
    } catch (err) {
      console.warn("extractJsonLd: failed to parse JSON-LD block:", err);
    }
  }
  return out;
}

describe("/compare hub page", () => {
  const html = findBuiltHtml("compare");

  it("built HTML exists at /compare (HTTP 200 in static export)", () => {
    expect(
      html,
      "built HTML for /compare not found — the page is missing, or run 'npm run build' first",
    ).not.toBeNull();
  });

  if (!html) return;

  it("has an H1 containing 'Compare' or 'Comparison'", () => {
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    expect(h1Match, "no <h1> found on /compare").not.toBeNull();
    const h1Text = h1Match![1].replace(/<[^>]+>/g, "").trim();
    expect(h1Text).toMatch(/Compar(e|ison)/i);
  });

  it("links to every published comparison via /compare/<slug>", () => {
    // Decode the basic HTML entities Next.js emits so titles containing &, <, > etc. match.
    const decoded = html
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'");
    for (const c of PUBLISHED_COMPARISONS) {
      expect(
        decoded.includes(`/compare/${c.slug}`),
        `expected link to /compare/${c.slug} on the hub`,
      ).toBe(true);
      // The card should also surface the title so users know what they're clicking.
      expect(
        decoded.includes(c.title),
        `expected title "${c.title}" rendered on hub`,
      ).toBe(true);
    }
  });

  it("emits BreadcrumbList JSON-LD with Home and Comparisons items", () => {
    const blocks = extractJsonLd(html);
    const breadcrumb = blocks.find((b) => b["@type"] === "BreadcrumbList");
    expect(breadcrumb, "no BreadcrumbList JSON-LD on /compare").toBeDefined();
    const names = (breadcrumb.itemListElement ?? []).map((el: any) => el.name);
    expect(names).toContain("Home");
    expect(names.some((n: string) => /Comparisons?/i.test(n))).toBe(true);
  });

  it("emits a Twitter card meta tag for /compare", () => {
    expect(
      /<meta[^>]+name="twitter:card"[^>]*>/i.test(html),
      "expected <meta name=\"twitter:card\"> on /compare hub",
    ).toBe(true);
  });

  it("emits CollectionPage JSON-LD with hasPart for every published comparison", () => {
    const blocks = extractJsonLd(html);
    const collection = blocks.find((b) => b["@type"] === "CollectionPage");
    expect(collection, "no CollectionPage JSON-LD on /compare").toBeDefined();
    expect(Array.isArray(collection.hasPart)).toBe(true);
    expect(collection.hasPart.length).toBe(PUBLISHED_COMPARISONS.length);
  });
});
