"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatPercent } from "@/lib/regions";
import { D, Decimal, pct, toN } from "@/lib/money";

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

  const costD = D(cost);
  const markupD = D(markupPct);
  const sellingD = D(sellingPrice);

  let computedSellingD: Decimal;
  let computedMarkupD: Decimal;
  let profitD: Decimal;
  let marginPctD: Decimal;

  if (mode === "forward") {
    computedSellingD = costD.mul(new Decimal(1).plus(markupD.div(100)));
    computedMarkupD = markupD;
    profitD = computedSellingD.minus(costD);
    marginPctD = pct(profitD, computedSellingD);
  } else {
    computedSellingD = sellingD;
    profitD = sellingD.minus(costD);
    computedMarkupD = pct(profitD, costD);
    marginPctD = pct(profitD, sellingD);
  }

  const costN = toN(costD);
  const computedSelling = toN(computedSellingD);
  const computedMarkup = toN(computedMarkupD);
  const profit = toN(profitD);
  const marginPct = toN(marginPctD);

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
