"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency } from "@/lib/regions";
import { D, toN } from "@/lib/money";

export default function WorkingCapitalCalculator() {
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

  const [currentAssets, setCurrentAssets] = useState(sp.get("ca") ?? "150000");
  const [currentLiabilities, setCurrentLiabilities] = useState(
    sp.get("cl") ?? "80000"
  );

  const caD = D(currentAssets);
  const clD = D(currentLiabilities);

  const wcD = caD.minus(clD);
  const ratioD = clD.gt(0) ? caD.div(clD) : D(0);

  const wc = toN(wcD);
  const ratio = toN(ratioD);
  const ca = toN(caD);
  const cl = toN(clD);

  // Banker's benchmark per most lending standards. Below 1 = cannot meet
  // short-term obligations. 1-1.5 = stressed but solvent. 1.5+ = healthy.
  const tier: "good" | "caution" | "bad" =
    ratio < 1 ? "bad" : ratio < 1.5 ? "caution" : "good";

  const bankReady = ratio >= 1.5;
  const interpretation =
    ratio < 1
      ? "Current liabilities exceed current assets — short-term solvency is at risk. Most lenders treat this as a red flag."
      : ratio < 1.5
        ? "Solvent but tight — limited cushion if a major receivable slows or an unexpected expense hits."
        : ratio < 3
          ? "Healthy working capital position. Most banks consider this lendable."
          : "Very strong — but a ratio well above 3 can indicate idle cash or excess inventory that could earn a return elsewhere.";

  const copyText = [
    `Working Capital — ${cfg.label}`,
    `Current Assets: ${formatCurrency(ca, region)}`,
    `Current Liabilities: ${formatCurrency(cl, region)}`,
    `Working Capital: ${formatCurrency(wc, region)}`,
    `Current Ratio: ${ratio.toFixed(2)}x`,
    `Bank-readiness: ${bankReady ? "Healthy" : "Improve before applying"}`,
  ].join("\n");

  return (
    <div>
      <div className="mb-4">
        <RegionToggle region={region} onChange={setRegion} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Inputs
          </h2>
          <InputField
            label="Current Assets"
            value={currentAssets}
            onChange={setCurrentAssets}
            prefix={cfg.symbol}
            helper="Cash, accounts receivable, inventory, prepaid expenses — anything you'll convert to cash within 12 months"
          />
          <InputField
            label="Current Liabilities"
            value={currentLiabilities}
            onChange={setCurrentLiabilities}
            prefix={cfg.symbol}
            helper="Accounts payable, short-term debt, accrued expenses, taxes due within 12 months"
          />
        </div>

        <div className="space-y-4">
          <ResultCard
            primary
            label="Current Ratio"
            value={cl > 0 ? `${ratio.toFixed(2)}x` : "Not viable"}
            tier={tier}
            interpretation={interpretation}
            hint="Current assets divided by current liabilities"
          />
          <ResultCard
            label="Working Capital"
            value={formatCurrency(wc, region)}
            hint="Current assets minus current liabilities (the absolute buffer in cash terms)"
          />
          <ResultCard
            label="Bank-Readiness"
            value={bankReady ? "Healthy" : "Below threshold"}
            hint="Most banks require a current ratio of at least 1.5 before approving working-capital lines"
          />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="working-capital" />
    </div>
  );
}
