import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead text-lg leading-relaxed text-gray-700">
        Most small business owners discover too late that not all
        business loans are alike. Term loans, lines of credit, invoice
        finance, SBA loans, merchant cash advances — different products
        for different cash needs. Here&apos;s the plain-English guide.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The five main types</h2>

      <h3 className="mt-6 text-lg font-semibold text-brand-dark">1. Term loan</h3>
      <p className="mt-2 leading-relaxed text-gray-700">
        Borrow a lump sum, repay in fixed monthly installments over a
        set term (1–10 years typical). Rates 7–25% APR depending on
        creditworthiness. Best for: one-off capital purchases
        (equipment, vehicle, fit-out) where the cash flow it
        generates can service the loan over its life.
      </p>

      <h3 className="mt-6 text-lg font-semibold text-brand-dark">2. Line of credit (revolving)</h3>
      <p className="mt-2 leading-relaxed text-gray-700">
        Approved for a credit limit; draw down what you need, repay
        and re-draw. Interest only on what you&apos;ve actually drawn.
        Rates 8–20% APR. Best for: smoothing working capital, paying
        suppliers while waiting for customer payments, bridging
        seasonal dips.
      </p>

      <h3 className="mt-6 text-lg font-semibold text-brand-dark">3. SBA loan (USA only)</h3>
      <p className="mt-2 leading-relaxed text-gray-700">
        Government-guaranteed term loans. SBA 7(a) is the main program
        — up to $5M, 10-year terms common. Lower rates (6.5–9.5%) and
        longer terms than conventional. Slower approval (60–90 days)
        and heavier paperwork. Best for: established small businesses
        needing significant capital with time to wait.
      </p>

      <h3 className="mt-6 text-lg font-semibold text-brand-dark">4. Invoice finance / factoring</h3>
      <p className="mt-2 leading-relaxed text-gray-700">
        Sell your unpaid invoices to a factor; receive 70–90% of face
        value immediately, balance (minus fee) when customer pays. Fees
        typically 1–3% per invoice plus a service charge. Best for:
        businesses with long customer payment terms (60–90 days) and
        immediate cash needs. Caveat: customers see they&apos;re paying
        the factor, which can hurt relationships.
      </p>

      <h3 className="mt-6 text-lg font-semibold text-brand-dark">5. Merchant cash advance (MCA)</h3>
      <p className="mt-2 leading-relaxed text-gray-700">
        Lender advances cash against future card sales. Repaid as a
        percentage of daily card revenue. <strong>Avoid if possible</strong>
        — effective APRs often exceed 60–100%. Only worth considering
        when no other capital is available and the business genuinely
        will service the cost.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">How interest is calculated</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Standard amortisation: each monthly payment is split into
        principal and interest. Early payments are mostly interest;
        later payments are mostly principal. By half-way through the
        term, most of each payment is reducing the balance.
      </p>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-brand-light p-4 text-sm font-mono">
{`Monthly Payment = P × [r(1+r)^n] / [(1+r)^n − 1]

P = principal
r = monthly interest rate (APR / 12 / 100)
n = number of months`}
      </pre>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">A worked example: $50,000 / 8% / 60 months</h2>
      <ul className="mt-3 ml-6 list-disc space-y-1 text-gray-700">
        <li>Monthly payment: <strong>$1,013.82</strong></li>
        <li>Total paid over 5 years: $60,829</li>
        <li>Total interest: $10,829 (21.7% of original loan)</li>
      </ul>
      <p className="mt-3 leading-relaxed text-gray-700">
        Same loan over 10 years: monthly payment drops to $606.64 but
        total interest rises to $22,797 — more than double. The
        trade-off in every loan is monthly cash flow vs total cost.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">APR vs interest rate</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        APR = Annual Percentage Rate — the true annual cost of
        borrowing INCLUDING fees, not just the stated interest rate. A
        loan with 6% interest plus $1,000 origination fee might have a
        7.5% APR. Always ask for APR, not just the &ldquo;rate&rdquo;.
        Comparing APRs is the only fair way to compare loans.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Personal guarantee</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Most small business loans require a personal guarantee — if the
        business defaults, the lender comes after the owner&apos;s
        personal assets (savings, home equity). This is standard but
        non-trivial. Some SBA loans, larger commercial loans, and
        relationship-bank loans can be negotiated to limited or no
        personal guarantee.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">What lenders actually look at</h2>
      <ol className="mt-3 ml-6 list-decimal space-y-2 text-gray-700">
        <li><strong>Debt service coverage ratio (DSCR).</strong> Your annual EBITDA ÷ annual loan payments. Most lenders want ≥1.25× — meaning EBITDA covers loan payments with 25% buffer.</li>
        <li><strong>Personal credit score</strong> (FICO &gt;680 typical minimum, &gt;720 for best rates in USA).</li>
        <li><strong>Time in business</strong> (2+ years for most lenders; SBA accepts 1+ year).</li>
        <li><strong>Annual revenue</strong> (typically $100k+ minimum).</li>
        <li><strong>Collateral</strong> (equipment, real estate, inventory) for larger loans.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Region-specific rate guides</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>USA:</strong> SBA 7(a) 6.5–9.5%, conventional 8–25%.</li>
        <li><strong>UK:</strong> high-street SME loans 7–15%, alternative lenders 12–30%.</li>
        <li><strong>South Africa:</strong> prime rate ~11.75% + 2–5% margin (so 13.75–16.75% typical for SMEs).</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Should you borrow?</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        The right question isn&apos;t &ldquo;can we afford the
        payments?&rdquo; — it&apos;s &ldquo;will the borrowed money
        generate enough return to justify its full cost over the loan
        life?&rdquo;. Use the{" "}
        <Link href="/business-loan-calculator" className="text-brand-primary underline">
          Business Loan Calculator
        </Link>{" "}
        to see monthly payment + total interest, then the{" "}
        <Link href="/roi-calculator" className="text-brand-primary underline">
          ROI Calculator
        </Link>{" "}
        or{" "}
        <Link href="/payback-period-calculator" className="text-brand-primary underline">
          Payback Period Calculator
        </Link>{" "}
        to assess whether the use of funds clears the hurdle.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Bottom line</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>Match loan type to purpose — term for capex, line of credit for working capital.</li>
        <li>Compare APRs, not headline rates.</li>
        <li>Avoid merchant cash advances if any alternative is available.</li>
        <li>Borrow only when the use of funds clearly returns more than the loan&apos;s full cost.</li>
      </ul>
    </>
  );
}
