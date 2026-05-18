import NetProfitCalculator from "@/components/calculators/NetProfitCalculator";
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

const SLUG = "net-profit-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "net-profit-calculator",
  title: "Net Profit Calculator — Full Waterfall | BusCalcTools",
  description:
    "Free net profit calculator. Walk revenue down through COGS, OpEx, interest, and tax with a visual waterfall. Region-aware corporate tax for USA, UK, SA.",
});

const FAQS = [
  { q: "What is net profit?", a: "Net profit is the amount of money a business has left after paying ALL its expenses — including cost of goods sold, operating costs, interest on loans, and tax. It is the true bottom-line measure of business profitability, also called the \"bottom line\"." },
  { q: "What is the difference between gross profit and net profit?", a: "Gross profit = Revenue minus Cost of Goods Sold only. Net profit = Revenue minus ALL costs including COGS, operating expenses, interest, and tax. A business with a high gross profit margin can still have a low or negative net profit if overhead costs are high." },
  { q: "How do I calculate net profit margin?", a: "Net Profit Margin (%) = (Net Profit / Revenue) × 100. If your net profit is $25,000 on revenue of $200,000, your net profit margin is 12.5%. This means you keep $12.50 for every $100 of revenue after paying all costs." },
  { q: "What is EBITDA and is it the same as net profit?", a: "EBITDA (Earnings Before Interest, Tax, Depreciation, and Amortisation) is not the same as net profit. EBITDA excludes these four items to give a measure of operational profitability. Net profit includes them all. Investors often use EBITDA for business valuation; net profit for assessing true returns." },
  { q: "What is a good net profit margin?", a: "It varies significantly by industry. Retail: 2–5%. Software/SaaS: 20–30%. Consulting: 15–25%. Manufacturing: 5–10%. A net margin above 10% is generally considered healthy. Below 5% is thin and vulnerable to cost increases or revenue decline." },
  { q: "How does corporation tax differ between the US, UK, and South Africa?", a: "US federal corporate tax is 21%, but state taxes add 0–10% on top (Texas and Florida charge 0%, California adds 8.84%). UK corporation tax is 25%, with a 19% small profits rate for taxable profits under £50,000. South Africa charges a flat 27% on company income. This calculator preloads the headline rate for each region, but always confirm your effective rate with an accountant." },
  { q: "What is the most common net profit calculation mistake?", a: "Forgetting to deduct the owner's salary from operating expenses. A sole owner who pays themselves through dividends or drawings often shows an inflated net profit because their labour cost is missing from the income statement. Always include a market-rate salary for the founder in OpEx — otherwise the business looks more profitable than it is and decisions get made on the wrong number." },
  { q: "What happens if my interest expense is bigger than operating profit?", a: "Earnings before tax (EBT) becomes negative — operating profit minus interest = a loss. The calculator stops applying tax at that point (you do not pay tax on a loss in any of the three regions, and you may be able to carry the loss forward). A negative EBT is a strong signal that your debt service is unsustainable: either revenue must grow or the loan needs to be restructured." },
  { q: "How is net profit different from cash flow?", a: "Net profit is an accounting result — it includes non-cash items like depreciation and counts revenue when it is invoiced, not when it is paid. Cash flow tracks actual money in and out of the bank. A business can be profitable on paper but cash-poor (clients pay late) or unprofitable but cash-rich (deposits taken in advance). Use this calculator for profitability and the Cash Flow Calculator for liquidity." },
  { q: "I have my net profit number — what do I do with it?", a: "Three things. First, calculate the net margin (net profit ÷ revenue) and compare it to your industry benchmark. Second, look at the waterfall to see which line is eating the most profit — is it COGS, OpEx, interest, or tax? Attack the biggest leak. Third, decide what to do with the profit: reinvest in growth, pay down debt, build a cash reserve, or take it as owner compensation. Treat the number as a starting point for a decision, not the end of the analysis." },
];

export default function NetProfitPage() {
  return (
    <CalculatorShell
      h1="Net Profit Calculator — Full Profit Waterfall from Revenue to Net"
      intro="See exactly how revenue becomes bottom-line profit after COGS, operating expenses, interest, and tax."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
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

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Leaving the owner's salary out of OpEx</strong> — sole owners who draw dividends or distributions often skip a salary line entirely, which inflates net profit by their entire labour cost. Always include a market-rate salary for the founder in operating expenses; otherwise the business looks more profitable than it is and every comparison to peers is distorted.
          </li>
          <li>
            <strong className="text-brand-dark">Confusing net profit with cash in the bank</strong> — net profit is an accounting result that recognises revenue when invoiced (not when paid) and includes non-cash items like depreciation. A profitable business can run out of cash, and a loss-making one can be cash-rich. Pair this calculator with the Cash Flow Calculator before making spending decisions.
          </li>
          <li>
            <strong className="text-brand-dark">Applying tax to a loss</strong> — when EBT is negative there is no tax payable in any of the three regions, and the loss can usually be carried forward against future profits. Owners sometimes still book a "tax provision" out of habit, which double-counts the loss. This calculator correctly applies tax only on positive earnings before tax.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">When to use this calculator</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Use this when you want a full income-statement walk from revenue to bottom line, including interest and tax. It is the right tool at year-end, when modelling the impact of a new debt facility, or when explaining to a co-owner where the profit actually ends up.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          If you only need the percentage margins (gross, operating, net) without the dollar waterfall, the Profit Margin Calculator is faster. To assess whether a specific investment generates an acceptable return on capital, use the ROI Calculator instead.
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

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
