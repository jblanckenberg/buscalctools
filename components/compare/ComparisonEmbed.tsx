import type { ComponentType } from "react";
import ProfitMarginCalculator from "@/components/calculators/ProfitMarginCalculator";
import BreakEvenCalculator from "@/components/calculators/BreakEvenCalculator";
import BusinessValuationCalculator from "@/components/calculators/BusinessValuationCalculator";

type Props = {
  slug: string;
};

const CALCULATORS: Record<string, ComponentType> = {
  "profit-margin-calculator": ProfitMarginCalculator,
  "break-even-calculator": BreakEvenCalculator,
  "business-valuation-calculator": BusinessValuationCalculator,
};

const LABELS: Record<string, string> = {
  "profit-margin-calculator": "Profit Margin Calculator",
  "break-even-calculator": "Break-Even Calculator",
  "business-valuation-calculator": "Business Valuation Calculator",
};

export default function ComparisonEmbed({ slug }: Props) {
  const Calculator = CALCULATORS[slug];

  if (!Calculator) {
    return (
      <aside
        data-comparison-embed={slug}
        className="my-10 rounded-lg border-2 border-amber-300 bg-amber-50 p-4 text-sm text-amber-900"
      >
        <strong className="font-semibold">Calculator unavailable:</strong> the
        comparison referenced a calculator slug ({slug}) that is not wired into
        ComparisonEmbed. Add it to{" "}
        <code className="font-mono text-xs">
          components/compare/ComparisonEmbed.tsx
        </code>
        .
      </aside>
    );
  }

  const label = LABELS[slug] ?? "Calculator";

  return (
    <section
      data-comparison-embed={slug}
      className="my-10 rounded-xl border border-gray-200 bg-brand-light/30 p-4 sm:p-6"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-primary">
        Try it now — {label}
      </p>
      <Calculator />
    </section>
  );
}
