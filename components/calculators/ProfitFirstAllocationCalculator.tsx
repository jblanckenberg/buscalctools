"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency } from "@/lib/regions";
import { D, toN } from "@/lib/money";

export default function ProfitFirstAllocationCalculator() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  );
}

// Mike Michalowicz Profit First TAPs (Target Allocation Percentages) by Real Revenue tier
type Tier = {
  name: string;
  range: string;
  minAnnualRR: number;
  maxAnnualRR: number;
  profit: number;
  ownerPay: number;
  tax: number;
  opex: number;
};

const TIERS: Tier[] = [
  { name: "Tier A", range: "$0 – $250k", minAnnualRR: 0,        maxAnnualRR: 250000,   profit: 5,  ownerPay: 50, tax: 15, opex: 30 },
  { name: "Tier B", range: "$250k – $500k", minAnnualRR: 250000,   maxAnnualRR: 500000,   profit: 10, ownerPay: 35, tax: 15, opex: 40 },
  { name: "Tier C", range: "$500k – $1M",   minAnnualRR: 500000,   maxAnnualRR: 1000000,  profit: 15, ownerPay: 20, tax: 15, opex: 50 },
  { name: "Tier D", range: "$1M – $5M",     minAnnualRR: 1000000,  maxAnnualRR: 5000000,  profit: 10, ownerPay: 10, tax: 15, opex: 65 },
  { name: "Tier E", range: "$5M – $10M",    minAnnualRR: 5000000,  maxAnnualRR: 10000000, profit: 15, ownerPay: 5,  tax: 15, opex: 65 },
];

function findTier(annualRealRevenue: number): Tier {
  for (const t of TIERS) {
    if (annualRealRevenue >= t.minAnnualRR && annualRealRevenue < t.maxAnnualRR) return t;
  }
  return TIERS[TIERS.length - 1]; // Tier E for $10M+
}

function Inner() {
  const sp = useSearchParams();
  const [region, setRegion] = useRegion();
  const cfg = REGIONS[region];

  const [monthlyRevenue, setMonthlyRevenue] = useState(sp.get("revenue") ?? "30000");
  const [materialsPct, setMaterialsPct] = useState(sp.get("materials") ?? "15");

  const revenue = toN(D(monthlyRevenue));
  const matsPct = toN(D(materialsPct)) / 100;

  const monthlyRealRevenue = revenue * (1 - matsPct);
  const annualRealRevenue = monthlyRealRevenue * 12;
  const tier = findTier(annualRealRevenue);

  const profitAllocation = monthlyRealRevenue * (tier.profit / 100);
  const ownerPayAllocation = monthlyRealRevenue * (tier.ownerPay / 100);
  const taxAllocation = monthlyRealRevenue * (tier.tax / 100);
  const opexAllocation = monthlyRealRevenue * (tier.opex / 100);

  const fmt = (v: number) => formatCurrency(v, region);

  const copyText = [
    `Profit First Allocation — ${cfg.label}`,
    `Monthly Revenue: ${fmt(revenue)}`,
    `Materials/Subcontractors: ${(matsPct * 100).toFixed(0)}%`,
    `Monthly Real Revenue: ${fmt(monthlyRealRevenue)}`,
    `Annual Real Revenue: ${fmt(annualRealRevenue)}`,
    `Tier: ${tier.name} (${tier.range})`,
    ``,
    `Profit (${tier.profit}%): ${fmt(profitAllocation)}/mo`,
    `Owner's Pay (${tier.ownerPay}%): ${fmt(ownerPayAllocation)}/mo`,
    `Tax (${tier.tax}%): ${fmt(taxAllocation)}/mo`,
    `OpEx (${tier.opex}%): ${fmt(opexAllocation)}/mo`,
  ].join("\n");

  return (
    <div>
      <div className="mb-4">
        <RegionToggle region={region} onChange={setRegion} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Inputs</h2>
          <InputField label="Monthly Top-Line Revenue" value={monthlyRevenue} onChange={setMonthlyRevenue} prefix={cfg.symbol} helper="Gross revenue before any deductions" />
          <InputField label="Materials &amp; Subcontractors (% of Revenue)" value={materialsPct} onChange={setMaterialsPct} suffix="%" helper="Direct costs that pass through — subtract from revenue to get Real Revenue. Service businesses: 5-15%. Trades: 20-40%. Manufacturers/retailers can be 40-60%." />
        </div>

        <div className="space-y-4">
          <ResultCard
            primary
            label={`${tier.name} (${tier.range} Annual Real Revenue)`}
            value={fmt(monthlyRealRevenue) + " /mo Real Revenue"}
            tier="good"
            interpretation={`Annual Real Revenue ${fmt(annualRealRevenue)} → ${tier.name} TAPs: Profit ${tier.profit}%, Owner's Pay ${tier.ownerPay}%, Tax ${tier.tax}%, OpEx ${tier.opex}%.`}
            hint="Real Revenue = Revenue − Materials & Subcontractors. The pass-through costs aren't your money to allocate."
          />
          <ResultCard label={`💰 Profit (${tier.profit}%)`} value={fmt(profitAllocation) + " /mo"} hint="Quarterly profit distribution — owner reward; never spent on operations" />
          <ResultCard label={`👤 Owner's Pay (${tier.ownerPay}%)`} value={fmt(ownerPayAllocation) + " /mo"} hint="Salary equivalent to the owner" />
          <ResultCard label={`📋 Tax (${tier.tax}%)`} value={fmt(taxAllocation) + " /mo"} hint="Quarterly estimated taxes; sleep at night" />
          <ResultCard label={`🏢 OpEx (${tier.opex}%)`} value={fmt(opexAllocation) + " /mo"} hint="Everything else — rent, salaries, software, marketing" />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="profit-first" />
    </div>
  );
}
