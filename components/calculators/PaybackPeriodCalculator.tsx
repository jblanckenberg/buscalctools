"use client";

import { useState } from "react";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatNumber } from "@/lib/regions";

export default function PaybackPeriodCalculator() {
  const [region, setRegion] = useRegion();
  const cfg = REGIONS[region];

  const [investment, setInvestment] = useState("50000");
  const [annualInflow, setAnnualInflow] = useState("18000");
  const [discountRate, setDiscountRate] = useState("");

  const inv = parseFloat(investment) || 0;
  const cf = parseFloat(annualInflow) || 0;
  const dr = discountRate === "" ? null : parseFloat(discountRate) || 0;

  const simplePayback = cf > 0 ? inv / cf : Infinity;
  const simplePaybackDisplay = Number.isFinite(simplePayback)
    ? simplePayback.toFixed(2)
    : "—";

  let discountedPayback: number | null = null;
  if (dr !== null && cf > 0 && inv > 0) {
    let cumulative = 0;
    for (let year = 1; year <= 50; year++) {
      const pv = cf / Math.pow(1 + dr / 100, year);
      cumulative += pv;
      if (cumulative >= inv) {
        const prevCumulative = cumulative - pv;
        const fraction = (inv - prevCumulative) / pv;
        discountedPayback = year - 1 + fraction;
        break;
      }
    }
  }

  const tier =
    simplePayback <= 3 ? "good" : simplePayback <= 5 ? "caution" : "bad";

  const copyText = [
    `Payback Period — ${cfg.label}`,
    `Investment: ${formatCurrency(inv, region)}`,
    `Annual Cash Inflow: ${formatCurrency(cf, region)}`,
    `Simple Payback: ${simplePaybackDisplay} years`,
    discountedPayback !== null
      ? `Discounted Payback: ${discountedPayback.toFixed(2)} years (at ${dr}%)`
      : null,
  ]
    .filter(Boolean)
    .join("\n");

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
            label="Initial Investment"
            value={investment}
            onChange={setInvestment}
            prefix={cfg.symbol}
            helper="Upfront cost of the investment"
          />
          <InputField
            label="Annual Cash Inflow"
            value={annualInflow}
            onChange={setAnnualInflow}
            prefix={cfg.symbol}
            helper="Net cash generated per year by this investment"
          />
          <InputField
            label="Discount Rate (optional)"
            value={discountRate}
            onChange={setDiscountRate}
            suffix="%"
            helper="Typically your cost of capital (8–12%) — enables discounted payback"
          />
        </div>

        <div className="space-y-4">
          <ResultCard
            primary
            label="Simple Payback Period"
            value={
              Number.isFinite(simplePayback)
                ? `${simplePaybackDisplay} years`
                : "Never recovers"
            }
            tier={tier}
            interpretation={
              !Number.isFinite(simplePayback)
                ? "No positive cash flow — investment never recovers."
                : simplePayback <= 3
                  ? "Fast payback — low risk and easily justifiable."
                  : simplePayback <= 5
                    ? "Reasonable payback but compare against alternatives."
                    : "Slow payback — opportunity cost of capital is significant."
            }
            hint={`Annual inflow: ${formatCurrency(cf, region)}`}
          />
          {discountedPayback !== null && (
            <ResultCard
              label="Discounted Payback Period"
              value={`${discountedPayback.toFixed(2)} years`}
              hint={`Discount rate ${dr}% accounts for time value of money`}
            />
          )}
          <ResultCard
            label="Total Recovery Target"
            value={formatCurrency(inv, region)}
            hint={`At ${formatCurrency(cf, region)}/year, recovered after ${formatNumber(Math.ceil(simplePayback), 0)} full years`}
          />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="payback" />
    </div>
  );
}
