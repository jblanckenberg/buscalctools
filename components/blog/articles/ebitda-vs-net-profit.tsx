import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead text-lg leading-relaxed text-gray-700">
        Two profit numbers that often differ by 30–50%. EBITDA is the
        favourite of buyers, investors, and bankers. Net profit is the
        favourite of owners and tax authorities. Knowing which one
        matters in which conversation can change a deal by hundreds of
        thousands of dollars.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">What EBITDA stands for</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        <strong>E</strong>arnings <strong>B</strong>efore{" "}
        <strong>I</strong>nterest, <strong>T</strong>ax,{" "}
        <strong>D</strong>epreciation and <strong>A</strong>mortisation.
        It&apos;s net profit with four items added back. Each addback
        exists for a reason — together they describe how operationally
        profitable the business is, independent of how it&apos;s
        financed, where it operates, and what assets it owns.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The four addbacks explained</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Interest.</strong> Different businesses fund themselves differently — debt vs equity. Adding interest back makes a leveraged business comparable to a debt-free one.</li>
        <li><strong>Tax.</strong> Tax rates differ across jurisdictions (21% US corporate, 25% UK, 27% SA). Stripping tax compares operational profit before any geography effect.</li>
        <li><strong>Depreciation.</strong> A non-cash charge that spreads the cost of physical assets over their life. The cash already went out years ago when the asset was bought.</li>
        <li><strong>Amortisation.</strong> Same idea for intangible assets (goodwill, software, IP). Non-cash, historical.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">A worked example</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        A manufacturer&apos;s income statement:
      </p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">Revenue</td><td className="px-4 py-2 text-right font-mono">$2,000,000</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">Operating Profit (EBIT)</td><td className="px-4 py-2 text-right font-mono">$300,000</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">+ Depreciation</td><td className="px-4 py-2 text-right font-mono">$80,000</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">+ Amortisation</td><td className="px-4 py-2 text-right font-mono">$20,000</td></tr>
            <tr className="border-b border-gray-200 bg-brand-light"><td className="px-4 py-2 font-semibold">EBITDA</td><td className="px-4 py-2 text-right font-mono font-semibold">$400,000</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">− Interest</td><td className="px-4 py-2 text-right font-mono">$30,000</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">− Tax (21%)</td><td className="px-4 py-2 text-right font-mono">$56,700</td></tr>
            <tr className="bg-brand-light"><td className="px-4 py-2 font-semibold">Net profit</td><td className="px-4 py-2 text-right font-mono font-semibold">$213,300</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 leading-relaxed text-gray-700">
        Same business: $400k EBITDA, $213k net profit. A buyer might value
        this at 5× EBITDA ($2M) or 9× net profit ($1.9M) — similar
        valuations but different conversations.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Where EBITDA matters most</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Selling your business.</strong> Almost all SME transactions are quoted as a multiple of EBITDA (3–7× typical).</li>
        <li><strong>Comparing businesses across industries or geographies.</strong> Strips out tax and financing structure.</li>
        <li><strong>Lender debt-service coverage ratios.</strong> Banks use EBITDA-to-debt-service as a primary loan covenant.</li>
        <li><strong>Private equity returns.</strong> Returns are usually expressed as EBITDA growth multiples.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Where EBITDA misleads</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Capital-intensive businesses.</strong> Depreciation isn&apos;t fake — those trucks/machines/buildings genuinely wear out and need replacing. EBITDA flatters businesses that need constant capex.</li>
        <li><strong>Highly leveraged businesses.</strong> Stripping interest hides the real burden of debt. Two businesses with the same EBITDA can have wildly different net profit if one has 5× the debt.</li>
        <li><strong>Tech with heavy stock-based comp.</strong> &ldquo;Adjusted EBITDA&rdquo; sometimes strips out share-based payments that are real economic costs.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">When net profit is the right number</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Tax filings.</strong> Tax is paid on taxable income, not EBITDA.</li>
        <li><strong>Distributions to owners.</strong> You can only distribute what&apos;s left after tax — net profit.</li>
        <li><strong>Personal income for sole traders.</strong> Net profit IS your income, broadly.</li>
        <li><strong>Long-term sustainability check.</strong> If net profit is negative for years, the business isn&apos;t viable regardless of EBITDA.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Calculate both</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Use the{" "}
        <Link href="/net-profit-calculator" className="text-brand-primary underline">
          Net Profit Calculator
        </Link>{" "}
        for the full waterfall down to net. To estimate sale price using
        EBITDA multiples, use the{" "}
        <Link href="/business-valuation-calculator" className="text-brand-primary underline">
          Business Valuation Calculator
        </Link>
        , which runs EBITDA-multiple, revenue-multiple, and DCF
        side-by-side.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Bottom line</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>EBITDA = net profit + interest + tax + depreciation + amortisation.</li>
        <li>Used for valuation, lending, and cross-comparison.</li>
        <li>Net profit is the real bottom line for tax and distributions.</li>
        <li>EBITDA flatters capital-intensive and leveraged businesses — always check what&apos;s being added back.</li>
      </ul>
    </>
  );
}
