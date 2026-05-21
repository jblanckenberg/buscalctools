import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import GlossarySection from "@/components/shared/GlossarySection";

afterEach(() => {
  cleanup();
});

describe("GlossarySection", () => {
  const sampleItems = [
    { term: "Contribution Margin", definition: "Selling price minus variable cost per unit." },
    { term: "Fixed Costs", definition: "Costs that stay the same regardless of volume." },
  ];

  it("renders one <dt>/<dd> pair per item", () => {
    render(<GlossarySection items={sampleItems} />);
    expect(screen.getByText("Contribution Margin")).toBeTruthy();
    expect(screen.getByText("Selling price minus variable cost per unit.")).toBeTruthy();
    expect(screen.getByText("Fixed Costs")).toBeTruthy();
    expect(screen.getByText("Costs that stay the same regardless of volume.")).toBeTruthy();
  });

  it("renders a Glossary heading", () => {
    render(<GlossarySection items={sampleItems} />);
    expect(screen.getByRole("heading", { level: 2, name: "Glossary" })).toBeTruthy();
  });

  it("renders nothing when items is empty", () => {
    const { container } = render(<GlossarySection items={[]} />);
    expect(container.querySelector("section")).toBeNull();
  });

  it("accepts a className override", () => {
    const { container } = render(<GlossarySection items={sampleItems} className="mt-8" />);
    const section = container.querySelector("section");
    expect(section?.className).toBe("mt-8");
  });

  it("defaults className to mt-12", () => {
    const { container } = render(<GlossarySection items={sampleItems} />);
    const section = container.querySelector("section");
    expect(section?.className).toBe("mt-12");
  });
});
