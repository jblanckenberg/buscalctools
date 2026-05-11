"use client";

import { useEffect, useState } from "react";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatPercent } from "@/lib/regions";

const PRESETS: Record<string, number> = {
  "Amazon FBA": 15,
  Etsy: 6.5,
  eBay: 13,
  Shopify: 2.9,
  Custom: 0,
};

export default function EcommerceProfitCalculator() {
  const [region, setRegion] = useRegion();
  const cfg = REGIONS[region];

  const [productCost, setProductCost] = useState("8");
  const [sellingPrice, setSellingPrice] = useState("29.99");
  const [platform, setPlatform] = useState<keyof typeof PRESETS>("Amazon FBA");
  const [feePct, setFeePct] = useState("15");
  const [shipping, setShipping] = useState("3.5");
  const [adSpend, setAdSpend] = useState("2");
  const [vatPct, setVatPct] = useState(String(cfg.consumptionTaxRate));

  useEffect(() => {
    setVatPct(String(REGIONS[region].consumptionTaxRate));
  }, [region]);

  const pickPlatform = (key: keyof typeof PRESETS) => {
    setPlatform(key);
    if (key !== "Custom") setFeePct(String(PRESETS[key]));
  };

  const cost = parseFloat(productCost) || 0;
  const price = parseFloat(sellingPrice) || 0;
  const fee = parseFloat(feePct) || 0;
  const ship = parseFloat(shipping) || 0;
  const ads = parseFloat(adSpend) || 0;
  const vat = parseFloat(vatPct) || 0;

  const feeAmount = price * (fee / 100);
  // For VAT-inclusive sale price, VAT portion = price - price/(1+vat/100)
  const vatAmount = vat > 0 ? price - price / (1 + vat / 100) : 0;
  const totalCosts = cost + feeAmount + ship + ads + vatAmount;
  const netProfit = price - totalCosts;
  const netMarginPct = price > 0 ? (netProfit / price) * 100 : 0;

  const tier = netMarginPct >= 15 ? "good" : netMarginPct >= 5 ? "caution" : "bad";

  const copyText = [
    `Ecommerce Profit — ${cfg.label} (${platform})`,
    `Selling Price: ${formatCurrency(price, region)}`,
    `Product Cost: ${formatCurrency(cost, region)}`,
    `Platform Fee (${fee}%): ${formatCurrency(feeAmount, region)}`,
    `Shipping: ${formatCurrency(ship, region)}`,
    `Ad Spend: ${formatCurrency(ads, region)}`,
    vat > 0 ? `VAT (${vat}%): ${formatCurrency(vatAmount, region)}` : null,
    `Net Profit: ${formatCurrency(netProfit, region)}`,
    `Net Margin: ${formatPercent(netMarginPct)}`,
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
          <div>
            <label className="mb-1 block text-sm font-medium text-brand-dark">Platform</label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(PRESETS) as (keyof typeof PRESETS)[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => pickPlatform(p)}
                  className={`rounded-md border px-3 py-1.5 text-sm font-medium ${
                    platform === p
                      ? "border-brand-primary bg-brand-primary text-white"
                      : "border-gray-200 bg-white text-brand-dark hover:border-brand-primary"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <InputField label="Selling Price" value={sellingPrice} onChange={setSellingPrice} prefix={cfg.symbol} />
          <InputField label="Product Cost" value={productCost} onChange={setProductCost} prefix={cfg.symbol} helper="Landed cost including shipping to you" />
          <InputField label="Platform Fee" value={feePct} onChange={(v) => { setPlatform("Custom"); setFeePct(v); }} suffix="%" />
          <InputField label="Shipping Cost" value={shipping} onChange={setShipping} prefix={cfg.symbol} />
          <InputField label="Advertising Cost / Sale" value={adSpend} onChange={setAdSpend} prefix={cfg.symbol} helper="Ad spend attributable per unit sold" />
          <InputField label={`${cfg.consumptionTaxLabel} (optional)`} value={vatPct} onChange={setVatPct} suffix="%" helper={`Pre-filled at ${cfg.consumptionTaxRate}%`} />
        </div>

        <div className="space-y-4">
          <ResultCard
            primary
            label="Net Profit Per Unit"
            value={formatCurrency(netProfit, region)}
            tier={tier}
            interpretation={
              netMarginPct >= 15
                ? "Healthy ecommerce margin — sustainable per unit."
                : netMarginPct >= 5
                  ? "Workable but no room for returns or price competition."
                  : "Not viable — costs eat the entire selling price."
            }
            hint={`Net margin: ${formatPercent(netMarginPct)}`}
          />
          <ResultCard label="Platform Fee" value={formatCurrency(feeAmount, region)} />
          {vat > 0 && (
            <ResultCard label={`${cfg.consumptionTaxLabel} Payable`} value={formatCurrency(vatAmount, region)} />
          )}
          <ResultCard label="Total Costs" value={formatCurrency(totalCosts, region)} hint="Product + fees + shipping + ads + tax" />
        </div>
      </div>

      <CalculatorActions copyText={copyText} label="profit" />
    </div>
  );
}
