"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatPercent } from "@/lib/regions";

export default function RevenueGrowthCalculator() {
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

  const initialMode = sp.get("mode") === "month" ? "month" : "year";
  const [periodType, setPeriodType] = useState<"month" | "year">(initialMode);
  const [current, setCurrent] = useState(sp.get("current") ?? "250000");
  const [previous, setPrevious] = useState(sp.get("previous") ?? "180000");
  const [starting, setStarting] = useState(sp.get("start") ?? "100000");
  const [years, setYears] = useState(sp.get("years") ?? "4");

  const cur = parseFloat(current) || 0;
  const prev = parseFloat(previous) || 0;
  const start = parseFloat(starting) || 0;
  const yrs = parseFloat(years) || 0;

  const change = cur - prev;
  const growthPct = prev > 0 ? (change / prev) * 100 : 0;

  const cagrPct =
    start > 0 && yrs > 0 ? (Math.pow(cur / start, 1 / yrs) - 1) * 100 : null;

  const tier = growthPct >= 20 ? "good" : growthPct >= 5 ? "caution" : "bad";

  const periodLabel = periodType === "year" ? "YoY" : "MoM";

  const copyText = [
    `Revenue Growth — ${cfg.label}`,
    `${periodLabel} growth: ${formatPercent(growthPct)}`,
    `Revenue change: ${formatCurrency(change, region)}`,
    cagrPct !== null ? `CAGR over ${yrs} years: ${formatPercent(cagrPct)}` : null,
    `Current: ${formatCurrency(cur, region)}`,
    `Previous: ${formatCurrency(prev, region)}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <RegionToggle region={region} onChange={setRegion} />
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 text-sm">
          <button
            type="button"
            onClick={() => setPeriodType("month")}
            className={`rounded-md px-3 py-1.5 font-medium ${periodType === "month" ? "bg-brand-primary text-white" : "text-brand-dark hover:bg-brand-light"}`}
          >
            Monthly (MoM)
          </button>
          <button
            type="button"
            onClick={() => setPeriodType("year")}
            className={`rounded-md px-3 py-1.5 font-medium ${periodType === "year" ? "bg-brand-primary text-white" : "text-brand-dark hover:bg-brand-light"}`}
          >
            Annual (YoY)
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Period comparison
          </h2>
          <InputField label={`Current ${periodType} revenue`} value={current} onChange={setCurrent} prefix={cfg.symbol} />
          <InputField label={`Previous ${periodType} revenue`} value={previous} onChange={setPrevious} prefix={cfg.symbol} />
        </div>

        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            CAGR (multi-year)
          </h2>
          <InputField label="Starting revenue" value={starting} onChange={setStarting} prefix={cfg.symbol} helper="Revenue at the start of the period" />
          <InputField label="Number of years" value={years} onChange={setYears} suffix="yr" />
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <ResultCard
          primary
          label={`${periodLabel} Growth Rate`}
          value={formatPercent(growthPct)}
          tier={tier}
          interpretation={
            growthPct >= 20
              ? "Strong growth — outpacing most benchmarks."
              : growthPct >= 5
                ? "Healthy growth above inflation."
                : growthPct >= 0
                  ? "Slow growth — investigate plateauing causes."
                  : "Negative growth — revenue is declining."
          }
          hint={`Change: ${formatCurrency(change, region)}`}
        />
        {cagrPct !== null && (
          <ResultCard
            label={`CAGR (over ${yrs} years)`}
            value={formatPercent(cagrPct)}
            hint="Smooths year-to-year volatility into one annualised rate"
          />
        )}
      </div>

      <CalculatorActions copyText={copyText} label="growth" />
    </div>
  );
}
