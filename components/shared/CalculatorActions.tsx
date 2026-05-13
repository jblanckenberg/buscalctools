"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Copy, Printer, Check } from "lucide-react";
import { trackCalcCompleted } from "@/lib/analytics";

type Props = {
  copyText: string;
  label?: string;
};

export default function CalculatorActions({ copyText, label = "result" }: Props) {
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();
  // Strip leading slash + any trailing slash; first segment is the calc slug.
  // Works for `/profit-margin-calculator` (calc page) and is harmless on any
  // other path — trackCalcCompleted no-ops when gtag is absent anyway.
  const slug = (pathname ?? "").replace(/^\/+/, "").split("/")[0] ?? "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore — older browsers
    }
    trackCalcCompleted(slug);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
    trackCalcCompleted(slug);
  };

  return (
    <div className="mt-4 flex flex-wrap gap-2 print:hidden">
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-brand-dark hover:bg-brand-light"
        aria-label={`Copy ${label}`}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? "Copied" : `Copy ${label}`}
      </button>
      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-brand-dark hover:bg-brand-light"
        aria-label="Print page"
      >
        <Printer size={16} />
        Print
      </button>
    </div>
  );
}
