import BusinessLoanCalculator from "@/components/calculators/BusinessLoanCalculator";
import CalculatorShell from "@/components/shared/CalculatorShell";
import FormulaBox from "@/components/shared/FormulaBox";
import FaqList from "@/components/shared/FaqList";
import RelatedTools from "@/components/shared/RelatedTools";
import Disclaimer from "@/components/shared/Disclaimer";
import WebAppSchema from "@/components/shared/WebAppSchema";
import { calculatorMetadata } from "@/lib/seo";

export const metadata = calculatorMetadata({
  slug: "business-loan-calculator",
  title: "Business Loan Calculator — Monthly Repayments & Total Cost",
  description:
    "Calculate business loan monthly repayments, total interest and full amortisation table. Works for USA, UK and South Africa interest rates.",
});

const FAQS = [
  { q: "How do I calculate business loan repayments?", a: "Monthly Payment = P × [r(1+r)^n] / [(1+r)^n − 1], where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the total number of monthly payments. This calculator does this automatically — just enter the loan amount, rate, and term." },
  { q: "What is an amortisation table?", a: "An amortisation table shows the breakdown of every loan payment into principal (reducing the loan balance) and interest (the cost of borrowing). In early payments, most of your payment is interest. Over time, the proportion shifts toward principal. This table shows exactly how your loan balance reduces each month." },
  { q: "What interest rate should I use for a business loan?", a: "In the USA, SBA 7(a) loans range from 6.5–9.5% (2024). Conventional unsecured business loans: 8–25% depending on creditworthiness. In the UK, 7–15% for SME unsecured loans. In South Africa, prime rate is approximately 11.75%, with loans typically at prime + 2–5%." },
  { q: "Is it better to take a shorter or longer loan term?", a: "A shorter term means higher monthly payments but less total interest paid. A longer term means lower monthly payments but significantly more total interest. Use this calculator to compare: a $50,000 loan at 8% costs $10,829 in interest over 5 years vs $18,526 over 10 years." },
  { q: "What is APR and how does it affect my loan cost?", a: "APR (Annual Percentage Rate) is the true annual cost of borrowing including fees, not just the stated interest rate. Always ask lenders for the APR, not just the interest rate. A loan with a lower interest rate but high fees can have a higher APR than a loan with a slightly higher stated rate but lower fees." },
];

export default function BusinessLoanPage() {
  return (
    <CalculatorShell
      h1="Business Loan Repayment Calculator — Instant Amortisation Table"
      intro="Monthly payment, total interest, and a full amortisation schedule for any business loan. Interest rate pre-fills by region."
    >
      <WebAppSchema
        slug="business-loan-calculator"
        name="Business Loan Repayment Calculator"
        description="Free business loan calculator with monthly payment, total interest, and full amortisation schedule."
      />
      <BusinessLoanCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Enter the loan amount, the APR (annual percentage rate), and the
          loan term in months or years. The calculator uses the standard
          amortisation formula to compute a fixed monthly payment, then
          breaks every payment into principal and interest in the
          schedule. Total cost = monthly payment × number of payments.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Monthly Payment = P × [r(1+r)^n] / [(1+r)^n − 1]

  P = Principal (loan amount)
  r = Monthly interest rate = Annual Rate / 12 / 100
  n = Total number of monthly payments

Example: $50,000 loan | 8% APR | 60 months
  r = 0.08/12 = 0.00667
  Monthly Payment ≈ $1,013.82
  Total Cost      = $1,013.82 × 60 = $60,829
  Total Interest  = $10,829`}
        </pre>
      </FormulaBox>

      <FaqList items={FAQS} />

      <RelatedTools slugs={["cash-flow-calculator", "roi-calculator"]} />

      <Disclaimer />
    </CalculatorShell>
  );
}
