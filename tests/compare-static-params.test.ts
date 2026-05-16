import { describe, it, expect } from "vitest";
import { generateStaticParams } from "@/app/(site)/compare/[slug]/page";
import { PUBLISHED_COMPARISONS, comparisonBySlug, comparisonsForCalc } from "@/lib/comparisons";

describe("compare static params", () => {
  it("emits one slug per published comparison", async () => {
    const params = await generateStaticParams();
    expect(params.length).toBe(PUBLISHED_COMPARISONS.length);
    expect(params.length).toBeGreaterThanOrEqual(4);
  });

  it("includes all 4 launch comparison slugs", async () => {
    const params = await generateStaticParams();
    const slugs = new Set(params.map((p) => p.slug));
    expect(slugs.has("best-profit-margin-calculators-2026")).toBe(true);
    expect(slugs.has("quickbooks-vs-free-profit-margin-calculator")).toBe(true);
    expect(slugs.has("best-break-even-calculators-2026")).toBe(true);
    expect(slugs.has("dcf-vs-multiples-small-business-valuation")).toBe(true);
  });

  it("each published slug resolves via comparisonBySlug", () => {
    for (const c of PUBLISHED_COMPARISONS) {
      const found = comparisonBySlug(c.slug);
      expect(found).toBeDefined();
      expect(found?.status).toBe("published");
    }
  });

  it("comparisonsForCalc surfaces published comparisons for each target calc", () => {
    expect(comparisonsForCalc("profit-margin-calculator").length).toBeGreaterThan(0);
    expect(comparisonsForCalc("break-even-calculator").length).toBeGreaterThan(0);
    expect(comparisonsForCalc("business-valuation-calculator").length).toBeGreaterThan(0);
    expect(comparisonsForCalc("nonexistent-calculator").length).toBe(0);
  });
});
