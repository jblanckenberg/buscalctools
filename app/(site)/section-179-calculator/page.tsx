import Section179Calculator from "@/components/calculators/Section179Calculator";
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

const SLUG = "section-179-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "section-179-calculator",
  title: "Section 179 Calculator — Immediate Expensing | BusCalcTools",
  description:
    "Free Section 179 calculator. Compare immediate expensing of equipment vs 5-year MACRS depreciation — see year-1 tax savings and NPV advantage.",
});

export default function Section179Page() {
  return (
    <CalculatorShell
      h1="Section 179 Calculator — Immediate Expensing vs Depreciation"
      intro="Compare Section 179 immediate expensing of business equipment against 5-year MACRS depreciation — including the $1.22M cap and $3.05M phase-out (2026)."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema slug={SLUG} name="Section 179 Calculator" description="Free 2026 US Section 179 calculator with MACRS comparison and NPV." featureList={META.featureList} applicationSubCategory={META.applicationSubCategory} />
      <HowToSchema slug={SLUG} name={META.howToName} description={META.howToDescription} steps={META.howToSteps} />
      <Section179Calculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Section 179 of the US Internal Revenue Code lets businesses immediately deduct
          the full cost of qualifying equipment in the year of purchase, rather than
          spreading deductions over the equipment&apos;s useful life via MACRS depreciation.
          2026 cap: $1.22M (estimated). Equipment purchases above $3.05M reduce the cap
          dollar-for-dollar — at $4.27M of total purchases, no Section 179 is available.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The total nominal tax savings are the same under either approach (equipment cost
          × tax rate). What differs is timing. Section 179 gives the savings in year 1;
          MACRS spreads them over 6 years (with a half-year convention applied to year 1
          and year 6). At any positive discount rate, Section 179 has a positive NPV
          advantage — typically 5-15% more wealth versus MACRS, depending on the equipment
          cost and discount rate.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li><strong className="text-brand-dark">Forgetting the income limitation.</strong> Section 179 can&apos;t reduce taxable income below zero — excess deduction is carried forward to future years, not refunded. A business with $80k profit can&apos;t take $200k of Section 179 in one year.</li>
          <li><strong className="text-brand-dark">Ignoring bonus depreciation interaction.</strong> Bonus depreciation (currently 60% in 2024, phasing down to 40%/20%/0% in 2025-26-27 absent extension) often applies alongside Section 179. Most CPAs sequence Section 179 first, then bonus on the remaining basis, then MACRS on whatever remains.</li>
          <li><strong className="text-brand-dark">Treating Sec 179 as a tax credit.</strong> It&apos;s a deduction, not a credit — you save (deduction × marginal tax rate), not the full deduction. A $100k Section 179 deduction at 24% saves $24k, not $100k.</li>
        </ul>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Section 179 (2026 estimates):
  Limit:                    $1,220,000
  Phase-out threshold:      $3,050,000
  Phase-out:                $1-for-$1 above threshold
  Income limit:             Cannot create a tax loss (excess carries forward)

  Year-1 Tax Savings = MIN(cost, eligible 179) × Marginal Tax Rate

MACRS 5-Year (Half-Year Convention):
  Year 1: 20.00%      Year 4: 11.52%
  Year 2: 32.00%      Year 5: 11.52%
  Year 3: 19.20%      Year 6:  5.76%

NPV Comparison (5% discount rate):
  Section 179: full savings in year 1 → NPV ≈ savings ÷ 1.05
  MACRS:      sum of year_i savings ÷ 1.05^i across 6 years`}
        </pre>
      </FormulaBox>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A landscaping company buys a $100,000 truck. Marginal tax rate (federal + state): 24%. Section 179 takes the entire $100,000 as a year-1 deduction → tax savings of $24,000 this year.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Under MACRS 5-year depreciation, the year-1 deduction is 20% × $100,000 = $20,000, saving $4,800 in tax. Year-2 savings: 32% × $100k × 24% = $7,680. Cumulative over 6 years: $24,000 total nominal — same as Section 179. But spread over time.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          At a 5% discount rate, the NPV of Section 179 savings ($24,000 received in year 1) is ~$22,857. The NPV of the MACRS schedule (summing each year&apos;s savings discounted back) is ~$20,470. Section 179 wins by ~$2,387 of present value — a 12% advantage over the deferred MACRS option. Worth taking unless the business genuinely lacks the year-1 taxable income to absorb the full deduction.
        </p>
      </section>

      <FaqList items={META.faqs} />

      <RelatedTools slugs={["roi-calculator", "business-loan-calculator", "cash-flow-calculator"]} />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
