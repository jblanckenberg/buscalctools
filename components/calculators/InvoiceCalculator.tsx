"use client";

import { useEffect, useState } from "react";
import { Trash2, Plus } from "lucide-react";
import InputField, { TextField } from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency } from "@/lib/regions";

type Line = { desc: string; qty: string; rate: string };

const blankLine: Line = { desc: "", qty: "1", rate: "" };

export default function InvoiceCalculator() {
  const [region, setRegion] = useRegion();
  const cfg = REGIONS[region];

  const [lines, setLines] = useState<Line[]>([
    { desc: "Consulting hours", qty: "10", rate: "120" },
    { ...blankLine },
  ]);
  const [taxPct, setTaxPct] = useState(String(cfg.consumptionTaxRate));
  const [discountPct, setDiscountPct] = useState("");

  useEffect(() => {
    setTaxPct(String(REGIONS[region].consumptionTaxRate));
  }, [region]);

  const updateLine = (idx: number, patch: Partial<Line>) => {
    setLines((prev) => prev.map((l, i) => (i === idx ? { ...l, ...patch } : l)));
  };

  const addLine = () =>
    setLines((prev) => (prev.length >= 5 ? prev : [...prev, { ...blankLine }]));

  const removeLine = (idx: number) =>
    setLines((prev) => (prev.length <= 1 ? prev : prev.filter((_, i) => i !== idx)));

  const subtotal = lines.reduce((sum, l) => {
    const q = parseFloat(l.qty) || 0;
    const r = parseFloat(l.rate) || 0;
    return sum + q * r;
  }, 0);

  const discountVal = discountPct === "" ? 0 : (parseFloat(discountPct) || 0);
  const discountAmount = subtotal * (discountVal / 100);
  const tax = parseFloat(taxPct) || 0;
  const taxableBase = subtotal - discountAmount;
  const taxAmount = taxableBase * (tax / 100);
  const total = taxableBase + taxAmount;

  const copyText = [
    `Invoice — ${cfg.label}`,
    ...lines
      .filter((l) => parseFloat(l.qty) > 0 && parseFloat(l.rate) > 0)
      .map((l) => `${l.desc || "Item"}: ${l.qty} × ${formatCurrency(parseFloat(l.rate) || 0, region)} = ${formatCurrency((parseFloat(l.qty) || 0) * (parseFloat(l.rate) || 0), region)}`),
    `Subtotal: ${formatCurrency(subtotal, region)}`,
    discountVal > 0 ? `Discount (${discountVal}%): -${formatCurrency(discountAmount, region)}` : null,
    `${cfg.consumptionTaxLabel} (${tax}%): ${formatCurrency(taxAmount, region)}`,
    `Total: ${formatCurrency(total, region)}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div>
      <div className="mb-4">
        <RegionToggle region={region} onChange={setRegion} />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
          Line Items
        </h2>
        <div className="mt-3 space-y-3">
          {lines.map((line, idx) => (
            <div key={idx} className="grid gap-2 md:grid-cols-[2fr_1fr_1fr_auto] md:items-end">
              <TextField
                label={idx === 0 ? "Description" : ""}
                value={line.desc}
                onChange={(v) => updateLine(idx, { desc: v })}
                placeholder="Item or service"
              />
              <InputField
                label={idx === 0 ? "Qty" : ""}
                value={line.qty}
                onChange={(v) => updateLine(idx, { qty: v })}
              />
              <InputField
                label={idx === 0 ? "Unit Rate" : ""}
                value={line.rate}
                onChange={(v) => updateLine(idx, { rate: v })}
                prefix={cfg.symbol}
              />
              <button
                type="button"
                onClick={() => removeLine(idx)}
                disabled={lines.length <= 1}
                className="inline-flex h-[44px] w-full items-center justify-center rounded-lg border border-gray-200 px-3 text-gray-500 hover:border-brand-danger hover:text-brand-danger disabled:opacity-30 md:w-[44px]"
                aria-label="Remove line"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addLine}
          disabled={lines.length >= 5}
          className="mt-3 inline-flex items-center gap-1 rounded-lg border border-dashed border-gray-300 px-3 py-2 text-sm font-medium text-brand-primary hover:border-brand-primary disabled:opacity-40"
        >
          <Plus size={14} /> Add line {lines.length >= 5 && "(max 5)"}
        </button>

        <div className="mt-5 grid gap-4 border-t border-gray-200 pt-5 sm:grid-cols-2">
          <InputField
            label={`${cfg.consumptionTaxLabel} Rate`}
            value={taxPct}
            onChange={setTaxPct}
            suffix="%"
            helper={`Pre-filled at ${cfg.consumptionTaxRate}% for ${cfg.label}`}
          />
          <InputField
            label="Discount (optional)"
            value={discountPct}
            onChange={setDiscountPct}
            suffix="%"
            helper="Applied to subtotal before tax"
          />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <ResultCard label="Subtotal" value={formatCurrency(subtotal, region)} />
        {discountVal > 0 && (
          <ResultCard
            label={`Discount (${discountVal}%)`}
            value={`−${formatCurrency(discountAmount, region)}`}
          />
        )}
        <ResultCard
          label={`${cfg.consumptionTaxLabel} (${tax}%)`}
          value={formatCurrency(taxAmount, region)}
        />
        <ResultCard
          primary
          label="Invoice Total"
          value={formatCurrency(total, region)}
          tier="good"
        />
      </div>

      <CalculatorActions copyText={copyText} label="invoice" />
    </div>
  );
}
