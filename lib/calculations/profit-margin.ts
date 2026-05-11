export type ProfitMarginInput = {
  revenue: number;
  cogs: number;
  opEx?: number;
  taxRatePct?: number;
};

export type ProfitMarginResult = {
  grossProfit: number;
  grossMarginPct: number;
  operatingProfit: number | null;
  operatingMarginPct: number | null;
  ebt: number | null;
  taxAmount: number | null;
  netProfit: number | null;
  netMarginPct: number | null;
};

export function calcProfitMargin({
  revenue,
  cogs,
  opEx,
  taxRatePct,
}: ProfitMarginInput): ProfitMarginResult {
  const grossProfit = revenue - cogs;
  const grossMarginPct = revenue > 0 ? (grossProfit / revenue) * 100 : 0;

  let operatingProfit: number | null = null;
  let operatingMarginPct: number | null = null;
  if (typeof opEx === "number" && opEx >= 0) {
    operatingProfit = grossProfit - opEx;
    operatingMarginPct = revenue > 0 ? (operatingProfit / revenue) * 100 : 0;
  }

  let ebt: number | null = null;
  let taxAmount: number | null = null;
  let netProfit: number | null = null;
  let netMarginPct: number | null = null;
  if (typeof taxRatePct === "number" && taxRatePct >= 0) {
    ebt = operatingProfit ?? grossProfit;
    // Tax is only applied on positive earnings
    taxAmount = ebt > 0 ? ebt * (taxRatePct / 100) : 0;
    netProfit = ebt - taxAmount;
    netMarginPct = revenue > 0 ? (netProfit / revenue) * 100 : 0;
  }

  return {
    grossProfit,
    grossMarginPct,
    operatingProfit,
    operatingMarginPct,
    ebt,
    taxAmount,
    netProfit,
    netMarginPct,
  };
}

export function marginTier(marginPct: number): "good" | "caution" | "bad" {
  if (marginPct >= 40) return "good";
  if (marginPct >= 20) return "caution";
  return "bad";
}

export function operatingMarginTier(
  marginPct: number
): "good" | "caution" | "bad" {
  if (marginPct >= 15) return "good";
  if (marginPct >= 5) return "caution";
  return "bad";
}
