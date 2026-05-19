"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency } from "@/lib/regions";
import { D, Decimal, toN } from "@/lib/money";

export default function BusinessValuationCalculator() {
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

  const [revenue, setRevenue] = useState(sp.get("revenue") ?? "750000");
  const [ebitda, setEbitda] = useState(sp.get("ebitda") ?? "150000");
  const [revenueMultiple, setRevenueMultiple] = useState(sp.get("rev_multiple") ?? "1.5");
  const [ebitdaMultiple, setEbitdaMultiple] = useState(sp.get("ebitda_multiple") ?? "5");
  const [fcf, setFcf] = useState(sp.get("fcf") ?? "120000");
  const [discountRate, setDiscountRate] = useState(sp.get("discount") ?? "20");
  const [growthRate, setGrowthRate] = useState(sp.get("growth") ?? "10");

  const revD = D(revenue);
  const ebD = D(ebitda);
  const rmD = D(revenueMultiple);
  const emD = D(ebitdaMultiple);
  const cashFlowD = D(fcf);
  const drD = D(discountRate).div(100);
  const grD = D(growthRate).div(100);

  const revenueValuationD = revD.mul(rmD);
  const ebitdaValuationD = ebD.mul(emD);

  // DCF: 5-year projected FCF + terminal value. Decimal.pow handles the
  // compounding exponentials with no float drift.
  let dcfValuationD = new Decimal(0);
  if (drD.gt(grD) && cashFlowD.gt(0)) {
    const onePlusGr = new Decimal(1).plus(grD);
    const onePlusDr = new Decimal(1).plus(drD);
    for (let n = 1; n <= 5; n++) {
      const projected = cashFlowD.mul(onePlusGr.pow(n));
      dcfValuationD = dcfValuationD.plus(projected.div(onePlusDr.pow(n)));
    }
    const terminalFcf = cashFlowD.mul(onePlusGr.pow(6));
    const terminalValue = terminalFcf.div(drD.minus(grD));
    dcfValuationD = dcfValuationD.plus(terminalValue.div(onePlusDr.pow(5)));
  }

  const valuationsD = [revenueValuationD, ebitdaValuationD, dcfValuationD].filter(
    (v) => v.gt(0),
  );
  const lowD = valuationsD.length > 0 ? Decimal.min(...valuationsD) : new Decimal(0);
  const highD = valuationsD.length > 0 ? Decimal.max(...valuationsD) : new Decimal(0);
  const midD =
    valuationsD.length > 0
      ? valuationsD.reduce((a, b) => a.plus(b), new Decimal(0)).div(valuationsD.length)
      : new Decimal(0);

  const rev = toN(revD);
  const eb = toN(ebD);
  const rm = toN(rmD);
  const em = toN(emD);
  const dr = toN(drD);
  const gr = toN(grD);
  const revenueValuation = toN(revenueValuationD);
  const ebitdaValuation = toN(ebitdaValuationD);
  const dcfValuation = toN(dcfValuationD);
  const low = toN(lowD);
  const high = toN(highD);
  const mid = toN(midD);

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
