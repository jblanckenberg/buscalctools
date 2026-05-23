import { describe, it, expect } from "vitest";
import { calculateIrr } from "@/lib/calculations/irr";

describe("calculateIrr", () => {
  it("solves the trivial 1-year case: -100 → 110 = 10% IRR", () => {
    const r = calculateIrr({ initialInvestment: 100, cashFlows: [110] });
    expect(r.irrPct).toBeCloseTo(10, 3);
    expect(r.decision).toBe("accept");
    expect(r.converged).toBe(true);
  });

  it("solves the textbook 3-year case: -1000 → 400×3 ≈ 9.7%", () => {
    // -1000 + 400/(1+r) + 400/(1+r)^2 + 400/(1+r)^3 = 0 → r ≈ 9.70%
    const r = calculateIrr({ initialInvestment: 1000, cashFlows: [400, 400, 400] });
    expect(r.irrPct).toBeCloseTo(9.7, 1);
    expect(r.converged).toBe(true);
  });

  it("rejects when IRR < default hurdle (10%)", () => {
    // -100 → 105 ⇒ 5% IRR ⇒ below default 10% hurdle ⇒ reject
    const r = calculateIrr({ initialInvestment: 100, cashFlows: [105] });
    expect(r.irrPct).toBeCloseTo(5, 3);
    expect(r.decision).toBe("reject");
  });

  it("respects a custom hurdle rate", () => {
    // 5% IRR, custom hurdle 4% ⇒ accept
    const r = calculateIrr({ initialInvestment: 100, cashFlows: [105], hurdleRatePct: 4 });
    expect(r.decision).toBe("accept");
  });

  it("throws when cash flows have no sign change", () => {
    expect(() => calculateIrr({ initialInvestment: 100, cashFlows: [-50, -50] })).toThrow(
      /sign change/,
    );
  });

  it("throws on empty cash flows", () => {
    expect(() => calculateIrr({ initialInvestment: 100, cashFlows: [] })).toThrow();
  });

  it("rejects negative initial investment", () => {
    expect(() => calculateIrr({ initialInvestment: -1, cashFlows: [100] })).toThrow();
  });

  it("rejects non-finite cash flow", () => {
    expect(() => calculateIrr({ initialInvestment: 100, cashFlows: [NaN, 100] })).toThrow();
  });

  it("solves a high-IRR SaaS-style case", () => {
    // -10k now, 5k/yr for 3 years → IRR ≈ 23.4%
    const r = calculateIrr({ initialInvestment: 10000, cashFlows: [5000, 5000, 5000] });
    expect(r.irrPct).toBeGreaterThan(20);
    expect(r.irrPct).toBeLessThan(30);
    expect(r.decision).toBe("accept");
  });
});
