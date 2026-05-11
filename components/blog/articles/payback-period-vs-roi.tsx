import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead text-lg leading-relaxed text-gray-700">
        Two ways to evaluate a business investment, two different
        questions answered. ROI tells you total return. Payback period
        tells you how fast you get your money back. Use the wrong one
        and you&apos;ll fund the wrong projects.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The one-line definitions</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>ROI</strong> = total profit ÷ investment, as a percentage. Measures total return.</li>
        <li><strong>Payback period</strong> = years until cumulative cash flows recover the investment. Measures speed.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">A worked comparison</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        You have $100,000 and two projects to choose between:
      </p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-brand-light">
            <tr className="text-left">
              <th className="px-4 py-2">Year</th>
              <th className="px-4 py-2">Project A cash flow</th>
              <th className="px-4 py-2">Project B cash flow</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">1</td><td className="px-4 py-2 font-mono">$50,000</td><td className="px-4 py-2 font-mono">$15,000</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">2</td><td className="px-4 py-2 font-mono">$50,000</td><td className="px-4 py-2 font-mono">$15,000</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">3</td><td className="px-4 py-2 font-mono">$10,000</td><td className="px-4 py-2 font-mono">$25,000</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">4</td><td className="px-4 py-2 font-mono">$0</td><td className="px-4 py-2 font-mono">$50,000</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">5</td><td className="px-4 py-2 font-mono">$0</td><td className="px-4 py-2 font-mono">$100,000</td></tr>
            <tr className="border-t border-gray-200 bg-brand-light"><td className="px-4 py-2 font-semibold">Total</td><td className="px-4 py-2 font-mono font-semibold">$110,000</td><td className="px-4 py-2 font-mono font-semibold">$205,000</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 leading-relaxed text-gray-700">
        By ROI: A = 10% total ($10k / $100k); B = 105% total. <strong>B wins.</strong>
      </p>
      <p className="mt-3 leading-relaxed text-gray-700">
        By payback: A pays back in 2 years; B pays back in 4 years.{" "}
        <strong>A wins.</strong>
      </p>
      <p className="mt-3 leading-relaxed text-gray-700">
        Both metrics are right. They&apos;re answering different
        questions.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">When to use payback period</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Liquidity risk.</strong> If you might need the cash back in 18 months, fast payback matters more than eventual total return.</li>
        <li><strong>Uncertain future.</strong> The further out cash flows are, the less reliable they are. Payback rewards near-term certainty.</li>
        <li><strong>Multiple parallel investments.</strong> A short-payback project frees capital to fund the next one.</li>
        <li><strong>Equipment with short useful life.</strong> If the asset will be obsolete in 5 years, payback ≤3 years is essential.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">When to use ROI</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Comparing investments of similar duration.</strong> ROI is most useful when the time horizons match.</li>
        <li><strong>Long-life assets.</strong> For 10-year+ investments, total return matters more than first-year payback.</li>
        <li><strong>Marketing campaign evaluation.</strong> Total revenue per spend dollar is the natural metric.</li>
        <li><strong>Boardroom and investor reporting.</strong> ROI is the universally-understood number.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The limitations of each</h2>
      <h3 className="mt-6 text-lg font-semibold text-brand-dark">Payback ignores everything after recovery</h3>
      <p className="mt-2 leading-relaxed text-gray-700">
        Project A pays back in 2 years and stops. Project B pays back
        in 4 years and keeps producing for years 5–10. Payback alone
        favours Project A. Always pair payback with a measure of total
        return.
      </p>

      <h3 className="mt-6 text-lg font-semibold text-brand-dark">ROI ignores time value of money</h3>
      <p className="mt-2 leading-relaxed text-gray-700">
        A 50% return earned in 1 year is wildly better than 50% earned
        over 10 years. Naive ROI treats them as equivalent. Use{" "}
        <strong>annualised ROI</strong> for fair comparison across
        durations.
      </p>

      <h3 className="mt-6 text-lg font-semibold text-brand-dark">Both ignore risk</h3>
      <p className="mt-2 leading-relaxed text-gray-700">
        A 30% ROI from a Treasury bond (effectively risk-free) is not
        comparable to a 30% ROI from a speculative startup. Neither
        metric adjusts for risk. Use discount rates (DCF) or hurdle
        rates for risk-adjusted comparison.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The combined approach</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Smart capital allocators look at both, plus a third:
      </p>
      <ol className="mt-3 ml-6 list-decimal space-y-2 text-gray-700">
        <li><strong>Payback period</strong> must be acceptable given liquidity needs (e.g., &lt;3 years).</li>
        <li><strong>Annualised ROI</strong> must exceed the company&apos;s cost of capital plus a risk premium (e.g., &gt;15%).</li>
        <li><strong>NPV / DCF</strong> must be positive at the chosen discount rate.</li>
      </ol>
      <p className="mt-3 leading-relaxed text-gray-700">
        Only investments that clear all three hurdles get funded.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Quick reference</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-brand-light">
            <tr className="text-left">
              <th className="px-4 py-2">Decision</th>
              <th className="px-4 py-2">Primary metric</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Equipment purchase</td><td className="px-4 py-2">Payback &lt; asset life</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Marketing campaign</td><td className="px-4 py-2">ROI (annualised)</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Real estate / long-term</td><td className="px-4 py-2">DCF + IRR</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Working capital project</td><td className="px-4 py-2">Payback &lt; 12 months</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Product launch</td><td className="px-4 py-2">Payback + LTV ROI</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Calculate both</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        The{" "}
        <Link href="/payback-period-calculator" className="text-brand-primary underline">
          Payback Period Calculator
        </Link>{" "}
        gives simple and discounted payback in years; the{" "}
        <Link href="/roi-calculator" className="text-brand-primary underline">
          ROI Calculator
        </Link>{" "}
        gives total and annualised ROI. Run both on every significant
        investment decision before approving it.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Bottom line</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>Payback measures speed; ROI measures total return.</li>
        <li>Use payback for liquidity-sensitive or short-life investments.</li>
        <li>Use ROI for total-return comparisons; annualise when durations differ.</li>
        <li>Best practice: require minimum payback AND minimum ROI before funding any project.</li>
      </ul>
    </>
  );
}
