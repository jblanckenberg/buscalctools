"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency } from "@/lib/regions";
import { D, toN } from "@/lib/money";

export default function PriceElasticityCalculator() {
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

  const initialMode = sp.get("mode") === "assumed" ? "assumed" : "measured";
  const [mode, setMode] = useState<"measured" | "assumed">(initialMode);

  // Measured-mode inputs
  const [currentPrice, setCurrentPrice] = useState(sp.get("p1") ?? "20");
  const [currentUnits, setCurrentUnits] = useState(sp.get("q1") ?? "1000");
  const [newPrice, setNewPrice] = useState(sp.get("p2") ?? "22");
  const [newUnits, setNewUnits] = useState(sp.get("q2") ?? "900");

  // Assumed-mode inputs
  const [assumedElasticity, setAssumedElasticity] = useState(sp.get("elasticity") ?? "-1.2");
  const [baselineRevenue, setBaselineRevenue] = useState(sp.get("revenue") ?? "20000");

  let elasticity: number;
  let basePrice: number;
  let baseRevenue: number;

  if (mode === "measured") {
    const p1 = toN(D(currentPrice));
    const p2 = toN(D(newPrice));
    const q1 = toN(D(currentUnits));
    const q2 = toN(D(newUnits));
    // Midpoint (arc) elasticity formula
    const pctQty = p1 > 0 && q1 > 0 ? ((q2 - q1) / ((q1 + q2) / 2)) : 0;
    const pctPrice = p1 > 0 ? ((p2 - p1) / ((p1 + p2) / 2)) : 0;
    elasticity = pctPrice !== 0 ? pctQty / pctPrice : 0;
    basePrice = p1;
    baseRevenue = p1 * q1;
  } else {
    elasticity = toN(D(assumedElasticity));
    basePrice = 0;
    baseRevenue = toN(D(baselineRevenue));
  }

  // Classification
  const absE = Math.abs(elasticity);
  const classification = absE > 1 ? "Elastic" : absE === 1 ? "Unit elastic" : absE > 0 ? "Inelastic" : "Indeterminate";

  // Revenue impact at +5%, +10%, +20% hikes
  function revenueAt(pctHike: number): number {
    // Revenue ratio = (1 + pctHike) × (1 + elasticity × pctHike)
    // Note: pctHike is decimal (e.g. 0.10 for +10%)
    const ratio = (1 + pctHike) * (1 + elasticity * pctHike);
    return baseRevenue * ratio;
  }

  const tier: "good" | "caution" | "bad" =
    absE < 0.5 ? "good" : absE < 1.5 ? "caution" : "bad";

  const interpretation =
    absE < 0.5
      ? "Highly inelastic — customers barely change purchase behaviour with price. Price increases generate near-proportional revenue increases. Brand-loyalty, essential goods, monopoly pricing power."
      : absE < 1
        ? "Inelastic — quantity responds less than proportionally to price. A price hike will increase total revenue. Most B2B products, prescription drugs, certain luxury goods."
        : absE === 1
          ? "Unit elastic — exact 1:1 trade. Price hike fully offset by quantity drop. Revenue unchanged."
          : "Elastic — quantity drops more than price rises. A price hike will REDUCE total revenue. Common in highly competitive markets, commodities, low switching cost.";

  const fmt = (v: number) => formatCurrency(v, region);

  const copyText = [
    `Price Elasticity — ${cfg.label}`,
    mode === "measured"
      ? `From: ${currentPrice} × ${currentUnits} → To: ${newPrice} × ${newUnits}`
      : `Assumed elasticity: ${elasticity.toFixed(2)}`,
    `Elasticity coefficient: ${elasticity.toFixed(2)} (${classification})`,
    ``,
    `Revenue at +5% price: ${fmt(revenueAt(0.05))}`,
    `Revenue at +10% price: ${fmt(revenueAt(0.10))}`,
    `Revenue at +20% price: ${fmt(revenueAt(0.20))}`,
  ].join("\n");

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <RegionToggle region={region} onChange={setRegion} />
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 text-sm">
          <button type="button" onClick={() => setMode("measured")} className={`rounded-md px-3 py-1.5 font-medium ${mode === "measured" ? "bg-brand-primary text-white" : "text-brand-dark hover:bg-brand-light"}`}>Measure from data</button>
          <button type="button" onClick={() => setMode("assumed")} className={`rounded-md px-3 py-1.5 font-medium ${mode === "assumed" ? "bg-brand-primary text-white" : "text-brand-dark hover:bg-brand-light"}`}>Assume elasticity</button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Inputs</h2>
          {mode === "measured" ? (
            <>
              <InputField label="Current Price" value={currentPrice} onChange={setCurrentPrice} prefix={cfg.symbol} />
              <InputField label="Current Units Sold" value={currentUnits} onChange={setCurrentUnits} helper="Over the same measurement period" />
              <InputField label="New Price" value={newPrice} onChange={setNewPrice} prefix={cfg.symbol} />
              <InputField label="New Units Sold" value={newUnits} onChange={setNewUnits} helper="Observed after the price change" />
            </>
          ) : (
            <>
              <InputField label="Assumed Elasticity" value={assumedElasticity} onChange={setAssumedElasticity} helper="Negative (-3 to 0). Most products -0.5 to -2. Necessities ~ -0.3. Luxury/discretionary ~ -1.5 to -3." />
              <InputField label="Baseline Annual Revenue" value={baselineRevenue} onChange={setBaselineRevenue} prefix={cfg.symbol} helper="Current run-rate revenue at current price" />
            </>
          )}
        </div>

        <div className="space-y-4">
          <ResultCard primary label="Elasticity Coefficient" value={elasticity.toFixed(2)} tier={tier} interpretation={interpretation} hint={classification + " demand"} />
          <ResultCard label="Revenue at +5% Price" value={fmt(revenueAt(0.05))} hint={`Change: ${((revenueAt(0.05) / baseRevenue - 1) * 100).toFixed(1)}%`} />
          <ResultCard label="Revenue at +10% Price" value={fmt(revenueAt(0.10))} hint={`Change: ${((revenueAt(0.10) / baseRevenue - 1) * 100).toFixed(1)}%`} />
          <ResultCard label="Revenue at +20% Price" value={fmt(revenueAt(0.20))} hint={`Change: ${((revenueAt(0.20) / baseRevenue - 1) * 100).toFixed(1)}%`} />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="elasticity" />
    </div>
  );
}
