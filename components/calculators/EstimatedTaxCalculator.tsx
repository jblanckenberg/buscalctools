"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { D, toN } from "@/lib/money";

export default function EstimatedTaxCalculator() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  );
}

// 2026 IRS due dates for tax-year 2026 estimated payments
const DUE_DATES_2026 = [
  "Apr 15, 2026 (Q1)",
  "Jun 15, 2026 (Q2)",
  "Sep 15, 2026 (Q3)",
  "Jan 15, 2027 (Q4)",
];

function Inner() {
  const sp = useSearchParams();

  const [priorYearTax, setPriorYearTax] = useState(sp.get("prior") ?? "20000");
  const [priorYearAGI, setPriorYearAGI] = useState(sp.get("agi") ?? "120000");
  const [currentYearTaxEst, setCurrentYearTaxEst] = useState(sp.get("current") ?? "25000");
  const [withholding, setWithholding] = useState(sp.get("wh") ?? "8000");

  const prior = toN(D(priorYearTax));
  const agi = toN(D(priorYearAGI));
  const current = toN(D(currentYearTaxEst));
  const wh = toN(D(withholding));

  // Safe harbor: 100% of prior year tax (110% if prior AGI > $150k)
  const highIncome = agi > 150000;
  const priorYearSafe = prior * (highIncome ? 1.10 : 1.00);
  // Or 90% of current year tax estimate
  const currentYearSafe = current * 0.90;
  // Whichever is LOWER
  const safeHarbor = Math.min(priorYearSafe, currentYearSafe);
  const useRule = priorYearSafe <= currentYearSafe ? "prior-year" : "current-year";

  // Quarterly = (safe harbor − withholding) / 4
  const stillOwed = Math.max(0, safeHarbor - wh);
  const quarterly = stillOwed / 4;

  // Penalty exposure: would the user underpay if they only pay withholding?
  const exposureGap = Math.max(0, safeHarbor - wh);
  const hasExposure = exposureGap > 0;

  const tier: "good" | "caution" | "bad" =
    !hasExposure ? "good" : quarterly < 5000 ? "caution" : "bad";

  const interpretation = !hasExposure
    ? "Withholding alone covers the safe harbor — no estimated payments needed."
    : useRule === "prior-year"
      ? `Prior-year rule applies: pay ${"$" + Math.round(safeHarbor).toLocaleString()} across the year (${highIncome ? "110%" : "100%"} of last year&apos;s tax). Withholding covers ${"$" + Math.round(wh).toLocaleString()}; the gap is quarterly.`
      : `Current-year rule applies: pay 90% of this year&apos;s expected tax = ${"$" + Math.round(safeHarbor).toLocaleString()}. Withholding covers ${"$" + Math.round(wh).toLocaleString()}; the gap is quarterly.`;

  const fmt = (v: number) => "$" + Math.round(v).toLocaleString("en-US");

  const copyText = [
    `Estimated Tax — TY 2026`,
    `Prior Year Total Tax: ${fmt(prior)}`,
    `Prior Year AGI: ${fmt(agi)} (${highIncome ? "high-income" : "standard"} safe harbor)`,
    `Current Year Est Tax: ${fmt(current)}`,
    `Withholding To Date: ${fmt(wh)}`,
    ``,
    `Safe Harbor Amount: ${fmt(safeHarbor)} (${useRule} rule)`,
    `Quarterly Payment: ${fmt(quarterly)}`,
    `Due Dates: ${DUE_DATES_2026.join(", ")}`,
  ].join("\n");

  return (
    <div>
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 mb-4">
        <strong>US IRS Form 1040-ES — TY 2026.</strong> Safe-harbor estimates only.
        State estimated-payment rules vary and aren&apos;t modelled here.
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Inputs
          </h2>
          <InputField
            label="Prior Year Total Tax (2025)"
            value={priorYearTax}
            onChange={setPriorYearTax}
            prefix="$"
            helper="From line 24 of your 2025 Form 1040"
          />
          <InputField
            label="Prior Year AGI"
            value={priorYearAGI}
            onChange={setPriorYearAGI}
            prefix="$"
            helper="If above $150,000 (single/joint) the safe harbor goes from 100% to 110% of prior tax"
          />
          <InputField
            label="Current Year Expected Total Tax (2026)"
            value={currentYearTaxEst}
            onChange={setCurrentYearTaxEst}
            prefix="$"
            helper="Estimate based on current year income — use the SE Tax Calculator if unsure"
          />
          <InputField
            label="Withholding To Date"
            value={withholding}
            onChange={setWithholding}
            prefix="$"
            helper="Already paid via W-2 or prior estimated payments this year"
          />
        </div>

        <div className="space-y-4">
          <ResultCard
            primary
            label="Quarterly Estimated Payment"
            value={fmt(quarterly)}
            tier={tier}
            interpretation={interpretation}
            hint={`Safe-harbor amount: ${fmt(safeHarbor)} using the ${useRule} rule`}
          />
          <ResultCard
            label="Safe-Harbor Comparison"
            value={fmt(safeHarbor)}
            hint={
              priorYearSafe <= currentYearSafe
                ? `Prior-year (${highIncome ? "110%" : "100%"}): ${fmt(priorYearSafe)} ✓ (lower)\nCurrent-year (90%): ${fmt(currentYearSafe)}`
                : `Prior-year (${highIncome ? "110%" : "100%"}): ${fmt(priorYearSafe)}\nCurrent-year (90%): ${fmt(currentYearSafe)} ✓ (lower)`
            }
          />
          <ResultCard
            label="Underpayment Exposure"
            value={fmt(exposureGap)}
            hint={
              hasExposure
                ? "Amount still owed beyond withholding — split evenly across 4 quarters to avoid penalty"
                : "None — withholding already exceeds the safe harbor"
            }
          />
          <ResultCard
            label="Quarterly Due Dates (TY 2026)"
            value="See below"
            hint={DUE_DATES_2026.join("  •  ")}
          />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="estimated-tax" />
    </div>
  );
}
