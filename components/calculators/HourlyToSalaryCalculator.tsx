"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency } from "@/lib/regions";
import { D, toN } from "@/lib/money";

export default function HourlyToSalaryCalculator() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  );
}

// Region-specific loaded-cost defaults — sum of statutory employer taxes plus
// typical benefits load. USA: FICA 7.65% + workers comp + benefits ~25%. UK:
// employer NI 13.8% + pension 3% + other ~25%. SA: UIF + SDL + benefits ~18%.
const LOADED_DEFAULT: Record<"USA" | "UK" | "SA", number> = {
  USA: 28,
  UK: 25,
  SA: 18,
};

function Inner() {
  const sp = useSearchParams();
  const [region, setRegion] = useRegion();
  const cfg = REGIONS[region];

  const initialMode = sp.get("mode") === "annual" ? "annual" : "hourly";
  const [mode, setMode] = useState<"hourly" | "annual">(initialMode);
  const [hourly, setHourly] = useState(sp.get("hourly") ?? "25");
  const [annual, setAnnual] = useState(sp.get("annual") ?? "52000");
  const [hoursPerWeek, setHoursPerWeek] = useState(sp.get("hours") ?? "40");
  const [weeksPerYear, setWeeksPerYear] = useState(sp.get("weeks") ?? "52");
  const [loadedPct, setLoadedPct] = useState(
    sp.get("loaded") ?? String(LOADED_DEFAULT[region])
  );

  const hourlyD = D(hourly);
  const annualD = D(annual);
  const hpwD = D(hoursPerWeek);
  const wpyD = D(weeksPerYear);
  const loadedD = D(loadedPct);

  const hoursPerYearD = hpwD.mul(wpyD);

  const computedAnnualD =
    mode === "hourly" ? hourlyD.mul(hoursPerYearD) : annualD;
  const computedHourlyD =
    mode === "hourly"
      ? hourlyD
      : hoursPerYearD.gt(0)
        ? annualD.div(hoursPerYearD)
        : D(0);

  const monthlyD = computedAnnualD.div(12);
  const weeklyD = computedAnnualD.div(wpyD.gt(0) ? wpyD : D(52));
  const loadedAnnualD = computedAnnualD.mul(loadedD.div(100).plus(1));
  const loadedHourlyD = hoursPerYearD.gt(0)
    ? loadedAnnualD.div(hoursPerYearD)
    : D(0);

  const computedAnnual = toN(computedAnnualD);
  const computedHourly = toN(computedHourlyD);
  const monthly = toN(monthlyD);
  const weekly = toN(weeklyD);
  const loadedAnnual = toN(loadedAnnualD);
  const loadedHourly = toN(loadedHourlyD);

  const copyText = [
    `Hourly ↔ Salary — ${cfg.label}`,
    `Hourly: ${formatCurrency(computedHourly, region)}`,
    `Annual: ${formatCurrency(computedAnnual, region)}`,
    `Monthly: ${formatCurrency(monthly, region)}`,
    `Weekly: ${formatCurrency(weekly, region)}`,
    `Loaded cost (annual): ${formatCurrency(loadedAnnual, region)}`,
    `Loaded cost (hourly): ${formatCurrency(loadedHourly, region)}`,
  ].join("\n");

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <RegionToggle region={region} onChange={setRegion} />
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 text-sm">
          <button
            type="button"
            onClick={() => setMode("hourly")}
            className={`rounded-md px-3 py-1.5 font-medium ${mode === "hourly" ? "bg-brand-primary text-white" : "text-brand-dark hover:bg-brand-light"}`}
          >
            Hourly → Annual
          </button>
          <button
            type="button"
            onClick={() => setMode("annual")}
            className={`rounded-md px-3 py-1.5 font-medium ${mode === "annual" ? "bg-brand-primary text-white" : "text-brand-dark hover:bg-brand-light"}`}
          >
            Annual → Hourly
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Inputs
          </h2>
          {mode === "hourly" ? (
            <InputField
              label="Hourly Rate"
              value={hourly}
              onChange={setHourly}
              prefix={cfg.symbol}
              helper="What you charge or earn per hour"
            />
          ) : (
            <InputField
              label="Annual Salary"
              value={annual}
              onChange={setAnnual}
              prefix={cfg.symbol}
              helper="Gross annual pay before tax"
            />
          )}
          <InputField
            label="Hours per Week"
            value={hoursPerWeek}
            onChange={setHoursPerWeek}
            suffix="hrs"
            helper="40 is full-time in most regions"
          />
          <InputField
            label="Weeks per Year"
            value={weeksPerYear}
            onChange={setWeeksPerYear}
            suffix="wks"
            helper="52 = no unpaid leave; 48 = 4 weeks unpaid off"
          />
          <InputField
            label="Loaded-Cost Premium"
            value={loadedPct}
            onChange={setLoadedPct}
            suffix="%"
            helper="Employer taxes + benefits on top of salary (USA ~28%, UK ~25%, SA ~18%)"
          />
        </div>

        <div className="space-y-4">
          <ResultCard
            primary
            label={mode === "hourly" ? "Annual Salary" : "Hourly Rate"}
            value={
              mode === "hourly"
                ? formatCurrency(computedAnnual, region)
                : formatCurrency(computedHourly, region)
            }
            tier="neutral"
            interpretation={
              mode === "hourly"
                ? `${formatCurrency(computedHourly, region)} per hour × ${toN(hoursPerYearD).toLocaleString()} hours per year.`
                : `${formatCurrency(computedAnnual, region)} per year ÷ ${toN(hoursPerYearD).toLocaleString()} hours = your hourly equivalent.`
            }
            hint="Gross figure — before income tax, NIC, FICA, or PAYE"
          />
          <ResultCard
            label="Monthly Gross"
            value={formatCurrency(monthly, region)}
            hint="Annual ÷ 12"
          />
          <ResultCard
            label="Weekly Gross"
            value={formatCurrency(weekly, region)}
            hint={`Annual ÷ ${weeksPerYear} weeks`}
          />
          <ResultCard
            label="True Cost to Employer (annual)"
            value={formatCurrency(loadedAnnual, region)}
            hint={`Salary plus ${loadedPct}% statutory taxes and benefits`}
          />
          <ResultCard
            label="True Cost to Employer (hourly)"
            value={formatCurrency(loadedHourly, region)}
            hint="Use this when comparing employees vs contractors"
          />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="hourly-salary" />
    </div>
  );
}
