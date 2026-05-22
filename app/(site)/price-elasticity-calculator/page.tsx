import PriceElasticityCalculator from "@/components/calculators/PriceElasticityCalculator";
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

const SLUG = "price-elasticity-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "price-elasticity-calculator",
  title: "Price Elasticity Calculator — Revenue Impact | BusCalcTools",
  description:
    "Free price elasticity calculator. Measure elasticity from sales data or assume a value, then see revenue impact at 5%, 10%, and 20% price hikes.",
});

export default function PriceElasticityPage() {
  return (
    <CalculatorShell
      h1="Price Elasticity Calculator — Revenue Impact of Price Changes"
      intro="Measure how much your customers respond to price changes — either from actual sales data or from an assumed elasticity — and see what a 5%, 10%, or 20% price hike does to total revenue."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema slug={SLUG} name="Price Elasticity Calculator" description="Free price elasticity calculator with revenue impact at multiple price-hike scenarios." featureList={META.featureList} applicationSubCategory={META.applicationSubCategory} />
      <HowToSchema slug={SLUG} name={META.howToName} description={META.howToDescription} steps={META.howToSteps} />
      <PriceElasticityCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Price elasticity of demand = (% change in quantity demanded) ÷ (% change in price). Almost always negative — higher prices generally reduce demand. The absolute value tells you the responsiveness: 0.5 means demand drops half as fast as price rises (inelastic); 2 means demand drops twice as fast (elastic).
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The revenue-impact equation: ΔRevenue ≈ ΔPrice × (1 + elasticity). For elasticity = -1, a 10% price hike leaves revenue unchanged (the unit-elastic case). For elasticity = -0.5, a 10% hike grows revenue by ~4.5%. For elasticity = -2, the same 10% hike CUTS revenue by ~9%. Knowing your elasticity is the difference between a profitable price increase and a damaging one.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li><strong className="text-brand-dark">Confusing &quot;customers complained&quot; with &quot;demand dropped&quot;.</strong> Customer complaints are a signal, not a measurement. Track unit sales over time and use the measured-mode calculator with actual data.</li>
          <li><strong className="text-brand-dark">Ignoring competitors.</strong> Cross-price elasticity matters: if you raise prices but competitors hold, customers switch. Most price-hike disasters come from companies measuring elasticity in isolation and getting hit by substitution.</li>
          <li><strong className="text-brand-dark">Treating elasticity as constant.</strong> Demand curves bend. Elasticity at $20 vs $22 doesn&apos;t predict elasticity at $30 vs $35. Stress-test in small increments before large hikes.</li>
        </ul>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Elasticity = (% Change in Quantity) / (% Change in Price)

Midpoint (Arc) Formula (used here for accuracy):
  % Change = (Q2 − Q1) / ((Q1 + Q2) / 2)

Revenue Impact: New Revenue = Old Revenue × (1 + ΔP) × (1 + E × ΔP)

Classification:
  |E| < 1    Inelastic   — price hike raises revenue
  |E| = 1    Unit elastic — revenue unchanged
  |E| > 1    Elastic     — price hike reduces revenue

Typical elasticities (rough industry medians):
  Necessities (insulin, basic groceries):   -0.1 to -0.3
  Most B2B services:                         -0.5 to -1.0
  Branded consumer goods:                    -1.0 to -1.5
  Restaurants, discretionary:                -1.5 to -2.5
  Highly substitutable commodities:          -2.0 to -4.0`}
        </pre>
      </FormulaBox>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A B2B SaaS sells at $20/mo and moves 1,000 subscriptions a month. They test a $22 price for a month and see subscriptions drop to 900. Elasticity (arc formula) = (−100/950) ÷ ($2/$21) = −0.105 ÷ 0.095 = −1.10. Mildly elastic.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Revenue impact. Baseline: $20 × 1,000 = $20,000/month. At +5% price ($21): revenue = $20,000 × 1.05 × (1 + (−1.10) × 0.05) = $20,000 × 1.05 × 0.945 = $19,845. SLIGHT revenue decline despite the price hike, because elasticity exceeds 1.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          What if elasticity were just −0.5 instead? At +10% price: revenue × 1.10 × (1 − 0.5 × 0.10) = × 1.10 × 0.95 = +4.5% revenue. The same 10% price hike that loses 9% revenue at elasticity −2 generates +4.5% revenue at elasticity −0.5. The elasticity itself is the entire decision input.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">When to use this calculator</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Use this before any meaningful price change — a five, ten, or twenty percent hike across an existing product, a new pricing tier, or a discount campaign you suspect might be cannibalising margin. It is the right tool when you have at least two data points of historical price and volume on the same product, or when you want to stress-test a price decision against industry-typical elasticity ranges.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          If you are setting price from scratch with no historical data, start with the Pricing Calculator and use this one later to test the elasticity assumption. For recurring revenue products where annual versus monthly mix matters, the Subscription Pricing Calculator is the better companion.
        </p>
      </section>

      <FaqList items={META.faqs} />

      <GlossarySection
        items={[
          { term: "Price Elasticity of Demand", definition: "The percentage change in quantity demanded divided by the percentage change in price. Almost always negative; the absolute value tells you how responsive customers are." },
          { term: "Inelastic Demand", definition: "Elasticity between zero and one in absolute value. Demand drops less than price rises, so a price hike raises total revenue. Necessities and locked-in services typically sit here." },
          { term: "Elastic Demand", definition: "Elasticity greater than one in absolute value. Demand drops faster than price rises, so a price hike cuts total revenue. Most discretionary goods and substitutable commodities sit here." },
          { term: "Unit Elastic", definition: "Elasticity of exactly minus one. Demand drops at the same percentage rate as price rises, leaving total revenue unchanged. The theoretical break-even point of a price change." },
          { term: "Cross-Price Elasticity", definition: "The change in your demand caused by a competitor's price change. Positive when products substitute for each other. Often more damaging than own-price elasticity in competitive markets." },
        ]}
      />

      <LazyRelatedTools slugs={["pricing-calculator", "markup-calculator", "subscription-pricing-calculator"]} />

      <LazyMethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
