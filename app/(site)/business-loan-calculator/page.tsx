import BusinessLoanCalculator from "@/components/calculators/BusinessLoanCalculator";
import CalculatorShell from "@/components/shared/CalculatorShell";
import FormulaBox from "@/components/shared/FormulaBox";
import FaqList from "@/components/shared/FaqList";
import LazyBelowFold from "@/components/shared/LazyBelowFold";
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

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Comparing on monthly payment alone</strong> — a longer term gives a smaller monthly payment but a much larger total interest bill. A $50,000 loan at 8% costs $10,829 in interest over 5 years versus $18,526 over 10 years — same monthly comfort, $7,697 more out of pocket. Always compare total cost, not just the monthly line.
          </li>
          <li>
            <strong className="text-brand-dark">Quoting the headline rate, ignoring fees</strong> — origination fees, processing fees, and prepayment penalties can add 1–3% to the effective cost of borrowing. APR captures these; the headline interest rate does not. A 7% loan with a 3% origination fee can be more expensive than an 8% loan with no fees.
          </li>
          <li>
            <strong className="text-brand-dark">Borrowing the maximum approved</strong> — the lender's approval ceiling is set by what you can theoretically repay, not what you actually need. Borrowing $200,000 when $80,000 funds the project just adds $10,000/year of interest expense and ties up future borrowing capacity for no benefit. Match the loan to the project, not to the cap.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">When to use this calculator</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Use this when you have a loan amount and APR in hand and want to model monthly payments, total interest, and the principal/interest split over the life of the loan. It is the right tool for SBA, term loan, or commercial loan comparisons and for checking what a refinance would actually save.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          If you are deciding <em>how much</em> to borrow against future cash flow, pair this with the Cash Flow Calculator to confirm the monthly payment fits. To evaluate whether a debt-funded investment actually pays off, run the same numbers through the ROI Calculator.
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

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A US small business takes a $200,000 SBA 7(a) loan to fund a
          new location build-out. The rate is 11.5% APR (prime + 3.0%
          for an SBA 7(a) over $50,000 at the time of writing) on a
          10-year fully-amortising term. The monthly payment formula
          gives £P × r × (1+r)^n / ((1+r)^n − 1) where r is the monthly
          rate (0.00958) and n is 120 months. That works out to a
          monthly payment of approximately $2,814.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Total paid over 120 months = $2,814 × 120 = $337,680. Of that,
          $200,000 is principal repayment and $137,680 is interest. The
          interest paid is 69% of the original loan amount — a sobering
          number, but spread across a decade and against the
          alternative of a conventional bank loan that the business
          probably could not qualify for at this stage.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Compare to a conventional bank loan on the same principal and
          term at 9.5% APR (assume the business had three years of
          strong financials, two years of profitability, and 20%+ equity
          in collateral — the bar for non-SBA approval): monthly
          payment $2,587, total cost $310,440, total interest $110,440.
          The SBA loan costs an extra $27,240 over the term. That
          premium is buying easier qualification, longer amortisation
          options up to 25 years for real-estate loans, a smaller down
          payment, and willingness to lend in the first place. For most
          businesses under three years old or without collateral, the
          $27k premium is the cost of accessing capital at all.
        </p>
      </section>

      <FaqList items={META.faqs} />

      <LazyBelowFold minHeight={240} placeholderLabel="Related calculators loading">
        <RelatedTools slugs={["cash-flow-calculator", "roi-calculator"]} />
      </LazyBelowFold>

      <LazyBelowFold minHeight={400} placeholderLabel="Methodology section loading">
        <MethodologyBox slug={SLUG} />
      </LazyBelowFold>

      <Disclaimer />
    </CalculatorShell>
  );
}
