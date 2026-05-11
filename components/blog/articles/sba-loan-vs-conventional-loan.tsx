import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead text-lg leading-relaxed text-gray-700">
        SBA loans look like the obvious choice — lower rates, longer
        terms. But they take 60–90 days to close and require enough
        paperwork to fill a banker&apos;s box. Conventional loans cost
        more but close in two weeks. Here&apos;s the trade-off in detail.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">What an SBA loan actually is</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        SBA loans aren&apos;t made by the SBA. They&apos;re made by
        regular banks (Wells Fargo, Chase, regional banks) with a
        Small Business Administration guarantee — typically 75–85% of
        the loan amount. Because the bank&apos;s risk is reduced by
        the guarantee, they can offer better terms than they would on
        a purely conventional loan.
      </p>
      <p className="mt-3 leading-relaxed text-gray-700">
        Three main programs: <strong>7(a)</strong> for general business
        purposes (most common, up to $5M); <strong>504</strong> for real
        estate and large equipment (up to $5.5M); <strong>microloan</strong>{" "}
        for amounts under $50k.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Side-by-side comparison</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-brand-light">
            <tr className="text-left">
              <th className="px-4 py-2">Feature</th>
              <th className="px-4 py-2">SBA 7(a)</th>
              <th className="px-4 py-2">Conventional</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200"><td className="px-4 py-2 font-medium">Interest rate</td><td className="px-4 py-2">6.5–9.5%</td><td className="px-4 py-2">8–25%</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2 font-medium">Max amount</td><td className="px-4 py-2">$5,000,000</td><td className="px-4 py-2">Varies by lender</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2 font-medium">Typical term</td><td className="px-4 py-2">10 years (working cap) / 25 yr (real estate)</td><td className="px-4 py-2">1–7 years</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2 font-medium">Down payment</td><td className="px-4 py-2">10–15%</td><td className="px-4 py-2">10–30%</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2 font-medium">Approval time</td><td className="px-4 py-2">60–90 days</td><td className="px-4 py-2">7–21 days</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2 font-medium">Paperwork burden</td><td className="px-4 py-2">High</td><td className="px-4 py-2">Moderate</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2 font-medium">Personal guarantee</td><td className="px-4 py-2">Required (20%+ owners)</td><td className="px-4 py-2">Usually required</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2 font-medium">Prepayment penalty</td><td className="px-4 py-2">Yes, on long-term loans</td><td className="px-4 py-2">Sometimes</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2 font-medium">SBA guarantee fee</td><td className="px-4 py-2">2–3.75% of guaranteed portion</td><td className="px-4 py-2">N/A</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">A worked comparison: $200k for equipment</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Two offers for the same equipment purchase:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>SBA 7(a):</strong> $200k, 8% APR, 10-year term, $2,500 guarantee fee.</li>
        <li><strong>Conventional:</strong> $200k, 11% APR, 7-year term, $500 origination fee.</li>
      </ul>
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-brand-light">
            <tr className="text-left"><th className="px-4 py-2">Metric</th><th className="px-4 py-2">SBA</th><th className="px-4 py-2">Conventional</th></tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Monthly payment</td><td className="px-4 py-2 font-mono">$2,427</td><td className="px-4 py-2 font-mono">$3,433</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Total paid</td><td className="px-4 py-2 font-mono">$291,200</td><td className="px-4 py-2 font-mono">$288,400</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Total interest + fees</td><td className="px-4 py-2 font-mono">$93,700</td><td className="px-4 py-2 font-mono">$88,900</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Time to close</td><td className="px-4 py-2">~75 days</td><td className="px-4 py-2">~14 days</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 leading-relaxed text-gray-700">
        Surprise: total cost is almost identical. The SBA win is
        cash flow ($1,000/month lower payment), not total interest.
        Over 10 years that&apos;s $120,000 of cash flow that stays in
        the business — useful capital. The conventional loan&apos;s
        win is speed.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">When SBA wins</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Large loans</strong> ($250k+) — the SBA cap of $5M opens doors conventional often can&apos;t.</li>
        <li><strong>Long-life assets</strong> — real estate, expensive equipment. The 25-year term matches asset life.</li>
        <li><strong>Cash flow matters more than total cost.</strong> Lower monthly payment preserves working capital.</li>
        <li><strong>Limited collateral.</strong> SBA guarantee compensates for thin collateral; conventional lenders often won&apos;t.</li>
        <li><strong>Established business with audited financials.</strong> SBA wants 2+ years of clean financials.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">When conventional wins</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Time-sensitive opportunity.</strong> Equipment auction, real-estate deal closing in 30 days, supplier discount for fast payment.</li>
        <li><strong>Smaller loan ($50k or under).</strong> SBA paperwork burden often isn&apos;t worth it.</li>
        <li><strong>Strong banking relationship + good credit.</strong> Your local commercial lender may offer near-SBA rates without the SBA hassle.</li>
        <li><strong>Industry SBA excludes.</strong> Some industries (passive real estate investment, gambling, pyramid schemes) are SBA-ineligible.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The hybrid approach</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Big purchase coming up? Apply for the SBA loan first (start now;
        it takes time anyway). If a time-sensitive opportunity emerges
        before approval, bridge with a conventional short-term loan or
        line of credit, then pay it off when SBA funds arrive. Costly
        but workable.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Calculate both side-by-side</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Use the{" "}
        <Link href="/business-loan-calculator" className="text-brand-primary underline">
          Business Loan Calculator
        </Link>{" "}
        twice — once with SBA rate/term, once with conventional — and
        compare monthly payment + total interest. The differences are
        usually larger on cash flow than on total cost.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Bottom line</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>SBA = lower rate, longer term, lower monthly payment; slow approval and heavy paperwork.</li>
        <li>Conventional = higher rate, shorter term; fast approval and lighter paperwork.</li>
        <li>Total cost is often surprisingly similar; the real difference is cash flow timing.</li>
        <li>Big long-life purchases favour SBA; small or time-sensitive needs favour conventional.</li>
      </ul>
    </>
  );
}
