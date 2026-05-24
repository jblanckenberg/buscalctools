"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatPercent } from "@/lib/regions";

export default function GrossProfitCalculator() {
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

  const [revenue, setRevenue] = useState(sp.get("revenue") ?? "100000");
  const [cogs, setCogs] = useState(sp.get("cogs") ?? "60000");

  const result = useMemo(() => {
    const revenueNum = Number(revenue);
    const cogsNum = Number(cogs);
    if (!Number.isFinite(revenueNum) || revenueNum <= 0 || !Number.isFinite(cogsNum) || cogsNum < 0) {
      return null;
    }
    const grossProfit = revenueNum - cogsNum;
    const grossMarginPct = (grossProfit / revenueNum) * 100;
    return { grossProfit, grossMarginPct };
  }, [revenue, cogs]);

  const tier =
    result === null
      ? "bad"
      : result.grossMarginPct >= 40
        ? "good"
        : result.grossMarginPct >= 20
          ? "caution"
          : "bad";

  const copyText = result
    ? [
        `Gross Profit — ${cfg.label}`,
        `Revenue: ${formatCurrency(Number(revenue), region)}`,
        `COGS: ${formatCurrency(Number(cogs), region)}`,
        `Gross Profit: ${formatCurrency(result.grossProfit, region)}`,
        `Gross Margin: ${formatPercent(result.grossMarginPct)}`,
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
          <InputField label="Revenue" value={revenue} onChange={setRevenue} prefix={cfg.symbol} helper="Total sales for the period" />
          <InputField label="Cost of Goods Sold (COGS)" value={cogs} onChange={setCogs} prefix={cfg.symbol} helper="Direct cost of producing what you sold — materials, direct labour, inbound freight" />
        </div>

        <div className="space-y-4">
          <ResultCard
            primary
            label="Gross Profit"
            value={result ? formatCurrency(result.grossProfit, region) : "—"}
            tier={tier}
            interpretation={
              result === null
                ? "Enter valid positive numbers."
                : result.grossMarginPct >= 40
                  ? "Strong gross margin — comparable to software, premium retail, or specialised services."
                  : result.grossMarginPct >= 20
                    ? "Workable gross margin — typical for general retail and most physical-product businesses."
                    : "Thin gross margin — common in commodity wholesale; leaves little room for operating costs."
            }
            hint={result ? `${formatPercent(result.grossMarginPct)} gross margin` : undefined}
          />
          <ResultCard label="Gross Margin" value={result ? formatPercent(result.grossMarginPct) : "—"} hint="Gross profit as a % of revenue" />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="gross profit" />
    </div>
  );
}
