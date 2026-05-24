import MrrCalculator from "@/components/calculators/MrrCalculator";
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

const SLUG = "mrr-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: SLUG,
  title: "MRR Calculator — Monthly Recurring Revenue | BusCalcTools",
  description:
    "Free MRR calculator. Tracks new, expansion, contraction, churn, and net-new MRR. Includes growth rate and implied ARR for any subscription business.",
});

export default function MrrPage() {
  return (
    <CalculatorShell
      h1="MRR Calculator — Monthly Recurring Revenue Movement"
      intro="Decompose this month's MRR change into its four moving parts: new, expansion, contraction, and churn. The standard SaaS waterfall used by every operator and investor for monthly business review."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema slug={SLUG} name="MRR Calculator" description="Free monthly recurring revenue movement calculator." featureList={META.featureList} applicationSubCategory={META.applicationSubCategory} />
      <HowToSchema slug={SLUG} name={META.howToName} description={META.howToDescription} steps={META.howToSteps} />
      <MrrCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          MRR moves for four reasons each month: new customers add MRR,
          existing customers expand (upgrades / add-ons), existing customers
          contract (downgrades), and churned customers remove MRR. Tracking
          each component separately reveals the underlying story behind
          headline growth. A flat-MRR month with $40k new and −$40k churn
          is very different from a flat-MRR month with $5k new and −$5k churn.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Ending MRR = Starting + New + Expansion − Contraction − Churn

Net New MRR = (New + Expansion) − (Contraction + Churn)

Growth Rate (m/m) = Net New MRR / Starting MRR × 100

Quick Ratio (SaaS) = (New + Expansion) / (Contraction + Churn)
  ≥ 4 = healthy SaaS; ≤ 1 = treadmill

Example: $100k starting + $12k new + $4k expansion
         − $2k contraction − $3k churn
         = $111k ending  (11% growth, $11k net new)`}
        </pre>
      </FormulaBox>

      <FaqList items={META.faqs} />

      <GlossarySection
        items={[
          { term: "New MRR", definition: "MRR from newly-acquired customers in the period." },
          { term: "Expansion MRR", definition: "MRR added by existing customers via upgrades, seat increases, or add-ons." },
          { term: "Contraction MRR", definition: "MRR lost from existing customers via downgrades or seat reductions." },
          { term: "Churn MRR", definition: "MRR lost from customers who fully cancelled." },
          { term: "Net New MRR", definition: "(New + Expansion) − (Contraction + Churn). The single most-watched SaaS health number." },
        ]}
      />

      <LazyRelatedTools slugs={["arr-calculator", "churn-rate-calculator", "cac-ltv-calculator", "subscription-pricing-calculator"]} />
      <LazyMethodologyBox slug={SLUG} />
      <Disclaimer />
    </CalculatorShell>
  );
}
