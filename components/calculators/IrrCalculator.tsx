"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatPercent } from "@/lib/regions";
import { calculateIrr } from "@/lib/calculations/irr";

const MAX_FLOWS = 15;

export default function IrrCalculator() {
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

  const [initial, setInitial] = useState(sp.get("initial") ?? "1000");
  const [hurdle, setHurdle] = useState(sp.get("hurdle") ?? "10");
  const [flowsText, setFlowsText] = useState(sp.get("flows") ?? "400, 400, 400");

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
    const hurdleNum = Number(hurdle);
    if (!Number.isFinite(initialNum) || initialNum < 0 || !Number.isFinite(hurdleNum)) {
      return null;
    }
    try {
      return calculateIrr({
        initialInvestment: initialNum,
        cashFlows: flows,
        hurdleRatePct: hurdleNum,
      });
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Could not solve" } as const;
    }
  }, [initial, hurdle, flows]);

  const isError = result !== null && "error" in result;
  const tier =
    result === null || isError
      ? "bad"
      : result.decision === "accept"
        ? "good"
        : result.irrPct >= 0
          ? "caution"
          : "bad";

  const copyText =
    result && !isError
      ? [
          `IRR — ${cfg.label}`,
          `Initial investment: ${formatCurrency(Number(initial), region)}`,
          `Cash flows (${flows.length} periods): ${flows.map((f) => formatCurrency(f, region)).join(", ")}`,
          `Hurdle rate: ${formatPercent(Number(hurdle))}`,
          `IRR: ${formatPercent(result.irrPct)}`,
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
            label="Hurdle rate"
            value={hurdle}
            onChange={setHurdle}
            suffix="%"
            helper="Your required return — IRR must clear this for accept"
          />
          <div>
            <label className="block text-sm font-medium text-brand-dark">Cash flows by period</label>
            <textarea
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
              rows={3}
              value={flowsText}
              onChange={(e) => setFlowsText(e.target.value)}
              placeholder="400, 400, 400"
            />
            <p className="mt-1 text-xs text-gray-600">
              Comma-separated. Up to {MAX_FLOWS} periods. At least one sign change required.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <ResultCard
            primary
            label="Internal Rate of Return"
            value={
              result === null
                ? "—"
                : isError
                  ? "—"
                  : formatPercent(result.irrPct)
            }
            tier={tier}
            interpretation={
              result === null
                ? "Enter valid inputs to compute IRR."
                : isError
                  ? result.error
                  : result.decision === "accept"
                    ? `IRR clears the ${hurdle}% hurdle. Accept.`
                    : `IRR below the ${hurdle}% hurdle. Reject or renegotiate.`
            }
            hint={
              result && !isError
                ? `Converged in ${result.iterations} iteration${result.iterations === 1 ? "" : "s"}`
                : undefined
            }
          />
          <ResultCard
            label="Decision"
            value={result && !isError ? result.decision.toUpperCase() : "—"}
            hint="IRR ≥ hurdle ⇒ accept"
          />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="IRR" />
    </div>
  );
}
