"use client";

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

type Props = {
  data: { units: number; revenue: number; totalCost: number }[];
  breakEvenUnits: number;
  currencySymbol: string;
};

export default function BreakEvenChart({
  data,
  breakEvenUnits,
  currencySymbol,
}: Props) {
  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
        Break-even chart
      </h3>
      <div className="h-72 w-full">
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
      </div>
    </div>
  );
}
