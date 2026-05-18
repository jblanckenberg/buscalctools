import PricingCalculator from "@/components/calculators/PricingCalculator";
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

const SLUG = "pricing-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "pricing-calculator",
  title: "Pricing Calculator — Cost to Selling Price | BusCalcTools",
  description:
    "Free pricing calculator. Set optimal selling price from cost and target margin or markup, with auto VAT/sales tax for USA, UK, and South Africa.",
});

const FAQS = [
  { q: "How do I calculate the selling price from cost and margin?", a: "Selling Price = Cost ÷ (1 − Desired Margin). This formula is used when you know your cost and the profit margin percentage you want to achieve. Example: cost $50, target margin 40% → Selling Price = $50 ÷ 0.60 = $83.33." },
  { q: "What is cost-plus pricing?", a: "Cost-plus pricing means setting your price by adding a fixed markup to your cost. It is the simplest pricing method: know your cost, add your desired profit, and that is your price. The risk is that it ignores what the market will actually pay." },
  { q: "How do I price a service (not a product)?", a: "For services, \"cost\" includes your time at a target hourly rate plus any direct expenses. Use the Freelance Rate Calculator to determine your minimum hourly rate, then use this tool to set project prices that achieve your target margin." },
  { q: "Should I include VAT/sales tax in my advertised price?", a: "In the UK, consumer-facing prices must be displayed inclusive of VAT. In the USA, sales tax is typically added at checkout and not included in advertised prices. In South Africa, prices are generally displayed inclusive of VAT. This calculator handles all three conventions." },
  { q: "How does pricing affect profit margin?", a: "A small price increase has a disproportionately large effect on margin. If your cost is $50 and you sell at $70 (30% margin), a $5 price increase to $75 raises your margin to 33.3% — a 10% improvement in profitability from a 7% price increase." },
  { q: "How does VAT registration in the UK or SA change my pricing?", a: "Once you cross the VAT threshold (£90,000 turnover in the UK, R1 million in South Africa) you must add VAT to every invoice. If your customers are consumers, this effectively cuts your margin by 17–20% unless you raise prices. B2B customers usually reclaim VAT, so the impact is neutral. Plan the transition before you cross the threshold, not after." },
  { q: "What is the most common pricing mistake?", a: "Pricing based on what feels reasonable rather than on cost plus target margin. Owners often anchor to a competitor's price without knowing whether the competitor is profitable, or set a round number ($99) that looks tidy but does not cover allocated overhead. Run every price through the calculator first; treat market and psychological pricing as adjustments, not the starting point." },
  { q: "What if my target margin is 100% or more?", a: "A 100% margin is mathematically impossible — you would need to sell something for an infinite price (the formula divides by zero). The maximum sensible target is around 90%. If you genuinely want a very high margin, switch to markup-based pricing instead, where 1000% markup is well-defined and equals a 90.9% margin. The calculator caps margin entries at 99% for this reason." },
  { q: "I have my recommended price — should I just publish it?", a: "Sanity-check it against three things first. One: competitor prices within your category — if you are 30%+ above or below the band, you need a story for why. Two: psychological price points ($49 vs $50, £99 vs £100). Three: round-up to absorb future cost rises. If the calculator says $73.14, publishing at $79 gives you headroom and looks deliberate rather than algorithmic." },
  { q: "How is pricing different from quoting?", a: "Pricing sets a standard selling price for a repeatable product or service, designed to hit a target margin across many sales. Quoting is custom — it builds a one-off price for a specific client and scope, often including line items the standard price does not cover (travel, rush work, exclusivity). Use this calculator for pricing; quoting needs an itemised estimate template instead." },
];

export default function PricingPage() {
  return (
    <CalculatorShell
      h1="Pricing Calculator — Find the Right Selling Price Instantly"
      intro="Set the optimal selling price from cost and target margin (or markup). Adds VAT or sales tax automatically by region."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema
        slug={SLUG}
        name="Pricing Calculator"
        description="Free pricing calculator — set selling price from cost and target margin or markup, with VAT/sales tax."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
      />
      <PricingCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Toggle between margin-based pricing (you want X% margin on each
          sale) and markup-based pricing (you want to add X% on top of
          cost). The calculator returns the price both before and after
          tax. Tax pre-fills based on your region: 0% for the USA (sales
          tax added at checkout), 20% for the UK (VAT), 15% for South
          Africa (VAT).
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Anchoring to a competitor's price</strong> — copying a competitor's shelf price tells you nothing about whether they are profitable. They may be running at a loss to win market share, may have lower cost inputs, or may be inflating volume on the way to a sale. Always price from cost plus target margin first, then check competitor pricing as a sanity test.
          </li>
          <li>
            <strong className="text-brand-dark">Forgetting tax displays differ by region</strong> — UK and SA consumer prices must be VAT-inclusive; US prices typically exclude sales tax until checkout. A $100 net target price is shown as $100 in the US but should display at $120 in the UK and $115 in SA. Mixing the two creates margin shortfalls when you reconcile against the bank deposit.
          </li>
          <li>
            <strong className="text-brand-dark">Setting prices without testing psychological breakpoints</strong> — the calculator may suggest $73.14, but customers respond very differently to $69, $75, and $79. Always round the calculator output up to the next psychological price point ($69, $79, $99) — the small premium absorbs future cost rises and signals deliberateness rather than algorithmic pricing.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">When to use this calculator</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Use this when you are launching a new product, repricing an existing one, or moving from cost-plus to margin-based pricing. It is built to answer "what should I charge to earn X% margin on this cost?" in one step, with VAT/sales tax already baked in for the region you operate from.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          If you only want to add a fixed percentage on top of cost (without thinking in margin), the Markup Calculator is simpler. If you are pricing your time on a project, use the Freelance Rate Calculator to find the hourly rate first, then price the engagement here.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Selling Price (from margin) = Cost / (1 − Desired Margin / 100)
Selling Price (from markup) = Cost × (1 + Markup / 100)

Example (margin mode): Cost = $20 | Target Margin = 40%
  Selling Price = $20 / 0.60 = $33.33
  Equivalent Markup = ($13.33 / $20) × 100 = 66.7%`}
        </pre>
      </FormulaBox>

      <FaqList items={FAQS} />

      <RelatedTools slugs={["profit-margin-calculator", "markup-calculator"]} />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
