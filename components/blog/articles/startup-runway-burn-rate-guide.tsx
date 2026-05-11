import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead text-lg leading-relaxed text-gray-700">
        Two numbers every founder should know without looking — current
        net burn rate, and current runway in months. If you can&apos;t
        answer both in under 5 seconds, you don&apos;t know your
        business. This guide is the short version of what every founder
        eventually learns, ideally before the cash runs out.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Burn rate and runway — the formulas</h2>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-brand-light p-4 text-sm font-mono">
{`Gross Burn = Total monthly expenses
Net Burn   = Monthly expenses − Monthly revenue
Runway     = Current cash balance / Net Burn

If Net Burn ≤ 0, you're cash-flow positive → runway is infinite.`}
      </pre>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The runway brackets investors use</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-brand-light">
            <tr className="text-left"><th className="px-4 py-2">Runway</th><th className="px-4 py-2">Status</th><th className="px-4 py-2">Action</th></tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">18+ months</td><td className="px-4 py-2 text-brand-accent font-semibold">Comfortable</td><td className="px-4 py-2">Focus on execution. Don&apos;t fundraise yet.</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">12–18 months</td><td className="px-4 py-2">Healthy</td><td className="px-4 py-2">Plan next raise. Soft conversations with investors.</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">9–12 months</td><td className="px-4 py-2 text-brand-warning font-semibold">Active</td><td className="px-4 py-2">Start fundraising now. Process takes 3–6 months.</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">6–9 months</td><td className="px-4 py-2 text-brand-danger font-semibold">Tight</td><td className="px-4 py-2">Bridge round or aggressive cost cuts.</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">&lt; 6 months</td><td className="px-4 py-2 text-brand-danger font-semibold">Critical</td><td className="px-4 py-2">Drastic action: layoffs, pivot, asset sale.</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Why &ldquo;start fundraising at 12 months&rdquo;</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Fundraising takes 3–6 months from first call to wired funds.
        Starting at 12 months leaves you 6–9 months of cushion when the
        new money arrives. Starting at 6 months means you&apos;re
        fundraising from a position of weakness — investors smell
        desperation and price the round accordingly (lower valuation,
        worse terms).
      </p>

      <h2 className="mt-10 text-2xl function-bold text-brand-dark">The seven ways to extend runway</h2>

      <h3 className="mt-6 text-lg font-semibold text-brand-dark">1. Cut non-essential spend now</h3>
      <p className="mt-2 leading-relaxed text-gray-700">
        Most early-stage startups have 10–20% of spend going to things
        nobody would miss — unused SaaS subscriptions, premium tiers
        nobody uses, agency retainers without clear ROI. Audit
        ruthlessly. Cancel everything that isn&apos;t producing
        revenue or essential to product/team.
      </p>

      <h3 className="mt-6 text-lg font-semibold text-brand-dark">2. Pause hiring (or reverse)</h3>
      <p className="mt-2 leading-relaxed text-gray-700">
        Salaries are 60–80% of most startup budgets. Hiring freezes save
        future cost; layoffs save immediate cost. Layoffs are painful
        and damage morale — only do them when needed.
      </p>

      <h3 className="mt-6 text-lg font-semibold text-brand-dark">3. Convert recurring to annual prepay</h3>
      <p className="mt-2 leading-relaxed text-gray-700">
        Offer SaaS customers 15–20% discount for annual upfront payment.
        Brings forward cash that would otherwise come monthly. Cheap
        cost compared to alternative financing.
      </p>

      <h3 className="mt-6 text-lg font-semibold text-brand-dark">4. Accelerate collection of receivables</h3>
      <p className="mt-2 leading-relaxed text-gray-700">
        Move customers to net-7 or net-15 if currently net-30. Offer
        early-payment discounts. Chase aging invoices aggressively.
      </p>

      <h3 className="mt-6 text-lg font-semibold text-brand-dark">5. Stretch payables</h3>
      <p className="mt-2 leading-relaxed text-gray-700">
        Negotiate longer payment terms with suppliers. Many will move
        from net-30 to net-60 if asked, especially after a few months
        of clean payment history.
      </p>

      <h3 className="mt-6 text-lg font-semibold text-brand-dark">6. Sell or sublease underused assets</h3>
      <p className="mt-2 leading-relaxed text-gray-700">
        Lab equipment, surplus office space, surplus inventory. Anything
        that isn&apos;t producing returns should be liquid.
      </p>

      <h3 className="mt-6 text-lg font-semibold text-brand-dark">7. Bridge financing</h3>
      <p className="mt-2 leading-relaxed text-gray-700">
        Convertible notes from existing investors, revenue-based
        financing, or a small venture debt facility. Last resort, but
        often available to startups with traction.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">A scenario: extending from 9 to 18 months</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Startup has $450k cash, $50k/month net burn, 9 months runway. Steps:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-1 text-gray-700">
        <li>Cut SaaS, agencies, perks: save $5k/mo → new burn $45k</li>
        <li>Pause one of two open hires: save $7k/mo → $38k</li>
        <li>Annual prepay campaign: pulls forward $80k → cash now $530k</li>
        <li>Negotiate supplier terms: save $3k/mo → $35k</li>
      </ul>
      <p className="mt-3 leading-relaxed text-gray-700">
        New runway: $530k / $35k = <strong>15 months</strong>. Still
        not 18, but enough buffer to fundraise.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Calculate yours weekly</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Use the{" "}
        <Link href="/burn-rate-calculator" className="text-brand-primary underline">
          Burn Rate Calculator
        </Link>{" "}
        and update the numbers every Monday morning. For monthly cash
        flow projections that show exactly which month you&apos;d run
        out, use the{" "}
        <Link href="/cash-flow-calculator" className="text-brand-primary underline">
          Cash Flow Calculator
        </Link>
        .
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Bottom line</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>Runway = cash ÷ net burn. Know both numbers without looking.</li>
        <li>Start fundraising at 12 months runway, not less.</li>
        <li>Cut spend before raising more money — investors notice.</li>
        <li>Stacked tactics (cuts + prepay + payables stretch) easily extend runway 30–50%.</li>
      </ul>
    </>
  );
}
