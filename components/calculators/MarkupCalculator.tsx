"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatPercent } from "@/lib/regions";

export default function MarkupCalculator() {
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

  const initialMode = sp.get("mode") === "reverse" ? "reverse" : "forward";
  const [mode, setMode] = useState<"forward" | "reverse">(initialMode);
  const [cost, setCost] = useState(sp.get("cost") ?? "40");
  const [markupPct, setMarkupPct] = useState(sp.get("markup") ?? "50");
  const [sellingPrice, setSellingPrice] = useState(sp.get("price") ?? "60");

  const costN = parseFloat(cost) || 0;
  const markupN = parseFloat(markupPct) || 0;
  const sellingN = parseFloat(sellingPrice) || 0;

  let computedSelling = 0;
  let computedMarkup = 0;
  let profit = 0;
  let marginPct = 0;

  if (mode === "forward") {
    computedSelling = costN * (1 + markupN / 100);
    computedMarkup = markupN;
    profit = computedSelling - costN;
    marginPct = computedSelling > 0 ? (profit / computedSelling) * 100 : 0;
  } else {
    computedSelling = sellingN;
    profit = sellingN - costN;
    computedMarkup = costN > 0 ? (profit / costN) * 100 : 0;
    marginPct = sellingN > 0 ? (profit / sellingN) * 100 : 0;
  }

  const tier = marginPct >= 30 ? "good" : marginPct >= 15 ? "caution" : "bad";

  const copyText = [
    `Markup — ${cfg.label}`,
    `Cost: ${formatCurrency(costN, region)}`,
    `Markup: ${formatPercent(computedMarkup)}`,
    `Selling Price: ${formatCurrency(computedSelling, region)}`,
    `Profit: ${formatCurrency(profit, region)}`,
    `Implied Margin: ${formatPercent(marginPct)}`,
  ].join("\n");

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <RegionToggle region={region} onChange={setRegion} />
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 text-sm">
          <button
            type="button"
            onClick={() => setMode("forward")}
            className={`rounded-md px-3 py-1.5 font-medium ${mode === "forward" ? "bg-brand-primary text-white" : "text-brand-dark hover:bg-brand-light"}`}
          >
            Cost → Price
          </button>
          <button
            type="button"
            onClick={() => setMode("reverse")}
            className={`rounded-md px-3 py-1.5 font-medium ${mode === "reverse" ? "bg-brand-primary text-white" : "text-brand-dark hover:bg-brand-light"}`}
          >
            Price → Markup
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
            helper="What the product costs you"
          />
          {mode === "forward" ? (
            <InputField
              label="Markup Percentage"
              value={markupPct}
              onChange={setMarkupPct}
              suffix="%"
              helper="Percentage added on top of cost"
            />
          ) : (
            <InputField
              label="Selling Price"
              value={sellingPrice}
              onChange={setSellingPrice}
              prefix={cfg.symbol}
              helper="What you charge — we'll compute implied markup"
            />
          )}
        </div>

        <div className="space-y-4">
          <ResultCard
            primary
            label={mode === "forward" ? "Selling Price" : "Implied Markup"}
            value={
              mode === "forward"
                ? formatCurrency(computedSelling, region)
                : formatPercent(computedMarkup)
            }
            tier={tier}
            interpretation={
              marginPct >= 30
                ? "Healthy margin on this markup."
                : marginPct >= 15
                  ? "Workable but tight — leaves little room for discounting."
                  : "Margin is too thin to absorb returns, fees, or discounts."
            }
            hint={`Profit per unit: ${formatCurrency(profit, region)}`}
          />
          <ResultCard
            label="Implied Margin"
            value={formatPercent(marginPct)}
            hint="Margin and markup are different numbers for the same sale"
          />
          <ResultCard
            label={mode === "forward" ? "Markup Used" : "Selling Price"}
            value={
              mode === "forward"
                ? formatPercent(computedMarkup)
                : formatCurrency(computedSelling, region)
            }
          />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="price" />
    </div>
  );
}
