import RevenueGrowthCalculator from "@/components/calculators/RevenueGrowthCalculator";
import CalculatorShell from "@/components/shared/CalculatorShell";
import FormulaBox from "@/components/shared/FormulaBox";
import FaqList from "@/components/shared/FaqList";
import RelatedTools from "@/components/shared/RelatedTools";
import Disclaimer from "@/components/shared/Disclaimer";
import MethodologyBox from "@/components/shared/MethodologyBox";
import WebAppSchema from "@/components/shared/WebAppSchema";
import HowToSchema from "@/components/shared/HowToSchema";
import { calculatorMetadata } from "@/lib/seo";
import { calcBreadcrumb, calcMeta } from "@/lib/calc-meta";

const SLUG = "revenue-growth-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "revenue-growth-calculator",
  title: "Revenue Growth Calculator — MoM, YoY, CAGR | BusCalcTools",
  description:
    "Free revenue growth calculator. Month-over-month and year-over-year growth plus multi-year CAGR. Benchmark against investor and industry standards.",
});

export default function RevenueGrowthPage() {
  return (
    <CalculatorShell
      h1="Revenue Growth Rate Calculator — MoM, YoY and CAGR"
      intro="Period-over-period growth (monthly or annual) plus multi-year CAGR to compare against benchmarks and investors' expectations."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema
        slug={SLUG}
        name="Revenue Growth Rate Calculator"
        description="Free revenue growth calculator — period-over-period growth and CAGR for any business."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
      />
      <RevenueGrowthCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Period-over-period mode compares any two revenue figures and
          returns the percentage change — use it for month-over-month or
          year-over-year tracking. CAGR mode takes a starting revenue, an
          ending revenue, and the number of years between them, then
          returns the constant annual growth rate that links the two —
          smoothing out lumpy individual years. CAGR is the right metric
          for multi-year trend reporting and investor benchmarks.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Comparing high-base to low-base months</strong> — a retailer that did $100K in December and $80K in January shows -20% MoM growth that is actually normal seasonality, not decline. For seasonal businesses, always use year-over-year or a rolling 3-month average rather than raw month-on-month.
          </li>
          <li>
            <strong className="text-brand-dark">Quoting CAGR over too short a window</strong> — CAGR over a single year is just the growth rate; CAGR over two years smooths very little. The metric is most useful over 3–5 years. Three-month CAGR figures (sometimes annualised by investors hunting for a hot narrative) overstate the underlying trend and crumble in due diligence.
          </li>
          <li>
            <strong className="text-brand-dark">Growing revenue without checking margin</strong> — a 40% revenue jump that came from heavy discounting or a loss-leading product launch can actually shrink profit. Track revenue growth alongside gross margin so the topline number reflects healthy expansion rather than market-share buying.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">When to use this calculator</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Use this for monthly performance reviews (MoM/YoY), annual planning, investor updates, and multi-year strategic reporting (CAGR). It is the right tool for benchmarking the top line against inflation, market growth, or your own prior periods.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          If you want to assess whether revenue growth is translating into bottom-line growth, pair this with the Net Profit Calculator. To turn a growth rate into a valuation impact, run the projection through the Business Valuation Calculator.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Growth Rate (%) = ((Current Revenue − Previous Revenue) / Previous Revenue) × 100

CAGR = ((Ending Revenue / Starting Revenue) ^ (1 / Years) − 1) × 100

Example CAGR: Revenue grew from $100,000 to $250,000 over 4 years
  CAGR = (2.5)^0.25 − 1 = 25.7%`}
        </pre>
      </FormulaBox>

      <FaqList items={META.faqs} />

      <RelatedTools slugs={["net-profit-calculator", "business-valuation-calculator", "cash-flow-calculator"]} />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
