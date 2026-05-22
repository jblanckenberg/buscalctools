import PricingCalculator from "@/components/calculators/PricingCalculator";
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

const SLUG = "pricing-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "pricing-calculator",
  title: "Pricing Calculator — Cost to Selling Price | BusCalcTools",
  description:
    "Free pricing calculator. Set optimal selling price from cost and target margin or markup, with auto VAT/sales tax for USA, UK, and South Africa.",
});

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

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A Cape Town management consultant prices a six-month strategy
          engagement. Internal cost basis: 200 billable hours at R600 per
          hour of loaded internal cost (senior time plus a junior analyst),
          for a total of R120,000. Target gross margin is 40% — the
          consultant&apos;s historical average and what overhead, business
          development, and downtime need to absorb.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Selling price from margin = cost ÷ (1 − margin) = R120,000 ÷ 0.60
          = R200,000. Gross profit at that price is R80,000, the buffer the
          firm needs for the months between engagements. If the same
          consultant had set price by adding "40% on cost" instead — a
          classic markup-versus-margin error — the price would have been
          R168,000 and gross profit only R48,000, a 40% loss of buffer on
          the identical brief.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          What if the target margin moves to 50%? Selling price climbs to
          R240,000 (R120,000 ÷ 0.50) with R120,000 of gross profit — a 50%
          increase in selling price relative to 40% margin, and 50% more
          buffer. The lever to test is whether the client market will bear
          the higher number. Consulting margins of 35–55% are typical
          internationally; below 30% rarely covers the cost of carrying a
          lumpy pipeline.
        </p>
      </section>

      <FaqList items={META.faqs} />

      <GlossarySection
        items={[
          { term: "Target Margin", definition: "The gross margin you want each sale to earn, expressed as a percentage of selling price. Drives the price-from-margin formula." },
          { term: "Cost-Plus Pricing", definition: "Setting price by adding a fixed margin or markup on top of internal cost. Simple and defensible, but ignores what the customer is willing to pay." },
          { term: "Value-Based Pricing", definition: "Setting price from the value the customer perceives rather than internal cost. Usually delivers higher margins when the value is clearly quantifiable." },
          { term: "Psychological Price Point", definition: "A round-up to a price ending in 9 or 5 that anchors better with buyers than the raw calculator output. Worth a small premium over the mathematical answer." },
        ]}
      />

      <LazyRelatedTools slugs={["profit-margin-calculator", "markup-calculator"]} />

      <LazyMethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
