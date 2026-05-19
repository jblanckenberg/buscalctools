"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatPercent } from "@/lib/regions";
import { D, Decimal, pct, toN } from "@/lib/money";

export default function NetProfitCalculator() {
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

  const [revenue, setRevenue] = useState(sp.get("revenue") ?? "500000");
  const [cogs, setCogs] = useState(sp.get("cogs") ?? "250000");
  const [opEx, setOpEx] = useState(sp.get("opex") ?? "150000");
  const [interest, setInterest] = useState(sp.get("interest") ?? "8000");
  const [taxRate, setTaxRate] = useState(sp.get("tax") ?? String(cfg.corporateTaxRate));

  useEffect(() => {
    setTaxRate(String(REGIONS[region].corporateTaxRate));
  }, [region]);

  const revD = D(revenue);
  const costD = D(cogs);
  const opD = D(opEx);
  const intExpD = D(interest);
  const taxRateD = D(taxRate);

  const grossProfitD = revD.minus(costD);
  const ebitD = grossProfitD.minus(opD);
  const ebtD = ebitD.minus(intExpD);
  const taxAmountD = ebtD.gt(0) ? ebtD.mul(taxRateD.div(100)) : new Decimal(0);
  const netProfitD = ebtD.minus(taxAmountD);
  const netMarginPctD = pct(netProfitD, revD);

  const rev = toN(revD);
  const cost = toN(costD);
  const op = toN(opD);
  const intExp = toN(intExpD);
  const tax = toN(taxRateD);
  const grossProfit = toN(grossProfitD);
  const ebit = toN(ebitD);
  const ebt = toN(ebtD);
  const taxAmount = toN(taxAmountD);
  const netProfit = toN(netProfitD);
  const netMarginPct = toN(netMarginPctD);

  const tier = netMarginPct >= 10 ? "good" : netMarginPct >= 0 ? "caution" : "bad";

  const copyText = [
    `Net Profit — ${cfg.label}`,
    `Revenue: ${formatCurrency(rev, region)}`,
    `Gross Profit: ${formatCurrency(grossProfit, region)}`,
    `Operating Profit (EBIT): ${formatCurrency(ebit, region)}`,
    `EBT: ${formatCurrency(ebt, region)}`,
    `Tax (${tax}%): ${formatCurrency(taxAmount, region)}`,
    `Net Profit: ${formatCurrency(netProfit, region)}`,
    `Net Margin: ${formatPercent(netMarginPct)}`,
  ].join("\n");

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <RegionToggle region={region} onChange={setRegion} />
        <p className="text-xs text-gray-500">
          Tax pre-filled at {cfg.corporateTaxRate}% for {cfg.label}.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Inputs
          </h2>
          <InputField label="Total Revenue" value={revenue} onChange={setRevenue} prefix={cfg.symbol} />
          <InputField label="Cost of Goods Sold" value={cogs} onChange={setCogs} prefix={cfg.symbol} />
          <InputField label="Operating Expenses" value={opEx} onChange={setOpEx} prefix={cfg.symbol} helper="Rent, salaries, marketing, utilities" />
          <InputField label="Interest Expense" value={interest} onChange={setInterest} prefix={cfg.symbol} helper="Loan interest paid in the period" />
          <InputField label="Tax Rate" value={taxRate} onChange={setTaxRate} suffix="%" />
        </div>

        <div className="space-y-3">
          <WaterfallRow label="Revenue" value={rev} region={region} bold />
          <WaterfallRow label="− COGS" value={-cost} region={region} dim />
          <WaterfallRow label="Gross Profit" value={grossProfit} region={region} divider />
          <WaterfallRow label="− Operating Expenses" value={-op} region={region} dim />
          <WaterfallRow label="Operating Profit (EBIT)" value={ebit} region={region} divider />
          <WaterfallRow label="− Interest" value={-intExp} region={region} dim />
          <WaterfallRow label="EBT" value={ebt} region={region} divider />
          <WaterfallRow label={`− Tax (${tax}%)`} value={-taxAmount} region={region} dim />
          <ResultCard
            primary
            label="Net Profit"
            value={formatCurrency(netProfit, region)}
            tier={tier}
            interpretation={
              netMarginPct >= 10
                ? "Healthy net margin — bottom line is sustainable."
                : netMarginPct >= 0
                  ? "Thin net profit — small cost increases could push to a loss."
                  : "Operating at a loss after tax."
            }
            hint={`Net Margin: ${formatPercent(netMarginPct)}`}
          />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="net profit" />
    </div>
  );
}

function WaterfallRow({
  label,
  value,
  region,
  bold,
  dim,
  divider,
}: {
  label: string;
  value: number;
  region: ReturnType<typeof useRegion>[0];
  bold?: boolean;
  dim?: boolean;
  divider?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm ${
        bold ? "font-semibold text-brand-dark" : ""
      } ${dim ? "text-gray-600" : ""} ${divider ? "border-l-4 border-l-brand-primary" : ""}`}
    >
      <span>{label}</span>
      <span className={`font-mono ${value < 0 ? "text-brand-danger" : "text-brand-dark"}`}>
        {formatCurrency(value, region)}
      </span>
    </div>
  );
}
