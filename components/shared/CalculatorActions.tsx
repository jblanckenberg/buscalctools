"use client";

import { useState } from "react";
import { Copy, Printer, Check } from "lucide-react";

type Props = {
  copyText: string;
  label?: string;
};

export default function CalculatorActions({ copyText, label = "result" }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore — older browsers
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
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
