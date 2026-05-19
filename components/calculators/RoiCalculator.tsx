"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatPercent } from "@/lib/regions";
import { D, Decimal, pct, toN } from "@/lib/money";

export default function RoiCalculator() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  );
}

function Inner() {
  const sp = useSearchParams();
  const [region, setRegion] = useRegion();
  const cfg = REGIONS[region];

  const [investment, setInvestment] = useState(sp.get("investment") ?? "10000");
  const [netReturn, setNetReturn] = useState(sp.get("return") ?? "13500");
  const [periodMonths, setPeriodMonths] = useState(sp.get("months") ?? "18");

  const invD = D(investment);
  const retD = D(netReturn);
  const monthsD = D(periodMonths);

  const netProfitD = retD.minus(invD);
  const roiPctD = pct(netProfitD, invD);
  // (1 + roi/100) ^ (12/months) — 1, in percent. Decimal.pow supports
  // fractional exponents, so the annualised math runs in decimal too.
  const annualisedPctD =
    monthsD.gt(0) && invD.gt(0)
      ? new Decimal(1)
          .plus(roiPctD.div(100))
          .pow(new Decimal(12).div(monthsD))
          .minus(1)
          .mul(100)
      : null;

  const inv = toN(invD);
  const ret = toN(retD);
  const months = toN(monthsD);
  const netProfit = toN(netProfitD);
  const roiPct = toN(roiPctD);
  const annualisedPct = annualisedPctD === null ? null : toN(annualisedPctD);

  const tier = roiPct >= 20 ? "good" : roiPct >= 0 ? "caution" : "bad";

  const copyText = [
    `ROI — ${cfg.label}`,
    `Investment: ${formatCurrency(inv, region)}`,
    `Net Return: ${formatCurrency(ret, region)}`,
    `Net Profit: ${formatCurrency(netProfit, region)}`,
    `ROI: ${formatPercent(roiPct)}`,
    annualisedPct !== null ? `Annualised ROI: ${formatPercent(annualisedPct)}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div>
      <div className="mb-4">
        <RegionToggle region={region} onChange={setRegion} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Inputs
          </h2>
          <InputField
            label="Initial Investment"
            value={investment}
            onChange={setInvestment}
            prefix={cfg.symbol}
            helper="Total amount spent or invested upfront"
          />
          <InputField
            label="Net Return"
            value={netReturn}
            onChange={setNetReturn}
            prefix={cfg.symbol}
            helper="Total return or revenue generated from the investment"
          />
          <InputField
            label="Investment Period (months, optional)"
            value={periodMonths}
            onChange={setPeriodMonths}
            suffix="mo"
            helper="Enables annualised ROI for comparing different-length investments"
          />
        </div>

        <div className="space-y-4">
          <ResultCard
            primary
            label="ROI"
            value={formatPercent(roiPct)}
            tier={tier}
            interpretation={
              roiPct >= 20
                ? "Strong return — this investment paid off well."
                : roiPct >= 0
                  ? "Positive but modest — compare to alternatives."
                  : "Investment lost money. Avoid scaling this spend."
            }
            hint={`Net profit: ${formatCurrency(netProfit, region)}`}
          />
          {annualisedPct !== null && (
            <ResultCard
              label="Annualised ROI"
              value={formatPercent(annualisedPct)}
              hint="Equivalent yearly rate — use to compare investments of different durations"
            />
          )}
          <ResultCard
            label="Net Profit"
            value={formatCurrency(netProfit, region)}
            hint="Absolute profit or loss in cash terms"
          />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="ROI" />
    </div>
  );
}
