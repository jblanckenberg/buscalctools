"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { D, toN } from "@/lib/money";

export default function SelfEmploymentTaxCalculator() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  );
}

// 2026 IRS brackets — single. Approximate post-TCJA-indexed figures.
// Reviewer: confirm against Rev. Proc. annual update before tax-year end.
type Bracket = { upTo: number; rate: number };

const BRACKETS_2026: Record<"single" | "mfj" | "hoh", Bracket[]> = {
  single: [
    { upTo: 11925, rate: 0.10 },
    { upTo: 48475, rate: 0.12 },
    { upTo: 103350, rate: 0.22 },
    { upTo: 197300, rate: 0.24 },
    { upTo: 250525, rate: 0.32 },
    { upTo: 626350, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
  mfj: [
    { upTo: 23850, rate: 0.10 },
    { upTo: 96950, rate: 0.12 },
    { upTo: 206700, rate: 0.22 },
    { upTo: 394600, rate: 0.24 },
    { upTo: 501050, rate: 0.32 },
    { upTo: 751600, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
  hoh: [
    { upTo: 17000, rate: 0.10 },
    { upTo: 64850, rate: 0.12 },
    { upTo: 103350, rate: 0.22 },
    { upTo: 197300, rate: 0.24 },
    { upTo: 250500, rate: 0.32 },
    { upTo: 626350, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
};

const STD_DEDUCTION_2026: Record<"single" | "mfj" | "hoh", number> = {
  single: 15000,
  mfj: 30000,
  hoh: 22500,
};

// 2026 SS wage base estimate ($168,600 in 2024 × ~3.5%/yr inflation indexing)
const SS_WAGE_BASE_2026 = 184500;

// Simplified state tax tier — effective top-of-AGI rates. Real state tax is
// bracket-based per state; this is a working approximation that lets people
// see a realistic total without modeling 51 jurisdictions.
const STATE_TIERS = {
  none: { label: "No state income tax (FL, TX, NV, WA, WY, TN, NH, SD, AK)", rate: 0 },
  moderate: { label: "Moderate (most states, e.g. CO, GA, MI, NC, VA, AZ)", rate: 0.05 },
  high: { label: "High (CA, NY, NJ, OR, MN, HI, DC)", rate: 0.09 },
};

function calcBracketTax(taxable: number, brackets: Bracket[]): number {
  if (taxable <= 0) return 0;
  let tax = 0;
  let lastCap = 0;
  for (const b of brackets) {
    if (taxable > b.upTo) {
      tax += (b.upTo - lastCap) * b.rate;
      lastCap = b.upTo;
    } else {
      tax += (taxable - lastCap) * b.rate;
      return tax;
    }
  }
  return tax;
}

function Inner() {
  const sp = useSearchParams();

  const [netIncome, setNetIncome] = useState(sp.get("income") ?? "80000");
  const [otherIncome, setOtherIncome] = useState(sp.get("other") ?? "0");
  const [filingStatus, setFilingStatus] = useState<"single" | "mfj" | "hoh">(
    (sp.get("filing") as "single" | "mfj" | "hoh") ?? "single"
  );
  const [stateTier, setStateTier] = useState<keyof typeof STATE_TIERS>(
    (sp.get("state") as keyof typeof STATE_TIERS) ?? "moderate"
  );

  const incomeD = D(netIncome);
  const otherD = D(otherIncome);

  // SE base = 92.35% of net SE income (the 7.65% employer-equivalent reduction)
  const seBaseD = incomeD.mul(0.9235);
  const seBase = toN(seBaseD);

  // SS portion stops at wage base. Medicare continues without cap.
  const ssTaxable = Math.min(seBase, SS_WAGE_BASE_2026);
  const ssTax = ssTaxable * 0.124;
  const medicareTax = seBase * 0.029;
  const seTax = ssTax + medicareTax;

  // Half of SE tax is deductible above the line
  const halfSeTax = seTax / 2;

  // AGI = SE income + other income − half SE tax
  const agi = toN(incomeD) + toN(otherD) - halfSeTax;
  const stdDed = STD_DEDUCTION_2026[filingStatus];
  const taxableIncome = Math.max(0, agi - stdDed);

  const federalTax = calcBracketTax(taxableIncome, BRACKETS_2026[filingStatus]);

  const stateRate = STATE_TIERS[stateTier].rate;
  const stateTax = (toN(incomeD) + toN(otherD)) * stateRate;

  const totalTax = seTax + federalTax + stateTax;
  const quarterly = totalTax / 4;
  const effectiveRate = (toN(incomeD) + toN(otherD)) > 0
    ? (totalTax / (toN(incomeD) + toN(otherD))) * 100
    : 0;

  const tier: "good" | "caution" | "bad" =
    effectiveRate < 25 ? "good" : effectiveRate < 35 ? "caution" : "bad";

  const fmt = (v: number) =>
    "$" + Math.round(v).toLocaleString("en-US");

  const copyText = [
    `Self-Employment Tax — TY 2026`,
    `Net SE Income: ${fmt(toN(incomeD))}`,
    `Other Income: ${fmt(toN(otherD))}`,
    `Filing Status: ${filingStatus.toUpperCase()}`,
    `State Tier: ${STATE_TIERS[stateTier].label}`,
    `SE Tax (15.3% × 92.35%): ${fmt(seTax)}`,
    `Federal Income Tax: ${fmt(federalTax)}`,
    `State Tax: ${fmt(stateTax)}`,
    `Total Tax: ${fmt(totalTax)}`,
    `Quarterly Payment: ${fmt(quarterly)}`,
    `Effective Rate: ${effectiveRate.toFixed(1)}%`,
  ].join("\n");

  return (
    <div>
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 mb-4">
        <strong>US tax calculator — TY 2026.</strong> Estimates only. Does not model
        QBI deduction (Section 199A), additional Medicare tax above $200k/$250k,
        or state-specific brackets. Confirm with a CPA before filing.
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Inputs
          </h2>
          <InputField
            label="Net Self-Employment Income"
            value={netIncome}
            onChange={setNetIncome}
            prefix="$"
            helper="Schedule C net profit (revenue minus business expenses)"
          />
          <InputField
            label="Other Income (W-2, spouse, investments)"
            value={otherIncome}
            onChange={setOtherIncome}
            prefix="$"
            helper="Optional — affects federal-tax bracket calculation"
          />
          <div className="w-full">
            <label
              htmlFor="filing-status"
              className="mb-1 block text-sm font-medium text-brand-dark"
            >
              Filing Status
            </label>
            <select
              id="filing-status"
              value={filingStatus}
              onChange={(e) =>
                setFilingStatus(e.target.value as "single" | "mfj" | "hoh")
              }
              className="min-h-[44px] w-full rounded-lg border border-gray-300 bg-white px-3 text-base text-brand-dark focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
            >
              <option value="single">Single</option>
              <option value="mfj">Married Filing Jointly</option>
              <option value="hoh">Head of Household</option>
            </select>
          </div>
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
              <option value="none">{STATE_TIERS.none.label}</option>
              <option value="moderate">{STATE_TIERS.moderate.label}</option>
              <option value="high">{STATE_TIERS.high.label}</option>
            </select>
            <p className="mt-1 text-xs text-gray-500">
              Simplified rate — not bracket-based per state
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <ResultCard
            primary
            label="Total Annual Tax"
            value={fmt(totalTax)}
            tier={tier}
            interpretation={`Effective rate ${effectiveRate.toFixed(1)}% on combined SE and other income.`}
            hint={`SE: ${fmt(seTax)} + Federal: ${fmt(federalTax)} + State: ${fmt(stateTax)}`}
          />
          <ResultCard
            label="Quarterly Estimated Payment"
            value={fmt(quarterly)}
            hint="Due Apr 15, Jun 15, Sep 15, Jan 15 next year (Form 1040-ES)"
          />
          <ResultCard
            label="Self-Employment Tax (alone)"
            value={fmt(seTax)}
            hint="15.3% × 92.35% × net SE income (SS capped at $184,500 in 2026)"
          />
          <ResultCard
            label="Federal Income Tax (alone)"
            value={fmt(federalTax)}
            hint={`On AGI ${fmt(agi)} after standard deduction ${fmt(stdDed)}`}
          />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="se-tax" />
    </div>
  );
}
