"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatNumber } from "@/lib/regions";
import { D, toN } from "@/lib/money";

export default function BurnRateCalculator() {
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

  const [cash, setCash] = useState(sp.get("cash") ?? "500000");
  const [revenue, setRevenue] = useState(sp.get("revenue") ?? "20000");
  const [expenses, setExpenses] = useState(sp.get("expenses") ?? "70000");

  const cashD = D(cash);
  const revD = D(revenue);
  const expD = D(expenses);

  const grossBurnD = expD;
  const netBurnD = expD.minus(revD);
  const isProfitable = netBurnD.lte(0);
  const runwayMonths = isProfitable
    ? Infinity
    : netBurnD.gt(0)
      ? toN(cashD.div(netBurnD))
      : 0;

  const cashN = toN(cashD);
  const rev = toN(revD);
  const exp = toN(expD);
  const grossBurn = toN(grossBurnD);
  const netBurn = toN(netBurnD);

  const exhaustionDate = isProfitable
    ? null
    : (() => {
        const d = new Date();
        d.setMonth(d.getMonth() + Math.floor(runwayMonths));
        return d.toLocaleDateString("en", {
          year: "numeric",
          month: "long",
        });
      })();

  const tier = isProfitable
    ? "good"
    : runwayMonths >= 18
      ? "good"
      : runwayMonths >= 9
        ? "caution"
        : "bad";

  const copyText = [
    `Burn Rate & Runway — ${cfg.label}`,
    `Cash Balance: ${formatCurrency(cashN, region)}`,
    `Monthly Revenue: ${formatCurrency(rev, region)}`,
    `Monthly Expenses: ${formatCurrency(exp, region)}`,
    `Gross Burn: ${formatCurrency(grossBurn, region)}/mo`,
    `Net Burn: ${formatCurrency(netBurn, region)}/mo`,
    isProfitable
      ? "Runway: cash-flow positive (infinite)"
      : `Runway: ${runwayMonths.toFixed(1)} months`,
    exhaustionDate ? `Cash exhaustion: ~${exhaustionDate}` : null,
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
            label="Current Cash Balance"
            value={cash}
            onChange={setCash}
            prefix={cfg.symbol}
            helper="Bank balance + liquid assets"
          />
          <InputField
            label="Monthly Revenue"
            value={revenue}
            onChange={setRevenue}
            prefix={cfg.symbol}
            helper="Average monthly income (0 for pre-revenue startups)"
          />
          <InputField
            label="Monthly Expenses"
            value={expenses}
            onChange={setExpenses}
            prefix={cfg.symbol}
            helper="Total monthly cash outflows — salaries, rent, software, etc."
          />
        </div>

        <div className="space-y-4">
          <ResultCard
            primary
            label="Runway"
            value={
              isProfitable
                ? "Cash-flow positive"
                : `${runwayMonths.toFixed(1)} months`
            }
            tier={tier}
            interpretation={
              isProfitable
                ? "Revenue covers expenses — runway is effectively unlimited."
                : runwayMonths >= 18
                  ? "Comfortable runway — strong position to operate or raise."
                  : runwayMonths >= 9
                    ? "Tight — start fundraising or cut burn within 3 months."
                    : "Critical — fundraise immediately or take drastic cost action."
            }
            hint={exhaustionDate ? `Cash runs out around ${exhaustionDate}` : undefined}
          />
          <ResultCard
            label="Net Burn Rate"
            value={`${formatCurrency(netBurn, region)} / mo`}
            tier={isProfitable ? "good" : "neutral"}
            hint="Expenses minus revenue — net monthly cash consumed"
          />
          <ResultCard
            label="Gross Burn Rate"
            value={`${formatCurrency(grossBurn, region)} / mo`}
            hint="Total monthly expenses, ignoring revenue"
          />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="runway" />
    </div>
  );
}
