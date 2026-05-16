import { describe, it, expectTypeOf } from "vitest";
import type { Variant, VariantKind, VariantKey } from "@/lib/variants.types";

describe("variant types", () => {
  it("VariantKind is the closed union", () => {
    expectTypeOf<VariantKind>().toEqualTypeOf<"geo" | "scenario" | "audience">();
  });

  it("Variant requires the documented keys", () => {
    const v: Variant = {
      slug: "uk",
      kind: "geo",
      label: "UK",
      h1Suffix: "for UK Businesses",
      title: "Profit Margin Calculator UK",
      description: "x".repeat(120),
      voiceAnswer: undefined,
      intro: "[OPERATOR_TO_FILL: ~400 words about UK profit margins]",
      hreflangCountry: "en-GB",
    };
    expectTypeOf(v).toMatchTypeOf<Variant>();
  });

  it("VariantKey composes calc + variant slugs", () => {
    expectTypeOf<VariantKey>().toEqualTypeOf<`${string}/${string}`>();
  });
});
