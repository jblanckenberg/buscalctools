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

const FAQS = [
  { q: "What is the true cost of an employee?", a: "The true cost of an employee is typically 125–145% of their salary when you include employer payroll taxes, pension/retirement contributions, health insurance, equipment, training, and office overhead. A $60,000 salary employee may cost $75,000–$87,000 in total annual cost." },
  { q: "What are employer payroll taxes in the USA?", a: "US employers pay: FICA (7.65% — covering 6.2% Social Security and 1.45% Medicare), FUTA federal unemployment tax (0.6% on first $7,000 of wages), and state unemployment tax (SUTA, typically 1.5–5%). Total employer taxes are approximately 10–13% of gross wages." },
  { q: "What is employer National Insurance in the UK?", a: "From 6 April 2025 (in force for 2025/26 and 2026/27), UK employers pay National Insurance Contributions (NICs) at 15% on employee earnings above the secondary threshold of £5,000 per year — sharply higher than the pre-April-2025 rate of 13.8% above £9,100. Employers must also contribute at least 3% of qualifying earnings into a pension under automatic enrolment." },
  { q: "Is it cheaper to hire an employee or a contractor?", a: "Contractors typically cost more per hour than employees but have lower total cost because you avoid employer taxes, benefits, pension, equipment, and overhead. For short-term or specialist work, contractors are usually cheaper. For ongoing, full-time roles, employees are typically more cost-effective over 2+ years." },
  { q: "How do I calculate cost per productive hour for an employee?", a: "Not all working hours are billable or fully productive. Subtract time for holidays (average 25 days UK, 10 days USA), sick leave (~5 days), training, meetings, and admin. A full-time employee yields approximately 1,600–1,800 truly productive hours per year, not 2,080." },
  { q: "What employer costs apply to hiring in South Africa?", a: "SA employers contribute 1% of payroll to UIF (capped) and a Skills Development Levy of 1% if total annual payroll exceeds R500,000. There's no compulsory employer pension contribution, but most companies offer 5–10% of salary as a benefit. Workmen's Compensation (COIDA) is typically 0.5–2% of payroll depending on industry. Add roughly 15–20% to the base salary for a realistic all-in figure." },
  { q: "What is the most common employee cost mistake?", a: "Budgeting for salary only and treating everything else as optional. New hires need equipment (laptop, monitor, software licences) costing $2,000–$5,000 in year one. Workspace adds $3,000–$8,000 per year. Training and onboarding cost real money even if the line item is invisible. The 1.25–1.45x salary multiplier exists for a reason — businesses that ignore it are surprised by year-one cash flow." },
  { q: "What if I'm hiring part-time or fractional — does the multiplier still apply?", a: "Mostly yes, but the loaded percentage shifts. Employer taxes scale linearly with salary, so a half-time employee pays half the tax. Benefits often have a fixed minimum (health insurance premium, pension setup fees) that doesn't halve, so the multiplier on a part-time employee can be higher than 1.4x. Equipment is fixed regardless of hours. Enter the actual annual salary and the calculator handles the rest." },
  { q: "I have the true cost — what should I do with it?", a: "Two decisions. First, set the revenue this role must generate to be worth it — usually 2–3x their true cost for a non-management role, higher for sales. If they can't realistically produce that much value, the hire is wrong even if the salary feels affordable. Second, use the productive-hour cost as an internal billing rate — useful for project costing, client quotes (for agencies), and deciding whether to hire vs outsource a specific task." },
  { q: "How is employee cost different from a contractor day rate?", a: "An employee's true cost is fixed and ongoing — you pay it whether they're productive that month or not. A contractor's day rate is high per unit but you only pay it on days they work. For ongoing work over 12+ months, employees typically cost 30–50% less per hour than contractors. For project work under 6 months, contractors are almost always cheaper once you include onboarding, equipment, and termination risk for employees." },
];

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

      <FaqList items={FAQS} />

      <RelatedTools slugs={["freelance-rate-calculator", "break-even-calculator", "net-profit-calculator"]} />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
