"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatNumber } from "@/lib/regions";

export default function FreelanceRateCalculator() {
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

  const [income, setIncome] = useState(sp.get("income") ?? "60000");
  const [hoursPerWeek, setHoursPerWeek] = useState(sp.get("hours") ?? "25");
  const [overhead, setOverhead] = useState(sp.get("overhead") ?? "6000");
  const [weeksOff, setWeeksOff] = useState(sp.get("weeks_off") ?? "6");
  const [marginPct, setMarginPct] = useState(sp.get("margin") ?? "15");

  const inc = parseFloat(income) || 0;
  const hrs = parseFloat(hoursPerWeek) || 0;
  const ovh = parseFloat(overhead) || 0;
  const wkOff = parseFloat(weeksOff) || 0;
  const margin = parseFloat(marginPct) || 0;

  const billableHours = Math.max(0, (52 - wkOff) * hrs);
  const minRate = billableHours > 0 ? (inc + ovh) / billableHours : 0;
  const recommendedRate = minRate * (1 + margin / 100);
  const dayRate = recommendedRate * 8;

  const copyText = [
    `Freelance Rate — ${cfg.label}`,
    `Annual Income Target: ${formatCurrency(inc, region)}`,
    `Annual Overhead: ${formatCurrency(ovh, region)}`,
    `Billable Hours/Year: ${formatNumber(billableHours, 0)}`,
    `Minimum Rate: ${formatCurrency(minRate, region)}/hr`,
    `Recommended Rate: ${formatCurrency(recommendedRate, region)}/hr`,
    `Day Rate (8h): ${formatCurrency(dayRate, region)}`,
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
            label="Desired Annual Income"
            value={income}
            onChange={setIncome}
            prefix={cfg.symbol}
            helper="Your target take-home, before business expenses"
          />
          <InputField
            label="Billable Hours Per Week"
            value={hoursPerWeek}
            onChange={setHoursPerWeek}
            suffix="hr"
            helper="Realistic billable hours — typically 20–30, not 40"
          />
          <InputField
            label="Annual Overhead Costs"
            value={overhead}
            onChange={setOverhead}
            prefix={cfg.symbol}
            helper="Software, equipment, insurance, office, memberships"
          />
          <InputField
            label="Weeks Off Per Year"
            value={weeksOff}
            onChange={setWeeksOff}
            suffix="wk"
            helper="Holidays + sick days (6 is realistic)"
          />
          <InputField
            label="Desired Profit Margin"
            value={marginPct}
            onChange={setMarginPct}
            suffix="%"
            helper="Buffer above the floor (10–20% recommended)"
          />
          <p className="rounded-lg bg-brand-light px-3 py-2 text-xs text-gray-700">
            <strong>Tax note ({cfg.label}):</strong> add {cfg.selfEmploymentBufferPct[0]}–
            {cfg.selfEmploymentBufferPct[1]}% to your income target to cover self-employment
            tax obligations.
          </p>
        </div>

        <div className="space-y-4">
          <ResultCard
            primary
            label="Recommended Rate"
            value={`${formatCurrency(recommendedRate, region)}/hr`}
            tier="good"
            interpretation="Quote this rate to clients. It's your minimum rate plus your profit margin buffer."
            hint={`Annual billable hours: ${formatNumber(billableHours, 0)}`}
          />
          <ResultCard
            label="Minimum Hourly Rate"
            value={`${formatCurrency(minRate, region)}/hr`}
            tier="bad"
            interpretation="This is the absolute floor — anything below this loses money."
          />
          <ResultCard
            label="Day Rate (8 hours)"
            value={formatCurrency(dayRate, region)}
            hint="Useful when clients ask for day-rate quoting"
          />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="rate" />
    </div>
  );
}
