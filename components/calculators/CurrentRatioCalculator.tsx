"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency } from "@/lib/regions";

export default function CurrentRatioCalculator() {
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

  const [assets, setAssets] = useState(sp.get("assets") ?? "150000");
  const [liabilities, setLiabilities] = useState(sp.get("liabilities") ?? "75000");

  const result = useMemo(() => {
    const a = Number(assets);
    const l = Number(liabilities);
    if (!Number.isFinite(a) || a < 0 || !Number.isFinite(l) || l <= 0) return null;
    return { ratio: a / l };
  }, [assets, liabilities]);

  const tier =
    result === null
      ? "bad"
      : result.ratio >= 1.5
        ? "good"
        : result.ratio >= 1
          ? "caution"
          : "bad";

  const interpretation =
    result === null
      ? "Enter current assets and current liabilities."
      : result.ratio >= 3
        ? "Very strong — possibly under-utilising working capital; consider whether idle assets could be deployed."
        : result.ratio >= 1.5
          ? "Healthy — comfortably covers short-term obligations."
          : result.ratio >= 1
            ? "Caution — barely covers obligations; one bad month could squeeze liquidity."
            : "Poor — short-term obligations exceed short-term assets.";

  const copyText = result
    ? [
        `Current Ratio — ${cfg.label}`,
        `Current assets: ${formatCurrency(Number(assets), region)}`,
        `Current liabilities: ${formatCurrency(Number(liabilities), region)}`,
        `Current ratio: ${result.ratio.toFixed(2)}`,
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
          <InputField label="Current assets" value={assets} onChange={setAssets} prefix={cfg.symbol} helper="Cash, receivables, inventory, prepaid expenses — all convertible to cash within 12 months" />
          <InputField label="Current liabilities" value={liabilities} onChange={setLiabilities} prefix={cfg.symbol} helper="All obligations due within 12 months" />
        </div>

        <div className="space-y-4">
          <ResultCard primary label="Current Ratio" value={result ? result.ratio.toFixed(2) : "—"} tier={tier} interpretation={interpretation} hint="≥1.5 healthy · 1.0–1.5 caution · <1.0 poor" />
          <ResultCard label="Working capital" value={result ? formatCurrency(Number(assets) - Number(liabilities), region) : "—"} hint="Current assets − current liabilities" />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="current ratio" />
    </div>
  );
}
