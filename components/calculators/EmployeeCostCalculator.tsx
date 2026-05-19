"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatPercent } from "@/lib/regions";
import { EMPLOYER_TAX_BY_REGION } from "@/lib/employee-tax";
import { D, pct, toN } from "@/lib/money";

export default function EmployeeCostCalculator() {
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
  const tax = EMPLOYER_TAX_BY_REGION[region];

  const [salary, setSalary] = useState(sp.get("salary") ?? "60000");
  const [taxRate, setTaxRate] = useState(sp.get("tax") ?? String(tax.rate));
  const [benefits, setBenefits] = useState(sp.get("benefits") ?? "6000");
  const [equipment, setEquipment] = useState(sp.get("equipment") ?? "2500");
  const [training, setTraining] = useState(sp.get("training") ?? "1500");
  const [office, setOffice] = useState(sp.get("office") ?? "3000");

  useEffect(() => {
    setTaxRate(String(EMPLOYER_TAX_BY_REGION[region].rate));
  }, [region]);

  const sD = D(salary);
  const tD = D(taxRate);
  const bD = D(benefits);
  const eqD = D(equipment);
  const trD = D(training);
  const offD = D(office);

  const employerTaxAmountD = sD.mul(tD.div(100));
  const totalCostD = sD
    .plus(employerTaxAmountD)
    .plus(bD)
    .plus(eqD)
    .plus(trD)
    .plus(offD);
  const pctOfSalaryD = pct(totalCostD, sD);
  const hourlyCostD = totalCostD.div(2080); // 52 weeks × 40 hours
  const productiveHourlyCostD = totalCostD.div(1700); // ~1700 productive hours

  const s = toN(sD);
  const t = toN(tD);
  const b = toN(bD);
  const eq = toN(eqD);
  const tr = toN(trD);
  const off = toN(offD);
  const employerTaxAmount = toN(employerTaxAmountD);
  const totalCost = toN(totalCostD);
  const pctOfSalary = toN(pctOfSalaryD);
  const hourlyCost = toN(hourlyCostD);
  const productiveHourlyCost = toN(productiveHourlyCostD);

  const copyText = [
    `Employee Cost — ${cfg.label}`,
    `Salary: ${formatCurrency(s, region)}`,
    `Employer Tax (${t}%): ${formatCurrency(employerTaxAmount, region)}`,
    `Benefits: ${formatCurrency(b, region)}`,
    `Equipment: ${formatCurrency(eq, region)}`,
    `Training: ${formatCurrency(tr, region)}`,
    `Office: ${formatCurrency(off, region)}`,
    `Total Annual Cost: ${formatCurrency(totalCost, region)}`,
    `Cost as % of Salary: ${formatPercent(pctOfSalary)}`,
    `Hourly cost (2,080h): ${formatCurrency(hourlyCost, region)}/hr`,
    `Productive hour cost (~1,700h): ${formatCurrency(productiveHourlyCost, region)}/hr`,
  ].join("\n");

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <RegionToggle region={region} onChange={setRegion} />
        <p className="max-w-xs text-xs text-gray-500">
          Employer tax pre-fills at {tax.rate}% — {tax.label}.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Inputs
          </h2>
          <InputField label="Annual Salary" value={salary} onChange={setSalary} prefix={cfg.symbol} />
          <InputField label="Employer Tax Rate" value={taxRate} onChange={setTaxRate} suffix="%" helper={tax.label} />
          <InputField label="Benefits (annual)" value={benefits} onChange={setBenefits} prefix={cfg.symbol} helper="Health, pension, etc." />
          <InputField label="Equipment & Software" value={equipment} onChange={setEquipment} prefix={cfg.symbol} helper="Laptop, phone, software" />
          <InputField label="Training" value={training} onChange={setTraining} prefix={cfg.symbol} helper="Onboarding + development" />
          <InputField label="Office space" value={office} onChange={setOffice} prefix={cfg.symbol} helper="Desk, utilities allocation" />
        </div>

        <div className="space-y-4">
          <ResultCard
            primary
            label="Total Annual Cost"
            value={formatCurrency(totalCost, region)}
            tier="good"
            interpretation={
              pctOfSalary >= 145
                ? "Above typical range — review benefits/overhead allocation."
                : pctOfSalary >= 125
                  ? "Within typical 125–145% range."
                  : "Below typical range — check whether all costs are captured."
            }
            hint={`${formatPercent(pctOfSalary)} of salary`}
          />
          <ResultCard label="Cost / Hour (2,080 hr/yr)" value={`${formatCurrency(hourlyCost, region)}/hr`} hint="52 weeks × 40 hours" />
          <ResultCard label="Cost / Productive Hour (~1,700)" value={`${formatCurrency(productiveHourlyCost, region)}/hr`} hint="After holidays, training, meetings, admin" />
          <ResultCard label="Employer Tax" value={formatCurrency(employerTaxAmount, region)} hint={`${t}% of salary`} />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="cost" />
    </div>
  );
}
