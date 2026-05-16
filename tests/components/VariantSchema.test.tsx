import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import VariantSchema from "@/components/shared/VariantSchema";

describe("VariantSchema", () => {
  function extractLd(html: string): Record<string, unknown> {
    const m = html.match(/<script[^>]*>([\s\S]*?)<\/script>/);
    if (!m) throw new Error("no JSON-LD script found");
    return JSON.parse(m[1]);
  }

  it("renders WebApplication with isPartOf pointing at parent canonical", () => {
    const html = renderToStaticMarkup(
      <VariantSchema
        calcSlug="profit-margin-calculator"
        variantSlug="uk"
        name="Profit Margin Calculator UK"
        description="Free profit margin calculator for UK businesses."
        featureList={["a", "b", "c"]}
      />,
    );
    const ld = extractLd(html);
    expect(ld["@type"]).toBe("WebApplication");
    expect(ld["url"]).toBe("https://buscalctools.com/profit-margin-calculator/uk");
    expect(ld["isPartOf"]).toEqual({
      "@type": "WebApplication",
      "@id": "https://buscalctools.com/profit-margin-calculator",
    });
    expect(ld["isAccessibleForFree"]).toBe(true);
    expect(ld["featureList"]).toEqual(["a", "b", "c"]);
  });

  it("omits featureList when empty", () => {
    const html = renderToStaticMarkup(
      <VariantSchema
        calcSlug="markup-calculator"
        variantSlug="retail"
        name="x"
        description="y"
        featureList={[]}
      />,
    );
    const ld = extractLd(html);
    expect("featureList" in ld).toBe(false);
  });
});
