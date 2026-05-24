"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency } from "@/lib/regions";

export default function DebtToEquityCalculator() {
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

  const [debt, setDebt] = useState(sp.get("debt") ?? "100000");
  const [equity, setEquity] = useState(sp.get("equity") ?? "150000");

  const result = useMemo(() => {
    const d = Number(debt);
    const e = Number(equity);
    if (!Number.isFinite(d) || d < 0 || !Number.isFinite(e) || e <= 0) return null;
    return { ratio: d / e, totalCapital: d + e, debtPct: (d / (d + e)) * 100 };
  }, [debt, equity]);

  const tier =
    result === null
      ? "bad"
      : result.ratio <= 1
        ? "good"
        : result.ratio <= 2
          ? "caution"
          : "bad";

  const interpretation =
    result === null
      ? "Enter total debt and total shareholders' equity."
      : result.ratio <= 0.5
        ? "Conservative leverage — low financial risk, but may be under-using cheap debt to amplify returns."
        : result.ratio <= 1
          ? "Healthy leverage — moderate debt level, balanced capital structure."
          : result.ratio <= 2
            ? "Elevated leverage — manageable but watch interest-coverage and debt-service ratios closely."
            : "High leverage — concentrated risk; vulnerable to rate rises or revenue dips.";

  const copyText = result
    ? [
        `Debt-to-Equity — ${cfg.label}`,
        `Total debt: ${formatCurrency(Number(debt), region)}`,
        `Total equity: ${formatCurrency(Number(equity), region)}`,
        `D/E ratio: ${result.ratio.toFixed(2)}`,
        `Debt % of capital: ${result.debtPct.toFixed(1)}%`,
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
          <InputField label="Total debt" value={debt} onChange={setDebt} prefix={cfg.symbol} helper="All interest-bearing debt: bank loans, bonds, lines of credit, lease obligations" />
          <InputField label="Total shareholders' equity" value={equity} onChange={setEquity} prefix={cfg.symbol} helper="Total assets minus total liabilities — the residual owner's claim" />
        </div>

        <div className="space-y-4">
          <ResultCard primary label="Debt-to-Equity Ratio" value={result ? result.ratio.toFixed(2) : "—"} tier={tier} interpretation={interpretation} hint="≤1.0 healthy · 1.0–2.0 caution · >2.0 high" />
          <ResultCard label="Debt as % of capital" value={result ? `${result.debtPct.toFixed(1)}%` : "—"} hint={`Total capital: ${result ? formatCurrency(result.totalCapital, region) : "—"}`} />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="D/E ratio" />
    </div>
  );
}
