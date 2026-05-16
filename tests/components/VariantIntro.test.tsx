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

  it("renders **bold** spans as <strong>", () => {
    const html = renderToStaticMarkup(
      <VariantIntro intro="Some prose with **important** words inside it." />,
    );
    expect(html).toContain("<strong>important</strong>");
  });

  it("renders a paragraph of - lines as a <ul>", () => {
    const html = renderToStaticMarkup(
      <VariantIntro intro={"Lead paragraph.\n\n- One\n- Two\n- Three\n\nClosing paragraph."} />,
    );
    expect(html).toContain("<ul");
    expect(html).toContain("<li");
    expect(html).toContain(">One</li>");
    expect(html).toContain(">Two</li>");
    expect(html).toContain(">Three</li>");
  });

  it("mixed bold inside bullet items still renders strong", () => {
    const html = renderToStaticMarkup(
      <VariantIntro intro={"- **Cost**: $50\n- **Revenue**: $200"} />,
    );
    expect(html).toContain("<strong>Cost</strong>");
    expect(html).toContain("<strong>Revenue</strong>");
  });
});
