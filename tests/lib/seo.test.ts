import { describe, it, expect } from "vitest";
import { variantMetadata, hreflang } from "@/lib/seo";
import { getVariant } from "@/lib/variants";

describe("variantMetadata", () => {
  it("returns canonical = variant URL", () => {
    const v = getVariant("profit-margin-calculator", "uk")!;
    const m = variantMetadata({ calcSlug: "profit-margin-calculator", variant: v });
    expect(m.alternates?.canonical).toBe(
      "https://buscalctools.com/profit-margin-calculator/uk",
    );
  });

  it("geo variant overrides hreflang for its country", () => {
    const v = getVariant("profit-margin-calculator", "uk")!;
    const m = variantMetadata({ calcSlug: "profit-margin-calculator", variant: v });
    expect(m.alternates?.languages?.["en-GB"]).toBe(
      "https://buscalctools.com/profit-margin-calculator/uk",
    );
    expect(m.alternates?.languages?.["en-US"]).toBe(
      "https://buscalctools.com/profit-margin-calculator",
    );
  });

  it("scenario variant inherits parent hreflang for all locales", () => {
    const v = getVariant("profit-margin-calculator", "restaurants")!;
    const m = variantMetadata({ calcSlug: "profit-margin-calculator", variant: v });
    const expected = "https://buscalctools.com/profit-margin-calculator/restaurants";
    expect(m.alternates?.languages?.["en-US"]).toBe(expected);
    expect(m.alternates?.languages?.["en-GB"]).toBe(expected);
    expect(m.alternates?.languages?.["en-ZA"]).toBe(expected);
  });

  it("title + description come from the variant", () => {
    const v = getVariant("profit-margin-calculator", "us")!;
    const m = variantMetadata({ calcSlug: "profit-margin-calculator", variant: v });
    expect(m.title).toEqual({ absolute: v.title });
    expect(m.description).toBe(v.description);
  });
});
