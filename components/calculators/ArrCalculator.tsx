"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatPercent } from "@/lib/regions";

export default function ArrCalculator() {
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

  const [mrr, setMrr] = useState(sp.get("mrr") ?? "50000");
  const [monthlyChurnPct, setChurn] = useState(sp.get("churn") ?? "2");
  const [growthRatePct, setGrowth] = useState(sp.get("growth") ?? "5");

  const result = useMemo(() => {
    const m = Number(mrr);
    const c = Number(monthlyChurnPct);
    const g = Number(growthRatePct);
    if (!Number.isFinite(m) || m < 0 || !Number.isFinite(c) || c < 0 || !Number.isFinite(g)) return null;
    const naiveArr = m * 12;
    const churnAdjusted = m * 12 * Math.pow(1 - c / 100, 12);
    const growthProjected = m * Math.pow(1 + g / 100, 12) * 12;
    return { naiveArr, churnAdjusted, growthProjected };
  }, [mrr, monthlyChurnPct, growthRatePct]);

  const tier =
    result === null
      ? "bad"
      : Number(growthRatePct) >= 5
        ? "good"
        : Number(growthRatePct) >= 0
          ? "caution"
          : "bad";

  const interpretation =
    result === null
      ? "Enter MRR, monthly churn rate, and growth rate."
      : "Naive ARR = MRR × 12. Churn-adjusted ARR projects forward 12 months at current churn. Growth-projected ARR assumes the current growth rate continues.";

  const copyText = result
    ? [
        `ARR — ${cfg.label}`,
        `MRR: ${formatCurrency(Number(mrr), region)}`,
        `Monthly churn: ${formatPercent(Number(monthlyChurnPct))}`,
        `Monthly growth: ${formatPercent(Number(growthRatePct))}`,
        `Naive ARR (MRR × 12): ${formatCurrency(result.naiveArr, region)}`,
        `Churn-adjusted: ${formatCurrency(result.churnAdjusted, region)}`,
        `Growth-projected: ${formatCurrency(result.growthProjected, region)}`,
      ].join("\n")
    : "";

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <RegionToggle region={region} onChange={setRegion} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Inputs</h2>
          <InputField label="Current MRR" value={mrr} onChange={setMrr} prefix={cfg.symbol} helper="This month's monthly recurring revenue" />
          <InputField label="Monthly churn rate" value={monthlyChurnPct} onChange={setChurn} suffix="%" helper="Used for the churn-adjusted projection" />
          <InputField label="Monthly growth rate" value={growthRatePct} onChange={setGrowth} suffix="%" helper="Net new MRR / starting MRR — used for the growth-projected variant" />
        </div>

        <div className="space-y-4">
          <ResultCard primary label="Naive ARR" value={result ? formatCurrency(result.naiveArr, region) : "—"} tier={tier} interpretation={interpretation} hint="MRR × 12 — the headline number on a SaaS deck" />
          <ResultCard label="Churn-adjusted ARR (12 mo forward)" value={result ? formatCurrency(result.churnAdjusted, region) : "—"} hint="Today's MRR compounded by 12 months of churn × 12" />
          <ResultCard label="Growth-projected ARR (12 mo forward)" value={result ? formatCurrency(result.growthProjected, region) : "—"} hint="Today's MRR compounded by 12 months of growth × 12" />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="ARR" />
    </div>
  );
}
