"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatPercent } from "@/lib/regions";

export default function RoeCalculator() {
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

  const [netIncome, setNetIncome] = useState(sp.get("netIncome") ?? "60000");
  const [equity, setEquity] = useState(sp.get("equity") ?? "400000");

  const result = useMemo(() => {
    const ni = Number(netIncome);
    const eq = Number(equity);
    if (!Number.isFinite(ni) || !Number.isFinite(eq) || eq <= 0) return null;
    return { roePct: (ni / eq) * 100 };
  }, [netIncome, equity]);

  const tier =
    result === null
      ? "bad"
      : result.roePct >= 15
        ? "good"
        : result.roePct >= 8
          ? "caution"
          : "bad";

  const interpretation =
    result === null
      ? "Enter net income and shareholders' equity."
      : result.roePct < 0
        ? "Negative ROE — the business destroyed equity value in the period."
        : result.roePct >= 20
          ? "Strong — at or above premium-quality public-company benchmarks."
          : result.roePct >= 15
            ? "Healthy — comparable to long-run S&P 500 average."
            : result.roePct >= 8
              ? "Modest — beats risk-free rate but only marginally."
              : "Weak — equity might be more productively deployed elsewhere.";

  const copyText = result
    ? [
        `Return on Equity — ${cfg.label}`,
        `Net income: ${formatCurrency(Number(netIncome), region)}`,
        `Shareholders' equity: ${formatCurrency(Number(equity), region)}`,
        `ROE: ${formatPercent(result.roePct)}`,
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
          <InputField label="Net income (annual)" value={netIncome} onChange={setNetIncome} prefix={cfg.symbol} helper="After-tax profit for the year" />
          <InputField label="Shareholders' equity" value={equity} onChange={setEquity} prefix={cfg.symbol} helper="Total assets minus total liabilities — use average if equity changed materially during the period" />
        </div>

        <div className="space-y-4">
          <ResultCard primary label="Return on Equity (ROE)" value={result ? formatPercent(result.roePct) : "—"} tier={tier} interpretation={interpretation} hint="≥15% strong · 8–15% modest · <8% weak" />
          <ResultCard label="Health tier" value={result ? (result.roePct >= 15 ? "Strong" : result.roePct >= 8 ? "Modest" : "Weak") : "—"} hint="Compare against industry peers, not absolute" />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="ROE" />
    </div>
  );
}
