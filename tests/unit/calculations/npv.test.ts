import { describe, it, expect } from "vitest";
import { calculateNpv } from "@/lib/calculations/npv";

describe("calculateNpv", () => {
  it("returns -initial when there are no future cash flows", () => {
    const r = calculateNpv({ initialInvestment: 10000, cashFlows: [], discountRatePct: 0 });
    expect(r.npv).toBe(-10000);
    expect(r.decision).toBe("reject");
    expect(r.breakdown).toEqual([]);
  });

  it("textbook 3-year project at 10% discount rate", () => {
    // -10000 + 4000/1.10 + 4000/1.21 + 4000/1.331
    //  = -10000 + 3636.36 + 3305.79 + 3005.26 = -52.59
    const r = calculateNpv({ initialInvestment: 10000, cashFlows: [4000, 4000, 4000], discountRatePct: 10 });
    expect(r.npv).toBeCloseTo(-52.59, 2);
    expect(r.decision).toBe("reject");
  });

  it("accepts a positive-NPV project", () => {
    const r = calculateNpv({ initialInvestment: 10000, cashFlows: [5000, 5000, 5000], discountRatePct: 10 });
    expect(r.npv).toBeGreaterThan(0);
    expect(r.decision).toBe("accept");
  });

  it("returns per-period present-value breakdown with cumulative NPV", () => {
    const r = calculateNpv({ initialInvestment: 10000, cashFlows: [4000, 4000], discountRatePct: 10 });
    expect(r.breakdown).toHaveLength(2);
    expect(r.breakdown[0]).toEqual({ period: 1, cashFlow: 4000, presentValue: 3636.36, cumulativeNpv: -6363.64 });
    expect(r.breakdown[1].presentValue).toBeCloseTo(3305.79, 2);
    expect(r.breakdown[1].cumulativeNpv).toBeCloseTo(-3057.85, 2);
  });

  it("handles a 0% discount rate by summing flows directly", () => {
    const r = calculateNpv({ initialInvestment: 1000, cashFlows: [400, 400, 400], discountRatePct: 0 });
    expect(r.npv).toBe(200);
    expect(r.decision).toBe("accept");
  });

  it("allows negative cash flows in any period (e.g. follow-on investment)", () => {
    // -10000 + (-2000/1.08) + 5000/1.1664 + 8000/1.2597 = -1214.5
    // (Net negative — the follow-on investment is the swing factor.)
    const r = calculateNpv({ initialInvestment: 10000, cashFlows: [-2000, 5000, 8000], discountRatePct: 8 });
    expect(r.breakdown[0].presentValue).toBeLessThan(0);
    expect(r.npv).toBeCloseTo(-1214.5, 1);
    expect(r.decision).toBe("reject");
  });

  it("rejects a negative initial investment", () => {
    expect(() => calculateNpv({ initialInvestment: -1, cashFlows: [100], discountRatePct: 5 })).toThrow(
      /initialInvestment/,
    );
  });

  it("rejects a non-finite discount rate", () => {
    expect(() => calculateNpv({ initialInvestment: 100, cashFlows: [50], discountRatePct: NaN })).toThrow();
    expect(() => calculateNpv({ initialInvestment: 100, cashFlows: [50], discountRatePct: Infinity })).toThrow();
  });

  it("rejects a non-finite cash flow entry", () => {
    expect(() => calculateNpv({ initialInvestment: 100, cashFlows: [50, NaN], discountRatePct: 5 })).toThrow();
  });
});
