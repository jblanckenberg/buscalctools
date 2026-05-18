import BreakEvenCalculator from "@/components/calculators/BreakEvenCalculator";
import CalculatorShell from "@/components/shared/CalculatorShell";
import FormulaBox from "@/components/shared/FormulaBox";
import FaqList from "@/components/shared/FaqList";
import RelatedTools from "@/components/shared/RelatedTools";
import Disclaimer from "@/components/shared/Disclaimer";
import MethodologyBox from "@/components/shared/MethodologyBox";
import EmbedCTA from "@/components/shared/EmbedCTA";
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

      <FaqList items={META.faqs} />

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-brand-dark">Glossary</h2>
        <dl className="mt-3 space-y-3 text-sm text-gray-700">
          <div>
            <dt className="font-semibold text-brand-dark">Contribution Margin</dt>
            <dd>Selling price minus variable cost per unit — the profit each sale contributes toward covering fixed costs.</dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-dark">Fixed Costs</dt>
            <dd>Costs that stay the same regardless of how many units you sell.</dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-dark">Variable Costs</dt>
            <dd>Costs that scale directly with each unit produced or sold.</dd>
          </div>
        </dl>
      </section>

      <RelatedTools
        slugs={["roi-calculator", "cash-flow-calculator", "cost-per-unit-calculator"]}
        surfaceComparisonsForCalc="break-even-calculator"
      />

      <EmbedCTA slug={SLUG} />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
