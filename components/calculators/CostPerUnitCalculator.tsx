"use client";

import { useState } from "react";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatNumber } from "@/lib/regions";

export default function CostPerUnitCalculator() {
  const [region, setRegion] = useRegion();
  const cfg = REGIONS[region];

  const [fixedCosts, setFixedCosts] = useState("10000");
  const [variableCosts, setVariableCosts] = useState("5000");
  const [units, setUnits] = useState("500");

  const fc = parseFloat(fixedCosts) || 0;
  const vc = parseFloat(variableCosts) || 0;
  const u = parseFloat(units) || 0;

  const fcPer = u > 0 ? fc / u : 0;
  const vcPer = u > 0 ? vc / u : 0;
  const totalPer = fcPer + vcPer;

  const scaling = [0.5, 1, 1.5, 2].map((m) => {
    const scaled = u * m;
    return {
      label: `${Math.round(m * 100)}% (${formatNumber(scaled, 0)} units)`,
      cpu: scaled > 0 ? (fc + vc * m) / scaled : 0,
    };
  });

  const copyText = [
    `Cost Per Unit — ${cfg.label}`,
    `Total Fixed Costs: ${formatCurrency(fc, region)}`,
    `Total Variable Costs: ${formatCurrency(vc, region)}`,
    `Units: ${formatNumber(u, 0)}`,
    `Fixed CPU: ${formatCurrency(fcPer, region)}`,
    `Variable CPU: ${formatCurrency(vcPer, region)}`,
    `Total CPU: ${formatCurrency(totalPer, region)}`,
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
          <InputField label="Total Fixed Costs" value={fixedCosts} onChange={setFixedCosts} prefix={cfg.symbol} helper="Costs that don't vary with volume" />
          <InputField label="Total Variable Costs" value={variableCosts} onChange={setVariableCosts} prefix={cfg.symbol} helper="Costs that scale with each unit" />
          <InputField label="Number of Units Produced" value={units} onChange={setUnits} helper="Total units in the period" />
        </div>

        <div className="space-y-4">
          <ResultCard
            primary
            label="Total Cost Per Unit"
            value={formatCurrency(totalPer, region)}
            tier="good"
            hint="Floor for your selling price"
          />
          <ResultCard label="Fixed Cost Per Unit" value={formatCurrency(fcPer, region)} hint="Decreases as volume increases" />
          <ResultCard label="Variable Cost Per Unit" value={formatCurrency(vcPer, region)} hint="Stays constant across volumes" />
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Cost at different volumes
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wider text-gray-500">
              <th className="py-2">Volume</th>
              <th className="py-2 text-right">Cost / Unit</th>
            </tr>
          </thead>
          <tbody>
            {scaling.map((s) => (
              <tr key={s.label} className="border-b border-gray-100">
                <td className="py-2 text-brand-dark">{s.label}</td>
                <td className="py-2 text-right font-mono font-medium text-brand-dark">
                  {formatCurrency(s.cpu, region)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CalculatorActions copyText={copyText} label="cost per unit" />
    </div>
  );
}
