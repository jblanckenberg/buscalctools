import { describe, it, expect } from "vitest";
import { VARIANTS, getVariant, listVariants, allVariantParams } from "@/lib/variants";
import { CALC_META } from "@/lib/calc-meta";

describe("variant matrix", () => {
  it("includes exactly 15 variant pages", () => {
    const flat = Object.values(VARIANTS).flatMap((m) => Object.values(m));
    expect(flat).toHaveLength(15);
  });

  it("every variant references a known calculator", () => {
    for (const calcSlug of Object.keys(VARIANTS)) {
      expect(CALC_META[calcSlug], `unknown calc slug ${calcSlug}`).toBeDefined();
    }
  });

  it("getVariant returns the right entry", () => {
    const v = getVariant("profit-margin-calculator", "uk");
    expect(v?.kind).toBe("geo");
    expect(v?.hreflangCountry).toBe("en-GB");
  });

  it("getVariant returns undefined for unknown pair", () => {
    expect(getVariant("profit-margin-calculator", "mars")).toBeUndefined();
    expect(getVariant("nope", "uk")).toBeUndefined();
  });

  it("listVariants returns all variants for a calc", () => {
    const list = listVariants("profit-margin-calculator");
    expect(list.map((v) => v.slug).sort()).toEqual(["ecommerce", "restaurants", "uk", "us"]);
  });

  it("allVariantParams emits flat {calculator, variant} list for generateStaticParams", () => {
    const params = allVariantParams();
    expect(params).toContainEqual({ calculator: "profit-margin-calculator", variant: "uk" });
    expect(params).toHaveLength(15);
  });

  it("every intro is currently an OPERATOR_TO_FILL marker", () => {
    const flat = Object.values(VARIANTS).flatMap((m) => Object.values(m));
    for (const v of flat) {
      expect(v.intro).toMatch(/^\[OPERATOR_TO_FILL:/);
    }
  });
});
