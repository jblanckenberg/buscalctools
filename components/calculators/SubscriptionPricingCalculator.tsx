"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency } from "@/lib/regions";
import { D, toN } from "@/lib/money";

export default function SubscriptionPricingCalculator() {
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

  const [monthlyPrice, setMonthlyPrice] = useState(sp.get("monthly") ?? "30");
  const [annualDiscount, setAnnualDiscount] = useState(sp.get("discount") ?? "17");
  const [monthlyChurn, setMonthlyChurn] = useState(sp.get("mChurn") ?? "5");
  const [annualChurn, setAnnualChurn] = useState(sp.get("aChurn") ?? "20");
  const [grossMargin, setGrossMargin] = useState(sp.get("margin") ?? "80");

  const mp = toN(D(monthlyPrice));
  const disc = toN(D(annualDiscount)) / 100;
  const mc = toN(D(monthlyChurn)) / 100;
  const ac = toN(D(annualChurn)) / 100;
  const gm = toN(D(grossMargin)) / 100;

  // Lifespans
  const monthlyLifespanMonths = mc > 0 ? 1 / mc : 0;
  const annualLifespanYears = ac > 0 ? 1 / ac : 0;

  // LTVs in gross-margin contribution
  const monthlyLTV = mp * gm * monthlyLifespanMonths;
  const annualPricePerYear = mp * 12 * (1 - disc);
  const annualLTV = annualPricePerYear * gm * annualLifespanYears;

  // Break-even discount: discount at which annual LTV = monthly LTV
  // Solve: mp × 12 × (1-d) × gm × annualLifespanYears = monthlyLTV
  //        (1-d) = monthlyLTV / (mp × 12 × gm × annualLifespanYears)
  const breakEvenDiscount = mp > 0 && annualLifespanYears > 0
    ? Math.max(0, 1 - monthlyLTV / (mp * 12 * gm * annualLifespanYears)) * 100
    : 0;

  const winner = annualLTV > monthlyLTV ? "Annual" : "Monthly";
  const advantage = Math.abs(annualLTV - monthlyLTV);

  const tier: "good" | "caution" | "bad" =
    annualLTV > monthlyLTV * 1.2 ? "good" : annualLTV >= monthlyLTV ? "caution" : "bad";

  const interpretation =
    annualLTV > monthlyLTV
      ? `Annual at ${(disc * 100).toFixed(0)}% discount beats monthly by ${formatCurrency(advantage, region)} per customer. The retention boost (${(ac * 100).toFixed(0)}% annual churn vs ${(mc * 100).toFixed(0)}% monthly) more than pays for the discount.`
      : `Monthly LTV is higher by ${formatCurrency(advantage, region)}. Your annual discount is too generous given the retention gap — drop it to no more than ${breakEvenDiscount.toFixed(1)}%.`;

  const fmt = (v: number) => formatCurrency(v, region);

  const copyText = [
    `Subscription Pricing — ${cfg.label}`,
    `Monthly Price: ${fmt(mp)}`,
    `Annual Price: ${fmt(annualPricePerYear)} (${(disc * 100).toFixed(0)}% discount)`,
    `Monthly Churn: ${(mc * 100).toFixed(1)}% (lifespan ${monthlyLifespanMonths.toFixed(0)} months)`,
    `Annual Churn: ${(ac * 100).toFixed(1)}% (lifespan ${annualLifespanYears.toFixed(1)} years)`,
    `Gross Margin: ${(gm * 100).toFixed(0)}%`,
    ``,
    `Monthly LTV: ${fmt(monthlyLTV)}`,
    `Annual LTV: ${fmt(annualLTV)}`,
    `Break-even discount: ${breakEvenDiscount.toFixed(1)}%`,
  ].join("\n");

  return (
    <div>
      <div className="mb-4">
        <RegionToggle region={region} onChange={setRegion} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Inputs
          </h2>
          <InputField label="Monthly Price" value={monthlyPrice} onChange={setMonthlyPrice} prefix={cfg.symbol} />
          <InputField label="Annual Discount" value={annualDiscount} onChange={setAnnualDiscount} suffix="%" helper="17% = the standard '2 months free' annual deal" />
          <InputField label="Monthly Churn Rate" value={monthlyChurn} onChange={setMonthlyChurn} suffix="%" helper="Typical SaaS 3-7%; consumer 5-10%; B2B enterprise 1-3%" />
          <InputField label="Annual Churn Rate" value={annualChurn} onChange={setAnnualChurn} suffix="%" helper="Typically 2-3× lower than monthly × 12 due to commitment" />
          <InputField label="Gross Margin" value={grossMargin} onChange={setGrossMargin} suffix="%" helper="Revenue minus variable cost of delivery (hosting, support, payment fees)" />
        </div>

        <div className="space-y-4">
          <ResultCard
            primary
            label="LTV Winner"
            value={winner}
            tier={tier}
            interpretation={interpretation}
            hint={`Monthly LTV: ${fmt(monthlyLTV)}  •  Annual LTV: ${fmt(annualLTV)}`}
          />
          <ResultCard label="Monthly Plan LTV" value={fmt(monthlyLTV)} hint={`Price × margin × ${monthlyLifespanMonths.toFixed(0)} month lifespan`} />
          <ResultCard label="Annual Plan LTV" value={fmt(annualLTV)} hint={`Discounted price × margin × ${annualLifespanYears.toFixed(1)} year lifespan`} />
          <ResultCard label="Break-Even Discount" value={`${breakEvenDiscount.toFixed(1)}%`} hint="At this discount, annual LTV exactly equals monthly LTV" />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="subscription-pricing" />
    </div>
  );
}
