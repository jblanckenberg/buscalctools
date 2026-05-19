"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatNumber } from "@/lib/regions";
import { D, Decimal, toN } from "@/lib/money";

export default function PaybackPeriodCalculator() {
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

  const [investment, setInvestment] = useState(sp.get("investment") ?? "50000");
  const [annualInflow, setAnnualInflow] = useState(sp.get("inflow") ?? "18000");
  const [discountRate, setDiscountRate] = useState(sp.get("discount") ?? "");

  const invD = D(investment);
  const cfD = D(annualInflow);
  const drD = discountRate === "" ? null : D(discountRate);

  const simplePayback = cfD.gt(0) ? toN(invD.div(cfD)) : Infinity;
  const simplePaybackDisplay = Number.isFinite(simplePayback)
    ? simplePayback.toFixed(2)
    : "—";

  let discountedPayback: number | null = null;
  if (drD !== null && cfD.gt(0) && invD.gt(0)) {
    let cumulativeD = new Decimal(0);
    const onePlusDr = new Decimal(1).plus(drD.div(100));
    for (let year = 1; year <= 50; year++) {
      const pvD = cfD.div(onePlusDr.pow(year));
      cumulativeD = cumulativeD.plus(pvD);
      if (cumulativeD.gte(invD)) {
        const prevCumulative = cumulativeD.minus(pvD);
        const fractionD = invD.minus(prevCumulative).div(pvD);
        discountedPayback = year - 1 + toN(fractionD);
        break;
      }
    }
  }

  const inv = toN(invD);
  const cf = toN(cfD);
  const dr = drD === null ? null : toN(drD);

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
