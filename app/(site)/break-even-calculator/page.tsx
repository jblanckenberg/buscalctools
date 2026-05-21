import BreakEvenCalculator from "@/components/calculators/BreakEvenCalculator";
import CalculatorShell from "@/components/shared/CalculatorShell";
import FormulaBox from "@/components/shared/FormulaBox";
import FaqList from "@/components/shared/FaqList";
import LazyBelowFold from "@/components/shared/LazyBelowFold";
import RelatedTools from "@/components/shared/RelatedTools";
import Disclaimer from "@/components/shared/Disclaimer";
import MethodologyBox from "@/components/shared/MethodologyBox";
import EmbedCTA from "@/components/shared/EmbedCTA";
import GlossarySection from "@/components/shared/GlossarySection";
import WebAppSchema from "@/components/shared/WebAppSchema";
import HowToSchema from "@/components/shared/HowToSchema";
import { calculatorMetadata } from "@/lib/seo";
import { calcBreadcrumb, calcMeta } from "@/lib/calc-meta";

const SLUG = "break-even-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "break-even-calculator",
  title: "Break-Even Calculator — Units & Revenue Chart | BusCalcTools",
  description:
    "Free break-even calculator. Find break-even units, revenue, and contribution margin with a visual chart and target-profit mode. Built for small business owners.",
});

export default function BreakEvenPage() {
  return (
    <CalculatorShell
      h1="Break-Even Calculator — Find Your Break-Even Point Instantly"
      intro="Find the number of units and total revenue you need to cover all costs — the point where you stop losing money and start making profit."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema
        slug={SLUG}
        name="Break-Even Calculator"
        description="Free break-even point calculator — find units and revenue needed to cover all costs, with chart."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
      />
      <BreakEvenCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Enter your fixed costs for the period (rent, salaries, insurance),
          your variable cost per unit (materials, packaging), and your
          selling price per unit. The calculator divides fixed costs by the
          contribution margin (selling price minus variable cost) to find
          how many units you must sell to cover everything. The chart shows
          revenue and total cost lines crossing at the break-even point.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Misclassifying costs</strong> — rent does not scale per unit (it is fixed), but part-time labour and sales commissions usually do scale (they are variable). Putting a "semi-variable" cost like utilities into the wrong bucket can shift the break-even point by 20% or more. Split anything ambiguous into a fixed base plus a per-unit slice.
          </li>
          <li>
            <strong className="text-brand-dark">Rounding break-even units down</strong> — if the calculator returns 399.4 units, the answer is 400, not 399. You do not break even at 399; you are still losing money on the last fraction of a unit. Always round break-even volume up.
          </li>
          <li>
            <strong className="text-brand-dark">Discounting below contribution margin</strong> — a "10% off" promotion on a product with a 35% gross margin still earns 25% per sale, but a 40% discount earns negative contribution on every unit. The more you sell, the more you lose. Always check the post-discount contribution margin before launching a promotion.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">When to use this calculator</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Use this when you have fixed and variable costs in hand and want to know the unit volume or revenue level required to cover them — typical when launching a new product, opening a new location, or pricing a service that has setup costs.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          If you are trying to recover a one-off investment (equipment, a fit-out, software), the Payback Period Calculator is the better tool. To check the per-unit cost floor that sets your minimum price, use the Cost Per Unit Calculator instead.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Break-Even Units = Fixed Costs / (Selling Price − Variable Cost Per Unit)

Contribution Margin = Selling Price − Variable Cost Per Unit

Break-Even Revenue = Break-Even Units × Selling Price

Example: Fixed = $5,000 | Variable = $10 | Selling Price = $25
  Contribution Margin = $25 − $10 = $15
  Break-Even Units    = $5,000 / $15 = 334 units
  Break-Even Revenue  = 334 × $25 = $8,350`}
        </pre>
      </FormulaBox>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A UK independent café opens with £8,000 of fixed monthly costs:
          £3,200 rent, £3,800 for two part-time baristas including employer
          NI, £600 utilities, and £400 for software and accounting.
          Average order value is £6.50 (a coffee plus a pastry). Variable
          cost per order is £2.20 — beans, milk, the pastry from a local
          bakery, paper cup, and the card-processing fee.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Contribution margin per order is £6.50 − £2.20 = £4.30. Break-even
          orders per month = £8,000 ÷ £4.30 = 1,861 orders, or roughly 62
          orders per day across a 30-day month. At 70 orders per day the
          café generates 70 × 30 × £4.30 = £9,030 of monthly contribution,
          leaving £1,030 of operating profit after fixed costs. At 50 orders
          per day the contribution drops to £6,450 and the café loses
          £1,550 per month.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Notice how non-linear the swing is: a 30% decline in volume (70
          → 50 orders/day) doesn&apos;t produce a 30% lower profit — it
          flips a £1,030 profit into a £1,550 loss, a £2,580 swing.
          Hospitality businesses with high fixed costs and thin contribution
          margins live or die on volume above break-even. The two levers
          to widen contribution are raising average order value (a £1
          upsell on every order adds £900/month at 30 orders/day) or
          shaving variable cost per unit by 20–30 pence through supplier
          negotiation.
        </p>
      </section>

      <FaqList items={META.faqs} />

      <GlossarySection
        items={[
          { term: "Contribution Margin", definition: "Selling price minus variable cost per unit — the profit each sale contributes toward covering fixed costs." },
          { term: "Fixed Costs", definition: "Costs that stay the same regardless of how many units you sell." },
          { term: "Variable Costs", definition: "Costs that scale directly with each unit produced or sold." },
        ]}
      />

      <LazyBelowFold minHeight={240} placeholderLabel="Related calculators loading">
        <RelatedTools
          slugs={["roi-calculator", "cash-flow-calculator", "cost-per-unit-calculator"]}
          surfaceComparisonsForCalc="break-even-calculator"
        />
      </LazyBelowFold>

      <EmbedCTA slug={SLUG} />

      <LazyBelowFold minHeight={400} placeholderLabel="Methodology section loading">
        <MethodologyBox slug={SLUG} />
      </LazyBelowFold>

      <Disclaimer />
    </CalculatorShell>
  );
}
