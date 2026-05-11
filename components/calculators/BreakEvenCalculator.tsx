"use client";

import { useEffect, useMemo, useState } from "react";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatNumber } from "@/lib/regions";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function BreakEvenCalculator() {
  const [region, setRegion] = useRegion();
  const cfg = REGIONS[region];

  const [fixedCosts, setFixedCosts] = useState("5000");
  const [variableCost, setVariableCost] = useState("10");
  const [sellingPrice, setSellingPrice] = useState("25");
  const [targetProfit, setTargetProfit] = useState("");

  const fc = parseFloat(fixedCosts) || 0;
  const vc = parseFloat(variableCost) || 0;
  const sp = parseFloat(sellingPrice) || 0;
  const tp = targetProfit === "" ? null : parseFloat(targetProfit) || 0;

  const contribution = sp - vc;
  const breakEvenUnits = contribution > 0 ? Math.ceil(fc / contribution) : 0;
  const breakEvenRevenue = breakEvenUnits * sp;
  const targetUnits =
    tp !== null && contribution > 0 ? Math.ceil((fc + tp) / contribution) : null;

  const chartData = useMemo(() => {
    const maxUnits = Math.max(breakEvenUnits * 2, 10);
    const step = Math.max(1, Math.floor(maxUnits / 12));
    const points = [];
    for (let u = 0; u <= maxUnits; u += step) {
      points.push({
        units: u,
        revenue: u * sp,
        totalCost: fc + u * vc,
      });
    }
    return points;
  }, [breakEvenUnits, sp, fc, vc]);

  const tier = contribution <= 0 ? "bad" : breakEvenUnits > 1000 ? "caution" : "good";

  const copyText = [
    `Break-Even — ${cfg.label}`,
    `Fixed Costs: ${formatCurrency(fc, region)}`,
    `Variable Cost / Unit: ${formatCurrency(vc, region)}`,
    `Selling Price / Unit: ${formatCurrency(sp, region)}`,
    `Contribution Margin: ${formatCurrency(contribution, region)}`,
    `Break-Even Units: ${formatNumber(breakEvenUnits)}`,
    `Break-Even Revenue: ${formatCurrency(breakEvenRevenue, region)}`,
    targetUnits !== null ? `Units for Target Profit: ${formatNumber(targetUnits)}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div>
      <div className="mb-4">
        <RegionToggle region={region} onChange={setRegion} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Inputs
          </h2>
          <InputField
            label="Fixed Costs (monthly)"
            value={fixedCosts}
            onChange={setFixedCosts}
            prefix={cfg.symbol}
            helper="Rent, salaries, insurance — costs that don't change with output"
          />
          <InputField
            label="Variable Cost Per Unit"
            value={variableCost}
            onChange={setVariableCost}
            prefix={cfg.symbol}
            helper="Materials, packaging, commission — costs per unit sold"
          />
          <InputField
            label="Selling Price Per Unit"
            value={sellingPrice}
            onChange={setSellingPrice}
            prefix={cfg.symbol}
          />
          <InputField
            label="Target Profit (optional)"
            value={targetProfit}
            onChange={setTargetProfit}
            prefix={cfg.symbol}
            helper="Extends to: units needed to hit a profit target"
          />
        </div>

        <div className="space-y-4">
          <ResultCard
            primary
            label="Break-Even Units"
            value={contribution > 0 ? formatNumber(breakEvenUnits) : "Not viable"}
            tier={tier}
            interpretation={
              contribution <= 0
                ? "Selling price is below variable cost — every sale loses money. Raise price or reduce variable cost."
                : `You need to sell ${formatNumber(breakEvenUnits)} units to cover all costs.`
            }
            hint={`Contribution margin per unit: ${formatCurrency(contribution, region)}`}
          />
          <ResultCard
            label="Break-Even Revenue"
            value={formatCurrency(breakEvenRevenue, region)}
            hint="Total revenue needed to cover fixed + variable costs"
          />
          {targetUnits !== null && (
            <ResultCard
              label="Units for Target Profit"
              value={formatNumber(targetUnits)}
              hint={`Sell this many units to clear ${formatCurrency(tp ?? 0, region)} in profit`}
            />
          )}
        </div>
      </div>

      <BreakEvenChart
        data={chartData}
        breakEvenUnits={breakEvenUnits}
        currencySymbol={cfg.symbol}
      />

      <CalculatorActions copyText={copyText} label="break-even" />
    </div>
  );
}

function BreakEvenChart({
  data,
  breakEvenUnits,
  currencySymbol,
}: {
  data: { units: number; revenue: number; totalCost: number }[];
  breakEvenUnits: number;
  currencySymbol: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
        Break-even chart
      </h3>
      <div className="h-72 w-full">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="units"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                label={{ value: "Units sold", position: "insideBottom", offset: -2, fontSize: 11 }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickFormatter={(v) => `${currencySymbol}${Math.round(v).toLocaleString()}`}
                width={70}
              />
              <Tooltip
                formatter={(value: number) => `${currencySymbol}${Math.round(value).toLocaleString()}`}
              />
              <Legend />
              <Line type="linear" dataKey="revenue" name="Total Revenue" stroke="#10B981" strokeWidth={2} dot={false} />
              <Line type="linear" dataKey="totalCost" name="Total Cost" stroke="#EF4444" strokeWidth={2} dot={false} />
              <ReferenceLine x={breakEvenUnits} stroke="#1A56DB" strokeDasharray="4 4" label={{ value: "Break-even", fill: "#1A56DB", fontSize: 11 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full animate-pulse rounded-md bg-brand-light" />
        )}
      </div>
    </div>
  );
}
