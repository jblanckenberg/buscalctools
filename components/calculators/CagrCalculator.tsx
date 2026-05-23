"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatPercent } from "@/lib/regions";
import { calculateCagr } from "@/lib/calculations/cagr";

export default function CagrCalculator() {
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

  const [start, setStart] = useState(sp.get("start") ?? "10000");
  const [end, setEnd] = useState(sp.get("end") ?? "30000");
  const [periods, setPeriods] = useState(sp.get("periods") ?? "10");

  const result = useMemo(() => {
    const startNum = Number(start);
    const endNum = Number(end);
    const periodsNum = Number(periods);
    if (
      !Number.isFinite(startNum) ||
      startNum <= 0 ||
      !Number.isFinite(endNum) ||
      endNum <= 0 ||
      !Number.isFinite(periodsNum) ||
      periodsNum <= 0
    ) {
      return null;
    }
    try {
      return calculateCagr({ startValue: startNum, endValue: endNum, periods: periodsNum });
    } catch {
      return null;
    }
  }, [start, end, periods]);

  const tier =
    result === null
      ? "bad"
      : result.cagrPct >= 10
        ? "good"
        : result.cagrPct >= 0
          ? "caution"
          : "bad";

  const copyText = result
    ? [
        `CAGR — ${cfg.label}`,
        `Start: ${formatCurrency(Number(start), region)}`,
        `End: ${formatCurrency(Number(end), region)}`,
        `Periods: ${periods}`,
        `CAGR: ${formatPercent(result.cagrPct)}`,
        `Total growth: ${formatPercent(result.totalGrowthPct)}`,
        `Multiplier: ${result.multiplier.toFixed(2)}x`,
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
          <InputField
            label="Start value"
            value={start}
            onChange={setStart}
            prefix={cfg.symbol}
            helper="Beginning value of the investment or metric"
          />
          <InputField
            label="End value"
            value={end}
            onChange={setEnd}
            prefix={cfg.symbol}
            helper="Final value after the growth period"
          />
          <InputField
            label="Number of periods"
            value={periods}
            onChange={setPeriods}
            suffix="yrs"
            helper="Typically years; can be any consistent unit"
          />
        </div>

        <div className="space-y-4">
          <ResultCard
            primary
            label="Compound Annual Growth Rate"
            value={result ? formatPercent(result.cagrPct) : "—"}
            tier={tier}
            interpretation={
              result === null
                ? "Enter valid positive numbers to compute CAGR."
                : result.cagrPct >= 10
                  ? "Strong compound growth — comparable to long-run equity returns."
                  : result.cagrPct >= 0
                    ? "Modest compound growth — below long-run inflation in many cases."
                    : "Negative CAGR — the value declined on a compound-annual basis."
            }
            hint={result ? `${result.multiplier.toFixed(2)}× total over ${periods} period${Number(periods) === 1 ? "" : "s"}` : undefined}
          />
          <ResultCard
            label="Total growth"
            value={result ? formatPercent(result.totalGrowthPct) : "—"}
            hint="Cumulative — not annualised"
          />
        </div>
      </div>

      {result && result.breakdown.length > 1 && (
        <div className="mt-6 overflow-x-auto">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Year-by-year projection at the computed CAGR
          </h2>
          <table className="mt-2 min-w-full text-sm">
            <thead className="text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="py-2 pr-4">Year</th>
                <th className="py-2">Projected value</th>
              </tr>
            </thead>
            <tbody data-testid="cagr-breakdown">
              {result.breakdown.map((row) => (
                <tr key={row.period} className="border-t border-gray-200">
                  <td className="py-2 pr-4 font-medium">{row.period}</td>
                  <td className="py-2">{formatCurrency(row.value, region)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <CalculatorActions copyText={copyText} label="CAGR" />
    </div>
  );
}
