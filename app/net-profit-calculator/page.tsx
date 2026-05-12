import NetProfitCalculator from "@/components/calculators/NetProfitCalculator";
import CalculatorShell from "@/components/shared/CalculatorShell";
import FormulaBox from "@/components/shared/FormulaBox";
import FaqList from "@/components/shared/FaqList";
import RelatedTools from "@/components/shared/RelatedTools";
import Disclaimer from "@/components/shared/Disclaimer";
import WebAppSchema from "@/components/shared/WebAppSchema";
import HowToSchema from "@/components/shared/HowToSchema";
import { calculatorMetadata } from "@/lib/seo";
import { calcBreadcrumb, calcMeta } from "@/lib/calc-meta";

const SLUG = "net-profit-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "net-profit-calculator",
  title: "Net Profit Calculator — Full Revenue-to-Net Waterfall | BusCalcTools",
  description:
    "Free net profit calculator. Walk revenue down through COGS, OpEx, interest, and tax with a visual waterfall. Region-aware corporate tax for USA, UK, SA.",
});

const FAQS = [
  { q: "What is net profit?", a: "Net profit is the amount of money a business has left after paying ALL its expenses — including cost of goods sold, operating costs, interest on loans, and tax. It is the true bottom-line measure of business profitability, also called the \"bottom line\"." },
  { q: "What is the difference between gross profit and net profit?", a: "Gross profit = Revenue minus Cost of Goods Sold only. Net profit = Revenue minus ALL costs including COGS, operating expenses, interest, and tax. A business with a high gross profit margin can still have a low or negative net profit if overhead costs are high." },
  { q: "How do I calculate net profit margin?", a: "Net Profit Margin (%) = (Net Profit / Revenue) × 100. If your net profit is $25,000 on revenue of $200,000, your net profit margin is 12.5%. This means you keep $12.50 for every $100 of revenue after paying all costs." },
  { q: "What is EBITDA and is it the same as net profit?", a: "EBITDA (Earnings Before Interest, Tax, Depreciation, and Amortisation) is not the same as net profit. EBITDA excludes these four items to give a measure of operational profitability. Net profit includes them all. Investors often use EBITDA for business valuation; net profit for assessing true returns." },
  { q: "What is a good net profit margin?", a: "It varies significantly by industry. Retail: 2–5%. Software/SaaS: 20–30%. Consulting: 15–25%. Manufacturing: 5–10%. A net margin above 10% is generally considered healthy. Below 5% is thin and vulnerable to cost increases or revenue decline." },
];

export default function NetProfitPage() {
  return (
    <CalculatorShell
      h1="Net Profit Calculator — Full Profit Waterfall from Revenue to Net"
      intro="See exactly how revenue becomes bottom-line profit after COGS, operating expenses, interest, and tax."
      breadcrumbs={calcBreadcrumb(SLUG)}
    >
      <WebAppSchema
        slug={SLUG}
        name="Net Profit Calculator"
        description="Free net profit calculator with full revenue-to-net-profit waterfall — COGS, OpEx, interest, tax."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
      />
      <NetProfitCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The calculator walks down the income statement: start with revenue,
          deduct COGS to get gross profit, deduct operating expenses for
          operating profit (EBIT), deduct interest for earnings before
          tax (EBT), then deduct tax. What remains is net profit. The
          waterfall on the right shows each step.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Gross Profit         = Revenue − COGS
Operating Profit     = Gross Profit − Operating Expenses
EBT                  = Operating Profit − Interest Expense
Tax                  = EBT × Tax Rate / 100   (only on positive EBT)
Net Profit           = EBT − Tax
Net Profit Margin    = Net Profit / Revenue × 100`}
        </pre>
      </FormulaBox>

      <FaqList items={FAQS} />

      <RelatedTools slugs={["profit-margin-calculator", "roi-calculator"]} />

      <Disclaimer />
    </CalculatorShell>
  );
}
