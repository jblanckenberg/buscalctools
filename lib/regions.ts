"use client";

import { useEffect, useState } from "react";

export type Region = "USA" | "UK" | "SA";

export type RegionConfig = {
  code: Region;
  label: string;
  currency: string;
  symbol: string;
  corporateTaxRate: number;
  smallProfitsTaxRate?: number;
  consumptionTaxLabel: "Sales Tax" | "VAT";
  consumptionTaxRate: number;
  typicalLoanRate: number;
  selfEmploymentBufferPct: [number, number];
};

export const REGIONS: Record<Region, RegionConfig> = {
  USA: {
    code: "USA",
    label: "United States",
    currency: "USD",
    symbol: "$",
    corporateTaxRate: 21,
    consumptionTaxLabel: "Sales Tax",
    consumptionTaxRate: 0,
    typicalLoanRate: 7.5,
    selfEmploymentBufferPct: [25, 30],
  },
  UK: {
    code: "UK",
    label: "United Kingdom",
    currency: "GBP",
    symbol: "£",
    corporateTaxRate: 25,
    smallProfitsTaxRate: 19,
    consumptionTaxLabel: "VAT",
    consumptionTaxRate: 20,
    typicalLoanRate: 8.5,
    selfEmploymentBufferPct: [20, 30],
  },
  SA: {
    code: "SA",
    label: "South Africa",
    currency: "ZAR",
    symbol: "R",
    corporateTaxRate: 27,
    consumptionTaxLabel: "VAT",
    consumptionTaxRate: 15,
    typicalLoanRate: 14.5,
    selfEmploymentBufferPct: [25, 35],
  },
};

const STORAGE_KEY = "bizcalc:region";
const DEFAULT_REGION: Region = "USA";

export function useRegion(): [Region, (next: Region) => void] {
  const [region, setRegionState] = useState<Region>(DEFAULT_REGION);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "USA" || stored === "UK" || stored === "SA") {
        setRegionState(stored);
      }
    } catch {
      // localStorage unavailable — keep default
    }
  }, []);

  const setRegion = (next: Region) => {
    setRegionState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  };

  return [region, setRegion];
}

export function formatCurrency(value: number, region: Region, fractionDigits = 2): string {
  if (!Number.isFinite(value)) return `${REGIONS[region].symbol}0.00`;
  const formatted = Math.abs(value).toLocaleString("en", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
  const sign = value < 0 ? "-" : "";
  return `${sign}${REGIONS[region].symbol}${formatted}`;
}

export function formatPercent(value: number, fractionDigits = 1): string {
  if (!Number.isFinite(value)) return "0%";
  return `${value.toFixed(fractionDigits)}%`;
}

export function formatNumber(value: number, fractionDigits = 0): string {
  if (!Number.isFinite(value)) return "0";
  return value.toLocaleString("en", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}
