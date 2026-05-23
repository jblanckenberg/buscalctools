import CagrCalculator from "@/components/calculators/CagrCalculator";
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

const SLUG = "cagr-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "cagr-calculator",
  title: "CAGR Calculator — Compound Annual Growth Rate | BusCalcTools",
  description:
    "Free CAGR calculator. Find the compound annual growth rate between any start and end value over any number of periods, plus a year-by-year projection.",
});

export default function CagrPage() {
  return (
    <CalculatorShell
      h1="CAGR Calculator — Compound Annual Growth Rate"
      intro="Find the constant annual rate at which a start value would have grown to its end value. The cleanest way to smooth out year-to-year volatility and compare investments or business metrics of different lengths."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema
        slug={SLUG}
        name="CAGR Calculator"
        description="Free online compound annual growth rate calculator with year-by-year projection."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
      />
      <CagrCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How CAGR works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          CAGR answers "what constant annual return would take the start value
          to the end value?" — collapsing a volatile multi-year ride into one
          comparable number. It's the metric every fund factsheet, M&A
          presentation, and revenue-growth slide leans on. Use it to compare
          investments of different lengths, to talk about "growth" without the
          year-to-year noise, or to project what would happen if recent growth
          continued unchanged.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A subtle warning: CAGR hides volatility. A portfolio that doubled
          in year 1 and lost 30% in year 2 may have the same CAGR as one that
          grew steadily at 18% per year for two years — but they're very
          different ride experiences. Use CAGR to compare endpoints, but check
          standard deviation or maximum drawdown to understand path risk.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`CAGR = (End Value / Start Value)^(1 / N) - 1

where N = number of periods (typically years)

Decision rules:
  CAGR ≥ 10%  →  Strong, comparable to long-run equity returns
  CAGR 3-10%  →  Modest, in line with inflation + a small premium
  CAGR < 0%   →  Value declined on compound basis

Example: $10,000 grows to $30,000 over 15 years
  CAGR = (30000 / 10000)^(1/15) - 1
       = 3^0.0667 - 1
       = 1.0760 - 1 = 7.60%`}
        </pre>
      </FormulaBox>

      <FaqList items={META.faqs} />

      <GlossarySection
        items={[
          { term: "CAGR", definition: "The smoothed annualised growth rate that connects a start value to an end value over N periods." },
          { term: "Total growth", definition: "Cumulative growth (end − start) ÷ start. NOT annualised." },
          { term: "Multiplier", definition: "End ÷ start. A 2× multiplier means the value doubled." },
          { term: "Volatility", definition: "Year-to-year variation around the CAGR line. Not captured by CAGR alone." },
          { term: "Rule of 72", definition: "Quick approximation: years to double ≈ 72 / CAGR (%). 7.2% CAGR doubles in ~10 years." },
        ]}
      />

      <LazyRelatedTools slugs={["roi-calculator", "npv-calculator", "revenue-growth-calculator"]} />

      <LazyMethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
