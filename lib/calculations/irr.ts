// Pure-function IRR (Internal Rate of Return) calculation.
//
// Finds the discount rate r such that NPV(r) = 0. Uses Newton-Raphson with
// a bisection fallback for cash-flow shapes Newton-Raphson can't converge on.

export interface IrrInput {
  /** Up-front cost (positive number). */
  initialInvestment: number;
  /** Cash flows for periods 1..N. */
  cashFlows: number[];
  /** Optional hurdle rate (%) used for the accept/reject decision. Default 10. */
  hurdleRatePct?: number;
}

export interface IrrResult {
  /** IRR as a percentage (e.g. 12.34 for 12.34%). */
  irrPct: number;
  decision: "accept" | "reject";
  iterations: number;
  hurdleRatePct: number;
  converged: boolean;
}

const MAX_ITERATIONS = 200;
const TOLERANCE = 1e-7;

export function calculateIrr(input: IrrInput): IrrResult {
  if (!Number.isFinite(input.initialInvestment) || input.initialInvestment < 0) {
    throw new Error("initialInvestment must be a finite non-negative number");
  }
  if (!Array.isArray(input.cashFlows) || input.cashFlows.length === 0) {
    throw new Error("cashFlows must be a non-empty array");
  }
  for (const cf of input.cashFlows) {
    if (!Number.isFinite(cf)) {
      throw new Error("every cashFlow entry must be a finite number");
    }
  }

  // Build the full series with period 0 = -initialInvestment.
  const flows = [-input.initialInvestment, ...input.cashFlows];
  // IRR requires at least one sign change in the series.
  const hasSignChange = flows.some((f) => f > 0) && flows.some((f) => f < 0);
  if (!hasSignChange) {
    throw new Error("cash flows must contain at least one sign change for IRR to exist");
  }

  const hurdle = input.hurdleRatePct ?? 10;
  const npv = (r: number) => flows.reduce((sum, cf, t) => sum + cf / Math.pow(1 + r, t), 0);
  const dNpv = (r: number) =>
    flows.reduce((sum, cf, t) => (t === 0 ? sum : sum - (t * cf) / Math.pow(1 + r, t + 1)), 0);

  // Newton-Raphson starting at 10%.
  let r = 0.1;
  let iterations = 0;
  let converged = false;
  for (; iterations < MAX_ITERATIONS; iterations++) {
    const f = npv(r);
    if (Math.abs(f) < TOLERANCE) {
      converged = true;
      break;
    }
    const df = dNpv(r);
    if (Math.abs(df) < 1e-12) break; // derivative collapses — fall through to bisection
    const next = r - f / df;
    if (!Number.isFinite(next) || next <= -1) break; // r <= -1 is non-physical
    if (Math.abs(next - r) < TOLERANCE) {
      r = next;
      converged = true;
      iterations++;
      break;
    }
    r = next;
  }

  // Bisection fallback if Newton-Raphson didn't converge.
  if (!converged) {
    let lo = -0.99;
    let hi = 10; // 1000% — IRR above this is implausible for SMB projects
    let fLo = npv(lo);
    let fHi = npv(hi);
    if (fLo * fHi > 0) {
      // No bracketed root in our range — return the best Newton-Raphson estimate.
      return {
        irrPct: round4(r * 100),
        decision: r * 100 >= hurdle ? "accept" : "reject",
        iterations,
        hurdleRatePct: hurdle,
        converged: false,
      };
    }
    for (; iterations < MAX_ITERATIONS; iterations++) {
      const mid = (lo + hi) / 2;
      const fMid = npv(mid);
      if (Math.abs(fMid) < TOLERANCE || (hi - lo) / 2 < TOLERANCE) {
        r = mid;
        converged = true;
        break;
      }
      if (fLo * fMid < 0) {
        hi = mid;
        fHi = fMid;
      } else {
        lo = mid;
        fLo = fMid;
      }
    }
  }

  const irrPct = round4(r * 100);
  return {
    irrPct,
    decision: irrPct >= hurdle ? "accept" : "reject",
    iterations,
    hurdleRatePct: hurdle,
    converged,
  };
}

function round4(n: number): number {
  return Math.round(n * 10000) / 10000;
}
