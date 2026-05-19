import Decimal from "decimal.js";

// Decimal.js global config — 28 sig figs is the default; for currency we
// rarely need more than 2 decimal places of display precision, but we want
// the underlying arithmetic to carry enough precision that compounding
// operations (amortisation tables, DCF, multi-step tax waterfalls) don't
// accumulate float drift. 28 is overkill for this site and totally fine.
//
// ROUND_HALF_UP matches what most accountants and HMRC/IRS/SARS publications
// use for stated rates and tax amounts. The default (ROUND_HALF_EVEN /
// banker's rounding) is statistically purer but doesn't match the rounding
// most published rate tables and accounting software use, so adopting it
// silently would make our outputs disagree with users' expectations by 1¢
// on edge-case inputs.
Decimal.set({ rounding: Decimal.ROUND_HALF_UP });

/**
 * Parse a user-supplied string (or number) to a Decimal. Empty / NaN / null
 * inputs return Decimal(0), matching the existing parseFloat(x) || 0 pattern
 * used across the calculator components.
 */
export function D(value: string | number | null | undefined): Decimal {
  if (value === null || value === undefined || value === "") {
    return new Decimal(0);
  }
  try {
    const d = new Decimal(value);
    return d.isNaN() ? new Decimal(0) : d;
  } catch {
    return new Decimal(0);
  }
}

/**
 * Decimal → number at the formatting / interpretation boundary. The display
 * layer (formatCurrency, formatPercent, tier thresholds) still works in
 * native numbers; this is the conversion point.
 *
 * Returns 0 for non-finite values to match the existing fallback behaviour.
 */
export function toN(d: Decimal | number | null | undefined): number {
  if (d === null || d === undefined) return 0;
  const n = typeof d === "number" ? d : d.toNumber();
  return Number.isFinite(n) ? n : 0;
}

/**
 * Safe percentage helper: returns (numerator / denominator) * 100 as a
 * Decimal, or Decimal(0) when denominator is zero or negative. Most calc
 * lib files do `revenue > 0 ? (x / revenue) * 100 : 0` — this centralises it.
 */
export function pct(numerator: Decimal, denominator: Decimal): Decimal {
  if (denominator.lte(0)) return new Decimal(0);
  return numerator.div(denominator).mul(100);
}

/**
 * Re-export the Decimal class for callers that need direct access (e.g. to
 * use Decimal.pow() for amortisation interest stacking).
 */
export { Decimal };
