"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import ResultCard from "@/components/ui/ResultCard";
import RegionToggle from "@/components/shared/RegionToggle";
import CalculatorActions from "@/components/shared/CalculatorActions";
import { REGIONS, useRegion, formatCurrency, formatPercent } from "@/lib/regions";
import { D, Decimal, pct, toN } from "@/lib/money";

const PRESETS: Record<string, number> = {
  "Amazon FBA": 15,
  Etsy: 6.5,
  eBay: 13,
  Shopify: 2.9,
  Custom: 0,
};

export default function EcommerceProfitCalculator() {
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

  const platformParam = sp.get("platform") as keyof typeof PRESETS | null;
  const initialPlatform: keyof typeof PRESETS =
    platformParam && platformParam in PRESETS ? platformParam : "Amazon FBA";
  const initialFee = sp.get("fee") ?? String(PRESETS[initialPlatform]);

  const [productCost, setProductCost] = useState(sp.get("cost") ?? "8");
  const [sellingPrice, setSellingPrice] = useState(sp.get("price") ?? "29.99");
  const [platform, setPlatform] = useState<keyof typeof PRESETS>(initialPlatform);
  const [feePct, setFeePct] = useState(initialFee);
  const [shipping, setShipping] = useState(sp.get("shipping") ?? "3.5");
  const [adSpend, setAdSpend] = useState(sp.get("ads") ?? "2");
  const [vatPct, setVatPct] = useState(sp.get("vat") ?? String(cfg.consumptionTaxRate));

  useEffect(() => {
    setVatPct(String(REGIONS[region].consumptionTaxRate));
  }, [region]);

  const pickPlatform = (key: keyof typeof PRESETS) => {
    setPlatform(key);
    if (key !== "Custom") setFeePct(String(PRESETS[key]));
  };

  const costD = D(productCost);
  const priceD = D(sellingPrice);
  const feeD = D(feePct);
  const shipD = D(shipping);
  const adsD = D(adSpend);
  const vatD = D(vatPct);

  const feeAmountD = priceD.mul(feeD.div(100));
  // For VAT-inclusive sale price, VAT portion = price - price/(1+vat/100)
  const vatAmountD = vatD.gt(0)
    ? priceD.minus(priceD.div(new Decimal(1).plus(vatD.div(100))))
    : new Decimal(0);
  const totalCostsD = costD.plus(feeAmountD).plus(shipD).plus(adsD).plus(vatAmountD);
  const netProfitD = priceD.minus(totalCostsD);
  const netMarginPctD = pct(netProfitD, priceD);

  const cost = toN(costD);
  const price = toN(priceD);
  const fee = toN(feeD);
  const ship = toN(shipD);
  const ads = toN(adsD);
  const vat = toN(vatD);
  const feeAmount = toN(feeAmountD);
  const vatAmount = toN(vatAmountD);
  const totalCosts = toN(totalCostsD);
  const netProfit = toN(netProfitD);
  const netMarginPct = toN(netMarginPctD);

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
