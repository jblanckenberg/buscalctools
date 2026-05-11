import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead text-lg leading-relaxed text-gray-700">
        Marketing ROI looks like simple division: revenue divided by
        spend. It isn&apos;t — and the gap between the simple version
        and the accurate version is where most marketing budgets get
        wasted. Here&apos;s how to calculate marketing ROI the way it
        should be done.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The naive formula (don&apos;t use this alone)</h2>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-brand-light p-4 text-sm font-mono">
{`Naive ROI = Revenue from campaign / Cost of campaign

$50,000 revenue from $10,000 spend = 5× ROI`}
      </pre>
      <p className="mt-3 leading-relaxed text-gray-700">
        Three problems: revenue isn&apos;t profit, attribution may be
        wrong, and you haven&apos;t counted incremental sales.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The accurate formula</h2>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-brand-light p-4 text-sm font-mono">
{`True Marketing ROI = (Incremental gross profit − Marketing cost) / Marketing cost × 100

Where:
  Incremental = sales that wouldn't have happened without the campaign
  Gross profit = revenue minus COGS (not revenue alone)
  Marketing cost = ad spend + agency fees + creative + tools`}
      </pre>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Why use gross profit, not revenue</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        A $50 sale at 40% gross margin only generates $20 of profit. If
        marketing cost was $10 per acquired customer, the naive ROI is
        5× ($50/$10) — but the real ROI is just 1× because only $20
        of that revenue is yours. Always use gross profit, not revenue.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The incrementality problem</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Most attribution tools (Google Ads, Facebook, etc.) claim credit
        for sales they didn&apos;t cause. A customer searches your brand
        name on Google because they saw a billboard, clicks a paid ad,
        and converts — Google Ads attributes 100% of that sale to the
        click. In reality the billboard caused the search.
      </p>
      <p className="mt-3 leading-relaxed text-gray-700">
        The gold standard test: <strong>run a holdout</strong>. Turn off
        the campaign in 20% of geographies (or for 20% of audience) for
        4–8 weeks. Compare sales in the test vs control. The difference
        is the true incremental revenue.
      </p>

      <h2 className="mt-10 text-2xl function-bold text-brand-dark">A worked example: Facebook Ads campaign</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">Ad spend</td><td className="px-4 py-2 text-right font-mono">$8,000</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">Creative + agency fees</td><td className="px-4 py-2 text-right font-mono">$2,000</td></tr>
            <tr className="border-b border-gray-200 bg-brand-light"><td className="px-4 py-2 font-semibold">Total marketing cost</td><td className="px-4 py-2 text-right font-mono font-semibold">$10,000</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">Attributed revenue (Facebook)</td><td className="px-4 py-2 text-right font-mono">$60,000</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">Holdout test says ~70% incremental</td><td className="px-4 py-2 text-right font-mono">$42,000</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">× Gross margin 40%</td><td className="px-4 py-2 text-right font-mono">$16,800</td></tr>
            <tr className="border-b border-gray-200 bg-brand-light"><td className="px-4 py-2 font-semibold">True incremental gross profit</td><td className="px-4 py-2 text-right font-mono font-semibold">$16,800</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">− Marketing cost</td><td className="px-4 py-2 text-right font-mono">$10,000</td></tr>
            <tr className="bg-brand-light"><td className="px-4 py-2 font-semibold">Net contribution</td><td className="px-4 py-2 text-right font-mono font-semibold">$6,800 (68% ROI)</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 leading-relaxed text-gray-700">
        Facebook reported 6× ROAS ($60k/$10k). True ROI was 68% — still
        positive, still worth doing, but a much more sober number.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Customer LTV vs first-order ROI</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        For businesses with repeat purchases or subscriptions, first-order
        ROI alone can mislead you the other way. A subscription business
        that loses $5 acquiring each customer at first order but makes
        $200/year for 3 years has a fantastic LTV-ROI even though
        first-order ROI is negative.
      </p>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-brand-light p-4 text-sm font-mono">
{`LTV-ROI = (Lifetime gross profit per customer − CAC) / CAC × 100

Where CAC = Customer Acquisition Cost (marketing cost ÷ new customers)`}
      </pre>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Time-adjusting ROI</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        A campaign that returns 30% in 3 months is annualised at over 200%
        — far better than a 30%-over-2-years campaign. Compare campaigns
        on annualised ROI when the time horizons differ.
      </p>
      <p className="mt-3 leading-relaxed text-gray-700">
        Use the{" "}
        <Link href="/roi-calculator" className="text-brand-primary underline">
          ROI Calculator
        </Link>{" "}
        — entering an investment period in months produces the annualised
        figure automatically.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Benchmarks</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Email marketing:</strong> often 30–40× ROI (very cheap, high engagement)</li>
        <li><strong>SEO (steady state):</strong> 5–10× ROI but with 6–12 month lag</li>
        <li><strong>Paid search:</strong> 2–5× ROAS typical, 1.5–3× after gross-margin adjustment</li>
        <li><strong>Paid social:</strong> 1.5–4× ROAS, often 0.5–2× true ROI after incrementality</li>
        <li><strong>Brand / out-of-home:</strong> not directly measurable; budget as a percentage of revenue</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Where most teams go wrong</h2>
      <ol className="mt-3 ml-6 list-decimal space-y-2 text-gray-700">
        <li><strong>Reporting ROAS as ROI.</strong> ROAS uses revenue; ROI should use profit.</li>
        <li><strong>No holdout test.</strong> Attribution platforms over-report by 30–70%.</li>
        <li><strong>Ignoring brand traffic.</strong> Paid ads on your own brand name often steal credit from organic traffic.</li>
        <li><strong>Counting one-off costs only.</strong> Forget creative production, agency retainer, tools.</li>
        <li><strong>Optimising on last-click.</strong> Last-click attribution favours bottom-of-funnel ads but starves top-of-funnel that fed the funnel.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Bottom line</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>True marketing ROI uses gross profit, not revenue; incremental sales, not attributed.</li>
        <li>Holdout tests are the gold standard for measuring incrementality.</li>
        <li>For repeat-purchase businesses, track LTV-ROI not just first-order.</li>
        <li>Annualised ROI lets you compare campaigns of different durations.</li>
      </ul>
    </>
  );
}
