import BreakEvenCalculator from "@/components/calculators/BreakEvenCalculator";
import CalculatorShell from "@/components/shared/CalculatorShell";
import FormulaBox from "@/components/shared/FormulaBox";
import FaqList from "@/components/shared/FaqList";
import RelatedTools from "@/components/shared/RelatedTools";
import Disclaimer from "@/components/shared/Disclaimer";
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

const FAQS = [
  { q: "What is the break-even point?", a: "The break-even point is the level of sales at which your total revenue exactly equals your total costs — you are making neither a profit nor a loss. Any sales above the break-even point generate profit. Any sales below it result in a loss." },
  { q: "How do I calculate break-even point in units?", a: "Break-even units = Fixed Costs / (Selling Price per unit − Variable Cost per unit). The denominator is called the contribution margin — the profit each unit contributes toward covering your fixed costs." },
  { q: "What are fixed costs vs variable costs?", a: "Fixed costs stay the same regardless of how many units you sell — rent, insurance, salaries. Variable costs change with each unit produced or sold — raw materials, packaging, sales commission. The distinction is critical for accurate break-even analysis." },
  { q: "How do I lower my break-even point?", a: "You can lower your break-even point by: (1) increasing your selling price, (2) reducing variable costs per unit, or (3) reducing fixed overhead costs. Increasing price is usually the fastest lever, but must be balanced against demand elasticity." },
  { q: "What is the break-even formula?", a: "Break-Even Units = Fixed Costs ÷ Contribution Margin, where Contribution Margin = Selling Price − Variable Cost Per Unit. In revenue terms: Break-Even Revenue = Break-Even Units × Selling Price." },
];

export default function BreakEvenPage() {
  return (
    <CalculatorShell
      h1="Break-Even Calculator — Find Your Break-Even Point Instantly"
      intro="Find the number of units and total revenue you need to cover all costs — the point where you stop losing money and start making profit."
      breadcrumbs={calcBreadcrumb(SLUG)}
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

      <FaqList items={FAQS} />

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

      <RelatedTools slugs={["roi-calculator", "cash-flow-calculator", "cost-per-unit-calculator"]} />

      <Disclaimer />
    </CalculatorShell>
  );
}
