import HourlyToSalaryCalculator from "@/components/calculators/HourlyToSalaryCalculator";
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

const SLUG = "hourly-to-salary-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "hourly-to-salary-calculator",
  title: "Hourly to Salary Calculator — Loaded Cost | BusCalcTools",
  description:
    "Convert hourly rate to annual salary (or back) and see the true loaded cost including employer taxes and benefits — USA, UK, and South Africa.",
});

export default function HourlyToSalaryPage() {
  return (
    <CalculatorShell
      h1="Hourly to Salary Calculator — Annual, Monthly & Loaded Cost"
      intro="Convert an hourly rate into an annual salary (or work backwards) and see the true loaded cost an employer pays after statutory taxes and benefits."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema
        slug={SLUG}
        name="Hourly to Salary Calculator"
        description="Free hourly to salary converter with employer loaded-cost calculation for USA, UK, and South Africa."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
      />
      <HourlyToSalaryCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The conversion is mechanical: annual salary equals hourly rate
          multiplied by hours per week multiplied by weeks per year. A 40-hour
          week × 52 weeks gives 2,080 hours — the standard full-time year used
          across most US, UK, and South African payroll calculations. Reduce
          to 48 weeks if the role includes four weeks of unpaid leave, or to
          1,920 hours if it includes statutory paid leave that doesn&apos;t bill
          to clients (the most common freelancer adjustment).
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The loaded-cost figure is what most employers and contractors miss.
          On top of the headline salary, an employer pays statutory taxes
          (FICA in the US, employer NIC in the UK, UIF and SDL in SA),
          plus benefits — health insurance, pension contributions, paid leave
          accrual, equipment, and software. The default loaded-cost percentage
          per region is a market median; adjust it for your actual benefits
          package.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Quoting a freelance rate based only on the salary equivalent</strong> — a contractor charging the headline hourly rate of a salaried role earns far less, because they cover their own taxes, paid leave, pension, equipment, and downtime between contracts. Most freelancers need at least a 50-80% premium on the equivalent salaried hourly rate to match an employee&apos;s after-tax outcome.
          </li>
          <li>
            <strong className="text-brand-dark">Forgetting that 52 weeks ignores unpaid leave</strong> — if a role pays 25 days of paid leave plus 8 public holidays, the worker only delivers about 47 weeks of productive time. For freelance pricing, divide annual target earnings by 47 × 40 = 1,880 hours, not 2,080.
          </li>
          <li>
            <strong className="text-brand-dark">Ignoring the loaded cost when comparing employee vs contractor pricing</strong> — a $50/hr employee costs the business closer to $64/hr after taxes and benefits. Comparing this to a $60/hr contractor invoice with no employer obligations is closer to apples-to-apples than the headline-rate comparison most managers make.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">When to use this calculator</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Use this when you need to compare hourly and salaried offers, set a
          freelance rate against a target annual income, or work out the true
          cost of hiring an employee at a given salary. The loaded-cost figure
          is the right number to compare against a contractor&apos;s invoice rate
          when deciding between contract and permanent staffing.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          For a more detailed look at the full cost of an employee (including
          office space, software licenses, and onboarding), use the Employee
          Cost Calculator. For sustainable freelance pricing that accounts for
          downtime, holiday, and admin time, use the Freelance Rate Calculator.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Annual Salary = Hourly Rate × Hours per Week × Weeks per Year

Hourly Rate = Annual Salary ÷ (Hours per Week × Weeks per Year)

Loaded Annual Cost = Annual Salary × (1 + Loaded-Cost Percentage / 100)

Example: $25/hr × 40 hrs/week × 52 weeks = $52,000 annual
  Loaded cost at 28% (USA) = $52,000 × 1.28 = $66,560
  Loaded hourly = $66,560 ÷ 2,080 = $32/hr`}
        </pre>
      </FormulaBox>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A UK marketing manager earns £45,000 a year on a standard 37.5-hour
          week with 28 days paid leave plus 8 public holidays. The headline
          hourly rate is £45,000 ÷ (37.5 × 52) = £23.08/hr. But the actual
          billable hours are closer to 37.5 × 45 = 1,687.5, so the real
          productive hourly cost is £45,000 ÷ 1,687.5 = £26.67/hr.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The employer&apos;s loaded cost is significantly higher. Employer NIC at
          13.8% on earnings above £9,100 adds about £4,950. Pension matching
          at 3% adds £1,350. Office, equipment, and software typically add
          £4,000-£6,000 per head per year. The true loaded cost is closer to
          £56,000-£58,000 — about 24-29% above the headline salary, depending
          on benefits richness.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A freelance equivalent quoting £30/hr would invoice 1,687.5 × £30 =
          £50,625 for the same productive time. From the employer&apos;s
          perspective the contractor is cheaper than the loaded employee cost.
          From the worker&apos;s perspective the freelancer earns less than the
          headline salary after self-employment taxes, lost paid leave, and
          their own pension provision — which is why sustainable freelance
          rates are usually 50-80% above the equivalent salaried hourly rate.
        </p>
      </section>

      <FaqList items={META.faqs} />

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-brand-dark">Glossary</h2>
        <dl className="mt-3 space-y-3 text-sm text-gray-700">
          <div>
            <dt className="font-semibold text-brand-dark">Loaded Cost</dt>
            <dd>Total employer cost per employee — gross salary plus statutory taxes (FICA, NIC, UIF) plus benefits and overhead.</dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-dark">Billable Hours</dt>
            <dd>The portion of working hours that produce revenue — excludes paid leave, training, admin, and downtime.</dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-dark">Annualisation</dt>
            <dd>The conversion of a periodic figure (hourly, weekly, monthly) into a yearly equivalent for comparison.</dd>
          </div>
        </dl>
      </section>

      <RelatedTools
        slugs={["employee-cost-calculator", "freelance-rate-calculator"]}
      />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
