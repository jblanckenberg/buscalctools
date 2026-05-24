import ChurnRateCalculator from "@/components/calculators/ChurnRateCalculator";
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

const SLUG = "churn-rate-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: SLUG,
  title: "Churn Rate Calculator — Gross & Net Churn | BusCalcTools",
  description:
    "Free churn rate calculator. Gross churn, net churn, and retention rate from starting customers, lost customers, and new acquisitions. SaaS benchmarks included.",
});

export default function ChurnRatePage() {
  return (
    <CalculatorShell
      h1="Churn Rate Calculator — SaaS Retention"
      intro="Calculate gross churn, net churn, and retention rate for any period. The single most-watched health metric in subscription businesses — churn over 10% per month is usually fatal at scale."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema slug={SLUG} name="Churn Rate Calculator" description="Free gross + net churn rate calculator with retention." featureList={META.featureList} applicationSubCategory={META.applicationSubCategory} />
      <HowToSchema slug={SLUG} name={META.howToName} description={META.howToDescription} steps={META.howToSteps} />
      <ChurnRateCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Gross churn measures customer loss as a percentage of the starting
          cohort, ignoring new acquisitions. Net churn nets out new customers
          and can go negative when expansion exceeds loss — the holy grail of
          SaaS economics. Track both: gross churn measures product fit
          ("are existing customers staying?") while net churn measures growth
          quality ("is the cohort expanding even before new sales?").
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Gross Churn Rate = Customers Lost / Customers at Start × 100

Net Churn Rate = (Customers Lost − New Customers) / Start × 100

Retention Rate = 100% − Gross Churn

SaaS benchmarks (monthly):
  Best-in-class B2B SaaS:    < 1%
  Healthy B2B SaaS:          1–3%
  Mature consumer SaaS:      3–7%
  Risky:                     > 10%

Example: 1,000 start, 50 lost, 80 new
  Gross churn = 5%   Retention = 95%
  Net churn   = -3%  (cohort grew before new sales)`}
        </pre>
      </FormulaBox>

      <FaqList items={META.faqs} />

      <GlossarySection
        items={[
          { term: "Gross churn", definition: "Customers (or revenue) lost as a percentage of the starting balance. Ignores new acquisitions." },
          { term: "Net churn", definition: "Gross churn minus new additions. Can be negative when expansion outpaces loss — the SaaS holy grail." },
          { term: "Retention rate", definition: "100% minus gross churn. The percentage of customers who stayed." },
          { term: "Negative churn", definition: "When expansion revenue from existing customers exceeds the revenue lost to churn — the cohort grows organically." },
        ]}
      />

      <LazyRelatedTools slugs={["mrr-calculator", "arr-calculator", "cac-ltv-calculator", "subscription-pricing-calculator"]} />
      <LazyMethodologyBox slug={SLUG} />
      <Disclaimer />
    </CalculatorShell>
  );
}
