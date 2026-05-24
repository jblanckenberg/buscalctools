import CashFlowCalculator from "@/components/calculators/CashFlowCalculator";
import CalculatorShell from "@/components/shared/CalculatorShell";
import FormulaBox from "@/components/shared/FormulaBox";
import FaqList from "@/components/shared/FaqList";
import Disclaimer from "@/components/shared/Disclaimer";
import LazyMethodologyBox from "@/components/shared/LazyMethodologyBox";
import LazyRelatedTools from "@/components/shared/LazyRelatedTools";
import EmbedCTA from "@/components/shared/EmbedCTA";
import WebAppSchema from "@/components/shared/WebAppSchema";
import HowToSchema from "@/components/shared/HowToSchema";
import { calculatorMetadata } from "@/lib/seo";
import { calcBreadcrumb, calcMeta } from "@/lib/calc-meta";

const SLUG = "cash-flow-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "cash-flow-calculator",
  title: "Cash Flow Calculator — 12-Month Projection | BusCalcTools",
  description:
    "Free 12-month cash flow calculator. Project monthly income and expenses, flag negative-balance months, and view a running balance chart in your browser.",
});

export default function CashFlowPage() {
  return (
    <CalculatorShell
      h1="Cash Flow Calculator — 12-Month Projection with Visual Chart"
      intro="Project monthly cash in and out across the next 12 months. Spots negative-balance months in advance so you can plan financing or delay spend."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema
        slug={SLUG}
        name="Cash Flow Calculator"
        description="Free 12-month cash flow projection calculator with running balance chart for small businesses."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
      />
      <CashFlowCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Enter your opening cash balance, then estimated income and expenses
          for each of the next 12 months. The calculator keeps a running
          balance and highlights the month where your cash is lowest. The
          chart below shows the running balance over the year — anything
          below the red dashed line is a cash crisis warning.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Booking income in the invoice month</strong> — an invoice raised on 30 January with net-30 terms is cash in late February or early March, not January. Owners habitually enter revenue when sold rather than when paid, which makes the projection look 30–60 days better than reality. Always model income in the month cash actually arrives, with a 15–20% late-payment buffer.
          </li>
          <li>
            <strong className="text-brand-dark">Modelling tax payments only annually</strong> — UK VAT is quarterly, US federal estimated taxes are quarterly, SA VAT is bi-monthly or monthly. Each of these creates a large lumpy outflow that wrecks the month it lands in if planned as a year-end item. Add the actual due-date months explicitly.
          </li>
          <li>
            <strong className="text-brand-dark">Treating credit-line drawdowns as income</strong> — drawing $20,000 from an overdraft or line of credit is borrowing, not revenue. It increases cash today and must be repaid (with interest) later. Track financing inflows and outflows on a separate line so the operating cash flow signal stays clean.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">When to use this calculator</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Use this when you need a 12-month view of cash in and out — typical for budgeting, identifying which month will hit a cash crunch, or sizing a credit facility before you actually need it. The chart makes seasonal businesses easier to plan because the lean months become visible at a glance.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          If you are a startup focused on a single "how many months of runway?" number, the Burn Rate Calculator is more direct. For accounting profit (rather than bank balance), the Net Profit Calculator walks the income statement instead.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Monthly Net Cash Flow = Monthly Income − Monthly Expenses
Running Balance (Month N) = Opening Balance + Sum of Net Cash Flows (Month 1 to N)`}
        </pre>
      </FormulaBox>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A UK ecommerce business invoices £45,000 of revenue per month
          consistently. Customers pay on Net 30 terms, so the cash from
          January&apos;s £45,000 of invoices arrives in February. The
          supplier — a UK manufacturer — invoices £18,000 of stock per
          month on Net 0 (payment-on-delivery). Other variable costs
          (payment processing, shipping, packaging) total £6,000 per
          month, also paid in-month.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Project the first 60 days from a zero cash balance. January
          cash out: £18,000 supplier + £6,000 other = £24,000. January
          cash in: zero — invoices issued, not yet collected. End-of-
          January cash balance: −£24,000. February cash out: £24,000
          again. February cash in: £45,000 from January&apos;s invoices.
          End-of-February cash: −£3,000. By end of March, with another
          £45,000 arriving against £24,000 of cost, the balance reaches
          +£18,000.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The business is profitable on paper (£21,000 of monthly gross
          contribution) but operationally bankrupt in week one without
          working-capital coverage of at least £24,000. This is the most
          common cause of small-business failure: profitability is not
          liquidity. The two highest-leverage fixes are shortening
          receivables (offer a 2% discount for prepayment, or move to
          Net 14) and lengthening payables (negotiate Net 30 with the
          supplier, even at a slightly higher unit price). A 30-day shift
          in the cash-conversion cycle frees £45,000 of working capital
          — usually more than the business&apos;s actual profit for the
          quarter.
        </p>
      </section>

      <FaqList items={META.faqs} />

      <LazyRelatedTools slugs={["quick-ratio-calculator", "current-ratio-calculator", "break-even-calculator", "burn-rate-calculator"]} />

      <EmbedCTA slug={SLUG} />

      <LazyMethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
