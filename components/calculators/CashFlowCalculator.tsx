"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency } from "@/lib/regions";

// Lazy-load Recharts area chart (only this calc + break-even use it).
const CashFlowChart = dynamic(
  () => import("@/components/calculators/CashFlowChart"),
  {
    ssr: false,
    loading: () => (
      <div className="mt-6 h-72 w-full animate-pulse rounded-xl bg-brand-light" />
    ),
  }
);

const MONTHS = Array.from({ length: 12 }, (_, i) =>
  new Date(2000, i, 1).toLocaleString("en", { month: "short" })
);

export default function CashFlowCalculator() {
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

  const incomeSeed = sp.get("income") ?? "12000";
  const expensesSeed = sp.get("expenses") ?? "9500";

  const [opening, setOpening] = useState(sp.get("opening") ?? "10000");
  const [income, setIncome] = useState<string[]>(() =>
    Array.from({ length: 12 }, () => incomeSeed)
  );
  const [expenses, setExpenses] = useState<string[]>(() =>
    Array.from({ length: 12 }, () => expensesSeed)
  );

  const updateMonth = (
    arr: string[],
    setArr: (next: string[]) => void,
    idx: number,
    value: string
  ) => {
    setArr(arr.map((v, i) => (i === idx ? value : v)));
  };

  const openingN = parseFloat(opening) || 0;
  let running = openingN;
  let lowestBalance = openingN;
  let lowestMonth = 0;
  let totalAnnual = 0;
  const rows = income.map((inc, i) => {
    const incN = parseFloat(inc) || 0;
    const expN = parseFloat(expenses[i]) || 0;
    const net = incN - expN;
    running += net;
    totalAnnual += net;
    if (running < lowestBalance) {
      lowestBalance = running;
      lowestMonth = i + 1;
    }
    return {
      month: MONTHS[i],
      idx: i + 1,
      income: incN,
      expenses: expN,
      net,
      balance: running,
    };
  });

  const tier = lowestBalance < 0 ? "bad" : totalAnnual > 0 ? "good" : "caution";

  const copyText = [
    `Cash Flow — ${cfg.label}`,
    `Opening Balance: ${formatCurrency(openingN, region)}`,
    `Annual Net Cash Flow: ${formatCurrency(totalAnnual, region)}`,
    `Ending Balance (Month 12): ${formatCurrency(running, region)}`,
    `Lowest Balance: ${formatCurrency(lowestBalance, region)} (Month ${lowestMonth})`,
  ].join("\n");

  return (
    <div>
      <div className="mb-4">
        <RegionToggle region={region} onChange={setRegion} />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="mb-4 max-w-xs">
          <InputField
            label="Opening Cash Balance"
            value={opening}
            onChange={setOpening}
            prefix={cfg.symbol}
            helper="Cash on hand at the start of month 1"
          />
        </div>

        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
          12-Month Projection
        </h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wider text-gray-500">
                <th className="py-2 pr-2">Month</th>
                <th className="py-2 pr-2">Income</th>
                <th className="py-2 pr-2">Expenses</th>
                <th className="py-2 pr-2">Net</th>
                <th className="py-2 pr-2">Balance</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-2 pr-2 font-medium text-brand-dark">{r.month}</td>
                  <td className="py-2 pr-2">
                    <input
                      type="number"
                      inputMode="decimal"
                      value={income[i]}
                      onChange={(e) =>
                        updateMonth(income, setIncome, i, e.target.value)
                      }
                      className="w-28 rounded-md border border-gray-200 px-2 py-1 text-right text-sm focus:border-brand-primary focus:outline-none"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      type="number"
                      inputMode="decimal"
                      value={expenses[i]}
                      onChange={(e) =>
                        updateMonth(expenses, setExpenses, i, e.target.value)
                      }
                      className="w-28 rounded-md border border-gray-200 px-2 py-1 text-right text-sm focus:border-brand-primary focus:outline-none"
                    />
                  </td>
                  <td
                    className={`py-2 pr-2 text-right font-medium ${
                      r.net >= 0 ? "text-brand-accent" : "text-brand-danger"
                    }`}
                  >
                    {formatCurrency(r.net, region)}
                  </td>
                  <td
                    className={`py-2 pr-2 text-right font-semibold ${
                      r.balance >= 0 ? "text-brand-dark" : "text-brand-danger"
                    }`}
                  >
                    {formatCurrency(r.balance, region)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <ResultCard
          primary
          label="Annual Net Cash Flow"
          value={formatCurrency(totalAnnual, region)}
          tier={tier}
          interpretation={
            totalAnnual > 0
              ? "Positive net cash flow over the year."
              : "Net cash flow is negative — you'll consume cash to operate."
          }
        />
        <ResultCard
          label="Lowest Balance"
          value={formatCurrency(lowestBalance, region)}
          tier={lowestBalance < 0 ? "bad" : "neutral"}
          hint={`Reached in Month ${lowestMonth}`}
          interpretation={
            lowestBalance < 0
              ? "Cash will go negative — arrange financing or delay spend before this month."
              : "Cash stays positive through the projection."
          }
        />
      </div>

      <CashFlowChart rows={rows} currencySymbol={cfg.symbol} />

      <CalculatorActions copyText={copyText} label="projection" />
    </div>
  );
}

