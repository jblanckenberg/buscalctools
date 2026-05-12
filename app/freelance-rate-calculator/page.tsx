import FreelanceRateCalculator from "@/components/calculators/FreelanceRateCalculator";
import CalculatorShell from "@/components/shared/CalculatorShell";
import FormulaBox from "@/components/shared/FormulaBox";
import FaqList from "@/components/shared/FaqList";
import RelatedTools from "@/components/shared/RelatedTools";
import Disclaimer from "@/components/shared/Disclaimer";
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
];

export default function FreelanceRatePage() {
  return (
    <CalculatorShell
      h1="Freelance Hourly Rate Calculator — Find Your Minimum Rate"
      intro="Calculate the hourly rate you need to charge from your income goal, billable hours, overhead and profit buffer."
      breadcrumbs={calcBreadcrumb(SLUG)}
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

      <Disclaimer />
    </CalculatorShell>
  );
}
