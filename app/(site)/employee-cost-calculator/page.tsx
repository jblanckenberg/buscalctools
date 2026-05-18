import EmployeeCostCalculator from "@/components/calculators/EmployeeCostCalculator";
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

const SLUG = "employee-cost-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "employee-cost-calculator",
  title: "Employee Cost Calculator — True Hiring Cost | BusCalcTools",
  description:
    "Free employee cost calculator. Salary + employer tax + benefits + equipment + overhead → all-in annual and hourly cost. Pre-filled rates for USA, UK, SA.",
});

export default function EmployeeCostPage() {
  return (
    <CalculatorShell
      h1="Employee Cost Calculator — Total Cost Beyond the Salary"
      intro="The true annual and hourly cost of an employee — including employer taxes, benefits, equipment, training, and office overhead — for USA, UK, or South Africa."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema
        slug={SLUG}
        name="Employee Cost Calculator"
        description="Free employee cost calculator — total annual and hourly cost of an employee beyond salary."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
      />
      <EmployeeCostCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Enter the gross salary, then layer in employer payroll tax (rate
          pre-fills by region), employer pension or retirement contributions,
          health insurance or medical aid, equipment, training, and
          allocated office overhead. The calculator returns total annual
          cost, the multiplier vs salary, and a true hourly cost based on
          ~1,700 productive hours per year (excluding leave, sick days,
          training, and admin).
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Budgeting for salary only</strong> — the real cost is typically 1.25–1.45x the salary once employer taxes, pension, benefits, equipment, and overhead are included. A $60,000 hire often costs $75,000–$87,000. Treating the salary line as the full cost is the most common reason new-hire decisions trigger cash flow problems in months four through nine.
          </li>
          <li>
            <strong className="text-brand-dark">Using 2,080 hours for the hourly rate</strong> — that figure assumes zero leave, zero sick days, zero training, and zero internal meetings. Real productive hours per year sit closer to 1,600–1,800. Cost-per-hour calculated on 2,080 understates the true rate by 15–25%, which matters most when comparing employees to contractors.
          </li>
          <li>
            <strong className="text-brand-dark">Ignoring the UK NICs rate change</strong> — UK employer NICs rose from 13.8% (above £9,100) to 15% (above £5,000) on 6 April 2025. Models built on the old rate understate UK hiring cost by 1–2 percentage points of salary. Always check the calculator region preset reflects the current year.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">When to use this calculator</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Use this before signing an employment offer, when budgeting a new role for the next fiscal year, or when deciding whether to fill a gap with an employee, contractor, or agency. It is also the right starting point for agency or consulting work that needs an internal billing rate.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          If you are pricing your own freelance time rather than a hire, the Freelance Rate Calculator is more direct. To check what monthly revenue a new hire must generate to be worth it, pair this with the Break-Even Calculator.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Total Employee Cost = Salary + (Salary × Employer Tax Rate / 100)
                    + Benefits + Equipment + Training + Office

Cost as % of Salary = Total Cost / Salary × 100
True Hourly Cost    = Total Annual Cost / 2,080
Productive Hour Cost = Total Annual Cost / ~1,700`}
        </pre>
      </FormulaBox>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A US small business is hiring a mid-level engineer at a $75,000
          gross salary. Employer-side payroll taxes total roughly $6,100:
          $5,738 of FICA (Social Security + Medicare at 7.65%), $42 of
          federal unemployment (FUTA), and an average $300 of state
          unemployment insurance (varies by state and experience rating).
          Employer-funded health insurance: $9,000 per year (the
          employee covers $3,000 of the premium themselves). 401(k)
          match at 4% of salary: $3,000. Equipment one-time: $2,500.
          Annual office and software cost allocated to the role: $3,500.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Total all-in annual cost: $75,000 + $6,100 + $9,000 + $3,000 +
          $2,500 + $3,500 = $99,100. That&apos;s 132% of the gross salary
          — meaning every $75k offer the business makes commits roughly
          $99k of cash per year. True hourly cost across 2,080 work
          hours = $47.65. Productive-hour cost (accounting for ~17% of
          working hours lost to meetings, training, and breaks) is
          closer to $58 per hour.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Regional differences: UK employers typically run 113–128% of
          gross salary (lower employer National Insurance, mandatory
          auto-enrolment pension at 3% minimum, often lower private
          health spend). South Africa runs 105–115% (no employer NI
          equivalent, low statutory UIF at 1%, optional medical aid).
          The most expensive line in the US calculation is health
          insurance — at $9,000 it&apos;s often larger than payroll
          taxes. The cheapest jurisdiction to employ in is South Africa
          when comparing on employer overhead alone, but US comp + UK
          comp typically offer higher gross salaries to compensate.
        </p>
      </section>

      <FaqList items={META.faqs} />

      <RelatedTools slugs={["freelance-rate-calculator", "break-even-calculator", "net-profit-calculator"]} />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
