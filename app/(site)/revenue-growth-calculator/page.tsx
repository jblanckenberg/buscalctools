import RevenueGrowthCalculator from "@/components/calculators/RevenueGrowthCalculator";
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

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A UK independent management consultancy closes 2024 on
          £680,000 of revenue. In 2025 the firm wins two larger
          retained clients and closes the year at £864,000.
          Year-on-year growth rate = (£864,000 − £680,000) ÷ £680,000
          × 100 = 27.1%. That is the simple growth rate that appears in
          most year-end summaries.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Across multiple years, CAGR (compound annual growth rate)
          smooths the picture. If the same firm grew from £480,000 in
          2022 to £864,000 in 2025 (three full years), CAGR =
          (£864,000 ÷ £480,000)^(1/3) − 1 = 21.7%. CAGR is the geometric
          mean — it accounts for the fact that each year&apos;s growth
          compounds on a larger base. CAGR is always lower than the
          arithmetic average of annual growth rates when growth is
          uneven, which is almost always.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Industry context dramatically changes how to read these
          numbers. 27% YoY is strong for an established UK
          consultancy (10–20% is benchmark, 20%+ is exceptional). The
          same 27% growth at an early-stage SaaS startup would be
          alarmingly slow — venture-backed SaaS in the under-$5M ARR
          band is expected to grow 100%+ YoY (the T2D3 model: triple,
          triple, double, double, double over five years). A mature
          retail business growing 27% is probably riding a one-off
          event (a viral product, a competitor closing). Always
          compare growth rates within the same industry, revenue band,
          and stage of business maturity.
        </p>
      </section>

      <FaqList items={META.faqs} />

      <GlossarySection
        items={[
          { term: "Growth Rate", definition: "The percentage change in revenue between two periods, calculated as the difference divided by the earlier period." },
          { term: "CAGR", definition: "Compound annual growth rate — the smoothed annual rate that links a starting value to an ending value across multiple years." },
          { term: "MoM and YoY", definition: "Month-over-month and year-over-year comparisons. Year-over-year cancels seasonality; month-over-month is more sensitive but noisier." },
        ]}
      />

      <LazyRelatedTools slugs={["net-profit-calculator", "business-valuation-calculator", "cash-flow-calculator"]} />

      <LazyMethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
