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
  { q: "Do UK and US retailers calculate markup the same way?", a: "Yes — the formula is identical worldwide: markup is always profit as a percentage of cost. What differs is how prices are displayed at the till. UK retailers show prices inclusive of 20% VAT, so the markup is applied to the pre-VAT cost and then VAT is added on top. US retailers add sales tax at checkout, so the markup percentage maps directly to the shelf price." },
  { q: "What is the biggest mistake people make with markup?", a: "Setting a markup that does not cover overhead. A 30% markup on a $50 cost gives a $65 price and $15 gross profit per unit — but if rent, wages, and marketing eat $20 per unit, you lose money on every sale. Always calculate the all-in cost per unit (product + allocated overhead) before choosing a markup, not just the supplier invoice." },
  { q: "What happens if I enter a cost of zero?", a: "Markup is defined as a percentage of cost, so a zero cost makes the calculation undefined — you cannot have a percentage of nothing. The calculator will show a dash. If your product genuinely has no cost (e.g. a downloadable file you already created), markup is not the right metric. Set the price directly against what the market will pay instead." },
  { q: "I picked a markup — what should I check next?", a: "Run the resulting selling price past three tests. First: does it beat your minimum break-even price including overhead? Second: is it within 15% of comparable competitor prices, or do you have a clear reason to be outside that band? Third: does the implied margin (shown in the comparison panel) hit your target? If any test fails, revisit the markup before publishing the price." },
  { q: "How is markup different from a price increase?", a: "Markup is the gap between cost and selling price on a single unit, set at launch. A price increase is a change to an existing selling price, applied later. A 10% markup increase on a $50 cost moves the price from (say) $75 to $80 — but a 10% price increase on $75 also lands at $82.50. The two operations look similar but start from different bases, so the resulting margins differ." },
];

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
