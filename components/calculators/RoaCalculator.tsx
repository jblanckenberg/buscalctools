"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatPercent } from "@/lib/regions";

export default function RoaCalculator() {
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

  const [netIncome, setNetIncome] = useState(sp.get("netIncome") ?? "80000");
  const [assets, setAssets] = useState(sp.get("assets") ?? "1000000");

  const result = useMemo(() => {
    const ni = Number(netIncome);
    const a = Number(assets);
    if (!Number.isFinite(ni) || !Number.isFinite(a) || a <= 0) return null;
    return { roaPct: (ni / a) * 100 };
  }, [netIncome, assets]);

  const tier =
    result === null
      ? "bad"
      : result.roaPct >= 8
        ? "good"
        : result.roaPct >= 4
          ? "caution"
          : "bad";

  const interpretation =
    result === null
      ? "Enter net income and total assets."
      : result.roaPct < 0
        ? "Negative ROA — assets are destroying value."
        : result.roaPct >= 15
          ? "Exceptional — typical of asset-light software or services businesses."
          : result.roaPct >= 8
            ? "Strong — well above SMB averages."
            : result.roaPct >= 4
              ? "Modest — comparable to capital-intensive industries (manufacturing, transport)."
              : "Weak — assets aren't earning their keep.";

  const copyText = result
    ? [
        `Return on Assets — ${cfg.label}`,
        `Net income: ${formatCurrency(Number(netIncome), region)}`,
        `Total assets: ${formatCurrency(Number(assets), region)}`,
        `ROA: ${formatPercent(result.roaPct)}`,
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
          <InputField label="Total assets" value={assets} onChange={setAssets} prefix={cfg.symbol} helper="Everything the business owns — cash, AR, inventory, PP&E, intangibles" />
        </div>

        <div className="space-y-4">
          <ResultCard primary label="Return on Assets (ROA)" value={result ? formatPercent(result.roaPct) : "—"} tier={tier} interpretation={interpretation} hint="≥8% strong · 4–8% modest · <4% weak" />
          <ResultCard label="Health tier" value={result ? (result.roaPct >= 8 ? "Strong" : result.roaPct >= 4 ? "Modest" : "Weak") : "—"} hint="Asset-light businesses naturally score higher" />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="ROA" />
    </div>
  );
}
