"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { formatPercent } from "@/lib/regions";

export default function ChurnRateCalculator() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  );
}

function Inner() {
  const sp = useSearchParams();
  const [start, setStart] = useState(sp.get("start") ?? "1000");
  const [lost, setLost] = useState(sp.get("lost") ?? "50");
  const [newCustomers, setNew] = useState(sp.get("new") ?? "80");

  const result = useMemo(() => {
    const s = Number(start);
    const l = Number(lost);
    const n = Number(newCustomers);
    if (!Number.isFinite(s) || s <= 0 || !Number.isFinite(l) || l < 0 || !Number.isFinite(n) || n < 0) return null;
    const grossChurnPct = (l / s) * 100;
    const retentionPct = 100 - grossChurnPct;
    const netCustomersLost = l - n;
    const netChurnPct = (netCustomersLost / s) * 100;
    const endingCustomers = s - l + n;
    return { grossChurnPct, retentionPct, netChurnPct, endingCustomers };
  }, [start, lost, newCustomers]);

  const tier =
    result === null
      ? "bad"
      : result.grossChurnPct <= 5
        ? "good"
        : result.grossChurnPct <= 10
          ? "caution"
          : "bad";

  const interpretation =
    result === null
      ? "Enter starting customers, lost customers, and new customers."
      : result.grossChurnPct <= 2
        ? "Best-in-class — top-quartile SaaS retention."
        : result.grossChurnPct <= 5
          ? "Healthy — typical of mature B2B SaaS."
          : result.grossChurnPct <= 10
            ? "Caution — common in consumer SaaS but worth investigating."
            : "High — material risk to growth; investigate before scaling acquisition.";

  const copyText = result
    ? [
        "Churn Rate",
        `Start: ${start} customers`,
        `Lost: ${lost} customers`,
        `New: ${newCustomers} customers`,
        `Gross churn: ${formatPercent(result.grossChurnPct)}`,
        `Net churn: ${formatPercent(result.netChurnPct)}`,
        `Retention: ${formatPercent(result.retentionPct)}`,
      ].join("\n")
    : "";

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Inputs (one period — month or year)</h2>
          <InputField label="Customers at start of period" value={start} onChange={setStart} />
          <InputField label="Customers lost during period" value={lost} onChange={setLost} helper="Cancellations + non-renewals" />
          <InputField label="New customers acquired" value={newCustomers} onChange={setNew} helper="Required for net-churn calculation" />
        </div>

        <div className="space-y-4">
          <ResultCard primary label="Gross Churn Rate" value={result ? formatPercent(result.grossChurnPct) : "—"} tier={tier} interpretation={interpretation} hint="Lost / Start, ignoring new customers" />
          <ResultCard label="Net Churn Rate" value={result ? formatPercent(result.netChurnPct) : "—"} hint="(Lost − New) / Start; negative net churn = cohort growth" />
          <ResultCard label="Retention Rate" value={result ? formatPercent(result.retentionPct) : "—"} hint="100% − gross churn" />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="churn rate" />
    </div>
  );
}
