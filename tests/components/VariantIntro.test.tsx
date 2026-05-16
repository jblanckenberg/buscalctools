import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import VariantIntro from "@/components/shared/VariantIntro";

describe("VariantIntro", () => {
  it("renders the intro paragraph when filled", () => {
    const html = renderToStaticMarkup(
      <VariantIntro intro="UK profit margins typically run 5-15% across most sectors..." />,
    );
    expect(html).toContain("UK profit margins typically run");
    expect(html).not.toContain("OPERATOR_TO_FILL");
    expect(html).not.toContain("operator-todo");
  });

  it("renders a visible TODO badge when intro is the marker", () => {
    const html = renderToStaticMarkup(
      <VariantIntro intro="[OPERATOR_TO_FILL: ~400 words about UK profit margins]" />,
    );
    expect(html).toContain("operator-todo");
    expect(html).toContain("OPERATOR_TO_FILL");
  });

  it("noindex meta hint when marker is present (consumer may use)", () => {
    const html = renderToStaticMarkup(
      <VariantIntro intro="[OPERATOR_TO_FILL: ~400 words about X]" />,
    );
    expect(html).toMatch(/data-stub="true"/);
  });
});
