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

const FAQS = [
  { q: "What is a good revenue growth rate for a small business?", a: "Healthy growth varies by stage: early-stage businesses should target 20–50% annual growth, established small businesses 10–20%, and mature businesses 5–10%. High-growth tech businesses may target 50–100%+ annually. Consistent growth above inflation and market averages is the key benchmark." },
  { q: "What is CAGR and how do I calculate it?", a: "CAGR (Compound Annual Growth Rate) is the constant annual growth rate that would take a starting value to an ending value over a set number of years. Formula: CAGR = (End Value / Start Value)^(1/Years) − 1. It smooths out year-to-year volatility to show underlying trend." },
  { q: "What is the difference between MoM and YoY growth?", a: "Month-over-month (MoM) growth compares this month to last month. Year-over-year (YoY) compares this month (or year) to the same period 12 months ago. YoY is more meaningful for seasonal businesses as it eliminates seasonal fluctuations." },
  { q: "What is negative revenue growth?", a: "Negative revenue growth means your revenue declined compared to the previous period. A -10% growth rate means you earned 10% less than before. Negative growth is a warning signal requiring investigation into its cause — losing customers, market decline, or business model issues." },
  { q: "How do investors use CAGR?", a: "Investors use CAGR to compare the performance of different investments or business metrics over time on an annualised basis. A business growing at 25% CAGR is significantly more attractive than one growing at 5% CAGR, as the former will be 3.05× larger after 5 years vs 1.28× larger." },
  { q: "Do growth expectations differ in the US, UK, and SA?", a: "Yes, mostly driven by market size and capital availability. US investor-backed startups typically need 100%+ year-over-year growth in early years to attract follow-on capital. UK growth-stage SMEs target 30–50% annually. South African businesses face slower addressable-market expansion and typically grow 15–30% annually even when well-run. Adjust your benchmark to your market — chasing US-style growth rates in a smaller market often forces unsustainable spending." },
  { q: "What is the most common growth rate mistake?", a: "Reporting MoM growth during a high-base month and ignoring the comparison. A business that did $100K in December (holiday peak) and $80K in January shows -20% MoM growth — which looks bad but is actually a normal seasonal pattern. Always compare year-over-year for seasonal businesses, and use rolling 3-month averages for smoother trend visibility. Don't celebrate or panic based on a single high-base or low-base month." },
  { q: "What if my starting revenue is zero — can I calculate growth?", a: "No — percentage growth from zero is mathematically infinite (any number divided by zero), and the calculator returns an error. For a new business or a new revenue line, track absolute revenue for the first few periods until you have a meaningful base, then start measuring percentage growth. CAGR also fails from a zero start. Use absolute revenue change (\"grew from $0 to $30K in 6 months\") instead until the base is meaningful." },
  { q: "I have my growth rate — what should I do with it?", a: "Compare it to three things. One: inflation in your region (US ~3%, UK ~2%, SA ~5% in 2026) — growth below inflation means the business is shrinking in real terms. Two: your market's growth rate (industry reports) — beating the market means you're gaining share. Three: your own prior periods — accelerating growth is healthy, decelerating growth needs diagnosis. The number alone is meaningless; the comparison gives it meaning." },
  { q: "How is revenue growth different from profit growth?", a: "Revenue growth measures the top line — total sales over time. Profit growth measures the bottom line — what's left after costs. They often diverge: a business can grow revenue 30% while profit shrinks if costs grow faster (common during rapid expansion). Conversely, profit can grow 20% on flat revenue if margins improve. Track both: revenue growth shows market traction, profit growth shows operational discipline. Healthy long-term businesses grow both, but rarely at the same rate." },
];

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

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Growth Rate (%) = ((Current Revenue − Previous Revenue) / Previous Revenue) × 100

CAGR = ((Ending Revenue / Starting Revenue) ^ (1 / Years) − 1) × 100

Example CAGR: Revenue grew from $100,000 to $250,000 over 4 years
  CAGR = (2.5)^0.25 − 1 = 25.7%`}
        </pre>
      </FormulaBox>

      <FaqList items={FAQS} />

      <RelatedTools slugs={["net-profit-calculator", "business-valuation-calculator", "cash-flow-calculator"]} />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
