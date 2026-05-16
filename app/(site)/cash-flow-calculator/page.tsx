import CashFlowCalculator from "@/components/calculators/CashFlowCalculator";
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

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
