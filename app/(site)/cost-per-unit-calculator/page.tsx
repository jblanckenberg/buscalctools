import CostPerUnitCalculator from "@/components/calculators/CostPerUnitCalculator";
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

const SLUG = "cost-per-unit-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "cost-per-unit-calculator",
  title: "Cost Per Unit Calculator — Total CPU | BusCalcTools",
  description:
    "Free cost per unit calculator. Split fixed and variable cost, get total CPU, and see how unit cost drops at higher production volumes.",
});

const FAQS = [
  { q: "What is cost per unit?", a: "Cost per unit is the total cost to produce or acquire one unit of a product, calculated by dividing total production costs by the number of units produced. It includes both fixed costs (spread across all units) and variable costs (direct per-unit costs)." },
  { q: "Why does my cost per unit decrease when I produce more?", a: "Fixed costs (like rent, equipment, and management salaries) stay the same regardless of how many units you produce. When spread across more units, the fixed cost component per unit decreases. This is called economies of scale — one of the primary advantages of higher production volumes." },
  { q: "What is the difference between fixed and variable costs?", a: "Fixed costs do not change with production volume — rent, insurance, equipment depreciation. Variable costs scale directly with production — raw materials, labour per unit, packaging. Total cost per unit = (Fixed Costs ÷ Units) + Variable Cost Per Unit." },
  { q: "How do I use cost per unit for pricing?", a: "Cost per unit is the minimum floor for your pricing. Your selling price must exceed your cost per unit to make a profit. Use the Pricing Calculator to set a selling price that gives you your desired profit margin above your cost per unit." },
  { q: "How does production volume affect profitability?", a: "Increasing production volume reduces your fixed cost per unit, which reduces your total cost per unit, which increases your profit margin at the same selling price. Use the scaling table in this calculator to see exactly what your cost per unit would be at different production volumes." },
  { q: "Does cost per unit work differently for service businesses?", a: "Yes — \"units\" become billable hours or completed engagements. Fixed costs are still rent, software, and salaried staff. Variable costs are sub-contractors and project-specific expenses. Divide total cost by total billable hours to get an hourly cost floor. The Freelance Rate Calculator is purpose-built for this and will be more accurate than this product-focused calculator for pure service work." },
  { q: "What is the most common cost per unit mistake?", a: "Leaving owner labour out of fixed costs. Sole proprietors often skip their own salary because they pay themselves from profit. The true cost per unit is then understated — sometimes by 30–50% — making products look more profitable than they are. Always include a market-rate salary for working owners in fixed costs before dividing by units." },
  { q: "What if I produce zero units in the period?", a: "Cost per unit becomes undefined (you cannot divide by zero) and the calculator will show a dash. Practically, your fixed costs still accrue (rent, salaries, insurance), so they become 100% loss for that period. This is a useful red flag for businesses with seasonal production — model the months when no units are produced separately, and ensure cash reserves cover the fixed-cost-only periods." },
  { q: "I know my cost per unit — what should I do with it?", a: "Use it as your absolute price floor. Run it through the Pricing Calculator to set a selling price that hits your target margin (typically 40–60% above cost for retail). Then run the scaling table to find the production volume where cost per unit drops meaningfully — that volume becomes your sales target for the next quarter, because each step up improves margin without raising the price." },
  { q: "How is cost per unit different from break-even price?", a: "Cost per unit is what each item costs you to make. Break-even price is the minimum you must charge per unit to cover all costs at the planned production volume — they are usually the same number if you have priced the unit correctly. The difference appears when you change production volume: cost per unit drops with scale, but break-even price drops too only if fixed costs are spread over more units." },
];

export default function CostPerUnitPage() {
  return (
    <CalculatorShell
      h1="Cost Per Unit Calculator — Know Your True Production Cost"
      intro="Split total costs into fixed and variable components, divide by units produced, and see how cost per unit changes with volume."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema
        slug={SLUG}
        name="Cost Per Unit Calculator"
        description="Free cost per unit calculator with volume scaling table showing economies of scale."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
      />
      <CostPerUnitCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Enter your total fixed costs (rent, equipment depreciation),
          total variable costs (materials, labour, packaging), and the
          number of units produced. The calculator returns fixed CPU,
          variable CPU, and total CPU. The volume scaling table shows
          how CPU drops as you produce more — the classic economies-of-scale
          effect.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Fixed Cost Per Unit    = Total Fixed Costs / Number of Units
Variable Cost Per Unit = Total Variable Costs / Number of Units
Total Cost Per Unit    = (Total Fixed + Total Variable) / Number of Units

Example: Fixed $10,000 | Variable $5,000 | 500 units
  Fixed CPU    = $20
  Variable CPU = $10
  Total CPU    = $30`}
        </pre>
      </FormulaBox>

      <FaqList items={FAQS} />

      <RelatedTools slugs={["break-even-calculator", "pricing-calculator"]} />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
