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

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Skipping owner labour in fixed costs</strong> — a working owner who pays themselves through profit (rather than a salary) often leaves their own time out of total cost. The cost-per-unit number is then understated, sometimes by 30–50%, and every margin downstream is wrong. Always plug in a market-rate salary for the founder before dividing by units.
          </li>
          <li>
            <strong className="text-brand-dark">Using planned volume, not actual</strong> — fixed cost per unit drops with volume only if you actually produce and sell that volume. Calculating CPU based on "100 units this month" when you sold 60 understates true cost by 67%. Use actual or realistic forecast volume, not the capacity number.
          </li>
          <li>
            <strong className="text-brand-dark">Forgetting freight, duties, and wastage</strong> — variable cost is more than the supplier invoice. Inbound freight, import duties, packaging, quality-control rejects, and damage in transit all add to the true variable cost per unit. A 5% wastage rate on a $40 input quietly adds $2 per good unit shipped.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">When to use this calculator</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Use this when production volume is decided and you want to know the per-unit floor your selling price must clear. It is the right tool when planning a manufacturing run, costing a new SKU, or modelling the cost benefit of larger batch sizes.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          If you are trying to figure out the volume you need to hit to cover costs at a given price, use the Break-Even Calculator. Once you have the per-unit cost, the Pricing Calculator turns it into a selling price that hits your target margin.
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

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A UK furniture maker produces solid-oak dining chairs in a
          workshop outside Bristol. Monthly fixed costs total £18,000:
          £4,500 workshop lease, £11,200 for two craftsmen including
          employer NI, £900 insurance and utilities, £400 for design
          software and bookkeeping, and £1,000 for machinery depreciation.
          Variable cost per chair is £85: £52 of timber and joinery
          fittings, £20 of finish and fasteners, and £13 of consumables.
          The current production run is 60 chairs per month.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Total monthly cost = £18,000 + (60 × £85) = £23,100. Cost per
          unit = £23,100 ÷ 60 = £385. The fixed-cost component is £300 of
          that £385; variable cost is £85. If the maker increases output
          to 100 chairs per month (same workshop, same craftsmen, longer
          hours), total cost becomes £18,000 + £8,500 = £26,500 and cost
          per unit drops to £265 — a 31% reduction. Dropping to 40 chairs
          a month pushes cost per unit up to £535.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          This is the operating leverage that defines small-scale
          manufacturing: at 60 units the maker needs roughly £540 a chair
          to earn a 40% gross margin; at 100 units the same margin only
          needs £440. Pricing based on variable cost alone is the most
          common manufacturing mistake — an £85 chair priced at "40%
          markup" (£119) sells at a £266 loss against the full £385
          cost-per-unit. Always price against the loaded cost-per-unit at
          a realistic production volume, not the variable cost in
          isolation.
        </p>
      </section>

      <FaqList items={META.faqs} />

      <RelatedTools slugs={["break-even-calculator", "pricing-calculator"]} />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
