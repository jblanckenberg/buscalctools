import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead text-lg leading-relaxed text-gray-700">
        &ldquo;Is 22% a good margin?&rdquo; — it depends entirely on your industry,
        whether you mean gross or net, and whether you&apos;re comparing to
        peers or to your own past. This guide gives you the benchmarks,
        explains why they differ, and shows you how to know if your margin
        is healthy.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Gross margin vs net margin — set the baseline</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Two completely different numbers. <strong>Gross margin</strong> is
        what&apos;s left after the direct cost of producing what you sell
        (COGS). <strong>Net margin</strong> is what&apos;s left after
        everything — COGS, operating costs, interest, and tax. Net margin
        is always lower than gross margin and is the &ldquo;real&rdquo; measure
        of business profitability.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Benchmarks by industry</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-brand-light">
            <tr className="text-left">
              <th className="px-4 py-2">Industry</th>
              <th className="px-4 py-2">Typical gross margin</th>
              <th className="px-4 py-2">Typical net margin</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Software / SaaS</td><td className="px-4 py-2">70–85%</td><td className="px-4 py-2">15–30%</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Consulting / services</td><td className="px-4 py-2">50–70%</td><td className="px-4 py-2">15–25%</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Manufacturing</td><td className="px-4 py-2">25–35%</td><td className="px-4 py-2">5–10%</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Retail (general)</td><td className="px-4 py-2">30–50%</td><td className="px-4 py-2">2–5%</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Grocery / supermarket</td><td className="px-4 py-2">20–30%</td><td className="px-4 py-2">1–3%</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Restaurants</td><td className="px-4 py-2">60–70%</td><td className="px-4 py-2">3–8%</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Ecommerce (own product)</td><td className="px-4 py-2">40–60%</td><td className="px-4 py-2">8–15%</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Ecommerce (resale)</td><td className="px-4 py-2">20–35%</td><td className="px-4 py-2">2–7%</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Construction</td><td className="px-4 py-2">15–25%</td><td className="px-4 py-2">3–7%</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Why service businesses always look more profitable</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Service businesses have very low COGS — the only direct cost is
        labour. A consulting firm billing $150/hour with consultants paid
        $80/hour has a 47% gross margin per hour. A retailer marking up
        product 50% has the same number on paper but pays rent, staff,
        and inventory holding costs that the consultant doesn&apos;t. By
        the time you reach net profit, the two businesses look much closer.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The three numbers that matter</h2>
      <ol className="mt-3 ml-6 list-decimal space-y-2 text-gray-700">
        <li>
          <strong>Are you above industry median?</strong> Below median usually
          means a pricing problem, a cost problem, or product/market fit
          issues.
        </li>
        <li>
          <strong>Is your margin trending up, down, or flat year-over-year?</strong>{" "}
          Trend matters more than absolute level. A 6% net margin growing
          to 8% next year is healthier than a 12% margin sliding to 10%.
        </li>
        <li>
          <strong>Does your gross margin cover your operating expenses with
          room left?</strong> If gross profit barely covers OpEx, you&apos;re
          one bad month from a loss.
        </li>
      </ol>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Red flags by margin level</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Gross margin under 20%:</strong> nearly impossible to absorb shocks. One supplier price rise, returns spike, or discounting season can wipe out profit.</li>
        <li><strong>Net margin under 5%:</strong> any cost increase or revenue dip pushes you into a loss. Vulnerable.</li>
        <li><strong>Negative net margin:</strong> losing money. Either fundraise, cut costs hard, or change the business model.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">How to actually improve margin</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Three levers, in order of effectiveness:
      </p>
      <ol className="mt-3 ml-6 list-decimal space-y-2 text-gray-700">
        <li><strong>Raise prices.</strong> A 5% price increase typically drops 80% to the bottom line — almost nothing else has that leverage. Most small businesses are under-pricing.</li>
        <li><strong>Cut COGS.</strong> Renegotiate supplier contracts, switch to higher-yield processes, eliminate waste, batch production.</li>
        <li><strong>Cut OpEx.</strong> Slowest because it&apos;s often tied to fixed contracts (rent, salaries) but high-impact long-term.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Measure yours now</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Plug your numbers into the{" "}
        <Link href="/profit-margin-calculator" className="text-brand-primary underline">
          Profit Margin Calculator
        </Link>{" "}
        for a one-screen view of gross, operating, and net margin. For a
        full revenue-to-net-profit waterfall, use the{" "}
        <Link href="/net-profit-calculator" className="text-brand-primary underline">
          Net Profit Calculator
        </Link>{" "}
        which deducts COGS, OpEx, interest, and tax in sequence.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Bottom line</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>There&apos;s no universal &ldquo;good&rdquo; margin — it depends on industry.</li>
        <li>SaaS, services, and restaurants have high gross but very different net margins.</li>
        <li>Trend matters as much as level. Improving 2% per year is healthier than holding flat at a high number.</li>
        <li>Net margin under 5% is vulnerable; under 10% is thin; over 15% is strong for most industries.</li>
      </ul>
    </>
  );
}
