"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatNumber } from "@/lib/regions";
import { D, toN } from "@/lib/money";

// Lazy-load Recharts chart. ~50KB chunk that only this calc + cash-flow use.
// SSR off so the chart only mounts client-side after hydration; static export
// otherwise tries to render Recharts at build time and bloats every page.
const BreakEvenChart = dynamic(
  () => import("@/components/calculators/BreakEvenChart"),
  {
    ssr: false,
    loading: () => (
      <div className="mt-6 h-72 w-full animate-pulse rounded-xl bg-brand-light" />
    ),
  }
);

export default function BreakEvenCalculator() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  );
}

function Inner() {
  const params = useSearchParams();
  const [region, setRegion] = useRegion();
  const cfg = REGIONS[region];

  const [fixedCosts, setFixedCosts] = useState(params.get("fixed") ?? "5000");
  const [variableCost, setVariableCost] = useState(params.get("variable") ?? "10");
  const [sellingPrice, setSellingPrice] = useState(params.get("price") ?? "25");
  const [targetProfit, setTargetProfit] = useState(params.get("target") ?? "");

  const fcD = D(fixedCosts);
  const vcD = D(variableCost);
  const spD = D(sellingPrice);
  const tpD = targetProfit === "" ? null : D(targetProfit);

  const contributionD = spD.minus(vcD);
  const breakEvenUnits = contributionD.gt(0)
    ? Math.ceil(toN(fcD.div(contributionD)))
    : 0;
  const breakEvenRevenue = toN(spD.mul(breakEvenUnits));
  const targetUnits =
    tpD !== null && contributionD.gt(0)
      ? Math.ceil(toN(fcD.plus(tpD).div(contributionD)))
      : null;

  const fc = toN(fcD);
  const vc = toN(vcD);
  const sp = toN(spD);
  const tp = tpD === null ? null : toN(tpD);
  const contribution = toN(contributionD);

  const chartData = useMemo(() => {
    const maxUnits = Math.max(breakEvenUnits * 2, 10);
    const step = Math.max(1, Math.floor(maxUnits / 12));
    const points = [];
    for (let u = 0; u <= maxUnits; u += step) {
      points.push({
        units: u,
        revenue: u * sp,
        totalCost: fc + u * vc,
      });
    }
    return points;
  }, [breakEvenUnits, sp, fc, vc]);

  const tier = contribution <= 0 ? "bad" : breakEvenUnits > 1000 ? "caution" : "good";

  const copyText = [
    `Break-Even — ${cfg.label}`,
    `Fixed Costs: ${formatCurrency(fc, region)}`,
    `Variable Cost / Unit: ${formatCurrency(vc, region)}`,
    `Selling Price / Unit: ${formatCurrency(sp, region)}`,
    `Contribution Margin: ${formatCurrency(contribution, region)}`,
    `Break-Even Units: ${formatNumber(breakEvenUnits)}`,
    `Break-Even Revenue: ${formatCurrency(breakEvenRevenue, region)}`,
    targetUnits !== null ? `Units for Target Profit: ${formatNumber(targetUnits)}` : null,
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
            label="Fixed Costs (monthly)"
            value={fixedCosts}
            onChange={setFixedCosts}
            prefix={cfg.symbol}
            helper="Rent, salaries, insurance — costs that don't change with output"
          />
          <InputField
            label="Variable Cost Per Unit"
            value={variableCost}
            onChange={setVariableCost}
            prefix={cfg.symbol}
            helper="Materials, packaging, commission — costs per unit sold"
          />
          <InputField
            label="Selling Price Per Unit"
            value={sellingPrice}
            onChange={setSellingPrice}
            prefix={cfg.symbol}
          />
          <InputField
            label="Target Profit (optional)"
            value={targetProfit}
            onChange={setTargetProfit}
            prefix={cfg.symbol}
            helper="Extends to: units needed to hit a profit target"
          />
        </div>

        <div className="space-y-4">
          <ResultCard
            primary
            label="Break-Even Units"
            value={contribution > 0 ? formatNumber(breakEvenUnits) : "Not viable"}
            tier={tier}
            interpretation={
              contribution <= 0
                ? "Selling price is below variable cost — every sale loses money. Raise price or reduce variable cost."
                : `You need to sell ${formatNumber(breakEvenUnits)} units to cover all costs.`
            }
            hint={`Contribution margin per unit: ${formatCurrency(contribution, region)}`}
          />
          <ResultCard
            label="Break-Even Revenue"
            value={formatCurrency(breakEvenRevenue, region)}
            hint="Total revenue needed to cover fixed + variable costs"
          />
          {targetUnits !== null && (
            <ResultCard
              label="Units for Target Profit"
              value={formatNumber(targetUnits)}
              hint={`Sell this many units to clear ${formatCurrency(tp ?? 0, region)} in profit`}
            />
          )}
        </div>
      </div>

      <BreakEvenChart
        data={chartData}
        breakEvenUnits={breakEvenUnits}
        currencySymbol={cfg.symbol}
      />

      <CalculatorActions copyText={copyText} label="break-even" />
    </div>
  );
}
