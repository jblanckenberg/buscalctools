import { D, pct, toN, Decimal } from "@/lib/money";

export type ProfitMarginInput = {
  revenue: number | string;
  cogs: number | string;
  opEx?: number | string;
  taxRatePct?: number | string;
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
  const rev = D(revenue);
  const cost = D(cogs);
  const grossProfit = rev.minus(cost);
  const grossMarginPct = pct(grossProfit, rev);

  let operatingProfit: Decimal | null = null;
  let operatingMarginPct: Decimal | null = null;
  const opExDefined =
    opEx !== undefined && opEx !== null && opEx !== "" && D(opEx).gte(0);
  if (opExDefined) {
    operatingProfit = grossProfit.minus(D(opEx));
    operatingMarginPct = pct(operatingProfit, rev);
  }

  let ebt: Decimal | null = null;
  let taxAmount: Decimal | null = null;
  let netProfit: Decimal | null = null;
  let netMarginPct: Decimal | null = null;
  const taxDefined =
    taxRatePct !== undefined &&
    taxRatePct !== null &&
    taxRatePct !== "" &&
    D(taxRatePct).gte(0);
  if (taxDefined) {
    ebt = operatingProfit ?? grossProfit;
    taxAmount = ebt.gt(0) ? ebt.mul(D(taxRatePct).div(100)) : new Decimal(0);
    netProfit = ebt.minus(taxAmount);
    netMarginPct = pct(netProfit, rev);
  }

  return {
    grossProfit: toN(grossProfit),
    grossMarginPct: toN(grossMarginPct),
    operatingProfit: operatingProfit === null ? null : toN(operatingProfit),
    operatingMarginPct:
      operatingMarginPct === null ? null : toN(operatingMarginPct),
    ebt: ebt === null ? null : toN(ebt),
    taxAmount: taxAmount === null ? null : toN(taxAmount),
    netProfit: netProfit === null ? null : toN(netProfit),
    netMarginPct: netMarginPct === null ? null : toN(netMarginPct),
  };
}

export function marginTier(marginPct: number): "good" | "caution" | "bad" {
  if (marginPct >= 40) return "good";
  if (marginPct >= 20) return "caution";
  return "bad";
}

export function operatingMarginTier(
  marginPct: number,
): "good" | "caution" | "bad" {
  if (marginPct >= 15) return "good";
  if (marginPct >= 5) return "caution";
  return "bad";
}
