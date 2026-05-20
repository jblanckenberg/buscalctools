"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { D, toN } from "@/lib/money";

export default function Section179Calculator() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  );
}

// 2026 Section 179 limits (estimated post-inflation indexing)
const SECTION_179_LIMIT = 1220000;
const SECTION_179_PHASE_OUT_THRESHOLD = 3050000;

// MACRS 5-year half-year convention percentages
const MACRS_5_YEAR = [0.20, 0.32, 0.192, 0.1152, 0.1152, 0.0576];

function Inner() {
  const sp = useSearchParams();
  const [equipmentCost, setEquipmentCost] = useState(sp.get("cost") ?? "100000");
  const [marginalTaxRate, setMarginalTaxRate] = useState(sp.get("tax") ?? "24");
  const [discountRate, setDiscountRate] = useState(sp.get("discount") ?? "5");

  const cost = toN(D(equipmentCost));
  const taxRate = toN(D(marginalTaxRate)) / 100;
  const dr = toN(D(discountRate)) / 100;

  // Section 179 phase-out: $1 reduction in limit for every $1 over $3.05M threshold
  const phaseOut = Math.max(0, cost - SECTION_179_PHASE_OUT_THRESHOLD);
  const section179Limit = Math.max(0, SECTION_179_LIMIT - phaseOut);
  const section179Deduction = Math.min(cost, section179Limit);

  // Section 179 year-1 tax savings
  const sec179Savings = section179Deduction * taxRate;

  // Remaining cost after Section 179 (if any) gets depreciated normally
  const remainingForDepreciation = cost - section179Deduction;

  // MACRS comparison — assume the FULL cost is depreciated under MACRS (not Section 179)
  const macrsSchedule = MACRS_5_YEAR.map((pct, i) => ({
    year: i + 1,
    depreciation: cost * pct,
    taxSavings: cost * pct * taxRate,
    npvSavings: (cost * pct * taxRate) / Math.pow(1 + dr, i + 1),
  }));
  const macrsTotalNominal = macrsSchedule.reduce((sum, r) => sum + r.taxSavings, 0);
  const macrsTotalNPV = macrsSchedule.reduce((sum, r) => sum + r.npvSavings, 0);

  // Sec 179 NPV: full savings in year 1 (discounted by 1 year for fair comparison)
  const sec179NPV = sec179Savings / (1 + dr);

  const cashFlowAdvantage = sec179NPV - macrsTotalNPV;

  const fullyDeductible = section179Deduction >= cost;
  const tier: "good" | "caution" | "bad" =
    fullyDeductible && cashFlowAdvantage > 0 ? "good" :
    section179Deduction > 0 ? "caution" : "bad";

  const interpretation =
    fullyDeductible
      ? `The full $${cost.toLocaleString()} qualifies for Section 179 — year-1 tax savings of $${Math.round(sec179Savings).toLocaleString()} versus spreading the same total over 6 years under MACRS. NPV advantage of $${Math.round(cashFlowAdvantage).toLocaleString()}.`
      : section179Deduction > 0
        ? `Phase-out applies. Only $${Math.round(section179Deduction).toLocaleString()} of the $${cost.toLocaleString()} cost qualifies — equipment purchases above the $3.05M threshold reduce the Section 179 limit dollar-for-dollar.`
        : `Equipment cost exceeds Section 179 phase-out cap. Only MACRS depreciation available — spread over 6 years.`;

  const fmt = (v: number) => "$" + Math.round(v).toLocaleString("en-US");

  const copyText = [
    `Section 179 — TY 2026`,
    `Equipment Cost: ${fmt(cost)}`,
    `Marginal Tax Rate: ${(taxRate * 100).toFixed(0)}%`,
    ``,
    `Section 179 Deduction: ${fmt(section179Deduction)}`,
    `Year-1 Tax Savings (Sec 179): ${fmt(sec179Savings)}`,
    `MACRS Total Savings (6 yrs): ${fmt(macrsTotalNominal)}`,
    `MACRS NPV @ ${(dr * 100).toFixed(0)}%: ${fmt(macrsTotalNPV)}`,
    `Sec 179 NPV Advantage: ${fmt(cashFlowAdvantage)}`,
  ].join("\n");

  return (
    <div>
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 mb-4">
        <strong>US Section 179 — TY 2026 estimates.</strong> $1.22M cap with $3.05M
        phase-out (each dollar over reduces the cap dollar-for-dollar). Bonus depreciation
        rules (currently 60% in 2024, scheduled to drop) interact with Section 179 — not
        modelled here. Section 179 also requires the business to have taxable income —
        excess can be carried forward but not refunded.
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Inputs</h2>
          <InputField label="Equipment Cost" value={equipmentCost} onChange={setEquipmentCost} prefix="$" helper="Total purchase price of qualifying business equipment" />
          <InputField label="Marginal Tax Rate" value={marginalTaxRate} onChange={setMarginalTaxRate} suffix="%" helper="Your effective marginal rate (federal + state combined)" />
          <InputField label="Discount Rate (for NPV)" value={discountRate} onChange={setDiscountRate} suffix="%" helper="Time value of money — 5% is a reasonable default" />
        </div>

        <div className="space-y-4">
          <ResultCard primary label="Year-1 Tax Savings (Section 179)" value={fmt(sec179Savings)} tier={tier} interpretation={interpretation} hint={`Section 179 deduction: ${fmt(section179Deduction)} of the ${fmt(cost)} cost`} />
          <ResultCard label="MACRS Year-1 Savings" value={fmt(macrsSchedule[0].taxSavings)} hint="If you used 5-year depreciation instead" />
          <ResultCard label="MACRS Total Savings (6 yrs)" value={fmt(macrsTotalNominal)} hint={`NPV @ ${(dr * 100).toFixed(0)}%: ${fmt(macrsTotalNPV)}`} />
          <ResultCard label="Sec 179 NPV Advantage" value={fmt(cashFlowAdvantage)} hint="Extra wealth from taking the deduction up front" />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="section-179" />
    </div>
  );
}
