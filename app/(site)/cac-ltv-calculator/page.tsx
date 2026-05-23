import CacLtvCalculator from "@/components/calculators/CacLtvCalculator";
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

const SLUG = "cac-ltv-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "cac-ltv-calculator",
  title: "CAC vs LTV Calculator — Payback & Ratio | BusCalcTools",
  description:
    "Free CAC vs LTV calculator. Find your customer acquisition cost, lifetime value, payback period, and the all-important LTV/CAC ratio for any subscription business.",
});

export default function CacLtvPage() {
  return (
    <CalculatorShell
      h1="CAC vs LTV Calculator — The Only Ratio That Matters"
      intro="Calculate customer acquisition cost, lifetime value, and the LTV/CAC ratio that determines whether your growth engine is creating or destroying value."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema
        slug={SLUG}
        name="CAC LTV Calculator"
        description="Free customer acquisition cost vs lifetime value calculator with payback period and health rating."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
      />
      <CacLtvCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Customer Acquisition Cost (CAC) is all-in sales and marketing spend
          divided by new customers acquired in the same period. Include ad
          spend, sales salaries and commissions, marketing tools, content
          production, and any agency fees. Exclude product-development spend
          (that&apos;s R&amp;D, not CAC).
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Lifetime Value (LTV) is the average gross-margin contribution from a
          customer across their lifetime. Formula: monthly revenue per customer
          × gross margin × expected lifespan in months. Lifespan = 1 ÷ monthly
          churn rate, so 2% monthly churn implies a 50-month lifespan. The
          gross margin matters because LTV is about contribution to fixed
          costs and profit, not headline revenue.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The LTV/CAC ratio is the single number that captures whether the
          acquisition engine creates or destroys value. David Skok&apos;s SaaS
          canonical thresholds: 3× is healthy, 5× is exceptional, below 1×
          burns cash on every customer. The payback period — months of
          gross-margin contribution to recover CAC — is the secondary check;
          under 12 months is conservative-investor-friendly, 12-18 is
          typical, over 18 is hard to fund.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Using revenue instead of gross margin for LTV</strong> — a $100 ARPU customer at 30% gross margin contributes $30 a month, not $100. LTV computed on revenue is inflated 3× in low-margin businesses and produces dangerously optimistic ratios. Always multiply ARPU by gross margin percentage.
          </li>
          <li>
            <strong className="text-brand-dark">Forgetting to allocate sales salaries to CAC</strong> — most early-stage founders report "CAC = ad spend / new customers" and skip the SDR/AE salaries. The real CAC at most SaaS companies is 60-80% labour, not ad spend. Allocate proportionally; the gap is usually 2-5× the surface number.
          </li>
          <li>
            <strong className="text-brand-dark">Treating short-lived customer cohorts as the lifespan</strong> — if you&apos;ve only been operating 18 months, you don&apos;t have data on customer lifespan. Use monthly churn rate inversely: 3% monthly churn = 33-month lifespan. Annualised churn rates need careful conversion (10% annual churn ≠ 0.83% monthly).
          </li>
          <li>
            <strong className="text-brand-dark">Mixing self-serve and sales-led customer segments</strong> — a $20/mo self-serve customer acquired for $50 has wildly different unit economics from a $500/mo enterprise customer acquired for $3,000. Aggregate ratios mask this. Compute CAC/LTV separately per channel and segment.
          </li>
        </ul>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`CAC      = Sales &amp; Marketing Spend / New Customers Acquired

LTV      = ARPU × Gross Margin % × Customer Lifespan (months)
         where Lifespan = 1 / monthly churn rate

LTV/CAC  = LTV / CAC

Payback  = CAC / (ARPU × Gross Margin %) months

Health bands (SaaS conventional wisdom):
  ≥ 5×:   Excellent — strong investor profile
  3-5×:   Healthy — sustainable, can scale
  1-3×:   Marginal — covers costs but not overhead
  &lt; 1×:    Burning cash on every customer

Payback target: under 12 months conservative, 12-18 typical, &gt; 18 hard to fund`}
        </pre>
      </FormulaBox>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A B2B SaaS startup spent $30,000 on sales and marketing in a quarter
          and acquired 150 new customers. CAC = $30,000 / 150 = $200. Average
          monthly revenue per customer is $60. Gross margin is 70% (typical
          SaaS — hosting, support, payment processing make up the 30% variable
          cost). Monthly churn is 4%, giving an expected lifespan of 25
          months.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          LTV = $60 × 70% × 25 = $1,050. LTV/CAC = $1,050 / $200 = 5.25×.
          Health: excellent. Payback period = $200 / ($60 × 70%) = $200 / $42
          = 4.8 months. Conservative-investor green light on both metrics.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Now flex one variable. If monthly churn doubles to 8% (lifespan
          drops to 12.5 months), LTV collapses to $525 and the ratio falls
          to 2.6× — barely above the marginal threshold. Churn is the most
          sensitive lever in this whole calculation; a 1-2 percentage point
          shift in monthly churn changes LTV by 30-50%. The most valuable
          retention investment is almost always cheaper than a sales-team
          push to compensate.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Flex the other direction. If CAC creeps to $400 (say, as the
          startup outgrows easy organic channels and starts paying for harder
          ones), LTV/CAC at the original $1,050 LTV drops to 2.6×. Same
          ratio as the churn scenario above — and just as concerning. The
          calculator&apos;s job is to make this trade-off visible before the
          board meeting, not at it.
        </p>
      </section>

      <FaqList items={META.faqs} />

      <GlossarySection
        items={[
          { term: "CAC", definition: "Customer acquisition cost — fully-loaded sales and marketing spend divided by new customers acquired in the same period." },
          { term: "LTV", definition: "Lifetime value — the gross-margin contribution expected from a customer over the time they stay subscribed." },
          { term: "Payback Period", definition: "Months of gross-margin contribution needed to recover acquisition cost. The cash-flow check that sits alongside the LTV/CAC ratio." },
          { term: "ARPU", definition: "Average revenue per user, usually quoted monthly. The input that drives both LTV and payback period." },
        ]}
      />

      <LazyRelatedTools
        slugs={["roi-calculator", "subscription-pricing-calculator", "burn-rate-calculator"]}
      />

      <LazyMethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
