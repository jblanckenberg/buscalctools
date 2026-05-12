"use client";

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

type Props = {
  rows: { month: string; balance: number }[];
  currencySymbol: string;
};

export default function CashFlowChart({ rows, currencySymbol }: Props) {
  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
        Running cash balance
      </h3>
      <div className="h-72 w-full">
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
      </div>
    </div>
  );
}
