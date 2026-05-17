import BusinessLoanCalculator from "@/components/calculators/BusinessLoanCalculator";
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

const SLUG = "business-loan-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "business-loan-calculator",
  title: "Business Loan Calculator — Repayment & APR | BusCalcTools",
  description:
    "Free business loan calculator. Monthly payment, total interest, and full amortisation schedule. Region-aware APR pre-fills for USA, UK, and South Africa.",
});

const FAQS = [
  { q: "How do I calculate business loan repayments?", a: "Monthly Payment = P × [r(1+r)^n] / [(1+r)^n − 1], where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the total number of monthly payments. This calculator does this automatically — just enter the loan amount, rate, and term." },
  { q: "What is an amortisation table?", a: "An amortisation table shows the breakdown of every loan payment into principal (reducing the loan balance) and interest (the cost of borrowing). In early payments, most of your payment is interest. Over time, the proportion shifts toward principal. This table shows exactly how your loan balance reduces each month." },
  { q: "What interest rate should I use for a business loan?", a: "In the USA, SBA 7(a) loans currently range from 6.5–9.5%. Conventional unsecured business loans: 8–25% depending on creditworthiness. In the UK, 7–15% for SME unsecured loans. In South Africa, prime rate is approximately 11.75%, with loans typically at prime + 2–5%." },
  { q: "Is it better to take a shorter or longer loan term?", a: "A shorter term means higher monthly payments but less total interest paid. A longer term means lower monthly payments but significantly more total interest. Use this calculator to compare: a $50,000 loan at 8% costs $10,829 in interest over 5 years vs $18,526 over 10 years." },
  { q: "What is APR and how does it affect my loan cost?", a: "APR (Annual Percentage Rate) is the true annual cost of borrowing including fees, not just the stated interest rate. Always ask lenders for the APR, not just the interest rate. A loan with a lower interest rate but high fees can have a higher APR than a loan with a slightly higher stated rate but lower fees." },
  { q: "How do business loan rates compare across the US, UK, and SA?", a: "US SBA-backed loans are the cheapest at 6.5–9.5%, conventional bank loans 8–15%, online lenders 15–35%. UK SME loans range from 7–15% from high-street banks, with alternative lenders going to 25%+. South African business loans typically start at prime (around 11.75% in 2026) plus 2–5% — so 13.75–16.75% is common. Regional risk profiles and central-bank rates explain most of the gap." },
  { q: "What is the most common business loan mistake?", a: "Borrowing the maximum approved rather than what the business actually needs. Approval amount is set by what you can theoretically repay, not what generates returns above the cost of the loan. Borrowing $200,000 when $80,000 would have funded the project just creates $120,000 of unnecessary interest expense (about $10,000 a year at 8%) and ties up future borrowing capacity for no benefit." },
  { q: "What if my interest rate is zero (a 0% deal)?", a: "The amortisation formula divides by the interest rate, so a literal 0% would cause an error. The calculator handles 0% by switching to a simple division: monthly payment = loan amount ÷ number of months. Total interest is zero. Genuinely free loans are rare in business lending; if you see a 0% offer, check for origination fees, prepayment penalties, or balloon payments that shift the cost elsewhere." },
  { q: "I have my monthly payment — what should I check next?", a: "Three tests. One: payment as a percentage of monthly revenue — under 10% is comfortable, 10–20% is manageable, above 20% is risky. Two: the project being financed must generate cash returns greater than the interest cost (otherwise borrowing destroys value). Three: stress-test the payment against a 20% revenue drop. If the business breaks at that drop, the loan is too large or the term too short." },
  { q: "How is a business loan different from a line of credit?", a: "A loan is a lump-sum disbursement with fixed monthly payments over a set term — best for one-off purchases like equipment or a vehicle. A line of credit is a pool you can draw from and repay flexibly, paying interest only on what you've borrowed — better for managing cash flow gaps. Loans typically have lower interest rates; lines of credit offer flexibility at slightly higher cost." },
];

export default function BusinessLoanPage() {
  return (
    <CalculatorShell
      h1="Business Loan Repayment Calculator — Instant Amortisation Table"
      intro="Monthly payment, total interest, and a full amortisation schedule for any business loan. Interest rate pre-fills by region."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema
        slug={SLUG}
        name="Business Loan Repayment Calculator"
        description="Free business loan calculator with monthly payment, total interest, and full amortisation schedule."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
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

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
