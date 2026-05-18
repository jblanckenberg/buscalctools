import FreelanceRateCalculator from "@/components/calculators/FreelanceRateCalculator";
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

const SLUG = "freelance-rate-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "freelance-rate-calculator",
  title: "Freelance Rate Calculator — Hourly + Day Rate | BusCalcTools",
  description:
    "Free freelance rate calculator. Get minimum, recommended, and day-rate equivalents from your income goal and billable hours. Region-aware tax buffer reminders.",
});

export default function FreelanceRatePage() {
  return (
    <CalculatorShell
      h1="Freelance Hourly Rate Calculator — Find Your Minimum Rate"
      intro="Calculate the hourly rate you need to charge from your income goal, billable hours, overhead and profit buffer."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema
        slug={SLUG}
        name="Freelance Hourly Rate Calculator"
        description="Free freelance hourly rate calculator — find your minimum and recommended rate from income goal and overhead."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
      />
      <FreelanceRateCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The calculator divides your annual income target plus overhead
          costs by your annual billable hours — which is (52 − weeks off)
          × billable hours per week. That gives the minimum rate that
          covers your costs. The recommended rate adds your desired
          profit margin on top. The day rate is simply 8 × the
          recommended rate.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Dividing salary by 2,080 hours</strong> — this assumes every working hour is billable, with no holidays, no admin, no marketing, and no tax. The realistic billable ratio is closer to 1,150–1,400 hours per year. A freelancer aiming for the equivalent of a $60,000 salaried role typically needs to charge $65–$80/hr, not the $29/hr the naive division produces.
          </li>
          <li>
            <strong className="text-brand-dark">Forgetting the self-employment tax buffer</strong> — freelancers pay both halves of payroll tax. US self-employment tax adds ~15.3% on top of income tax, UK Class 4 NICs apply, and SA freelancers run provisional tax twice a year. Pricing the rate against take-home target without grossing up for tax leaves a 25–35% shortfall come filing time.
          </li>
          <li>
            <strong className="text-brand-dark">Skipping a profit margin on top</strong> — the calculator's minimum rate covers income and overhead but leaves nothing for the business itself (no reinvestment, no buffer for slow months, no exit value). Always add a profit margin (15–25%) so the freelance business is more than a salary substitute.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">When to use this calculator</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Use this when setting an hourly or day rate from scratch, when reviewing whether your current rate still covers your real costs, or when deciding whether to take a fixed-price project at a given budget. The output is your minimum sustainable rate, not the rate you should aspire to.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Once you have a rate, the Invoice Calculator builds totals with VAT/sales tax for a specific client invoice. If you are weighing freelance vs full-time work, compare the recommended rate to a hire's true cost in the Employee Cost Calculator.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Annual Billable Hours = (52 − Weeks Off) × Billable Hours Per Week
Minimum Hourly Rate   = (Desired Income + Annual Overhead) / Annual Billable Hours
Recommended Rate      = Minimum Rate × (1 + Profit Margin / 100)

Example: Income $60,000 | Overhead $6,000 | 25hr/wk | 6 weeks off
  Annual Billable Hours = (52−6) × 25 = 1,150
  Minimum Rate          = $66,000 / 1,150 = $57.39/hr
  Recommended (15%)     = $65.99/hr`}
        </pre>
      </FormulaBox>

      <FaqList items={META.faqs} />

      <RelatedTools slugs={["invoice-calculator", "profit-margin-calculator"]} />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
