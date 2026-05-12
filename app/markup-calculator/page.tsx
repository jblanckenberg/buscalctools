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

const FAQS = [
  { q: "What is markup in business?", a: "Markup is the amount added to the cost price of a product to determine its selling price. It is expressed as a percentage of cost. A 50% markup on a $20 item gives a selling price of $30. Markup is always higher than the equivalent margin percentage." },
  { q: "Is 50% markup the same as 50% margin?", a: "No. A 50% markup means you add 50% to your cost. A 50% margin means 50% of your selling price is profit. A 50% markup produces a 33.3% margin. This is one of the most common pricing mistakes in small business." },
  { q: "How do I calculate markup percentage?", a: "Markup percentage = ((Selling Price − Cost) / Cost) × 100. If your cost is $40 and your selling price is $60, the markup is ($20 / $40) × 100 = 50%." },
  { q: "What markup should I use for my products?", a: "Typical retail markups range from 50% to 200%. Service businesses often use higher markups (100–300%) because labour costs include overhead. eCommerce businesses typically need 60–100% minimum markup to cover platform fees, shipping, and advertising costs." },
  { q: "How does markup affect profit margin?", a: "Every markup percentage corresponds to a specific margin: 25% markup = 20% margin; 50% markup = 33.3% margin; 100% markup = 50% margin; 200% markup = 66.7% margin. Use the comparison panel in this calculator to see both figures simultaneously." },
];

export default function MarkupPage() {
  return (
    <CalculatorShell
      h1="Markup Calculator — Instant Cost-to-Price Conversion"
      intro="Convert a cost price into a selling price at any markup percentage — or work backwards from a selling price to find the implied markup."
      breadcrumbs={calcBreadcrumb(SLUG)}
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

      <FaqList items={FAQS} />

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
