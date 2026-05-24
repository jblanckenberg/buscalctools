import DebtToEquityCalculator from "@/components/calculators/DebtToEquityCalculator";
import CalculatorShell from "@/components/shared/CalculatorShell";
import FormulaBox from "@/components/shared/FormulaBox";
import FaqList from "@/components/shared/FaqList";
import Disclaimer from "@/components/shared/Disclaimer";
import GlossarySection from "@/components/shared/GlossarySection";
import LazyMethodologyBox from "@/components/shared/LazyMethodologyBox";
import LazyRelatedTools from "@/components/shared/LazyRelatedTools";
import WebAppSchema from "@/components/shared/WebAppSchema";
import HowToSchema from "@/components/shared/HowToSchema";
import { calculatorMetadata } from "@/lib/seo";
import { calcBreadcrumb, calcMeta } from "@/lib/calc-meta";

const SLUG = "debt-to-equity-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: SLUG,
  title: "Debt-to-Equity Calculator — Capital Structure | BusCalcTools",
  description:
    "Free debt-to-equity (D/E) calculator. Measure leverage against equity, with health tier and capital-structure breakdown. Industry benchmarks for banks, tech, utilities.",
});

export default function DebtToEquityPage() {
  return (
    <CalculatorShell
      h1="Debt-to-Equity Calculator — Leverage Health Check"
      intro="The single most-watched leverage metric. Compares interest-bearing debt against shareholders' equity to show how aggressively a business is funded by borrowing versus owner capital."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema slug={SLUG} name="Debt-to-Equity Calculator" description="Free D/E ratio calculator with capital-structure breakdown." featureList={META.featureList} applicationSubCategory={META.applicationSubCategory} />
      <HowToSchema slug={SLUG} name={META.howToName} description={META.howToDescription} steps={META.howToSteps} />
      <DebtToEquityCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          D/E expresses how each dollar of equity is matched by dollars of debt.
          A ratio of 1.0 means equal amounts. Higher ratios mean more leverage
          — better returns when revenue grows, worse outcomes when it shrinks
          or rates rise. Industry benchmarks vary widely: banks frequently run
          D/E of 10–15 (they're in the business of borrowing); utilities run
          1.5–3 (stable cash flows support steady debt); tech companies often
          run below 0.5 (intangible-asset base doesn't service debt well).
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Debt-to-Equity = Total Debt / Total Shareholders' Equity

Decision tiers (non-financial companies):
  ≤ 1.0   →  Healthy / conservative
  1.0–2.0 →  Elevated — watch interest coverage
  > 2.0   →  High — concentrated downside risk

Industry benchmarks (typical):
  Tech / SaaS:       0.1–0.5
  Manufacturing:     0.5–1.5
  Retail:            0.5–1.5
  Utilities:         1.5–3.0
  Banks:             8–15 (different rules)

Example: $100k debt / $150k equity = 0.67 → Healthy`}
        </pre>
      </FormulaBox>

      <FaqList items={META.faqs} />

      <GlossarySection
        items={[
          { term: "Debt-to-equity (D/E)", definition: "Interest-bearing debt divided by shareholders' equity. The headline leverage measure." },
          { term: "Total debt", definition: "All interest-bearing obligations — bank loans, bonds, lines of credit, lease obligations. NOT trade payables." },
          { term: "Shareholders' equity", definition: "Total assets minus total liabilities. The residual owner's claim on the business." },
          { term: "Leverage", definition: "Use of borrowed money to amplify returns. Magnifies upside AND downside on the equity base." },
        ]}
      />

      <LazyRelatedTools slugs={["business-loan-calculator", "current-ratio-calculator", "quick-ratio-calculator", "roe-calculator"]} />
      <LazyMethodologyBox slug={SLUG} />
      <Disclaimer />
    </CalculatorShell>
  );
}
