"use client";

import { clsx } from "clsx";
import { Region, REGIONS } from "@/lib/regions";

type Props = {
  region: Region;
  onChange: (next: Region) => void;
  size?: "sm" | "md";
};

const ORDER: Region[] = ["USA", "UK", "SA"];

export default function RegionToggle({ region, onChange, size = "md" }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Region"
      className={clsx(
        "inline-flex rounded-lg border border-gray-200 bg-white p-1",
        size === "sm" ? "text-xs" : "text-sm"
      )}
    >
      {ORDER.map((code) => {
        const active = region === code;
        const cfg = REGIONS[code];
        return (
          <button
            key={code}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(code)}
            className={clsx(
              "rounded-md px-3 font-medium transition-colors",
              size === "sm" ? "py-1.5" : "py-2",
              active
                ? "bg-brand-primary text-white"
                : "text-brand-dark hover:bg-brand-light"
            )}
          >
            {cfg.symbol} {code}
          </button>
        );
      })}
    </div>
  );
}
