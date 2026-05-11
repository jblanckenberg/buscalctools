import RevenueGrowthCalculator from "@/components/calculators/RevenueGrowthCalculator";
import CalculatorShell from "@/components/shared/CalculatorShell";
import FormulaBox from "@/components/shared/FormulaBox";
import FaqList from "@/components/shared/FaqList";
import RelatedTools from "@/components/shared/RelatedTools";
import Disclaimer from "@/components/shared/Disclaimer";
import WebAppSchema from "@/components/shared/WebAppSchema";
import { calculatorMetadata } from "@/lib/seo";

export const metadata = calculatorMetadata({
  slug: "revenue-growth-calculator",
  title: "Revenue Growth Rate Calculator — MoM, YoY and CAGR Calculator",
  description:
    "Calculate revenue growth rate month-over-month, year-over-year, and CAGR. Free business growth calculator.",
});

const FAQS = [
  { q: "What is a good revenue growth rate for a small business?", a: "Healthy growth varies by stage: early-stage businesses should target 20–50% annual growth, established small businesses 10–20%, and mature businesses 5–10%. High-growth tech businesses may target 50–100%+ annually. Consistent growth above inflation and market averages is the key benchmark." },
  { q: "What is CAGR and how do I calculate it?", a: "CAGR (Compound Annual Growth Rate) is the constant annual growth rate that would take a starting value to an ending value over a set number of years. Formula: CAGR = (End Value / Start Value)^(1/Years) − 1. It smooths out year-to-year volatility to show underlying trend." },
  { q: "What is the difference between MoM and YoY growth?", a: "Month-over-month (MoM) growth compares this month to last month. Year-over-year (YoY) compares this month (or year) to the same period 12 months ago. YoY is more meaningful for seasonal businesses as it eliminates seasonal fluctuations." },
  { q: "What is negative revenue growth?", a: "Negative revenue growth means your revenue declined compared to the previous period. A -10% growth rate means you earned 10% less than before. Negative growth is a warning signal requiring investigation into its cause — losing customers, market decline, or business model issues." },
  { q: "How do investors use CAGR?", a: "Investors use CAGR to compare the performance of different investments or business metrics over time on an annualised basis. A business growing at 25% CAGR is significantly more attractive than one growing at 5% CAGR, as the former will be 3.05× larger after 5 years vs 1.28× larger." },
];

export default function RevenueGrowthPage() {
  return (
    <CalculatorShell
      h1="Revenue Growth Rate Calculator — MoM, YoY and CAGR"
      intro="Period-over-period growth (monthly or annual) plus multi-year CAGR to compare against benchmarks and investors' expectations."
    >
      <WebAppSchema
        slug="revenue-growth-calculator"
        name="Revenue Growth Rate Calculator"
        description="Free revenue growth calculator — period-over-period growth and CAGR for any business."
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

      <Disclaimer />
    </CalculatorShell>
  );
}
