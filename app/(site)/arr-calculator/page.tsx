import ArrCalculator from "@/components/calculators/ArrCalculator";
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

const SLUG = "arr-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: SLUG,
  title: "ARR Calculator — Annual Recurring Revenue | BusCalcTools",
  description:
    "Free ARR calculator. Naive ARR (MRR × 12) plus churn-adjusted and growth-projected variants. The 3 ARR numbers every SaaS investor wants to see.",
});

export default function ArrPage() {
  return (
    <CalculatorShell
      h1="ARR Calculator — Annual Recurring Revenue"
      intro="Three ways to compute ARR: the headline naive number (MRR × 12), a churn-adjusted forward projection, and a growth-projected forward projection. Investor decks usually present one; honest reporting shows all three."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema slug={SLUG} name="ARR Calculator" description="Free annual recurring revenue calculator with churn-adjusted and growth-projected variants." featureList={META.featureList} applicationSubCategory={META.applicationSubCategory} />
      <HowToSchema slug={SLUG} name={META.howToName} description={META.howToDescription} steps={META.howToSteps} />
      <ArrCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Naive ARR is current MRR multiplied by 12 — what the deck almost
          always shows. It assumes today's revenue will continue unchanged
          for 12 months, which is rarely true in practice. The churn-adjusted
          and growth-projected variants stress-test the headline by carrying
          today's churn (or growth) forward 12 months at current rates.
          The gap between the three numbers is itself a useful signal:
          a wide gap means current MRR is changing fast.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Naive ARR = MRR × 12

Churn-Adjusted ARR (12 mo forward)
  = MRR × (1 − monthly_churn)^12 × 12

Growth-Projected ARR (12 mo forward)
  = MRR × (1 + monthly_growth)^12 × 12

Committed ARR (cARR) = ARR from contracted customers only

Example: $50k MRR, 2% monthly churn, 5% monthly growth
  Naive:           $600k
  Churn-adjusted:  $471k  (78.5% retained)
  Growth-projected: $1.08M (assumes 5% holds)`}
        </pre>
      </FormulaBox>

      <FaqList items={META.faqs} />

      <GlossarySection
        items={[
          { term: "ARR", definition: "Annual Recurring Revenue. Current MRR × 12, or the annualised value of all active subscriptions." },
          { term: "Naive ARR", definition: "MRR × 12. Assumes today's MRR stays flat for 12 months." },
          { term: "cARR", definition: "Committed ARR — ARR from customers with signed contracts, even if billing hasn't started." },
          { term: "Forward ARR", definition: "ARR projected by carrying current growth or churn rate forward 12 months." },
        ]}
      />

      <LazyRelatedTools slugs={["mrr-calculator", "churn-rate-calculator", "cac-ltv-calculator", "subscription-pricing-calculator"]} />
      <LazyMethodologyBox slug={SLUG} />
      <Disclaimer />
    </CalculatorShell>
  );
}
