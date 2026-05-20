"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { D, toN } from "@/lib/money";

export default function PayrollTaxCalculator() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  );
}

// 2026 SS wage base (estimated)
const SS_WAGE_BASE = 184500;
// FUTA: 6% on first $7,000 per employee, usually credit-reduced to 0.6% in states without unemployment-loan debt
const FUTA_BASE = 7000;
const FUTA_NET_RATE = 0.006;

const STATE_TIERS = {
  none: { label: "Low (1-2% combined state UI + workers comp)", rate: 0.015 },
  moderate: { label: "Moderate (3-4% combined)", rate: 0.035 },
  high: { label: "High (5-7% — CA, NY, NJ, MA)", rate: 0.06 },
};

function Inner() {
  const sp = useSearchParams();
  const [grossPayroll, setGrossPayroll] = useState(sp.get("payroll") ?? "500000");
  const [numEmployees, setNumEmployees] = useState(sp.get("employees") ?? "8");
  const [stateTier, setStateTier] = useState<keyof typeof STATE_TIERS>(
    (sp.get("state") as keyof typeof STATE_TIERS) ?? "moderate"
  );

  const payroll = toN(D(grossPayroll));
  const n = Math.max(1, toN(D(numEmployees)));
  const stateRate = STATE_TIERS[stateTier].rate;

  const avgWage = payroll / n;

  // FICA — SS portion caps per employee at wage base
  const ssWageable = n * Math.min(avgWage, SS_WAGE_BASE);
  const ssTax = ssWageable * 0.062;
  const medicareTax = payroll * 0.0145;
  const ficaTax = ssTax + medicareTax;

  // FUTA — only on first $7,000 per employee
  const futaWageable = n * Math.min(avgWage, FUTA_BASE);
  const futaTax = futaWageable * FUTA_NET_RATE;

  // State + workers comp combined
  const stateTax = payroll * stateRate;

  const totalEmployerTax = ficaTax + futaTax + stateTax;
  const perEmployee = totalEmployerTax / n;
  const totalRate = (totalEmployerTax / payroll) * 100;

  const tier: "good" | "caution" | "bad" =
    totalRate < 9 ? "good" : totalRate < 12 ? "caution" : "bad";

  const fmt = (v: number) => "$" + Math.round(v).toLocaleString("en-US");

  const copyText = [
    `Payroll Tax — TY 2026 USA`,
    `Gross Annual Payroll: ${fmt(payroll)}`,
    `Employees: ${n}  •  Avg wage: ${fmt(avgWage)}`,
    `State Tier: ${STATE_TIERS[stateTier].label}`,
    ``,
    `FICA (SS 6.2% + Medicare 1.45%): ${fmt(ficaTax)}`,
    `FUTA (0.6% × $7k base): ${fmt(futaTax)}`,
    `State (UI + workers comp): ${fmt(stateTax)}`,
    `Total Employer Tax: ${fmt(totalEmployerTax)} (${totalRate.toFixed(2)}%)`,
    `Per-Employee Burden: ${fmt(perEmployee)}`,
  ].join("\n");

  return (
    <div>
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 mb-4">
        <strong>US payroll tax — TY 2026 (employer side only).</strong> Estimates. State tier
        is a 3-band approximation; real state rates vary by state, industry, and experience
        rating. Employee FICA (matching 7.65%) is withheld separately and not shown here.
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Inputs</h2>
          <InputField label="Gross Annual Payroll" value={grossPayroll} onChange={setGrossPayroll} prefix="$" helper="Total annual wages paid to all employees" />
          <InputField label="Number of Employees" value={numEmployees} onChange={setNumEmployees} helper="Used to calculate per-employee SS wage-base cap and FUTA" />
          <div className="w-full">
            <label htmlFor="state-tier" className="mb-1 block text-sm font-medium text-brand-dark">State UI + Workers Comp Tier</label>
            <select id="state-tier" value={stateTier} onChange={(e) => setStateTier(e.target.value as keyof typeof STATE_TIERS)} className="min-h-[44px] w-full rounded-lg border border-gray-300 bg-white px-3 text-base text-brand-dark">
              <option value="none">{STATE_TIERS.none.label}</option>
              <option value="moderate">{STATE_TIERS.moderate.label}</option>
              <option value="high">{STATE_TIERS.high.label}</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <ResultCard primary label="Total Employer Payroll Tax" value={fmt(totalEmployerTax)} tier={tier} interpretation={`${totalRate.toFixed(2)}% of gross payroll. Per-employee burden: ${fmt(perEmployee)}/year.`} hint="Federal + state combined" />
          <ResultCard label="FICA (Federal)" value={fmt(ficaTax)} hint={`SS 6.2% capped at ${fmt(SS_WAGE_BASE)} per employee + Medicare 1.45% uncapped`} />
          <ResultCard label="FUTA (Federal Unemployment)" value={fmt(futaTax)} hint="0.6% × $7,000 per employee (after state credit)" />
          <ResultCard label="State (UI + Workers Comp)" value={fmt(stateTax)} hint={`${(stateRate * 100).toFixed(1)}% rate band — actual varies by state and industry`} />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="payroll-tax" />
    </div>
  );
}
