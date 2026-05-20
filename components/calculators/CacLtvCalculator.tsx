"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency } from "@/lib/regions";
import { D, toN } from "@/lib/money";

export default function CacLtvCalculator() {
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

  const [spend, setSpend] = useState(sp.get("spend") ?? "30000");
  const [newCustomers, setNewCustomers] = useState(sp.get("customers") ?? "150");
  const [avgRevenue, setAvgRevenue] = useState(sp.get("arpu") ?? "60");
  const [grossMargin, setGrossMargin] = useState(sp.get("margin") ?? "70");
  const [lifespan, setLifespan] = useState(sp.get("lifespan") ?? "24");

  const spendD = D(spend);
  const newCD = D(newCustomers);
  const arpuD = D(avgRevenue);
  const marginD = D(grossMargin);
  const lifeD = D(lifespan);

  // CAC = sales/marketing spend / new customers acquired
  const cacD = newCD.gt(0) ? spendD.div(newCD) : D(0);
  // LTV = ARPU × gross margin % × lifespan months
  const ltvD = arpuD.mul(marginD.div(100)).mul(lifeD);
  // Ratio
  const ratioD = cacD.gt(0) ? ltvD.div(cacD) : D(0);
  // Payback period in months = CAC / (ARPU × gross margin)
  const monthlyContrib = toN(arpuD.mul(marginD.div(100)));
  const paybackD = monthlyContrib > 0 ? cacD.div(D(monthlyContrib)) : D(0);

  const cac = toN(cacD);
  const ltv = toN(ltvD);
  const ratio = toN(ratioD);
  const payback = toN(paybackD);

  // Health flag — David Skok's SaaS conventional wisdom
  const tier: "good" | "caution" | "bad" =
    ratio >= 3 ? "good" : ratio >= 1 ? "caution" : "bad";

  const healthLabel =
    ratio >= 5 ? "Excellent" : ratio >= 3 ? "Healthy" : ratio >= 1 ? "Marginal" : "Burning cash";

  const interpretation =
    ratio >= 3
      ? `LTV is ${ratio.toFixed(1)}× CAC — well above the 3× SaaS-rule threshold. The acquisition engine pays for itself comfortably.`
      : ratio >= 1
        ? `LTV is ${ratio.toFixed(1)}× CAC — covering costs but with no margin for fixed overhead, R&amp;D, or runway. Investors flag this band as &quot;not yet sustainable&quot;.`
        : `LTV is ${ratio.toFixed(1)}× CAC — every customer acquired loses money over their lifetime. This is the textbook failure pattern for VC-funded growth.`;

  const copyText = [
    `CAC / LTV — ${cfg.label}`,
    `Sales & Marketing Spend: ${formatCurrency(toN(spendD), region)}`,
    `New Customers: ${toN(newCD).toLocaleString()}`,
    `CAC: ${formatCurrency(cac, region)}`,
    ``,
    `Avg Monthly Revenue / Customer: ${formatCurrency(toN(arpuD), region)}`,
    `Gross Margin: ${grossMargin}%`,
    `Avg Lifespan: ${lifespan} months`,
    `LTV: ${formatCurrency(ltv, region)}`,
    ``,
    `LTV / CAC Ratio: ${ratio.toFixed(2)}×  (${healthLabel})`,
    `Payback Period: ${payback.toFixed(1)} months`,
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
          <InputField
            label="Sales &amp; Marketing Spend (period)"
            value={spend}
            onChange={setSpend}
            prefix={cfg.symbol}
            helper="All-in: ads, sales salaries, tools, content production for the period"
          />
          <InputField
            label="New Customers Acquired (same period)"
            value={newCustomers}
            onChange={setNewCustomers}
            helper="Net new — exclude expansions or re-activations of existing accounts"
          />
          <InputField
            label="Average Monthly Revenue / Customer (ARPU)"
            value={avgRevenue}
            onChange={setAvgRevenue}
            prefix={cfg.symbol}
            helper="Recurring revenue per active customer per month"
          />
          <InputField
            label="Gross Margin (%)"
            value={grossMargin}
            onChange={setGrossMargin}
            suffix="%"
            helper="Revenue minus variable cost of delivery (hosting, support, payment processing)"
          />
          <InputField
            label="Average Customer Lifespan (months)"
            value={lifespan}
            onChange={setLifespan}
            suffix="mo"
            helper="1 / monthly churn rate. 2% monthly churn = 50-month lifespan. SaaS averages 24-36 months."
          />
        </div>

        <div className="space-y-4">
          <ResultCard
            primary
            label="LTV / CAC Ratio"
            value={cac > 0 ? `${ratio.toFixed(2)}×` : "Need CAC inputs"}
            tier={tier}
            interpretation={interpretation}
            hint={`Health: ${healthLabel} — SaaS rule of thumb is 3× minimum, 5× excellent`}
          />
          <ResultCard
            label="CAC (Customer Acquisition Cost)"
            value={formatCurrency(cac, region)}
            hint="Spend divided by new customers"
          />
          <ResultCard
            label="LTV (Lifetime Value)"
            value={formatCurrency(ltv, region)}
            hint="ARPU × gross margin × lifespan months"
          />
          <ResultCard
            label="Payback Period"
            value={`${payback.toFixed(1)} months`}
            hint="Months of gross-margin contribution to recover CAC. SaaS target: under 12 months."
          />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="cac-ltv" />
    </div>
  );
}
