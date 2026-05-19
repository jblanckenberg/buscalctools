"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatNumber } from "@/lib/regions";
import { D, Decimal, toN } from "@/lib/money";

export default function BusinessLoanCalculator() {
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

  const initialUnit = sp.get("unit") === "months" ? "months" : "years";

  const [amount, setAmount] = useState(sp.get("amount") ?? "50000");
  const [rate, setRate] = useState(sp.get("rate") ?? String(cfg.typicalLoanRate));
  const [termUnit, setTermUnit] = useState<"months" | "years">(initialUnit);
  const [term, setTerm] = useState(sp.get("term") ?? "5");
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    setRate(String(REGIONS[region].typicalLoanRate));
  }, [region]);

  const principalD = D(amount);
  const aprPctD = D(rate);
  const termInputD = D(term);
  const monthsD = termUnit === "years" ? termInputD.mul(12) : termInputD;
  const months = toN(monthsD);
  const rD = aprPctD.div(12).div(100);

  // Amortisation formula: P × r × (1+r)^n / ((1+r)^n − 1). Decimal.pow handles
  // the (1+r)^n exponentiation; precision matters most here because the result
  // gets repeated n times in the schedule below where rounding drift would
  // otherwise accumulate visibly.
  let monthlyPaymentD = new Decimal(0);
  if (monthsD.gt(0) && principalD.gt(0)) {
    if (rD.eq(0)) {
      monthlyPaymentD = principalD.div(monthsD);
    } else {
      const onePlusRPowN = new Decimal(1).plus(rD).pow(monthsD);
      monthlyPaymentD = principalD
        .mul(rD)
        .mul(onePlusRPowN)
        .div(onePlusRPowN.minus(1));
    }
  }

  const totalPaidD = monthlyPaymentD.mul(monthsD);
  const totalInterestD = totalPaidD.minus(principalD);

  const principal = toN(principalD);
  const aprPct = toN(aprPctD);
  const monthlyPayment = toN(monthlyPaymentD);
  const totalPaid = toN(totalPaidD);
  const totalInterest = toN(totalInterestD);

  const schedule = useMemo(() => {
    if (months <= 0 || principal <= 0) return [];
    const monthsInt = Math.floor(months);
    let balanceD = principalD;
    const rows = [];
    for (let i = 1; i <= monthsInt; i++) {
      const interestD = balanceD.mul(rD);
      const principalPartD = monthlyPaymentD.minus(interestD);
      balanceD = Decimal.max(0, balanceD.minus(principalPartD));
      rows.push({
        month: i,
        payment: monthlyPayment,
        interest: toN(interestD),
        principal: toN(principalPartD),
        balance: toN(balanceD),
      });
    }
    return rows;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [months, principal, aprPct, monthlyPayment]);

  const copyText = [
    `Business Loan — ${cfg.label}`,
    `Loan Amount: ${formatCurrency(principal, region)}`,
    `Interest Rate: ${aprPct}% APR`,
    `Term: ${formatNumber(months, 0)} months`,
    `Monthly Payment: ${formatCurrency(monthlyPayment, region)}`,
    `Total Interest: ${formatCurrency(totalInterest, region)}`,
    `Total Cost: ${formatCurrency(totalPaid, region)}`,
  ].join("\n");

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <RegionToggle region={region} onChange={setRegion} />
        <p className="text-xs text-gray-500">
          Rate pre-filled at {cfg.typicalLoanRate}% — typical for {cfg.label} SME loans.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Inputs
          </h2>
          <InputField label="Loan Amount" value={amount} onChange={setAmount} prefix={cfg.symbol} />
          <InputField label="Annual Interest Rate (APR)" value={rate} onChange={setRate} suffix="%" />
          <div>
            <label className="mb-1 block text-sm font-medium text-brand-dark">Loan Term</label>
            <div className="flex gap-2">
              <input
                type="number"
                inputMode="decimal"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="min-h-[44px] flex-1 rounded-lg border border-gray-300 bg-white px-3 text-base text-brand-dark focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
              />
              <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1 text-sm">
                <button
                  type="button"
                  onClick={() => setTermUnit("months")}
                  className={`rounded-md px-3 py-1 font-medium ${termUnit === "months" ? "bg-brand-primary text-white" : "text-brand-dark"}`}
                >
                  Months
                </button>
                <button
                  type="button"
                  onClick={() => setTermUnit("years")}
                  className={`rounded-md px-3 py-1 font-medium ${termUnit === "years" ? "bg-brand-primary text-white" : "text-brand-dark"}`}
                >
                  Years
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <ResultCard
            primary
            label="Monthly Payment"
            value={formatCurrency(monthlyPayment, region)}
            tier="good"
            hint={`Over ${formatNumber(months, 0)} months at ${aprPct}% APR`}
          />
          <ResultCard
            label="Total Interest Paid"
            value={formatCurrency(totalInterest, region)}
            hint={
              principal > 0
                ? `${((totalInterest / principal) * 100).toFixed(1)}% of original loan`
                : undefined
            }
          />
          <ResultCard
            label="Total Loan Cost"
            value={formatCurrency(totalPaid, region)}
            hint="Principal + interest over the full term"
          />
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5">
        <button
          type="button"
          onClick={() => setShowTable((v) => !v)}
          className="flex w-full items-center justify-between text-sm font-semibold text-brand-dark"
        >
          <span>Amortisation schedule</span>
          <span className="text-brand-primary">{showTable ? "Hide" : "Show"} ▾</span>
        </button>
        {showTable && schedule.length > 0 && (
          <div className="mt-4 max-h-[420px] overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-brand-light">
                <tr className="text-left text-xs uppercase tracking-wider text-gray-600">
                  <th className="px-2 py-2">#</th>
                  <th className="px-2 py-2 text-right">Payment</th>
                  <th className="px-2 py-2 text-right">Principal</th>
                  <th className="px-2 py-2 text-right">Interest</th>
                  <th className="px-2 py-2 text-right">Balance</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row) => (
                  <tr key={row.month} className="border-b border-gray-100">
                    <td className="px-2 py-1.5 text-gray-500">{row.month}</td>
                    <td className="px-2 py-1.5 text-right font-mono">
                      {formatCurrency(row.payment, region)}
                    </td>
                    <td className="px-2 py-1.5 text-right font-mono text-brand-accent">
                      {formatCurrency(row.principal, region)}
                    </td>
                    <td className="px-2 py-1.5 text-right font-mono text-brand-danger">
                      {formatCurrency(row.interest, region)}
                    </td>
                    <td className="px-2 py-1.5 text-right font-mono text-brand-dark">
                      {formatCurrency(row.balance, region)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <CalculatorActions copyText={copyText} label="repayment" />
    </div>
  );
}
