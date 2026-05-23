"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatPercent } from "@/lib/regions";
import { calculateNpv } from "@/lib/calculations/npv";

const MAX_FLOWS = 15;

export default function NpvCalculator() {
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

  const [initial, setInitial] = useState(sp.get("initial") ?? "10000");
  const [rate, setRate] = useState(sp.get("rate") ?? "10");
  // Cash flows as comma-separated values: "4000,4000,4000"
  const initialFlows = sp.get("flows") ?? "4000,5000,6000";
  const [flowsText, setFlowsText] = useState(initialFlows);

  const flows = useMemo(
    () =>
      flowsText
        .split(",")
        .map((s) => Number(s.trim()))
        .filter((n) => Number.isFinite(n))
        .slice(0, MAX_FLOWS),
    [flowsText],
  );

  const result = useMemo(() => {
    const initialNum = Number(initial);
    const rateNum = Number(rate);
    if (!Number.isFinite(initialNum) || initialNum < 0 || !Number.isFinite(rateNum)) {
      return null;
    }
    try {
      return calculateNpv({ initialInvestment: initialNum, cashFlows: flows, discountRatePct: rateNum });
    } catch {
      return null;
    }
  }, [initial, rate, flows]);

  const tier =
    result === null
      ? "bad"
      : result.decision === "accept"
        ? "good"
        : result.npv > -Number(initial) * 0.05
          ? "caution"
          : "bad";

  const copyText = result
    ? [
        `NPV — ${cfg.label}`,
        `Initial investment: ${formatCurrency(Number(initial), region)}`,
        `Discount rate: ${formatPercent(Number(rate))}`,
        `Cash flows (${flows.length} periods): ${flows.map((f) => formatCurrency(f, region)).join(", ")}`,
        `NPV: ${formatCurrency(result.npv, region)}`,
        `Decision: ${result.decision.toUpperCase()}`,
      ].join("\n")
    : "";

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <RegionToggle region={region} onChange={setRegion} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Inputs</h2>
          <InputField
            label="Initial investment"
            value={initial}
            onChange={setInitial}
            prefix={cfg.symbol}
            helper="Up-front cost at period 0"
          />
          <InputField
            label="Discount rate"
            value={rate}
            onChange={setRate}
            suffix="%"
            helper="Your required return — typically WACC or hurdle rate (8–12% for most SMBs)"
          />
          <div>
            <label className="block text-sm font-medium text-brand-dark">Cash flows by period</label>
            <textarea
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
              rows={3}
              value={flowsText}
              onChange={(e) => setFlowsText(e.target.value)}
              placeholder="4000, 5000, 6000"
            />
            <p className="mt-1 text-xs text-gray-600">
              Comma-separated. Each value is the END-of-period cash flow. Up to {MAX_FLOWS} periods. Negative values allowed (e.g. follow-on investment).
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <ResultCard
            primary
            label="Net Present Value"
            value={result ? formatCurrency(result.npv, region) : "—"}
            tier={tier}
            interpretation={
              result === null
                ? "Enter valid inputs to compute NPV."
                : result.decision === "accept"
                  ? "Positive NPV — the project clears the discount rate. Accept as proposed."
                  : "Negative NPV — the project does not clear the discount rate. Reject or renegotiate."
            }
            hint={`${flows.length} period${flows.length === 1 ? "" : "s"} discounted at ${rate}%`}
          />
          <ResultCard
            label="Decision"
            value={result ? result.decision.toUpperCase() : "—"}
            hint="NPV ≥ 0 ⇒ accept; NPV < 0 ⇒ reject"
          />
        </div>
      </div>

      {result && result.breakdown.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Period breakdown
          </h2>
          <table className="mt-2 min-w-full text-sm">
            <thead className="text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="py-2 pr-4">Period</th>
                <th className="py-2 pr-4">Cash flow</th>
                <th className="py-2 pr-4">Present value</th>
                <th className="py-2">Cumulative NPV</th>
              </tr>
            </thead>
            <tbody data-testid="npv-breakdown">
              {result.breakdown.map((row) => (
                <tr key={row.period} className="border-t border-gray-200">
                  <td className="py-2 pr-4 font-medium">{row.period}</td>
                  <td className="py-2 pr-4">{formatCurrency(row.cashFlow, region)}</td>
                  <td className="py-2 pr-4">{formatCurrency(row.presentValue, region)}</td>
                  <td className="py-2 font-medium">{formatCurrency(row.cumulativeNpv, region)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <CalculatorActions copyText={copyText} label="NPV" />
    </div>
  );
}
