"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency } from "@/lib/regions";
import { D, toN } from "@/lib/money";

export default function InventoryTurnoverCalculator() {
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

  const [cogs, setCogs] = useState(sp.get("cogs") ?? "600000");
  const [beginningInventory, setBeginningInventory] = useState(sp.get("begin") ?? "120000");
  const [endingInventory, setEndingInventory] = useState(sp.get("end") ?? "100000");

  const cogsVal = toN(D(cogs));
  const begin = toN(D(beginningInventory));
  const end = toN(D(endingInventory));

  const avgInventory = (begin + end) / 2;
  const turnover = avgInventory > 0 ? cogsVal / avgInventory : 0;
  const daysInInventory = turnover > 0 ? 365 / turnover : 0;

  // Industry classification by turnover band
  let benchmark: string;
  let benchmarkRange: string;
  if (turnover >= 12) {
    benchmark = "Excellent — top-quartile retail or fast-moving FMCG";
    benchmarkRange = "Top-tier";
  } else if (turnover >= 6) {
    benchmark = "Healthy — typical retail or food-service performance";
    benchmarkRange = "Typical retail";
  } else if (turnover >= 3) {
    benchmark = "Moderate — manufacturing, B2B distribution, automotive";
    benchmarkRange = "B2B / manufacturing";
  } else if (turnover >= 1) {
    benchmark = "Slow — heavy machinery, specialty goods, or capital equipment";
    benchmarkRange = "Capital goods";
  } else {
    benchmark = "Very slow — possible obsolescence risk; inventory exceeds annual COGS";
    benchmarkRange = "At risk";
  }

  const tier: "good" | "caution" | "bad" =
    turnover >= 6 ? "good" : turnover >= 3 ? "caution" : "bad";

  const fmt = (v: number) => formatCurrency(v, region);

  const copyText = [
    `Inventory Turnover — ${cfg.label}`,
    `Annual COGS: ${fmt(cogsVal)}`,
    `Beginning Inventory: ${fmt(begin)}  •  Ending Inventory: ${fmt(end)}`,
    `Average Inventory: ${fmt(avgInventory)}`,
    ``,
    `Turnover Ratio: ${turnover.toFixed(2)}× per year`,
    `Days in Inventory: ${daysInInventory.toFixed(0)} days`,
    `Benchmark Band: ${benchmarkRange}`,
  ].join("\n");

  return (
    <div>
      <div className="mb-4">
        <RegionToggle region={region} onChange={setRegion} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Inputs</h2>
          <InputField label="Annual Cost of Goods Sold (COGS)" value={cogs} onChange={setCogs} prefix={cfg.symbol} helper="Total cost of products sold during the year — from P&amp;L" />
          <InputField label="Beginning Inventory" value={beginningInventory} onChange={setBeginningInventory} prefix={cfg.symbol} helper="Inventory value at start of period (balance sheet)" />
          <InputField label="Ending Inventory" value={endingInventory} onChange={setEndingInventory} prefix={cfg.symbol} helper="Inventory value at end of period" />
        </div>

        <div className="space-y-4">
          <ResultCard primary label="Inventory Turnover Ratio" value={turnover.toFixed(2) + "× / yr"} tier={tier} interpretation={benchmark} hint={`Average inventory: ${fmt(avgInventory)}`} />
          <ResultCard label="Days in Inventory" value={daysInInventory.toFixed(0) + " days"} hint="Average time inventory sits before being sold" />
          <ResultCard label="Industry Benchmark" value={benchmarkRange} hint="Retail 4-12, Manufacturing 5-10, Auto 8-12, Capital goods 1-3" />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="inventory-turnover" />
    </div>
  );
}
