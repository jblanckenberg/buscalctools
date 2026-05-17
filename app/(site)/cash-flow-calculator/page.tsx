import CashFlowCalculator from "@/components/calculators/CashFlowCalculator";
import CalculatorShell from "@/components/shared/CalculatorShell";
import FormulaBox from "@/components/shared/FormulaBox";
import FaqList from "@/components/shared/FaqList";
import RelatedTools from "@/components/shared/RelatedTools";
import Disclaimer from "@/components/shared/Disclaimer";
import MethodologyBox from "@/components/shared/MethodologyBox";
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

const FAQS = [
  { q: "What is cash flow in business?", a: "Cash flow is the movement of money in and out of your business. Positive cash flow means more cash is coming in than going out. Negative cash flow means you are spending more than you are earning — and will run out of cash if not corrected." },
  { q: "What is the difference between cash flow and profit?", a: "A business can be profitable on paper but have negative cash flow if customers pay late. Profit is revenue minus costs on an accounting basis. Cash flow is the actual cash you have available. Many businesses fail not from lack of profit but from poor cash flow timing." },
  { q: "How do I improve business cash flow?", a: "Key strategies include: invoice immediately upon delivery, offer early payment discounts, negotiate longer payment terms with suppliers, maintain a cash reserve of 2–3 months of expenses, and delay non-essential expenditure to months with stronger income." },
  { q: "What is a cash flow projection?", a: "A cash flow projection is a month-by-month forecast of the cash you expect to receive and spend. It shows you in advance which months you may face a cash shortfall — allowing you to arrange financing, delay expenditure, or accelerate collections before the problem hits." },
  { q: "How much cash reserve should a small business keep?", a: "Most financial advisors recommend 3–6 months of operating expenses as a cash reserve. Seasonal businesses may need more. This calculator will show your lowest cash balance month — ensure your reserve covers at least that shortfall with a comfortable buffer." },
  { q: "Does VAT affect my cash flow projection?", a: "Yes, significantly. UK businesses collect 20% VAT on sales and pay it to HMRC quarterly, so cash arrives before it leaves — but the outflow is large and lumpy. South African VAT works the same way at 15%. Model the VAT payment as an expense in the month it's due (typically months 1, 4, 7, 10 in the UK). US businesses without sales tax obligations can ignore this line." },
  { q: "What is the most common cash flow projection mistake?", a: "Confusing invoice date with payment date. If your terms are net-30, an invoice raised in January is cash in February. Owners frequently enter sales in the month they were sold rather than the month payment lands, which makes the projection look better than reality. Always enter income in the month cash actually arrives, including a realistic late-payment buffer (15–20% of invoices typically slip)." },
  { q: "What if my running balance goes negative in a future month?", a: "That is a forecast shortfall — you'll run out of cash unless something changes. The calculator highlights the worst month so you can act in advance. Options: accelerate collections (offer 2% early-payment discount), delay payables (negotiate net-60 with suppliers), arrange a short-term loan or overdraft before you need it, or cut a planned expense. The earlier you spot the gap, the cheaper the fix." },
  { q: "How is cash flow different from a profit and loss statement?", a: "A P&L shows revenue and expenses on an accrual basis — income is recorded when invoiced, costs when incurred. Cash flow shows actual money moving in and out of the bank. The two diverge whenever there is a timing gap: late-paying clients, supplier credit terms, large prepayments, or depreciation (non-cash). Profitable businesses go bust from cash flow problems, not P&L problems — which is why both need monitoring." },
  { q: "I have my 12-month projection — what should I do with it?", a: "Three actions. One: identify the lowest-balance month and confirm your cash reserve plus credit facilities cover it with a 20% buffer. Two: rerun the model with a stress case — what if revenue is 20% lower or one big client pays 60 days late? Three: set a monthly check-in to compare actual cash to forecast. Variances over 10% mean the model needs updating, not that the model is wrong." },
];

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

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Monthly Net Cash Flow = Monthly Income − Monthly Expenses
Running Balance (Month N) = Opening Balance + Sum of Net Cash Flows (Month 1 to N)`}
        </pre>
      </FormulaBox>

      <FaqList items={FAQS} />

      <RelatedTools slugs={["break-even-calculator", "burn-rate-calculator"]} />

      <EmbedCTA slug={SLUG} />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
