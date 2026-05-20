"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { D, toN } from "@/lib/money";

export default function SCorpElectionCalculator() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  );
}

// 2026 SS wage base estimate
const SS_WAGE_BASE_2026 = 184500;
// Default S-corp compliance overhead — payroll service + extra accounting for
// 1120-S, W-2, K-1, state corporate. Real number varies $1,500-$5,000/yr.
const DEFAULT_OVERHEAD = 2500;

const STATE_TIERS = {
  none: { label: "No state income tax", rate: 0 },
  moderate: { label: "Moderate (~5%)", rate: 0.05 },
  high: { label: "High (~9%)", rate: 0.09 },
};

// Approximate effective federal income-tax rate for the income band the
// typical S-corp candidate sits in ($50k-$300k). This is a deliberate
// simplification — the calculator's purpose is to surface the SE-tax-savings
// trade-off, not to be a 1040 substitute.
function effectiveFedRate(income: number): number {
  if (income < 50000) return 0.12;
  if (income < 100000) return 0.16;
  if (income < 200000) return 0.20;
  if (income < 400000) return 0.24;
  return 0.30;
}

function Inner() {
  const sp = useSearchParams();

  const [netProfit, setNetProfit] = useState(sp.get("profit") ?? "100000");
  const [salaryPct, setSalaryPct] = useState(sp.get("salaryPct") ?? "60");
  const [stateTier, setStateTier] = useState<keyof typeof STATE_TIERS>(
    (sp.get("state") as keyof typeof STATE_TIERS) ?? "moderate"
  );
  const [overhead, setOverhead] = useState(sp.get("overhead") ?? String(DEFAULT_OVERHEAD));

  const profit = toN(D(netProfit));
  const salaryRatio = toN(D(salaryPct)) / 100;
  const overheadCost = toN(D(overhead));
  const stateRate = STATE_TIERS[stateTier].rate;

  // LLC default: entire profit subject to SE tax (15.3% × 92.35%) + federal + state
  const llcSeTax = Math.min(profit, SS_WAGE_BASE_2026 / 0.9235) * 0.9235 * 0.153 +
    Math.max(0, profit - SS_WAGE_BASE_2026 / 0.9235) * 0.9235 * 0.029;
  const llcFedTax = profit * effectiveFedRate(profit);
  const llcStateTax = profit * stateRate;
  const llcTotal = llcSeTax + llcFedTax + llcStateTax;

  // S-corp: salary subject to FICA (employer + employee = 15.3% effective at
  // entity level since corp pays employer side). Distributions skip FICA.
  // Both pay federal and state income tax.
  const salary = profit * salaryRatio;
  const distribution = profit - salary;
  const scorpFicaTax = Math.min(salary, SS_WAGE_BASE_2026) * 0.153 +
    Math.max(0, salary - SS_WAGE_BASE_2026) * 0.029;
  // Federal income tax on combined salary + distribution
  const scorpFedTax = profit * effectiveFedRate(profit);
  const scorpStateTax = profit * stateRate;
  const scorpTotal = scorpFicaTax + scorpFedTax + scorpStateTax + overheadCost;

  const savings = llcTotal - scorpTotal;
  const breakEven = savings > 0;

  const tier: "good" | "caution" | "bad" =
    savings > 5000 ? "good" : savings > 0 ? "caution" : "bad";

  const interpretation =
    savings > 5000
      ? `Strong case for the S-corp election — savings exceed overhead by a comfortable margin.`
      : savings > 0
        ? `Marginal — savings just cover overhead. Wait until profit is higher or check whether a "reasonable salary" below ${(salaryRatio * 100).toFixed(0)}% is defensible.`
        : `Not worth electing at this profit level. The S-corp overhead exceeds the SE tax saved on distributions. Re-check above ~$50k of net profit.`;

  const fmt = (v: number) => "$" + Math.round(v).toLocaleString("en-US");

  const copyText = [
    `S-Corp Election — TY 2026`,
    `Net Profit: ${fmt(profit)}`,
    `Reasonable Salary: ${fmt(salary)} (${(salaryRatio * 100).toFixed(0)}%)`,
    `Distribution: ${fmt(distribution)}`,
    `State Tier: ${STATE_TIERS[stateTier].label}`,
    ``,
    `LLC default total: ${fmt(llcTotal)}`,
    `S-corp total (with ${fmt(overheadCost)} overhead): ${fmt(scorpTotal)}`,
    `Annual Savings: ${fmt(savings)}`,
    `Decision: ${breakEven ? "Elect S-corp" : "Stay as LLC default"}`,
  ].join("\n");

  return (
    <div>
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 mb-4">
        <strong>US tax planning tool — TY 2026.</strong> &quot;Reasonable salary&quot; is a
        facts-and-circumstances IRS test — too low triggers audit risk.
        Estimates only. Confirm with a CPA before making the S-corp election (Form 2553).
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Inputs
          </h2>
          <InputField
            label="Annual Net Profit"
            value={netProfit}
            onChange={setNetProfit}
            prefix="$"
            helper="Schedule C net profit (LLC) or projected business net (1120-S)"
          />
          <InputField
            label="Reasonable Salary (% of profit)"
            value={salaryPct}
            onChange={setSalaryPct}
            suffix="%"
            helper="Default 60% — IRS expects salary that matches market for the work performed. Going below 40% raises audit flags."
          />
          <div className="w-full">
            <label
              htmlFor="state-tier"
              className="mb-1 block text-sm font-medium text-brand-dark"
            >
              State Income Tax Tier
            </label>
            <select
              id="state-tier"
              value={stateTier}
              onChange={(e) =>
                setStateTier(e.target.value as keyof typeof STATE_TIERS)
              }
              className="min-h-[44px] w-full rounded-lg border border-gray-300 bg-white px-3 text-base text-brand-dark focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
            >
              <option value="none">{STATE_TIERS.none.label} (FL, TX, NV, WA, etc.)</option>
              <option value="moderate">{STATE_TIERS.moderate.label} (most states)</option>
              <option value="high">{STATE_TIERS.high.label} (CA, NY, NJ, etc.)</option>
            </select>
          </div>
          <InputField
            label="Annual S-Corp Compliance Overhead"
            value={overhead}
            onChange={setOverhead}
            prefix="$"
            helper="Payroll service + 1120-S preparation + state corp tax. $1,500-5,000 typical. Default $2,500."
          />
        </div>

        <div className="space-y-4">
          <ResultCard
            primary
            label="Annual Tax Savings (S-Corp vs LLC)"
            value={fmt(Math.abs(savings))}
            tier={tier}
            interpretation={interpretation}
            hint={breakEven ? "After subtracting S-corp overhead cost" : "S-corp would cost MORE than LLC at this profit level"}
          />
          <ResultCard
            label="LLC Default — Total Tax"
            value={fmt(llcTotal)}
            hint={`Entire ${fmt(profit)} subject to SE tax (${fmt(llcSeTax)})`}
          />
          <ResultCard
            label="S-Corp — Total Tax + Overhead"
            value={fmt(scorpTotal)}
            hint={`Salary ${fmt(salary)} taxed via FICA; distribution ${fmt(distribution)} skips it; +${fmt(overheadCost)} overhead`}
          />
          <ResultCard
            label="Decision"
            value={breakEven ? "Elect S-Corp" : "Stay LLC"}
            hint={
              breakEven
                ? "File Form 2553 by Mar 15 (calendar year) for current-year election"
                : "Revisit when net profit exceeds $50k or compliance overhead drops"
            }
          />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="s-corp" />
    </div>
  );
}
