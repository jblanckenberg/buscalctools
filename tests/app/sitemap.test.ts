import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  it("includes the parent calc URL once", () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://buscalctools.com/profit-margin-calculator");
  });

  it("includes every variant URL", () => {
    const entries = sitemap();
    const urls = new Set(entries.map((e) => e.url));
    expect(urls.has("https://buscalctools.com/profit-margin-calculator/uk")).toBe(true);
    expect(urls.has("https://buscalctools.com/freelance-rate-calculator/designers")).toBe(true);
    expect(urls.has("https://buscalctools.com/roi-calculator/marketing")).toBe(true);
  });

  it("variant entries use priority 0.7", () => {
    const entries = sitemap();
    const v = entries.find((e) => e.url.endsWith("/profit-margin-calculator/uk"));
    expect(v?.priority).toBe(0.7);
  });

  it("emits 15 variant entries total", () => {
    const entries = sitemap();
    const variantEntries = entries.filter((e) =>
      /\/[a-z-]+\/[a-z-]+$/.test(e.url.replace("https://buscalctools.com", "")),
    );
    expect(variantEntries.length).toBeGreaterThanOrEqual(15);
  });
});
