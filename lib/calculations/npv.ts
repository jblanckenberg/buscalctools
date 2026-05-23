// Pure-function NPV (Net Present Value) calculation.
//
// Kept separate from the React component so the math can be unit-tested in
// isolation and reused by other calcs (the IRR solver, for instance, finds
// the rate that makes NPV = 0).
//
// The formula is the textbook one:
//   NPV = -initial + sum( cashFlow[t] / (1 + r)^t ) for t = 1..N
// where r is the discount rate as a decimal.

export interface NpvInput {
  /** Up-front cost. Always a non-negative number — negative future flows go in cashFlows. */
  initialInvestment: number;
  /** Cash flows for periods 1..N. Each entry is the flow at the END of that period. */
  cashFlows: number[];
  /** Discount rate as a percentage (e.g. 10 for 10%). */
  discountRatePct: number;
}

export interface NpvBreakdownRow {
  period: number;
  cashFlow: number;
  presentValue: number;
  cumulativeNpv: number;
}

export interface NpvResult {
  npv: number;
  decision: "accept" | "reject";
  breakdown: NpvBreakdownRow[];
}

export function calculateNpv(input: NpvInput): NpvResult {
  if (!Number.isFinite(input.initialInvestment) || input.initialInvestment < 0) {
    throw new Error("initialInvestment must be a finite non-negative number");
  }
  if (!Number.isFinite(input.discountRatePct)) {
    throw new Error("discountRatePct must be a finite number");
  }
  if (!Array.isArray(input.cashFlows)) {
    throw new Error("cashFlows must be an array of numbers");
  }
  for (const cf of input.cashFlows) {
    if (!Number.isFinite(cf)) {
      throw new Error("every cashFlow entry must be a finite number");
    }
  }

  const r = input.discountRatePct / 100;
  let cumulative = -input.initialInvestment;
  const breakdown: NpvBreakdownRow[] = [];
  for (let i = 0; i < input.cashFlows.length; i++) {
    const period = i + 1;
    const cashFlow = input.cashFlows[i];
    const presentValue = cashFlow / Math.pow(1 + r, period);
    cumulative += presentValue;
    breakdown.push({
      period,
      cashFlow,
      presentValue: round2(presentValue),
      cumulativeNpv: round2(cumulative),
    });
  }

  const npv = round2(cumulative);
  return {
    npv,
    decision: npv >= 0 ? "accept" : "reject",
    breakdown,
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
