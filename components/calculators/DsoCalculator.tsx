"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency } from "@/lib/regions";
import { D, toN } from "@/lib/money";

export default function DsoCalculator() {
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

  const [accountsReceivable, setAccountsReceivable] = useState(
    sp.get("ar") ?? "120000"
  );
  const [revenue, setRevenue] = useState(sp.get("revenue") ?? "1200000");
  const [periodDays, setPeriodDays] = useState(sp.get("days") ?? "365");

  const arD = D(accountsReceivable);
  const revD = D(revenue);
  const daysD = D(periodDays);

  // DSO = (AR / Revenue) × Days
  const dsoD = revD.gt(0) ? arD.div(revD).mul(daysD) : D(0);

  // Cash tied up vs a 30-day benchmark — what would be released if collections
  // hit 30 days. dailyRevenue × (currentDSO - 30) gives the AR balance reduction.
  const dailyRevenueD = daysD.gt(0) ? revD.div(daysD) : D(0);
  const benchmarkArD = dailyRevenueD.mul(30);
  const cashTiedUpD = arD.minus(benchmarkArD);

  const ar = toN(arD);
  const rev = toN(revD);
  const days = toN(daysD);
  const dso = toN(dsoD);
  const cashTiedUp = toN(cashTiedUpD);

  // Banding follows DSCR-style payment-cycle norms: <=30 days = collecting on
  // time; 31-45 = industry average for B2B services; 46-60 = stressed;
  // >60 = cash flow at risk and likely paying for late customers via own debt.
  const tier: "good" | "caution" | "bad" =
    dso <= 30 ? "good" : dso <= 45 ? "caution" : "bad";

  const interpretation =
    dso <= 30
      ? "You're collecting cash within the standard benchmark — short payment terms or active collections. Healthy."
      : dso <= 45
        ? "Typical B2B services range. Workable, but every day above 30 ties up working capital."
        : dso <= 60
          ? "Collections are slow. You're effectively financing customers from your own cash — likely funding overdraft interest or delayed supplier payments."
          : "DSO is high enough to be a material risk to operations. Aggressive collections, payment-terms tightening, or factoring should be on the agenda this quarter.";

  const copyText = [
    `DSO — ${cfg.label}`,
    `Accounts Receivable: ${formatCurrency(ar, region)}`,
    `Revenue: ${formatCurrency(rev, region)} over ${days} days`,
    `DSO: ${dso.toFixed(1)} days`,
    `Cash tied up vs 30-day benchmark: ${formatCurrency(cashTiedUp, region)}`,
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
            label="Accounts Receivable"
            value={accountsReceivable}
            onChange={setAccountsReceivable}
            prefix={cfg.symbol}
            helper="Total invoices outstanding at end of period"
          />
          <InputField
            label="Revenue for Period"
            value={revenue}
            onChange={setRevenue}
            prefix={cfg.symbol}
            helper="Total revenue earned during the same period (use net of refunds)"
          />
          <InputField
            label="Number of Days in Period"
            value={periodDays}
            onChange={setPeriodDays}
            suffix="days"
            helper="365 for annual, 90 for quarterly, 30 for monthly"
          />
        </div>

        <div className="space-y-4">
          <ResultCard
            primary
            label="Days Sales Outstanding"
            value={rev > 0 ? `${dso.toFixed(1)} days` : "Need revenue"}
            tier={tier}
            interpretation={interpretation}
            hint="The average number of days between invoicing a customer and getting paid"
          />
          <ResultCard
            label="Cash Tied Up vs 30-Day Benchmark"
            value={formatCurrency(Math.max(0, cashTiedUp), region)}
            hint={
              cashTiedUp > 0
                ? "This is the cash you'd unlock by getting paid as fast as a 30-day-DSO peer"
                : "Already at or below the 30-day benchmark"
            }
          />
          <ResultCard
            label="Daily Revenue"
            value={formatCurrency(toN(dailyRevenueD), region)}
            hint="Each day of DSO improvement releases roughly this much cash from receivables"
          />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="dso" />
    </div>
  );
}
