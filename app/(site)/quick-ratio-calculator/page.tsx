import QuickRatioCalculator from "@/components/calculators/QuickRatioCalculator";
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

const SLUG = "quick-ratio-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: SLUG,
  title: "Quick Ratio Calculator — Acid-Test Liquidity | BusCalcTools",
  description:
    "Free quick ratio calculator (acid test). Measure liquid assets against current liabilities. Health-tier rating: ≥1.0 healthy, 0.5-1.0 caution, <0.5 poor.",
});

export default function QuickRatioPage() {
  return (
    <CalculatorShell
      h1="Quick Ratio Calculator — Acid-Test Liquidity"
      intro="Measure your ability to cover short-term obligations using only your most liquid assets — cash, receivables, and marketable securities. Excludes inventory because inventory often can't be turned into cash fast enough during a squeeze."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema slug={SLUG} name="Quick Ratio Calculator" description="Free quick ratio (acid-test) calculator with health-tier rating." featureList={META.featureList} applicationSubCategory={META.applicationSubCategory} />
      <HowToSchema slug={SLUG} name={META.howToName} description={META.howToDescription} steps={META.howToSteps} />
      <QuickRatioCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The quick ratio (also called the acid-test ratio) is the stricter
          sibling of the current ratio. It asks: if every short-term obligation
          came due tomorrow, could you cover it from cash, money owed to you,
          and investments you could sell on a public market — without
          fire-selling inventory at a loss? A quick ratio of 1.0 or higher means
          yes. Below 1.0 means you'd need to liquidate inventory or borrow.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Quick Ratio = (Cash + Marketable Securities + Accounts Receivable)
              / Current Liabilities

Decision tiers:
  ≥ 1.0   →  Healthy
  0.5–1.0 →  Caution
  < 0.5   →  Poor — material short-term liquidity risk

Example: $50k cash + $25k AR + $10k securities / $60k liabilities
  = $85k / $60k = 1.42 → Healthy`}
        </pre>
      </FormulaBox>

      <FaqList items={META.faqs} />

      <GlossarySection
        items={[
          { term: "Quick ratio", definition: "Liquid assets (cash + AR + securities) divided by current liabilities. Excludes inventory." },
          { term: "Acid test", definition: "Synonym for quick ratio — coined because it's a stringent test of true liquidity." },
          { term: "Current liabilities", definition: "Obligations due within 12 months — accounts payable, short-term debt, accrued expenses, current portion of long-term debt." },
          { term: "Marketable securities", definition: "Liquid investments convertible to cash within 90 days at predictable prices." },
        ]}
      />

      <LazyRelatedTools slugs={["current-ratio-calculator", "working-capital-calculator", "cash-flow-calculator", "dso-calculator"]} />
      <LazyMethodologyBox slug={SLUG} />
      <Disclaimer />
    </CalculatorShell>
  );
}
