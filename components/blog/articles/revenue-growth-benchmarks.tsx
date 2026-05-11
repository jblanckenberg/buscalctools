import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead text-lg leading-relaxed text-gray-700">
        &ldquo;Are we growing fast enough?&rdquo; depends entirely on
        your stage, industry, and how you measure. A 25% YoY rate is
        impressive for a 10-year-old retailer, alarming for an 18-month
        SaaS startup. This guide gives you the benchmarks and the
        right metrics for each stage.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Benchmarks by company stage</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-brand-light">
            <tr className="text-left"><th className="px-4 py-2">Stage</th><th className="px-4 py-2">Typical revenue</th><th className="px-4 py-2">Expected growth</th></tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Pre-seed / Seed (year 1)</td><td className="px-4 py-2">$0–$500k</td><td className="px-4 py-2">15–25% MoM (T2D3 path)</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Series A (year 2–3)</td><td className="px-4 py-2">$1M–$5M ARR</td><td className="px-4 py-2">100–300% YoY</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Series B (year 3–5)</td><td className="px-4 py-2">$5M–$20M ARR</td><td className="px-4 py-2">100–200% YoY</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Growth stage</td><td className="px-4 py-2">$20M–$100M</td><td className="px-4 py-2">50–100% YoY</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Established SME (any industry)</td><td className="px-4 py-2">$1M–$50M</td><td className="px-4 py-2">10–20% YoY</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Mature business</td><td className="px-4 py-2">$50M+</td><td className="px-4 py-2">5–10% YoY</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Public company average</td><td className="px-4 py-2">$1B+</td><td className="px-4 py-2">5–7% YoY</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The T2D3 rule (for SaaS)</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        A widely-used target path for venture-backed SaaS:
        <strong>Triple, Triple, Double, Double, Double</strong>. From
        $1M to $2M to $6M to $18M to $36M to $72M ARR. Hitting all
        five years is rare but distinguishes elite SaaS companies. The
        bar to be &ldquo;top quartile&rdquo; is roughly half of
        T2D3.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">By industry — small business norms</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-brand-light">
            <tr className="text-left"><th className="px-4 py-2">Industry</th><th className="px-4 py-2">Healthy YoY growth</th></tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Software / SaaS (sub-$10M)</td><td className="px-4 py-2">50%+</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Ecommerce</td><td className="px-4 py-2">15–30%</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Professional services</td><td className="px-4 py-2">10–20%</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Manufacturing</td><td className="px-4 py-2">5–15%</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Retail (physical)</td><td className="px-4 py-2">3–10%</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Restaurants</td><td className="px-4 py-2">5–8%</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Construction</td><td className="px-4 py-2">5–15%</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">CAGR — when to use it</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        CAGR (Compound Annual Growth Rate) smooths multi-year volatility
        into a single annualised number. Use it for:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-1 text-gray-700">
        <li>Comparing performance across periods of different lengths</li>
        <li>Long-horizon historical analysis (5–10 year view)</li>
        <li>Setting growth targets for plans &gt; 3 years</li>
      </ul>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-brand-light p-4 text-sm font-mono">
{`CAGR = (Ending Value / Starting Value)^(1/Years) − 1

Example: $100k → $250k over 4 years
  CAGR = (2.5)^0.25 − 1 = 25.7%`}
      </pre>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The Rule of 40 (SaaS)</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        SaaS-specific benchmark: <strong>Revenue Growth Rate + Profit
        Margin ≥ 40%</strong>. A SaaS company growing 60% YoY can run
        at −20% margin and still pass. A company growing 10% YoY needs
        to be at 30% margin. Below Rule of 40, investors typically
        write you off.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Negative growth — what to do</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Revenue declining vs prior period is a signal that requires
        diagnosis, not panic. Categorise the cause:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Customer churn.</strong> Existing customers leaving faster than acquired. Fix retention before growth.</li>
        <li><strong>Pricing decline.</strong> Average revenue per customer falling. Are you discounting more or losing premium customers?</li>
        <li><strong>Market shrinkage.</strong> Your category itself is declining (e.g., DVD rental, print media). Pivot or accept decline.</li>
        <li><strong>Competitive loss.</strong> New entrants taking share. Differentiate or out-execute.</li>
        <li><strong>One-off shock.</strong> Lost big customer, regulatory change. Plan recovery.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Growth quality matters</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Two companies both growing 30% YoY can have very different
        quality:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Good growth:</strong> driven by existing customer expansion + new customer acquisition; gross margin stable; net retention &gt; 100%.</li>
        <li><strong>Bad growth:</strong> driven entirely by new customer acquisition while existing customers churn; gross margin falling; net retention &lt; 100%.</li>
      </ul>
      <p className="mt-3 leading-relaxed text-gray-700">
        Bad growth is a treadmill — you spend more on acquisition each
        period to keep growing. Investors and buyers see through it.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Track yours</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Use the{" "}
        <Link href="/revenue-growth-calculator" className="text-brand-primary underline">
          Revenue Growth Rate Calculator
        </Link>{" "}
        for period-over-period and CAGR. Combine with the{" "}
        <Link href="/business-valuation-calculator" className="text-brand-primary underline">
          Business Valuation Calculator
        </Link>{" "}
        to see how growth rates translate into valuation multiples.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Bottom line</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>Healthy growth depends on stage and industry — no universal benchmark.</li>
        <li>Early-stage SaaS: target 100%+ YoY; established SME: 10–20%.</li>
        <li>CAGR over multi-year horizons; YoY for current performance.</li>
        <li>Growth quality (retention, gross margin, net retention) matters more than headline rate.</li>
      </ul>
    </>
  );
}
