"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { D, toN } from "@/lib/money";

export default function RAndDTaxCreditCalculator() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  );
}

// Contract research counts at 65% of expenditure per IRC §41(b)(3)
const CONTRACT_RESEARCH_FACTOR = 0.65;
// Payroll-tax offset limit (2024+ via Inflation Reduction Act expansion)
const PAYROLL_OFFSET_CAP = 500000;
// Qualified small business gross-receipts threshold
const QSB_GROSS_RECEIPTS_THRESHOLD = 5000000;

function Inner() {
  const sp = useSearchParams();

  const [qualifiedWages, setQualifiedWages] = useState(sp.get("wages") ?? "200000");
  const [qualifiedSupplies, setQualifiedSupplies] = useState(sp.get("supplies") ?? "20000");
  const [contractResearch, setContractResearch] = useState(sp.get("contract") ?? "50000");
  const [priorAvgQRE, setPriorAvgQRE] = useState(sp.get("prior") ?? "0");
  const [grossReceipts, setGrossReceipts] = useState(sp.get("receipts") ?? "1500000");

  const wages = toN(D(qualifiedWages));
  const supplies = toN(D(qualifiedSupplies));
  const contract = toN(D(contractResearch));
  const prior = toN(D(priorAvgQRE));
  const receipts = toN(D(grossReceipts));

  // Total QREs (current year)
  const currentQRE = wages + supplies + contract * CONTRACT_RESEARCH_FACTOR;

  // ASC method
  // If prior 3yr avg QRE > 0: credit = 14% × max(0, current - 50% × avg)
  // If prior = 0 (first-time): credit = 6% × current
  let credit: number;
  let method: string;
  if (prior > 0) {
    const baseAmount = 0.5 * prior;
    const incremental = Math.max(0, currentQRE - baseAmount);
    credit = 0.14 * incremental;
    method = "ASC standard (14% × incremental QREs)";
  } else {
    credit = 0.06 * currentQRE;
    method = "ASC first-time (6% × current QREs)";
  }

  // QSB eligibility for payroll-tax offset
  const qsbEligible = receipts < QSB_GROSS_RECEIPTS_THRESHOLD;
  const payrollOffsetAvailable = qsbEligible ? Math.min(credit, PAYROLL_OFFSET_CAP) : 0;

  const tier: "good" | "caution" | "bad" =
    credit > 20000 ? "good" : credit > 5000 ? "caution" : "bad";

  const interpretation =
    credit < 1000
      ? "Very small credit. R&D credit work is rarely worth the documentation cost unless QREs exceed $50-100k."
      : qsbEligible
        ? `Eligible for payroll-tax offset (your gross receipts ${"$" + Math.round(receipts).toLocaleString()} are below the $5M QSB threshold). Up to ${"$" + Math.round(payrollOffsetAvailable).toLocaleString()} of credit can apply against your 6.2% employer Social Security in the quarter following the return filing.`
        : `Standard federal income tax credit. Your gross receipts exceed the $5M QSB threshold, so the payroll-tax offset doesn't apply — the credit reduces income-tax liability instead. Excess credit carries forward 20 years.`;

  const fmt = (v: number) => "$" + Math.round(v).toLocaleString("en-US");

  const copyText = [
    `R&D Tax Credit — TY 2026 USA`,
    `Qualified Wages: ${fmt(wages)}`,
    `Qualified Supplies: ${fmt(supplies)}`,
    `Contract Research: ${fmt(contract)} (× 65% = ${fmt(contract * CONTRACT_RESEARCH_FACTOR)})`,
    `Prior 3yr Avg QRE: ${fmt(prior)}`,
    `Current Year Gross Receipts: ${fmt(receipts)}`,
    ``,
    `Total Current QREs: ${fmt(currentQRE)}`,
    `Method: ${method}`,
    `Federal Credit: ${fmt(credit)}`,
    `QSB Status: ${qsbEligible ? "Eligible for payroll-tax offset" : "Not eligible"}`,
    qsbEligible ? `Payroll-Tax Offset Available: ${fmt(payrollOffsetAvailable)}` : "",
  ].filter(Boolean).join("\n");

  return (
    <div>
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 mb-4">
        <strong>US Section 41 R&amp;D Tax Credit — simplified ASC method.</strong> Real R&amp;D
        credit work requires the IRC §41 four-part test (permitted purpose,
        elimination of uncertainty, process of experimentation, technological in
        nature). This calculator estimates the credit AMOUNT assuming you've
        already qualified the underlying activities. Get a CPA or specialist
        R&amp;D-credit firm to qualify the activities and document properly.
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Inputs</h2>
          <InputField label="Qualified Researcher Wages" value={qualifiedWages} onChange={setQualifiedWages} prefix="$" helper="W-2 wages of employees performing qualified R&amp;D work, time-allocated" />
          <InputField label="Qualified Supplies" value={qualifiedSupplies} onChange={setQualifiedSupplies} prefix="$" helper="Consumables used in R&amp;D (not capital equipment); prototype materials, test materials" />
          <InputField label="Contract Research Payments" value={contractResearch} onChange={setContractResearch} prefix="$" helper="Payments to third parties for R&amp;D — counts at 65% per IRC §41(b)(3)" />
          <InputField label="Prior 3-Year Average QRE" value={priorAvgQRE} onChange={setPriorAvgQRE} prefix="$" helper="Average qualified research expenditure over prior 3 tax years. Enter 0 if first-time claim." />
          <InputField label="Current Year Gross Receipts" value={grossReceipts} onChange={setGrossReceipts} prefix="$" helper="Required to determine Qualified Small Business eligibility (below $5M for payroll-tax offset)" />
        </div>

        <div className="space-y-4">
          <ResultCard primary label="Federal R&amp;D Tax Credit" value={fmt(credit)} tier={tier} interpretation={interpretation} hint={method} />
          <ResultCard label="Total Qualified Research Expenditures (QREs)" value={fmt(currentQRE)} hint={`Wages + Supplies + Contract × 65% factor`} />
          <ResultCard label="Payroll-Tax Offset Available (QSB)" value={fmt(payrollOffsetAvailable)} hint={qsbEligible ? `Up to ${fmt(PAYROLL_OFFSET_CAP)} cap` : "Not eligible — gross receipts exceed $5M threshold"} />
          <ResultCard label="Documentation Required" value="Form 6765 + contemporaneous records" hint="Time-tracking, project descriptions, technical-uncertainty documentation. Without these the credit fails on audit." />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="rd-credit" />
    </div>
  );
}
