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

const FAQS = [
  { q: "How do I calculate my freelance hourly rate?", a: "Your minimum hourly rate = (Target Annual Income + Annual Business Expenses) / Annual Billable Hours. Billable hours are not all your working hours — they are only the hours you can actually invoice clients for. A typical freelancer bills 20–25 hours per week maximum." },
  { q: "How many hours a week can a freelancer actually bill?", a: "Most experienced freelancers bill 20–25 hours per week. The remaining time goes on admin, marketing, invoicing, meetings that cannot be billed, and professional development. Setting your rate based on 40 billable hours will leave you severely underpaid." },
  { q: "Should I include taxes in my freelance rate?", a: "Yes. As a freelancer, you pay both the employer and employee portions of self-employment taxes, plus income tax. In the USA, add at least 25–30% to your take-home income target. In the UK, add 20–30%. In South Africa, add 25–35% depending on your income level." },
  { q: "What is a day rate and how do I calculate it?", a: "A day rate is simply your hourly rate multiplied by 8 (a standard working day). If your recommended hourly rate is $75, your day rate is $600. Day rates are commonly used for contractor work and project-based engagements." },
  { q: "Am I charging enough as a freelancer?", a: "If you regularly win the first project you quote, you are almost certainly undercharging. Freelancers should win approximately 30–50% of competitive proposals. If you are winning 80%+, your rate is likely below market. Use this calculator as a floor, not a ceiling." },
  { q: "How do freelance rates differ in the US, UK, and SA?", a: "Headline rates vary by market: a mid-level designer charges roughly $75–$125/hr in the US, £50–£90/hr in the UK, and R450–R850/hr in South Africa. But the tax and overhead structure also differs. US freelancers carry self-employment tax (~15.3%) plus state income tax. UK freelancers face Class 4 NICs plus income tax. SA freelancers add provisional tax planning twice a year. Always price in your local effective tax burden, not just the headline number." },
  { q: "What is the most common freelance rate mistake?", a: "Pricing by dividing target salary by 2,080 hours. That assumes every working hour is billable, no holidays, no overhead, and zero tax — which is wrong on four counts. A freelancer who wants the equivalent of a $60,000 salaried role typically needs a billable rate of $65–$80/hr, not the $29/hr the naive calculation produces. Always include billable-hours ratio, overhead, and tax buffer." },
  { q: "What if my billable hours per week are zero or very low?", a: "Zero billable hours makes the rate infinite (division by zero) — the calculator returns an error. In practice, if you're new and have under 10 billable hours per week, the calculator output will look unreasonably high. Price for a realistic medium-term target (e.g., 20 hrs/wk in month 6) rather than current pipeline; otherwise your rates won't survive contact with a healthy client load." },
  { q: "I have my recommended rate — what should I do with it?", a: "Three things. One: stop quoting below it, even on small jobs (the time cost is the same). Two: build a rate card with three tiers — your minimum, the recommended, and a premium (recommended × 1.5) for rush or specialist work. Three: review the inputs every six months. Annual overhead creeps up, billable hours fluctuate by season, and target income should rise faster than inflation if the freelance business is healthy." },
  { q: "How is a freelance rate different from a salary?", a: "A salary is gross pay only; you receive employer-funded holidays, sick pay, pension contributions, equipment, and the employer covers payroll tax. A freelance rate has to fund all of that out of the hourly billing. The rule of thumb: take any salary you'd accept as an employee, divide by 1,000 (not 2,000), and that's your minimum hourly freelance rate to roughly match the total package. The calculator does this more precisely." },
];

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

      <FaqList items={FAQS} />

      <RelatedTools slugs={["invoice-calculator", "profit-margin-calculator"]} />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
