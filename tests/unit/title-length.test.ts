import { describe, it, expect } from "vitest";
import type { Metadata } from "next";

import { metadata as cacLtv } from "@/app/(site)/cac-ltv-calculator/page";
import { metadata as subPricing } from "@/app/(site)/subscription-pricing-calculator/page";

// Audit finding: titles >60 chars on /cac-ltv-calculator (was 70) and
// /subscription-pricing-calculator (was 66). Google truncates titles in SERPs
// around the 600px pixel-width mark, which lands at roughly 60 characters for
// typical title text. Tests pin both at ≤60 / ≥40 so the trims don't drift
// back over time.

function extractTitle(t: Metadata["title"]): string {
  if (typeof t === "string") return t;
  if (t && typeof t === "object") {
    if ("absolute" in t && typeof t.absolute === "string") return t.absolute;
    if ("default" in t && typeof t.default === "string") return t.default;
  }
  return "";
}

const CASES: Array<{ slug: string; meta: Metadata }> = [
  { slug: "cac-ltv-calculator", meta: cacLtv },
  { slug: "subscription-pricing-calculator", meta: subPricing },
];

describe.each(CASES)("calc page title $slug", ({ meta }) => {
  it("is 40-60 chars (SERP-safe)", () => {
    const title = extractTitle(meta.title);
    expect(title.length).toBeGreaterThanOrEqual(40);
    expect(title.length).toBeLessThanOrEqual(60);
  });
});
