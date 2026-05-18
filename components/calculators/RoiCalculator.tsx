"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatPercent } from "@/lib/regions";

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

  const inv = parseFloat(investment) || 0;
  const ret = parseFloat(netReturn) || 0;
  const months = parseFloat(periodMonths) || 0;

  const netProfit = ret - inv;
  const roiPct = inv > 0 ? (netProfit / inv) * 100 : 0;
  const annualisedPct =
    months > 0 && inv > 0
      ? (Math.pow(1 + roiPct / 100, 12 / months) - 1) * 100
      : null;

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
