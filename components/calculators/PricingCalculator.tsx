"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatPercent } from "@/lib/regions";
import { D, Decimal, pct, toN } from "@/lib/money";

export default function PricingCalculator() {
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

  const initialMode = sp.get("mode") === "markup" ? "markup" : "margin";
  const [mode, setMode] = useState<"margin" | "markup">(initialMode);
  const [cost, setCost] = useState(sp.get("cost") ?? "20");
  const [marginPct, setMarginPct] = useState(sp.get("margin") ?? "40");
  const [markupPct, setMarkupPct] = useState(sp.get("markup") ?? "50");
  const [taxPct, setTaxPct] = useState(sp.get("tax") ?? String(cfg.consumptionTaxRate));

  useEffect(() => {
    setTaxPct(String(REGIONS[region].consumptionTaxRate));
  }, [region]);

  const costD = D(cost);
  const taxD = D(taxPct);

  let exTaxPriceD: Decimal;
  if (mode === "margin") {
    const m = D(marginPct);
    // Margin must be < 100% or the division blows up; clamp at 0 in that case
    // to match the legacy Infinity → 0 fallback.
    exTaxPriceD = m.lt(100) ? costD.div(new Decimal(1).minus(m.div(100))) : new Decimal(0);
  } else {
    const mk = D(markupPct);
    exTaxPriceD = costD.mul(new Decimal(1).plus(mk.div(100)));
  }

  const incTaxPriceD = exTaxPriceD.mul(new Decimal(1).plus(taxD.div(100)));
  const profitD = exTaxPriceD.minus(costD);
  const equivalentMarkupD = pct(profitD, costD);
  const equivalentMarginD = pct(profitD, exTaxPriceD);

  const costN = toN(costD);
  const tax = toN(taxD);
  const exTaxPrice = toN(exTaxPriceD);
  const incTaxPrice = toN(incTaxPriceD);
  const profit = toN(profitD);
  const equivalentMarkup = toN(equivalentMarkupD);
  const equivalentMargin = toN(equivalentMarginD);

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
