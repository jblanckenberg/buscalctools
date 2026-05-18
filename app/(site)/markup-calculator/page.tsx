import MarkupCalculator from "@/components/calculators/MarkupCalculator";
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

const SLUG = "markup-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "markup-calculator",
  title: "Markup Calculator — Cost to Selling Price | BusCalcTools",
  description:
    "Free markup calculator. Convert any cost to selling price at the markup % you choose, with reverse mode and side-by-side margin. Works for USA, UK, SA.",
});

export default function MarkupPage() {
  return (
    <CalculatorShell
      h1="Markup Calculator — Instant Cost-to-Price Conversion"
      intro="Convert a cost price into a selling price at any markup percentage — or work backwards from a selling price to find the implied markup."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema
        slug={SLUG}
        name="Markup Calculator"
        description="Free online markup calculator — convert cost to selling price at any markup percentage."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
      />
      <MarkupCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Enter your cost price and the markup percentage you want to apply.
          The calculator returns the selling price, the profit per unit, and
          the implied margin. Toggle to reverse mode to start from a selling
          price and see what markup it represents on your cost. The
          calculation is the same in every region — only the currency symbol
          changes.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Treating markup as margin</strong> — a 50% markup is not a 50% margin. The same transaction has a markup higher than its margin (50% markup = 33.3% margin; 100% markup = 50% margin). Pricing off the markup number while reporting profit on the margin number is the single most expensive small-business pricing error.
          </li>
          <li>
            <strong className="text-brand-dark">Ignoring overhead in the cost figure</strong> — markup is applied to "cost", but most sellers only plug in the supplier invoice. The true cost per unit also includes inbound freight, packaging, returns allowance, and an allocated share of overhead. A 40% markup on a $50 invoice can become a 10% markup on the all-in $73 unit.
          </li>
          <li>
            <strong className="text-brand-dark">Using the same markup on every SKU</strong> — slow-moving items, fragile items with high return rates, and items with low search volume need a higher markup than fast turning bestsellers. A blanket "we mark up 60% on everything" leaves money on the table on hero products and underprices long-tail risk.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">When to use this calculator</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Use this when you have a confirmed cost and want to set a selling price by adding a percentage on top, or when you have a competitor's price and want to see what markup it implies on your cost base. It is the cleanest tool for fast cost-to-price decisions on a single SKU.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          If you would rather work backwards from a target profit margin (e.g. "I need 40% margin on this product"), the Pricing Calculator is the better starting point. To audit existing prices for actual margin earned, use the Profit Margin Calculator.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Selling Price = Cost × (1 + Markup / 100)

Margin (%) = Markup / (100 + Markup) × 100

Example: Cost = $40 | Markup = 50%
  Selling Price = $40 × 1.50 = $60
  Gross Profit  = $20
  Margin        = (20/60) × 100 = 33.3%`}
        </pre>
      </FormulaBox>

      <FaqList items={META.faqs} />

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-brand-dark">Glossary</h2>
        <dl className="mt-3 space-y-3 text-sm text-gray-700">
          <div>
            <dt className="font-semibold text-brand-dark">Markup</dt>
            <dd>A percentage added on top of cost to set selling price.</dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-dark">Margin</dt>
            <dd>Profit expressed as a percentage of selling price (always lower than the equivalent markup).</dd>
          </div>
        </dl>
      </section>

      <RelatedTools slugs={["profit-margin-calculator", "pricing-calculator"]} />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
