import { describe, it, expect } from "vitest";
import { calculateCagr } from "@/lib/calculations/cagr";

describe("calculateCagr", () => {
  it("doubling in 7 years is about 10.41% CAGR (Rule of 72 sanity check)", () => {
    const r = calculateCagr({ startValue: 1000, endValue: 2000, periods: 7 });
    expect(r.cagrPct).toBeCloseTo(10.41, 1);
    expect(r.multiplier).toBe(2);
    expect(r.totalGrowthPct).toBe(100);
  });

  it("flat returns 0% CAGR", () => {
    const r = calculateCagr({ startValue: 1000, endValue: 1000, periods: 5 });
    expect(r.cagrPct).toBe(0);
    expect(r.totalGrowthPct).toBe(0);
  });

  it("halving returns negative CAGR", () => {
    const r = calculateCagr({ startValue: 1000, endValue: 500, periods: 5 });
    expect(r.cagrPct).toBeLessThan(0);
    expect(r.cagrPct).toBeCloseTo(-12.94, 1);
  });

  it("periods=1 returns simple percentage growth", () => {
    const r = calculateCagr({ startValue: 100, endValue: 130, periods: 1 });
    expect(r.cagrPct).toBeCloseTo(30, 4);
    expect(r.totalGrowthPct).toBeCloseTo(30, 4);
  });

  it("breakdown projects start -> end via the computed CAGR", () => {
    const r = calculateCagr({ startValue: 1000, endValue: 2000, periods: 7 });
    expect(r.breakdown[0]).toEqual({ period: 0, value: 1000 });
    // The 7th-year projection should equal (or be very close to) endValue.
    expect(r.breakdown[7].value).toBeCloseTo(2000, 0);
  });

  it("rejects zero startValue", () => {
    expect(() => calculateCagr({ startValue: 0, endValue: 100, periods: 5 })).toThrow(/startValue/);
  });

  it("rejects negative startValue", () => {
    expect(() => calculateCagr({ startValue: -1, endValue: 100, periods: 5 })).toThrow();
  });

  it("rejects zero or negative periods", () => {
    expect(() => calculateCagr({ startValue: 100, endValue: 200, periods: 0 })).toThrow();
    expect(() => calculateCagr({ startValue: 100, endValue: 200, periods: -1 })).toThrow();
  });

  it("rejects non-finite endValue", () => {
    expect(() => calculateCagr({ startValue: 100, endValue: NaN, periods: 5 })).toThrow();
  });

  it("S&P 500 historical: $10k → $30k over 15 years is about 7.6% CAGR", () => {
    const r = calculateCagr({ startValue: 10000, endValue: 30000, periods: 15 });
    expect(r.cagrPct).toBeCloseTo(7.6, 1);
  });
});
