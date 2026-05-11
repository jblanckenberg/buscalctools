"use client";

import { useEffect, useState } from "react";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatPercent } from "@/lib/regions";
import {
  calcProfitMargin,
  marginTier,
  operatingMarginTier,
} from "@/lib/calculations/profit-margin";

export default function ProfitMarginCalculator() {
  const [region, setRegion] = useRegion();
  const cfg = REGIONS[region];

  const [revenue, setRevenue] = useState("50000");
  const [cogs, setCogs] = useState("30000");
  const [opEx, setOpEx] = useState("");
  const [taxRate, setTaxRate] = useState(String(cfg.corporateTaxRate));

  // Re-prefill tax rate when region changes (but don't override custom values silently)
  useEffect(() => {
    setTaxRate(String(REGIONS[region].corporateTaxRate));
  }, [region]);

  const rev = parseFloat(revenue) || 0;
  const cost = parseFloat(cogs) || 0;
  const op = opEx === "" ? undefined : parseFloat(opEx) || 0;
  const tax = taxRate === "" ? undefined : parseFloat(taxRate) || 0;

  const result = calcProfitMargin({
    revenue: rev,
    cogs: cost,
    opEx: op,
    taxRatePct: tax,
  });

  const grossTier = marginTier(result.grossMarginPct);
  const opTier =
    result.operatingMarginPct === null
      ? "neutral"
      : operatingMarginTier(result.operatingMarginPct);
  const netTier =
    result.netMarginPct === null
      ? "neutral"
      : marginTier(result.netMarginPct);

  const copyText = [
    `Profit Margin — ${cfg.label}`,
    `Revenue: ${formatCurrency(rev, region)}`,
    `COGS: ${formatCurrency(cost, region)}`,
    `Gross Profit: ${formatCurrency(result.grossProfit, region)}`,
    `Gross Margin: ${formatPercent(result.grossMarginPct)}`,
    result.operatingMarginPct !== null
      ? `Operating Margin: ${formatPercent(result.operatingMarginPct)}`
      : null,
    result.netMarginPct !== null
      ? `Net Margin: ${formatPercent(result.netMarginPct)}`
      : null,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <RegionToggle region={region} onChange={setRegion} />
        <p className="text-xs text-gray-500">
          Tax rate pre-filled at {cfg.corporateTaxRate}% for {cfg.label}.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Inputs
          </h2>
          <InputField
            label="Revenue / Sales"
            value={revenue}
            onChange={setRevenue}
            prefix={cfg.symbol}
            helper="Total income before any deductions"
          />
          <InputField
            label="Cost of Goods Sold (COGS)"
            value={cogs}
            onChange={setCogs}
            prefix={cfg.symbol}
            helper="Direct costs to produce the product/service"
          />
          <InputField
            label="Operating Expenses (optional)"
            value={opEx}
            onChange={setOpEx}
            prefix={cfg.symbol}
            helper="Rent, salaries, marketing — enables operating margin"
          />
          <InputField
            label="Tax Rate (optional)"
            value={taxRate}
            onChange={setTaxRate}
            suffix="%"
            helper={`Pre-filled for ${cfg.label}. Edit if needed.`}
          />
        </div>

        <div className="space-y-4">
          <ResultCard
            primary
            label="Gross Profit Margin"
            value={formatPercent(result.grossMarginPct)}
            tier={grossTier}
            interpretation={
              result.grossMarginPct >= 40
                ? "Strong gross margin. Pricing and unit economics look healthy."
                : result.grossMarginPct >= 20
                  ? "Healthy gross margin. Some room to push pricing or reduce COGS."
                  : "Thin gross margin. Review pricing or cost of goods urgently."
            }
            hint={`Gross profit: ${formatCurrency(result.grossProfit, region)}`}
          />
          {result.operatingMarginPct !== null && (
            <ResultCard
              label="Operating Profit Margin"
              value={formatPercent(result.operatingMarginPct)}
              tier={opTier as "good" | "caution" | "bad"}
              interpretation={
                result.operatingMarginPct >= 15
                  ? "Operating efficiency is strong after overhead."
                  : "Overhead is eroding margin — review fixed costs."
              }
              hint={`Operating profit: ${formatCurrency(result.operatingProfit ?? 0, region)}`}
            />
          )}
          {result.netMarginPct !== null && (
            <ResultCard
              label="Net Profit Margin (after tax)"
              value={formatPercent(result.netMarginPct)}
              tier={netTier as "good" | "caution" | "bad"}
              interpretation={
                result.netMarginPct >= 10
                  ? "Healthy net margin — bottom line is sustainable."
                  : "Thin net margin — small cost increases could push to a loss."
              }
              hint={`Net profit: ${formatCurrency(result.netProfit ?? 0, region)}`}
            />
          )}
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="margin" />
    </div>
  );
}
