"use client";

import { useState } from "react";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency } from "@/lib/regions";

export default function BusinessValuationCalculator() {
  const [region, setRegion] = useRegion();
  const cfg = REGIONS[region];

  const [revenue, setRevenue] = useState("750000");
  const [ebitda, setEbitda] = useState("150000");
  const [revenueMultiple, setRevenueMultiple] = useState("1.5");
  const [ebitdaMultiple, setEbitdaMultiple] = useState("5");
  const [fcf, setFcf] = useState("120000");
  const [discountRate, setDiscountRate] = useState("20");
  const [growthRate, setGrowthRate] = useState("10");

  const rev = parseFloat(revenue) || 0;
  const eb = parseFloat(ebitda) || 0;
  const rm = parseFloat(revenueMultiple) || 0;
  const em = parseFloat(ebitdaMultiple) || 0;
  const cashFlow = parseFloat(fcf) || 0;
  const dr = (parseFloat(discountRate) || 0) / 100;
  const gr = (parseFloat(growthRate) || 0) / 100;

  const revenueValuation = rev * rm;
  const ebitdaValuation = eb * em;

  // DCF: 5-year projected FCF + terminal value
  let dcfValuation = 0;
  if (dr > gr && cashFlow > 0) {
    for (let n = 1; n <= 5; n++) {
      const projected = cashFlow * Math.pow(1 + gr, n);
      dcfValuation += projected / Math.pow(1 + dr, n);
    }
    const terminalFcf = cashFlow * Math.pow(1 + gr, 6);
    const terminalValue = terminalFcf / (dr - gr);
    dcfValuation += terminalValue / Math.pow(1 + dr, 5);
  }

  const valuations = [revenueValuation, ebitdaValuation, dcfValuation].filter(
    (v) => v > 0
  );
  const low = valuations.length > 0 ? Math.min(...valuations) : 0;
  const high = valuations.length > 0 ? Math.max(...valuations) : 0;
  const mid = valuations.length > 0 ? valuations.reduce((a, b) => a + b, 0) / valuations.length : 0;

  const copyText = [
    `Business Valuation — ${cfg.label}`,
    `Revenue × Multiple: ${formatCurrency(revenueValuation, region)} (${rm}× of ${formatCurrency(rev, region)})`,
    `EBITDA × Multiple: ${formatCurrency(ebitdaValuation, region)} (${em}× of ${formatCurrency(eb, region)})`,
    `DCF Valuation: ${formatCurrency(dcfValuation, region)} (${(dr * 100).toFixed(0)}% discount, ${(gr * 100).toFixed(0)}% growth)`,
    `Range: ${formatCurrency(low, region)} – ${formatCurrency(high, region)}`,
    `Midpoint: ${formatCurrency(mid, region)}`,
  ].join("\n");

  return (
    <div>
      <div className="mb-4">
        <RegionToggle region={region} onChange={setRegion} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Financial inputs
          </h2>
          <InputField label="Annual Revenue (last 12 mo)" value={revenue} onChange={setRevenue} prefix={cfg.symbol} />
          <InputField label="EBITDA" value={ebitda} onChange={setEbitda} prefix={cfg.symbol} helper="Earnings before interest, tax, depreciation & amortisation" />
          <InputField label="Annual Free Cash Flow" value={fcf} onChange={setFcf} prefix={cfg.symbol} helper="For the DCF method" />
        </div>

        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Multiples &amp; assumptions
          </h2>
          <InputField label="Revenue Multiple" value={revenueMultiple} onChange={setRevenueMultiple} suffix="×" helper="Service 1–3×, SaaS 3–8×, retail 0.5–1.5×" />
          <InputField label="EBITDA Multiple" value={ebitdaMultiple} onChange={setEbitdaMultiple} suffix="×" helper="Service 4–6×, manufacturing 5–7×" />
          <InputField label="Discount Rate" value={discountRate} onChange={setDiscountRate} suffix="%" helper="Investor required return — 15–25% typical for SMEs" />
          <InputField label="Growth Rate" value={growthRate} onChange={setGrowthRate} suffix="%" helper="Expected annual growth for DCF terminal value" />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <ResultCard
          label="Revenue Multiple"
          value={formatCurrency(revenueValuation, region)}
          hint={`${rm}× annual revenue — for high-growth or pre-profit businesses`}
        />
        <ResultCard
          label="EBITDA Multiple"
          value={formatCurrency(ebitdaValuation, region)}
          hint={`${em}× EBITDA — most reliable for profitable businesses`}
        />
        <ResultCard
          label="DCF Valuation (5-yr)"
          value={formatCurrency(dcfValuation, region)}
          hint="Present value of projected cash flows + terminal value"
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <ResultCard
          primary
          label="Valuation midpoint"
          value={formatCurrency(mid, region)}
          tier="good"
          hint={`Range: ${formatCurrency(low, region)} – ${formatCurrency(high, region)}`}
        />
        <ResultCard
          label="High estimate"
          value={formatCurrency(high, region)}
          hint="Anchor for negotiation ceiling"
        />
      </div>

      <CalculatorActions copyText={copyText} label="valuation" />
    </div>
  );
}
