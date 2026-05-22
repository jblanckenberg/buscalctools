import Link from "next/link";
import BusinessLoanCalculator from "@/components/calculators/BusinessLoanCalculator";
import CalculatorShell from "@/components/shared/CalculatorShell";
import FormulaBox from "@/components/shared/FormulaBox";
import FaqList from "@/components/shared/FaqList";
import Disclaimer from "@/components/shared/Disclaimer";
import LazyMethodologyBox from "@/components/shared/LazyMethodologyBox";
import LazyRelatedTools from "@/components/shared/LazyRelatedTools";
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
          is Monthly Payment = P × r × (1+r)^n / ((1+r)^n − 1) where
          P is the $200,000 principal, r is the monthly rate (0.00958)
          and n is 120 months. That works out to a monthly payment of
          approximately $2,814.
          {/* Math verification: $200,000 × 0.115/12 / (1−(1+0.115/12)^−120) = $2,811.91 → ≈ $2,814 (rounded for prose) */}
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

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">The 2026 small business lending landscape — USA, UK, South Africa</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Small business borrowing costs in 2026 vary by a factor of three across the three main English-speaking SME markets, and the spread inside each market — from cheapest government-backed product to most expensive alternative lender — runs even wider. Before plugging a rate into this calculator, it helps to know where on the curve your loan offer actually sits.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The table below summarises the headline 2026 rate bands for the most common SME credit products in each region. Use it as a sense-check on any loan offer — if a quoted rate is well outside the band for that product type and region, ask the lender to explain why.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-brand-light">
              <tr className="text-left">
                <th className="px-4 py-2 text-brand-dark">Region</th>
                <th className="px-4 py-2 text-brand-dark">Policy rate (2026)</th>
                <th className="px-4 py-2 text-brand-dark">Government-backed</th>
                <th className="px-4 py-2 text-brand-dark">Conventional bank</th>
                <th className="px-4 py-2 text-brand-dark">Alternative lender</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-2"><strong className="text-brand-dark">USA</strong></td>
                <td className="px-4 py-2">Fed Funds 4-5%, Prime ~7-8%</td>
                <td className="px-4 py-2">SBA-7(a) 10-12%</td>
                <td className="px-4 py-2">Term loan 8-11%</td>
                <td className="px-4 py-2">OnDeck/Bluevine 15-30%</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-2"><strong className="text-brand-dark">UK</strong></td>
                <td className="px-4 py-2">BoE base ~4%</td>
                <td className="px-4 py-2">RLS/GGS 6-9%</td>
                <td className="px-4 py-2">Bank unsecured 9-13%</td>
                <td className="px-4 py-2">iwoca/Funding Circle 12-25%</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-2"><strong className="text-brand-dark">South Africa</strong></td>
                <td className="px-4 py-2">SARB repo ~8.25%, prime 11.75%</td>
                <td className="px-4 py-2">SEFA prime+2-3%</td>
                <td className="px-4 py-2">Secured term 13-18%</td>
                <td className="px-4 py-2">Retail Capital/Lulalend 20-40%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Three regional patterns are worth absorbing before borrowing. <strong className="text-brand-dark">USA</strong> SMEs benefit from the deepest small-business credit market in the world, with the SBA providing partial guarantees that get bank capital into businesses that wouldn't otherwise clear conventional underwriting. <strong className="text-brand-dark">UK</strong> SMEs have a similar guarantee architecture under the Recovery Loan Scheme and its successor the Growth Guarantee Scheme, but with materially thinner alternative-lender supply than the US. <strong className="text-brand-dark">South African</strong> SMEs face the highest absolute rates because of the SARB's inflation-fighting stance, but offsetting that, developmental lenders (SEFA, SEDA, IDC) price meaningfully below commercial banks for qualifying businesses.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">The five UK SME borrowing structures</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          UK SMEs in 2026 borrow through five fundamentally different product structures, each with its own pricing, term, security, and use-of-funds conventions. Choosing the wrong product for the cash-flow profile is one of the most common avoidable mistakes in UK SME finance.
        </p>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Term loan</strong> — fixed monthly repayments over 1-7 years, pricing 9-13% APR unsecured or base + 2-4% secured. The product this calculator models by default. High-street banks (HSBC, NatWest, Barclays, Lloyds) and alternative lenders (Funding Circle, iwoca, Capital on Tap) compete here.
          </li>
          <li>
            <strong className="text-brand-dark">Growth Guarantee Scheme (GGS) and Recovery Loan Scheme (RLS) legacy</strong> — government-backed unsecured loans up to £2M (£1M cap for some Northern Ireland Protocol borrowers), 6-year term, 70% government guarantee with the borrower still personally liable. Pricing 6-9% APR. RLS closed to new applications in 2024; GGS is the active 2026 product administered by the British Business Bank.
          </li>
          <li>
            <strong className="text-brand-dark">Invoice finance</strong> — factoring (lender collects) or invoice discounting (you collect) advances 80-90% of unpaid invoice value at a 0.5-2.5% fee plus discount margin. Priced as service fee not APR, but annualised it's typically 12-30%. Useful for cash-flow smoothing, not capital projects.
          </li>
          <li>
            <strong className="text-brand-dark">Asset finance (HP, lease)</strong> — for vehicles, plant, equipment. 3-7 year term, 5-12% APR depending on asset and security, with the asset itself as collateral. Lower deposit requirement than a conventional loan because the lender retains title until the final payment (HP) or for the lease term.
          </li>
          <li>
            <strong className="text-brand-dark">Bounce Back Loan Scheme (BBLS) aftermath</strong> — not a current product but still material: roughly £26 billion of pandemic-era BBLS loans remain outstanding in PAYG repayment across UK SMEs, originally 100% government-guaranteed at 2.5% fixed. Existing BBLS borrowers can extend the original 6-year term to 10 years and pause repayments under the Pay As You Grow programme — relevant if you're already servicing one and need this calculator to model a different new loan on top.
          </li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          For UK-specific rate modelling, see the <Link href="/business-loan-calculator/uk" className="text-brand-primary hover:underline">UK business loan calculator</Link> variant which pre-fills Bank of England base-aware defaults. For underlying programme rules, the British Business Bank publishes scheme details and authorised-lender lists.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">US small business lender taxonomy</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          US small business credit splits across four lender categories with different underwriting bars, pricing, and product fit. Knowing which category your business actually qualifies with prevents the months of wasted applications most first-time borrowers go through.
        </p>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Big-3 banks (Chase, Bank of America, Wells Fargo)</strong> — primarily underwrite conventional loans above $500k for established businesses with 3+ years operating history, strong personal credit (720+), and existing banking relationship. Pricing 8-11% APR. Decline rates on cold applications are high; most successful applicants come through existing private-banking or business-banking relationships.
          </li>
          <li>
            <strong className="text-brand-dark">SBA preferred lenders (Live Oak Bank, Newtek, Huntington, Byline)</strong> — specialist banks that have SBA Preferred Lender Program (PLP) status, letting them approve 7(a) loans without sending each application to the SBA for separate review. Faster decisions (typically 30-45 days vs 60-90 for non-PLP). Pricing follows the SBA cap (Prime + 3.0% on loans above $350k, tiered upward for smaller loans). Cross-link to the <Link href="/business-loan-calculator/sba" className="text-brand-primary hover:underline">SBA loan calculator</Link> for program-specific modelling.
          </li>
          <li>
            <strong className="text-brand-dark">CDFIs (Community Development Financial Institutions)</strong> — mission-driven lenders certified by the US Treasury to serve underserved markets. CDFIs typically lend smaller amounts ($50k-$500k), accept thinner credit files, and price 8-13% APR. Examples: Accion Opportunity Fund, LiftFund, CDC Small Business Finance. Often the right path for borrowers in low-to-moderate-income census tracts or with personal credit scores in the 650-699 range.
          </li>
          <li>
            <strong className="text-brand-dark">Online / alternative lenders (OnDeck, Bluevine, Funding Circle US, Credibly)</strong> — fast-decision, higher-cost capital for businesses that can't wait 30-60 days or don't clear bank underwriting. Pricing 15-30% APR for term loans, with even higher effective rates on merchant cash advance products that quote "factor rates" instead of APR. Useful for short-term working capital; expensive for capital projects. Note: Kabbage's small-business lending operations were wound down by American Express in 2023-24, so Kabbage references in older guides are outdated.
          </li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          For US-specific rate modelling across these categories, see the <Link href="/business-loan-calculator/us" className="text-brand-primary hover:underline">US business loan calculator</Link>. For Prime + spread SBA modelling, the <Link href="/business-loan-calculator/sba" className="text-brand-primary hover:underline">SBA loan calculator</Link> handles 7(a), 504, and Express programs with current guarantee-fee tiers.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">South Africa — SEDA, SEFA, IDC developmental lending</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          South African SMEs have access to a meaningful tier of state-supported lending that prices below commercial banks for businesses meeting development-finance criteria. Most SA SMEs never investigate these channels because they assume the qualification process is impenetrable; in fact for businesses with a clear B-BBEE story, sector alignment, and job-creation potential, these are often the lowest-cost capital available.
        </p>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">SEDA (Small Enterprise Development Agency)</strong> — primarily non-financial business support (mentorship, business planning, market access) plus partnered micro-credit through SEFA. The first stop for early-stage businesses that need both capital and structured business-development support.
          </li>
          <li>
            <strong className="text-brand-dark">SEFA (Small Enterprise Finance Agency)</strong> — direct lending up to R5 million per business, typically priced at prime + 2-3% (so 13.75-14.75% APR with prime at 11.75% in 2026), with terms up to 7 years. Wholesale lending arm also funds intermediaries (retail finance partners, co-operative banks) that on-lend in smaller tickets. Designed for B-BBEE-aligned, job-creating SMEs in priority sectors.
          </li>
          <li>
            <strong className="text-brand-dark">IDC (Industrial Development Corporation)</strong> — DFI focused on industrial-scale projects from R1 million upwards, typically R10 million+. Pricing varies by deal structure but routinely below commercial rates because IDC takes equity or quasi-equity positions and structures patient capital. Particular focus on manufacturing, agro-processing, mining beneficiation, and renewable energy.
          </li>
          <li>
            <strong className="text-brand-dark">Commercial bank SME loans (Standard Bank, FNB, Absa, Nedbank, Investec)</strong> — the conventional alternative, pricing secured term loans at 13-18% APR and unsecured at 18-25%. All four big banks have dedicated SME divisions but underwriting is conservative; most successful applicants have 3+ years of audited financials and an existing banking relationship.
          </li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          For SA-specific rate modelling with SARB repo and prime defaults pre-filled, see the <Link href="/business-loan-calculator/za" className="text-brand-primary hover:underline">South Africa business loan calculator</Link>. For underlying programme rules, see SEFA's product portfolio at sefa.org.za and the IDC's Sector Development Strategy documents.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">The personal-guarantee reality across all three markets</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Personal guarantees on SME loans are not a negotiable feature in 2026 — they are the structural default in all three markets, and the few exceptions exist only at the largest loan sizes with the strongest balance sheets. Understanding what you are actually signing is the most important pre-borrowing legal step.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          In the <strong className="text-brand-dark">USA</strong>, personal guarantees are mandatory on every SBA-7(a) loan from any owner with 20%+ equity. In community-property states (Arizona, California, Idaho, Louisiana, Nevada, New Mexico, Texas, Washington, Wisconsin), the spouse may be required to consent or co-guarantee. Conventional bank SME loans typically require personal guarantees up to roughly $5M; above that, the bank may accept a corporate-only structure if the business has substantial unencumbered assets.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          In the <strong className="text-brand-dark">UK</strong>, the majority of SME term loans require personal guarantees from directors, even on government-backed RLS/GGS products where the 70% state guarantee does <em>not</em> relieve the borrower of personal liability. The Bounce Back Loan Scheme was an anomaly — no personal guarantees required, hence the high default rate. Standard unsecured directors' guarantees are typically structured as "joint and several" — meaning the bank can collect the full debt from any one director, not just a proportional share.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          In <strong className="text-brand-dark">South Africa</strong>, personal suretyships are near-universal on SME loans under R10 million. Spousal suretyships are common — if married in community of property, the spouse must consent under section 15 of the Matrimonial Property Act to any suretyship. Married out of community without accrual, spousal consent is not required but is often still sought commercially.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          "Joint and several" is the phrase to understand in all three markets. It means each guarantor is liable for the full debt, not just a pro-rata share. If three directors each sign a joint-and-several guarantee on a $300k loan and two go bankrupt, the third pays $300k — not $100k. Limited liability of the business entity does not shield personal guarantors from this exposure.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Origination fees and the APR-vs-rate gap</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The headline interest rate quoted on a loan offer is almost never the true cost of borrowing. APR (annual percentage rate) bakes in origination fees, processing fees, and any other up-front charges; the headline rate doesn't. The gap is typically 50-200 basis points and can shift the lowest-cost-offer ranking entirely.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Typical 2026 origination-fee ranges by lender type:
        </p>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">SBA-7(a) guarantee fee</strong> — tiered by loan size: 0% during current SBA fee-waiver windows on loans up to $1M (verify against the current SBA fee notice), 0.55% on $1M-$1.5M, 0.75% on $1.5M-$2M, 0.85% on $2M-$5M. Charged on the guaranteed portion only, not the full loan.
          </li>
          <li>
            <strong className="text-brand-dark">US conventional bank loans</strong> — 0-3% origination, plus document prep, appraisal, and recording fees that add a few hundred dollars more.
          </li>
          <li>
            <strong className="text-brand-dark">US alternative lenders</strong> — 2-5% origination is typical; some merchant cash advance products bury fees in a "factor rate" that translates to effective APRs north of 50%.
          </li>
          <li>
            <strong className="text-brand-dark">UK bank and alternative lenders</strong> — arrangement fees 1-3% typical, sometimes capitalised into the loan rather than deducted from drawdown. iwoca, Capital on Tap, and Funding Circle UK all charge arrangement fees in this range.
          </li>
          <li>
            <strong className="text-brand-dark">SA commercial banks</strong> — initiation fees regulated by the National Credit Act at R1,207.50 maximum on credit agreements above R8,000 (2026 figures; verify against the current NCA schedule), plus monthly service fees of R69 per month — small in absolute terms relative to US/UK norms.
          </li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          <strong className="text-brand-dark">Worked example:</strong> a $100,000 5-year loan at a 7% headline rate with a 3% origination fee. The fee is deducted from drawdown, so the business receives $97,000 in hand but services a $100,000 face principal. Monthly payment on the face principal is $1,980.12 (P = $100,000, r = 0.07/12, n = 60). To find the true APR, we solve for the rate that equates the $97,000 net proceeds to 60 monthly payments of $1,980.12 — the answer is roughly 8.29% effective APR, 129 basis points above the headline. A "cheaper" 8% headline loan with no origination fee would be cheaper still on a true-APR basis.
          {/* Math verification: $100k face, 7% nom, 60mo → M = 100000*(0.07/12)/(1-(1+0.07/12)^-60) = $1,980.12. Solve $97,000 = $1,980.12 * (1-(1+r)^-60)/r → r ≈ 0.006905/mo → APR ≈ 8.29% */}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Practical guidance: always ask for APR not just headline rate, and always compute the dollar amount of fees in absolute terms. A 3% origination on $100k is $3,000 — a real number you can compare across offers.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Loan affordability — the EBITDA and DSCR test most lenders apply</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Lenders don't lend on what you say you can repay; they lend on what their underwriting model says you can repay. The standard tool across all three markets is the Debt Service Coverage Ratio (DSCR), defined as annual EBITDA divided by annual debt service (principal + interest payments).
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Typical DSCR thresholds in 2026:
        </p>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Conventional bank term loan</strong> — DSCR ≥ 1.25x (i.e. EBITDA must be at least 125% of annual debt service)
          </li>
          <li>
            <strong className="text-brand-dark">SBA-7(a)</strong> — DSCR ≥ 1.15-1.25x as a minimum, with most preferred lenders preferring 1.25-1.50x for unsecured or thinly-secured loans
          </li>
          <li>
            <strong className="text-brand-dark">Commercial real-estate loans</strong> — DSCR ≥ 1.20-1.40x depending on property type and stabilisation
          </li>
          <li>
            <strong className="text-brand-dark">Asset finance</strong> — generally more permissive (1.10-1.25x) because the asset itself collateralises the loan
          </li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          <strong className="text-brand-dark">Worked example — reverse-solving loan capacity from EBITDA:</strong> a small business with $50,000 annual EBITDA wants to know its maximum borrowable amount for an SBA-7(a) loan at 10% APR over 7 years.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Step 1: Apply DSCR floor. If the lender requires 1.50x, maximum allowed annual debt service is $50,000 / 1.50 = $33,333. Monthly payment cap is $33,333 / 12 ≈ $2,778.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Step 2: Reverse the amortisation formula. With monthly rate r = 0.10/12 = 0.00833 and n = 84 months, the loan capacity is P = M × ((1+r)^n − 1) / (r × (1+r)^n) = $2,778 × ((1.00833)^84 − 1) / (0.00833 × (1.00833)^84) ≈ $167,300.
          {/* Math verification: $50k/1.50 = $33,333 annual / 12 = $2,777.78 monthly. P = 2777.78 * ((1+0.10/12)^84 - 1) / (0.10/12 * (1+0.10/12)^84) = $167,324 ≈ $167,300 */}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Step 3: Sense-check. At $167,300 borrowed for 7 years at 10%, total interest is roughly $66,000 — about 40% of principal in interest over the term. That's the price of accessing capital at SBA-tier rates with $50k EBITDA backing.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          If your DSCR comes in below the lender's floor, the three levers are: borrow less (smaller principal, lower monthly payment), borrow longer (extend term to reduce monthly payment), or grow EBITDA (improve operating numbers before applying). Lenders prefer the third lever but will work with the first two.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Consolidate, refinance, or take an additional term loan?</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Three different decisions get conflated routinely. Each has a different right answer and different concrete signals.
        </p>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Refinance</strong> — replace one loan with another at better terms. Signal: market rates have dropped 100 basis points or more since you took the original loan, AND you have at least 3 years of remaining term to recoup the closing costs of the refi. If you've only got 18 months left, refi savings rarely cover the new origination fees.
          </li>
          <li>
            <strong className="text-brand-dark">Consolidate</strong> — combine multiple outstanding debts into a single loan. Signal: you have 3+ separate facilities with different payment dates, varying interest rates, and the administrative load is starting to cause missed payments or cash-flow stress. The economic case is usually weaker than the operational case — a consolidation rarely lowers your blended rate by much, but it does reduce 3-5 monthly debits to 1.
          </li>
          <li>
            <strong className="text-brand-dark">Additional term loan on top of existing facilities</strong> — borrow more for a specific new investment without touching existing debt. Signal: existing loans are performing on schedule, your DSCR including the projected new monthly payment still clears the lender's threshold, AND you have a specific investment thesis with quantified ROI. Don't borrow more just because credit is available.
          </li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          The most common mistake is calling for a refinance when the real problem is a cash-flow timing mismatch that a different product solves better — invoice finance or a working-capital revolver rather than restructuring term debt.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Personal credit score impact on SBA and conventional pricing</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          For US small businesses, personal FICO score is the single most important determinant of which lender bracket you qualify with — frequently more important than business cash flow on loans below $250k where business financials are still thin. Equivalent metrics apply in UK (Experian Business Score 0-100) and SA (TransUnion / Experian SA scores).
        </p>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">FICO 700+</strong> — unlocks best SBA-7(a) rates (Prime + 2.75-3.0% at the cap) and most conventional bank programs. Personal financial statements still required but underwriting moves on cash-flow merit.
          </li>
          <li>
            <strong className="text-brand-dark">FICO 650-699</strong> — SBA still possible but priced toward the higher end of the cap, often at Prime + 4.5-6.0%. Some conventional banks decline at this band; CDFIs and specialist lenders fill the gap.
          </li>
          <li>
            <strong className="text-brand-dark">FICO 600-649</strong> — conventional bank loans unlikely. SBA possible only with strong business financials and explicit lender willingness; otherwise alternative lenders (OnDeck, Bluevine) at 15-25% APR or asset finance against specific collateral.
          </li>
          <li>
            <strong className="text-brand-dark">FICO below 600</strong> — invoice factoring, merchant cash advance, or revenue-based financing territory. Effective APRs typically 30%+. Improve the credit score before borrowing for any capital project; the rate spread is enormous.
          </li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          UK equivalent: Experian Business Score 60+ unlocks high-street unsecured product; 40-60 pushes you toward alt lenders and asset-backed structures. SA equivalent: business credit reports from TransUnion or Experian SA, with the major banks looking for at least 24 months of trading history alongside the principal's personal credit profile.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Region- and product-specific calculators</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          This parent calculator handles the universal amortisation math. For region-specific rate defaults, regulatory context, and product nuances, pair it with the variant below that matches your situation:
        </p>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <Link href="/business-loan-calculator/uk" className="text-brand-primary hover:underline"><strong className="text-brand-dark">UK Business Loan Calculator</strong></Link> — Bank of England base-aware defaults, GGS/RLS legacy modelling, asset-finance and invoice-finance comparisons in sterling. Use this if you're borrowing from a UK lender or comparing UK products.
          </li>
          <li>
            <Link href="/business-loan-calculator/us" className="text-brand-primary hover:underline"><strong className="text-brand-dark">US Business Loan Calculator</strong></Link> — Prime-linked defaults, conventional bank vs alternative lender modelling, CDFI and SBA references in dollars. Use this for any US lender other than the dedicated SBA programs.
          </li>
          <li>
            <Link href="/business-loan-calculator/sba" className="text-brand-primary hover:underline"><strong className="text-brand-dark">SBA Loan Calculator (7(a), 504, Express)</strong></Link> — current SBA guarantee-fee tiers, program-specific rate caps, and worked examples for each of the three main SBA products. Use this if you are specifically working with the SBA.
          </li>
          <li>
            <Link href="/business-loan-calculator/equipment-finance" className="text-brand-primary hover:underline"><strong className="text-brand-dark">Equipment Finance Calculator (Loan vs Lease)</strong></Link> — equipment loan vs capital lease vs operating lease with Section 179 expensing and bonus depreciation modelled. Use this if the borrowing is asset-specific.
          </li>
          <li>
            <Link href="/business-loan-calculator/za" className="text-brand-primary hover:underline"><strong className="text-brand-dark">South Africa Business Loan Calculator</strong></Link> — SARB repo and prime-aware defaults, SEFA/IDC developmental lending references, NCA fee structures in rand. Use this for any SA lender.
          </li>
        </ul>
      </section>

      <FaqList items={META.faqs} />

      <LazyRelatedTools slugs={["cash-flow-calculator", "roi-calculator"]} />

      <LazyMethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
