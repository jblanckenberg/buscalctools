import Link from "next/link";
import ComparisonEmbed from "@/components/compare/ComparisonEmbed";

export default function Article() {
  return (
    <>
      <p className="lead text-lg leading-relaxed text-gray-700">
        [OPERATOR_TO_FILL — ~120 word lead. Frame the dilemma: every M&amp;A
        textbook teaches DCF as the &ldquo;correct&rdquo; valuation method, but
        every actual sub-$5M business sale closes on a multiple. Why the gap?
        DCF is rigorous but assumption-heavy; multiples are practical and
        defensible because they reflect what comparable businesses just sold
        for. This guide draws the line — when each one wins, and how to run
        both side-by-side in five minutes.]
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">
        The 30-second answer
      </h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        [OPERATOR_TO_FILL — ~150 words. Sub-$5M revenue: use multiples
        (EBITDA × an industry multiple). Over $10M revenue with reliable
        forecasts: DCF earns its keep. In between: run both, triangulate,
        present a range. Then explain why that rule of thumb exists.]
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">
        Side-by-side comparison
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-gray-300 bg-brand-light/40">
              <th className="px-3 py-2 text-left font-semibold text-brand-dark">
                Dimension
              </th>
              <th className="px-3 py-2 text-left font-semibold text-brand-dark">
                DCF
              </th>
              <th className="px-3 py-2 text-left font-semibold text-brand-dark">
                Multiples
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-3 py-2 font-semibold">Inputs required</td>
              <td className="px-3 py-2">[OPERATOR_TO_FILL]</td>
              <td className="px-3 py-2">[OPERATOR_TO_FILL]</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-semibold">Time to run</td>
              <td className="px-3 py-2">[OPERATOR_TO_FILL]</td>
              <td className="px-3 py-2">[OPERATOR_TO_FILL]</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-semibold">Sensitivity</td>
              <td className="px-3 py-2">[OPERATOR_TO_FILL]</td>
              <td className="px-3 py-2">[OPERATOR_TO_FILL]</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-semibold">Buyer credibility</td>
              <td className="px-3 py-2">[OPERATOR_TO_FILL]</td>
              <td className="px-3 py-2">[OPERATOR_TO_FILL]</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-semibold">Best for</td>
              <td className="px-3 py-2">[OPERATOR_TO_FILL]</td>
              <td className="px-3 py-2">[OPERATOR_TO_FILL]</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-6 leading-relaxed text-gray-700">
        Run both methods on your own numbers below — our valuation calculator
        outputs the revenue multiple, EBITDA multiple, and 5-year DCF
        side-by-side.
      </p>

      <ComparisonEmbed slug="business-valuation-calculator" />

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">
        When DCF wins
      </h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        [OPERATOR_TO_FILL — ~300 words. Larger businesses with predictable
        cash flow, asset-heavy operations, recurring-revenue SaaS where you
        can defend a 5-year forecast, regulated industries with stable
        margins. Cite that DCF makes you justify your assumptions —
        sophisticated buyers respect that.]
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">
        When multiples win
      </h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        [OPERATOR_TO_FILL — ~300 words. Sub-$5M deals, owner-operated
        businesses (where seller&apos;s discretionary earnings matters more
        than EBITDA), industries with active deal flow giving good comps,
        anything where the forecast is genuinely speculative. Cite that
        multiples are what brokers actually use in 95% of sub-$2M sales.]
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">
        How to use both — the triangulation method
      </h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        [OPERATOR_TO_FILL — ~400 words. Step 1: compute revenue × multiple
        for the top of the range. Step 2: compute EBITDA × multiple for the
        middle. Step 3: compute DCF for the bottom (DCF tends to be
        conservative for small businesses because terminal value gets
        discounted heavily). Step 4: present the resulting range to buyers
        with a one-page sensitivity table. Example: $1.2M – $1.6M – $1.9M.
        Note that brokers don&apos;t list a single number, they list a range,
        and DCF + multiples together give you a defensible range.]
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">
        Common mistakes
      </h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        [OPERATOR_TO_FILL — ~250 words. Mistake 1: using public-company
        multiples for a private SME (haircut by 30–40%). Mistake 2: forecasting
        20% growth forever in your DCF (terminal value dominates). Mistake 3:
        ignoring owner add-backs in EBITDA. Mistake 4: not segmenting by
        customer concentration — buyers discount heavily for single-customer
        dependence.]
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">
        Related guides
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-gray-700">
        <li>
          <Link
            href="/blog/how-to-value-a-business-to-sell"
            className="text-brand-primary hover:underline"
          >
            How to value a business to sell: a 2026 owner&apos;s guide
          </Link>
        </li>
        <li>
          <Link
            href="/blog/ebitda-vs-net-profit"
            className="text-brand-primary hover:underline"
          >
            EBITDA vs net profit: which number actually matters?
          </Link>
        </li>
        <li>
          <Link
            href="/compare/best-profit-margin-calculators-2026"
            className="text-brand-primary hover:underline"
          >
            The 7 best profit margin calculators of 2026
          </Link>
        </li>
      </ul>
    </>
  );
}
