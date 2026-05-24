"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency } from "@/lib/regions";

export default function QuickRatioCalculator() {
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

  const [cash, setCash] = useState(sp.get("cash") ?? "50000");
  const [ar, setAr] = useState(sp.get("ar") ?? "25000");
  const [securities, setSecurities] = useState(sp.get("securities") ?? "10000");
  const [liabilities, setLiabilities] = useState(sp.get("liabilities") ?? "60000");

  const result = useMemo(() => {
    const cashN = Number(cash);
    const arN = Number(ar);
    const secN = Number(securities);
    const liabN = Number(liabilities);
    if (![cashN, arN, secN, liabN].every(Number.isFinite) || liabN <= 0 || cashN < 0 || arN < 0 || secN < 0) {
      return null;
    }
    const numerator = cashN + arN + secN;
    const ratio = numerator / liabN;
    return { numerator, ratio };
  }, [cash, ar, securities, liabilities]);

  const tier =
    result === null
      ? "bad"
      : result.ratio >= 1
        ? "good"
        : result.ratio >= 0.5
          ? "caution"
          : "bad";

  const interpretation =
    result === null
      ? "Enter cash, receivables, marketable securities, and current liabilities."
      : result.ratio >= 2
        ? "Very strong — well above the 1.0 threshold; consider whether idle cash could be deployed."
        : result.ratio >= 1
          ? "Healthy — liquid assets exceed short-term obligations."
          : result.ratio >= 0.5
            ? "Caution — short-term obligations larger than truly liquid assets."
            : "Poor — material risk of a short-term liquidity squeeze.";

  const copyText = result
    ? [
        `Quick Ratio — ${cfg.label}`,
        `Cash: ${formatCurrency(Number(cash), region)}`,
        `Accounts receivable: ${formatCurrency(Number(ar), region)}`,
        `Marketable securities: ${formatCurrency(Number(securities), region)}`,
        `Current liabilities: ${formatCurrency(Number(liabilities), region)}`,
        `Quick ratio: ${result.ratio.toFixed(2)}`,
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
          <InputField label="Cash & cash equivalents" value={cash} onChange={setCash} prefix={cfg.symbol} />
          <InputField label="Accounts receivable" value={ar} onChange={setAr} prefix={cfg.symbol} />
          <InputField label="Marketable securities" value={securities} onChange={setSecurities} prefix={cfg.symbol} helper="Liquid investments convertible to cash within 90 days" />
          <InputField label="Current liabilities" value={liabilities} onChange={setLiabilities} prefix={cfg.symbol} helper="Obligations due within 12 months" />
        </div>

        <div className="space-y-4">
          <ResultCard primary label="Quick Ratio" value={result ? result.ratio.toFixed(2) : "—"} tier={tier} interpretation={interpretation} hint={result ? `${formatCurrency(result.numerator, region)} liquid ÷ ${formatCurrency(Number(liabilities), region)} liabilities` : undefined} />
          <ResultCard label="Health tier" value={result ? (result.ratio >= 1 ? "Healthy" : result.ratio >= 0.5 ? "Caution" : "Poor") : "—"} hint="≥1.0 healthy · 0.5–1.0 caution · <0.5 poor" />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="quick ratio" />
    </div>
  );
}
