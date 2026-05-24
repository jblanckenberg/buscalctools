"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatPercent } from "@/lib/regions";

export default function MrrCalculator() {
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

  const [starting, setStarting] = useState(sp.get("starting") ?? "100000");
  const [newMrr, setNewMrr] = useState(sp.get("new") ?? "12000");
  const [expansion, setExpansion] = useState(sp.get("expansion") ?? "4000");
  const [contraction, setContraction] = useState(sp.get("contraction") ?? "2000");
  const [churn, setChurn] = useState(sp.get("churn") ?? "3000");

  const result = useMemo(() => {
    const nums = [starting, newMrr, expansion, contraction, churn].map(Number);
    if (!nums.every(Number.isFinite) || nums.some((n) => n < 0)) return null;
    const [s, n, e, c, ch] = nums;
    const ending = s + n + e - c - ch;
    const netNew = n + e - c - ch;
    const growthRatePct = s > 0 ? (netNew / s) * 100 : 0;
    const annualisedArr = ending * 12;
    return { ending, netNew, growthRatePct, annualisedArr };
  }, [starting, newMrr, expansion, contraction, churn]);

  const tier =
    result === null
      ? "bad"
      : result.growthRatePct >= 5
        ? "good"
        : result.growthRatePct >= 0
          ? "caution"
          : "bad";

  const interpretation =
    result === null
      ? "Enter starting MRR and each movement (new/expansion/contraction/churn)."
      : result.growthRatePct >= 10
        ? "Hypergrowth — sustaining this pace doubles MRR in ~7 months."
        : result.growthRatePct >= 5
          ? "Strong — comparable to top-quartile SaaS monthly growth."
          : result.growthRatePct >= 0
            ? "Modest — positive but below scale-up thresholds."
            : "Declining MRR — churn + contraction exceed new + expansion.";

  const copyText = result
    ? [
        `MRR Movement — ${cfg.label}`,
        `Starting MRR: ${formatCurrency(Number(starting), region)}`,
        `+ New: ${formatCurrency(Number(newMrr), region)}`,
        `+ Expansion: ${formatCurrency(Number(expansion), region)}`,
        `− Contraction: ${formatCurrency(Number(contraction), region)}`,
        `− Churn: ${formatCurrency(Number(churn), region)}`,
        `Ending MRR: ${formatCurrency(result.ending, region)}`,
        `Net New MRR: ${formatCurrency(result.netNew, region)}`,
        `Growth Rate: ${formatPercent(result.growthRatePct)}`,
      ].join("\n")
    : "";

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <RegionToggle region={region} onChange={setRegion} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Inputs (this month)</h2>
          <InputField label="Starting MRR" value={starting} onChange={setStarting} prefix={cfg.symbol} />
          <InputField label="+ New MRR" value={newMrr} onChange={setNewMrr} prefix={cfg.symbol} helper="From newly-acquired customers" />
          <InputField label="+ Expansion MRR" value={expansion} onChange={setExpansion} prefix={cfg.symbol} helper="Upgrades / add-ons from existing customers" />
          <InputField label="− Contraction MRR" value={contraction} onChange={setContraction} prefix={cfg.symbol} helper="Downgrades from existing customers" />
          <InputField label="− Churn MRR" value={churn} onChange={setChurn} prefix={cfg.symbol} helper="MRR lost from cancelled customers" />
        </div>

        <div className="space-y-4">
          <ResultCard primary label="Ending MRR" value={result ? formatCurrency(result.ending, region) : "—"} tier={tier} interpretation={interpretation} hint={result ? `${formatPercent(result.growthRatePct)} m/m` : undefined} />
          <ResultCard label="Net New MRR" value={result ? formatCurrency(result.netNew, region) : "—"} hint="(New + Expansion) − (Contraction + Churn)" />
          <ResultCard label="Implied ARR" value={result ? formatCurrency(result.annualisedArr, region) : "—"} hint="Ending MRR × 12" />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="MRR" />
    </div>
  );
}
