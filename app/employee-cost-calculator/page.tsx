import EmployeeCostCalculator from "@/components/calculators/EmployeeCostCalculator";
import CalculatorShell from "@/components/shared/CalculatorShell";
import FormulaBox from "@/components/shared/FormulaBox";
import FaqList from "@/components/shared/FaqList";
import RelatedTools from "@/components/shared/RelatedTools";
import Disclaimer from "@/components/shared/Disclaimer";
import WebAppSchema from "@/components/shared/WebAppSchema";
import { calculatorMetadata } from "@/lib/seo";

export const metadata = calculatorMetadata({
  slug: "employee-cost-calculator",
  title: "Employee Cost Calculator — True Cost of Hiring an Employee",
  description:
    "Calculate the true total cost of an employee including salary, taxes, benefits and overhead. Free for USA, UK and South Africa.",
});

const FAQS = [
  { q: "What is the true cost of an employee?", a: "The true cost of an employee is typically 125–145% of their salary when you include employer payroll taxes, pension/retirement contributions, health insurance, equipment, training, and office overhead. A $60,000 salary employee may cost $75,000–$87,000 in total annual cost." },
  { q: "What are employer payroll taxes in the USA?", a: "US employers pay: FICA (7.65% — covering 6.2% Social Security and 1.45% Medicare), FUTA federal unemployment tax (0.6% on first $7,000 of wages), and state unemployment tax (SUTA, typically 1.5–5%). Total employer taxes are approximately 10–13% of gross wages." },
  { q: "What is employer National Insurance in the UK?", a: "UK employers pay National Insurance Contributions (NICs) at 13.8% on employee earnings above the secondary threshold (£9,100 per year in 2024/25). Employers must also contribute at least 3% of qualifying earnings into a pension under automatic enrolment." },
  { q: "Is it cheaper to hire an employee or a contractor?", a: "Contractors typically cost more per hour than employees but have lower total cost because you avoid employer taxes, benefits, pension, equipment, and overhead. For short-term or specialist work, contractors are usually cheaper. For ongoing, full-time roles, employees are typically more cost-effective over 2+ years." },
  { q: "How do I calculate cost per productive hour for an employee?", a: "Not all working hours are billable or fully productive. Subtract time for holidays (average 25 days UK, 10 days USA), sick leave (~5 days), training, meetings, and admin. A full-time employee yields approximately 1,600–1,800 truly productive hours per year, not 2,080." },
];

export default function EmployeeCostPage() {
  return (
    <CalculatorShell
      h1="Employee Cost Calculator — Total Cost Beyond the Salary"
      intro="The true annual and hourly cost of an employee — including employer taxes, benefits, equipment, training, and office overhead — for USA, UK, or South Africa."
    >
      <WebAppSchema
        slug="employee-cost-calculator"
        name="Employee Cost Calculator"
        description="Free employee cost calculator — total annual and hourly cost of an employee beyond salary."
      />
      <EmployeeCostCalculator />

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

      <Disclaimer />
    </CalculatorShell>
  );
}
