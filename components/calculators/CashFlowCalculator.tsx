"use client";

import { useEffect, useState } from "react";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency } from "@/lib/regions";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MONTHS = Array.from({ length: 12 }, (_, i) =>
  new Date(2000, i, 1).toLocaleString("en", { month: "short" })
);

export default function CashFlowCalculator() {
  const [region, setRegion] = useRegion();
  const cfg = REGIONS[region];

  const [opening, setOpening] = useState("10000");
  const [income, setIncome] = useState<string[]>(() =>
    Array.from({ length: 12 }, () => "12000")
  );
  const [expenses, setExpenses] = useState<string[]>(() =>
    Array.from({ length: 12 }, () => "9500")
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

function CashFlowChart({
  rows,
  currencySymbol,
}: {
  rows: { month: string; balance: number }[];
  currencySymbol: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
        Running cash balance
      </h3>
      <div className="h-72 w-full">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={rows} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
              <defs>
                <linearGradient id="cf-pos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} />
              <YAxis
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickFormatter={(v) => `${currencySymbol}${Math.round(v).toLocaleString()}`}
                width={80}
              />
              <Tooltip
                formatter={(v: number) => `${currencySymbol}${Math.round(v).toLocaleString()}`}
              />
              <ReferenceLine y={0} stroke="#EF4444" strokeDasharray="4 4" />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="#10B981"
                fill="url(#cf-pos)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full animate-pulse rounded-md bg-brand-light" />
        )}
      </div>
    </div>
  );
}
