import CurrentRatioCalculator from "@/components/calculators/CurrentRatioCalculator";
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

const SLUG = "current-ratio-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: SLUG,
  title: "Current Ratio Calculator — Liquidity Health | BusCalcTools",
  description:
    "Free current ratio calculator. Compare current assets against current liabilities to check short-term liquidity. Includes working-capital breakdown and health tier.",
});

export default function CurrentRatioPage() {
  return (
    <CalculatorShell
      h1="Current Ratio Calculator — Short-Term Liquidity"
      intro="The first liquidity check most lenders and investors run. Compares everything you can turn into cash within 12 months against everything you owe within 12 months. Ratios at or above 1.5 are healthy; below 1.0 is a red flag."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema slug={SLUG} name="Current Ratio Calculator" description="Free current ratio (working capital) calculator." featureList={META.featureList} applicationSubCategory={META.applicationSubCategory} />
      <HowToSchema slug={SLUG} name={META.howToName} description={META.howToDescription} steps={META.howToSteps} />
      <CurrentRatioCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The current ratio is the most common liquidity measure on a balance
          sheet review. It's intentionally inclusive — every current asset
          counts, including inventory — because over a 12-month window inventory
          should reasonably convert to cash. For a stricter test that excludes
          inventory, use the Quick Ratio.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Current Ratio = Current Assets / Current Liabilities

Working Capital = Current Assets − Current Liabilities

Decision tiers:
  ≥ 1.5   →  Healthy
  1.0–1.5 →  Caution
  < 1.0   →  Poor — liabilities exceed assets

Example: $150k assets / $75k liabilities = 2.0 → Healthy
         Working capital = $75k`}
        </pre>
      </FormulaBox>

      <FaqList items={META.faqs} />

      <GlossarySection
        items={[
          { term: "Current ratio", definition: "Current assets divided by current liabilities. Both inputs use a 12-month horizon." },
          { term: "Working capital", definition: "Current assets minus current liabilities — the dollar cushion that funds day-to-day operations." },
          { term: "Current assets", definition: "Anything convertible to cash within 12 months: cash, AR, inventory, prepaid expenses, marketable securities." },
          { term: "Current liabilities", definition: "Anything due within 12 months: AP, short-term debt, accrued expenses, current portion of long-term debt." },
        ]}
      />

      <LazyRelatedTools slugs={["quick-ratio-calculator", "working-capital-calculator", "cash-flow-calculator", "debt-to-equity-calculator"]} />
      <LazyMethodologyBox slug={SLUG} />
      <Disclaimer />
    </CalculatorShell>
  );
}
