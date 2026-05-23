// Pure-function CAGR (Compound Annual Growth Rate) calculation.
//
// CAGR is the constant annual rate at which a start value would have grown
// to reach an end value over N periods. Smooths out volatility — useful for
// comparing investments or business metrics over different time horizons.

export interface CagrInput {
  startValue: number;
  endValue: number;
  /** Number of periods (typically years). */
  periods: number;
}

export interface CagrResult {
  cagrPct: number;
  totalGrowthPct: number;
  multiplier: number;
  /** Year-by-year projection from start using the computed CAGR. */
  breakdown: Array<{ period: number; value: number }>;
}

export function calculateCagr(input: CagrInput): CagrResult {
  if (!Number.isFinite(input.startValue) || input.startValue <= 0) {
    throw new Error("startValue must be a positive finite number");
  }
  if (!Number.isFinite(input.endValue) || input.endValue <= 0) {
    throw new Error("endValue must be a positive finite number");
  }
  if (!Number.isFinite(input.periods) || input.periods <= 0) {
    throw new Error("periods must be a positive finite number");
  }

  const multiplier = input.endValue / input.startValue;
  const cagr = Math.pow(multiplier, 1 / input.periods) - 1;
  const totalGrowth = multiplier - 1;

  const breakdown: Array<{ period: number; value: number }> = [
    { period: 0, value: round2(input.startValue) },
  ];
  for (let t = 1; t <= Math.ceil(input.periods); t++) {
    breakdown.push({
      period: t,
      value: round2(input.startValue * Math.pow(1 + cagr, t)),
    });
  }

  return {
    cagrPct: round4(cagr * 100),
    totalGrowthPct: round4(totalGrowth * 100),
    multiplier: round4(multiplier),
    breakdown,
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function round4(n: number): number {
  return Math.round(n * 10000) / 10000;
}
