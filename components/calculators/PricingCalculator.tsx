"use client";

import { useEffect, useState } from "react";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatPercent } from "@/lib/regions";

export default function PricingCalculator() {
  const [region, setRegion] = useRegion();
  const cfg = REGIONS[region];

  const [mode, setMode] = useState<"margin" | "markup">("margin");
  const [cost, setCost] = useState("20");
  const [marginPct, setMarginPct] = useState("40");
  const [markupPct, setMarkupPct] = useState("50");
  const [taxPct, setTaxPct] = useState(String(cfg.consumptionTaxRate));

  useEffect(() => {
    setTaxPct(String(REGIONS[region].consumptionTaxRate));
  }, [region]);

  const costN = parseFloat(cost) || 0;
  const tax = parseFloat(taxPct) || 0;

  let exTaxPrice = 0;
  if (mode === "margin") {
    const m = parseFloat(marginPct) || 0;
    exTaxPrice = m < 100 ? costN / (1 - m / 100) : Infinity;
  } else {
    const mk = parseFloat(markupPct) || 0;
    exTaxPrice = costN * (1 + mk / 100);
  }
  if (!Number.isFinite(exTaxPrice)) exTaxPrice = 0;

  const incTaxPrice = exTaxPrice * (1 + tax / 100);
  const profit = exTaxPrice - costN;
  const equivalentMarkup = costN > 0 ? (profit / costN) * 100 : 0;
  const equivalentMargin = exTaxPrice > 0 ? (profit / exTaxPrice) * 100 : 0;

  const tier =
    equivalentMargin >= 30 ? "good" : equivalentMargin >= 15 ? "caution" : "bad";

  const copyText = [
    `Pricing — ${cfg.label}`,
    `Cost: ${formatCurrency(costN, region)}`,
    `Target ${mode === "margin" ? "Margin" : "Markup"}: ${formatPercent(mode === "margin" ? parseFloat(marginPct) || 0 : parseFloat(markupPct) || 0)}`,
    `Selling Price (ex-${cfg.consumptionTaxLabel.toLowerCase()}): ${formatCurrency(exTaxPrice, region)}`,
    tax > 0 ? `Selling Price (inc-${cfg.consumptionTaxLabel.toLowerCase()}): ${formatCurrency(incTaxPrice, region)}` : null,
    `Profit per unit: ${formatCurrency(profit, region)}`,
    `Equivalent ${mode === "margin" ? "Markup" : "Margin"}: ${formatPercent(mode === "margin" ? equivalentMarkup : equivalentMargin)}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <RegionToggle region={region} onChange={setRegion} />
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 text-sm">
          <button
            type="button"
            onClick={() => setMode("margin")}
            className={`rounded-md px-3 py-1.5 font-medium ${mode === "margin" ? "bg-brand-primary text-white" : "text-brand-dark hover:bg-brand-light"}`}
          >
            From Margin
          </button>
          <button
            type="button"
            onClick={() => setMode("markup")}
            className={`rounded-md px-3 py-1.5 font-medium ${mode === "markup" ? "bg-brand-primary text-white" : "text-brand-dark hover:bg-brand-light"}`}
          >
            From Markup
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Inputs
          </h2>
          <InputField
            label="Cost Price"
            value={cost}
            onChange={setCost}
            prefix={cfg.symbol}
            helper="Your total cost to produce or acquire"
          />
          {mode === "margin" ? (
            <InputField
              label="Target Gross Margin"
              value={marginPct}
              onChange={setMarginPct}
              suffix="%"
              helper="Profit as a percentage of selling price"
            />
          ) : (
            <InputField
              label="Target Markup"
              value={markupPct}
              onChange={setMarkupPct}
              suffix="%"
              helper="Percentage added on top of cost"
            />
          )}
          <InputField
            label={`${cfg.consumptionTaxLabel} (optional)`}
            value={taxPct}
            onChange={setTaxPct}
            suffix="%"
            helper={`Pre-filled at ${cfg.consumptionTaxRate}% for ${cfg.label}`}
          />
        </div>

        <div className="space-y-4">
          <ResultCard
            primary
            label={`Recommended Price (ex-${cfg.consumptionTaxLabel.toLowerCase()})`}
            value={formatCurrency(exTaxPrice, region)}
            tier={tier}
            interpretation={
              equivalentMargin >= 30
                ? "Healthy margin at this price."
                : equivalentMargin >= 15
                  ? "Workable margin — leaves limited room for discounting."
                  : "Margin is thin — consider higher price or lower cost."
            }
            hint={`Profit per unit: ${formatCurrency(profit, region)}`}
          />
          {tax > 0 && (
            <ResultCard
              label={`Selling Price (inc-${cfg.consumptionTaxLabel.toLowerCase()})`}
              value={formatCurrency(incTaxPrice, region)}
              hint={`Includes ${cfg.consumptionTaxLabel} at ${formatPercent(tax)}`}
            />
          )}
          <ResultCard
            label={mode === "margin" ? "Equivalent Markup" : "Equivalent Margin"}
            value={formatPercent(mode === "margin" ? equivalentMarkup : equivalentMargin)}
            hint="Margin and markup are two views of the same sale"
          />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="price" />
    </div>
  );
}
