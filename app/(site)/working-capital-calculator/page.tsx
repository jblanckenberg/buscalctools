import WorkingCapitalCalculator from "@/components/calculators/WorkingCapitalCalculator";
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

const SLUG = "working-capital-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "working-capital-calculator",
  title: "Working Capital Calculator — Current Ratio | BusCalcTools",
  description:
    "Free working capital and current ratio calculator. Find out if your business has enough short-term liquidity for bank lending — USA, UK, and SA.",
});

export default function WorkingCapitalPage() {
  return (
    <CalculatorShell
      h1="Working Capital Calculator — Liquidity & Bank Readiness"
      intro="Calculate your working capital and current ratio — the two numbers a bank checks first when assessing your short-term financial health."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema
        slug={SLUG}
        name="Working Capital Calculator"
        description="Free working capital and current ratio calculator with bank-lending benchmarks for USA, UK, and South Africa."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
      />
      <WorkingCapitalCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Working capital is current assets minus current liabilities — the
          cash cushion a business has after settling everything due in the
          next 12 months. The current ratio expresses the same idea as a
          multiple: assets divided by liabilities. A ratio of 2.0 means assets
          are twice liabilities; 1.0 means they exactly cover; below 1.0
          means the business cannot pay its short-term bills from short-term
          assets.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Most commercial lenders treat a current ratio of 1.5 as the floor
          for a working-capital line — below that and the file usually needs
          a personal guarantee or collateral. Above 3.0 the ratio starts
          telling a different story: the business is sitting on idle cash or
          slow-moving inventory that could earn more deployed elsewhere.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Counting all inventory at full value</strong> — slow-moving stock, seasonal lines past their season, and damaged goods aren&apos;t fully realisable. Banks discount inventory at 40-60% of book value when stress-testing the current ratio. A balance sheet showing a 1.8 ratio can drop to 1.2 once stale inventory is written down.
          </li>
          <li>
            <strong className="text-brand-dark">Treating long-term debt instalments as long-term</strong> — the portion of a five-year loan due within 12 months is a current liability, not a long-term one. Many small-business balance sheets understate current liabilities by missing this, inflating the ratio by 20-30%.
          </li>
          <li>
            <strong className="text-brand-dark">Ignoring receivable quality</strong> — £100k of receivables from one large customer 60 days overdue is not the same as £100k spread across 20 customers averaging 30 days. The current ratio treats them identically; bankers and acquirers won&apos;t. Use the DSO calculator alongside this one for the full picture.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">When to use this calculator</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Use this before applying for a bank line, before a sale of the
          business, or as a quarterly self-check. The current ratio is the
          single most common metric a lender or buyer asks for, after revenue
          and profit. Knowing yours before they do means you can fix it
          before being asked.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          For a 12-month forecast of how working capital will move with planned
          investments or sales growth, use the Cash Flow Calculator. To check
          how fast you&apos;re actually converting sales into cash, use the DSO
          Calculator.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Working Capital = Current Assets − Current Liabilities

Current Ratio = Current Assets / Current Liabilities

Bank-readiness threshold: Current Ratio ≥ 1.5

Example: Current Assets = $150,000 | Current Liabilities = $80,000
  Working Capital = $150,000 − $80,000 = $70,000
  Current Ratio   = 150 / 80 = 1.88x → bank-ready`}
        </pre>
      </FormulaBox>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A South African e-commerce business pulls its July balance sheet
          before approaching FNB for a R500,000 working-capital facility.
          Current assets total R1.2 million: R380,000 cash, R420,000 in
          accounts receivable, R350,000 in inventory, R50,000 in prepaid
          expenses. Current liabilities total R780,000: R420,000 in accounts
          payable, R180,000 in the current portion of a SARS payment
          arrangement, R120,000 in payroll due, R60,000 in VAT due.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Working capital = R1,200,000 − R780,000 = R420,000. Current ratio =
          1.54x. The headline number clears the 1.5 threshold — but the bank
          will discount the inventory. Marked down at 50% (R175,000 written
          off conceptually), effective current assets drop to R1,025,000 and
          the stressed ratio falls to 1.31x — below the threshold.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The owner has three levers before applying. First, accelerate
          receivables collection by 15 days to convert R75,000 of AR into
          cash. Second, negotiate the SARS payment arrangement to push
          R80,000 of the current portion out beyond 12 months. Third, run a
          short clearance promotion to liquidate R150,000 of slow inventory.
          Any one of these gets the stressed ratio comfortably above 1.5;
          all three together produce a confident 1.8 and a much better
          conversation with the credit committee.
        </p>
      </section>

      <FaqList items={META.faqs} />

      <GlossarySection
        items={[
          { term: "Current Assets", definition: "Assets that will be converted to cash within 12 months — cash, receivables, inventory, prepaid expenses." },
          { term: "Current Liabilities", definition: "Obligations due within 12 months — payables, short-term debt, accrued expenses, current portion of long-term debt." },
          { term: "Current Ratio", definition: "Current assets divided by current liabilities — a multiple that measures short-term liquidity. Banks typically want 1.5 or higher." },
        ]}
      />

      <LazyRelatedTools
        slugs={["cash-flow-calculator", "dso-calculator", "business-loan-calculator"]}
      />

      <LazyMethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
