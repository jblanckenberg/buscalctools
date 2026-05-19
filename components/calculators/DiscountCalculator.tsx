"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatPercent } from "@/lib/regions";
import { D, Decimal, pct, toN } from "@/lib/money";

export default function DiscountCalculator() {
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

  const initialMode = sp.get("mode") === "reverse" ? "reverse" : "forward";
  const [mode, setMode] = useState<"forward" | "reverse">(initialMode);
  const [original, setOriginal] = useState(sp.get("original") ?? "100");
  const [discountPct, setDiscountPct] = useState(sp.get("discount") ?? "25");
  const [discountedPrice, setDiscountedPrice] = useState(sp.get("price") ?? "75");
  const [quantity, setQuantity] = useState(sp.get("qty") ?? "10");

  const origD = D(original);
  const dPctD = D(discountPct);
  const dPriceD = D(discountedPrice);
  const qtyD = D(quantity);

  let computedDiscountedD: Decimal;
  let computedDiscountPctD: Decimal;
  let savingsD: Decimal;

  if (mode === "forward") {
    computedDiscountedD = origD.mul(new Decimal(1).minus(dPctD.div(100)));
    computedDiscountPctD = dPctD;
    savingsD = origD.minus(computedDiscountedD);
  } else {
    computedDiscountedD = dPriceD;
    savingsD = origD.minus(dPriceD);
    computedDiscountPctD = pct(savingsD, origD);
  }

  const orig = toN(origD);
  const qty = toN(qtyD);
  const computedDiscounted = toN(computedDiscountedD);
  const computedDiscountPct = toN(computedDiscountPctD);
  const savings = toN(savingsD);

  const bulkRows = [1, 5, 10, 50, 100].map((q) => ({
    qty: q,
    totalOriginal: toN(origD.mul(q)),
    totalSavings: toN(savingsD.mul(q)),
    totalDiscounted: toN(computedDiscountedD.mul(q)),
  }));

  const copyText = [
    `Discount — ${cfg.label}`,
    `Original: ${formatCurrency(orig, region)}`,
    `Discount: ${formatPercent(computedDiscountPct)}`,
    `Discounted Price: ${formatCurrency(computedDiscounted, region)}`,
    `Savings: ${formatCurrency(savings, region)}`,
    qty > 0 ? `Total savings (${qty} units): ${formatCurrency(savings * qty, region)}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <RegionToggle region={region} onChange={setRegion} />
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 text-sm">
          <button
            type="button"
            onClick={() => setMode("forward")}
            className={`rounded-md px-3 py-1.5 font-medium ${mode === "forward" ? "bg-brand-primary text-white" : "text-brand-dark hover:bg-brand-light"}`}
          >
            % off price
          </button>
          <button
            type="button"
            onClick={() => setMode("reverse")}
            className={`rounded-md px-3 py-1.5 font-medium ${mode === "reverse" ? "bg-brand-primary text-white" : "text-brand-dark hover:bg-brand-light"}`}
          >
            Price → %
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Inputs
          </h2>
          <InputField label="Original Price" value={original} onChange={setOriginal} prefix={cfg.symbol} />
          {mode === "forward" ? (
            <InputField label="Discount Percentage" value={discountPct} onChange={setDiscountPct} suffix="%" />
          ) : (
            <InputField label="Discounted Price" value={discountedPrice} onChange={setDiscountedPrice} prefix={cfg.symbol} helper="What you'll charge" />
          )}
          <InputField label="Quantity (optional)" value={quantity} onChange={setQuantity} helper="Total savings at this quantity" />
        </div>

        <div className="space-y-4">
          <ResultCard
            primary
            label={mode === "forward" ? "Discounted Price" : "Effective Discount"}
            value={
              mode === "forward"
                ? formatCurrency(computedDiscounted, region)
                : formatPercent(computedDiscountPct)
            }
            tier="good"
            hint={
              mode === "forward"
                ? `Save ${formatCurrency(savings, region)} (${formatPercent(computedDiscountPct)})`
                : `Customer saves ${formatCurrency(savings, region)} per unit`
            }
          />
          <ResultCard label="Savings Per Unit" value={formatCurrency(savings, region)} />
          {qty > 0 && (
            <ResultCard
              label={`Total Savings (${qty} units)`}
              value={formatCurrency(savings * qty, region)}
              hint={`Total at discount: ${formatCurrency(computedDiscounted * qty, region)}`}
            />
          )}
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Bulk savings table
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wider text-gray-500">
              <th className="py-2">Qty</th>
              <th className="py-2 text-right">Total Original</th>
              <th className="py-2 text-right">Total Discounted</th>
              <th className="py-2 text-right">Total Savings</th>
            </tr>
          </thead>
          <tbody>
            {bulkRows.map((r) => (
              <tr key={r.qty} className="border-b border-gray-100">
                <td className="py-2 font-medium text-brand-dark">{r.qty}</td>
                <td className="py-2 text-right font-mono text-gray-600">{formatCurrency(r.totalOriginal, region)}</td>
                <td className="py-2 text-right font-mono text-brand-dark">{formatCurrency(r.totalDiscounted, region)}</td>
                <td className="py-2 text-right font-mono text-brand-accent">{formatCurrency(r.totalSavings, region)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CalculatorActions copyText={copyText} label="discount" />
    </div>
  );
}
