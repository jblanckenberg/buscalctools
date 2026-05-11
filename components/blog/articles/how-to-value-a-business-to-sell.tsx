import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead text-lg leading-relaxed text-gray-700">
        Most small business owners value their business based on what
        they hope to retire on. Buyers value it on what it&apos;ll earn
        them. The gap between those two numbers is where 80% of small
        business sales fall apart. Here&apos;s how to value your
        business the way buyers actually will.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The three valuation methods buyers use</h2>
      <ol className="mt-3 ml-6 list-decimal space-y-3 text-gray-700">
        <li>
          <strong>EBITDA multiple.</strong> The most common method for
          profitable small businesses. Value = EBITDA × industry
          multiple (typically 3–7×).
        </li>
        <li>
          <strong>Revenue multiple.</strong> Used for high-growth or
          pre-profit businesses (SaaS, content sites). Value = Revenue
          × multiple (typically 0.5–8× depending on industry).
        </li>
        <li>
          <strong>Discounted cash flow (DCF).</strong> Project 5–10
          years of cash flows, discount back to present value, add a
          terminal value. Rigorous but assumption-heavy.
        </li>
      </ol>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Typical multiples by industry</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-brand-light">
            <tr className="text-left"><th className="px-4 py-2">Industry</th><th className="px-4 py-2">Revenue multiple</th><th className="px-4 py-2">EBITDA multiple</th></tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">SaaS (recurring)</td><td className="px-4 py-2">3–8×</td><td className="px-4 py-2">10–20×</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Professional services</td><td className="px-4 py-2">0.8–1.5×</td><td className="px-4 py-2">3–5×</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Manufacturing</td><td className="px-4 py-2">0.5–1.2×</td><td className="px-4 py-2">4–6×</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Retail (independent)</td><td className="px-4 py-2">0.3–0.8×</td><td className="px-4 py-2">2–4×</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Restaurants</td><td className="px-4 py-2">0.3–0.5×</td><td className="px-4 py-2">2–3×</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Ecommerce</td><td className="px-4 py-2">1–3×</td><td className="px-4 py-2">3–5×</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Content / media sites</td><td className="px-4 py-2">2–5×</td><td className="px-4 py-2">30–42× monthly net profit (Flippa)</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">What makes a business worth more</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Recurring revenue.</strong> Subscription / contracted income commands 50–100% premium over project-based.</li>
        <li><strong>Customer concentration &lt; 20% from any single client.</strong> One client = 40% of revenue is a huge discount factor.</li>
        <li><strong>Documented systems and processes.</strong> The business runs without you. Buyers pay for this.</li>
        <li><strong>Owner-replaceable management.</strong> Multiplier on its own — a business where the owner is the brand sells for 30–50% less.</li>
        <li><strong>Clean financials.</strong> 3+ years of accountant-prepared statements. Bookkeeping mess kills deals.</li>
        <li><strong>Growth trajectory.</strong> Revenue growing &gt; 15%/year commands premium multiples.</li>
        <li><strong>Defensibility.</strong> Brand, contracts, IP, geographic exclusivity — moats raise multiples.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">What knocks value down</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>Owner is the business (sales relationships, technical work)</li>
        <li>Customer concentration above 30%</li>
        <li>Revenue declining or flat for 2+ years</li>
        <li>Heavy capex requirements ahead (worn equipment, lease ending)</li>
        <li>Pending legal or tax issues</li>
        <li>Bookkeeping not on accrual basis or no clear financials</li>
        <li>Industry headwinds (declining sector)</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">A worked example</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        A 7-year-old digital marketing agency with $1.2M revenue, $180k
        EBITDA, 6 staff, three clients = 50% of revenue, founder
        handles all sales.
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>EBITDA multiple (services baseline 4×): $720k</li>
        <li>Customer concentration discount: −15% → $612k</li>
        <li>Owner-dependence discount: −20% → $490k</li>
        <li>Revenue multiple sanity check (1× rev): $1.2M (high — buyers pay for income, not top line)</li>
        <li><strong>Realistic asking range: $500k–$650k.</strong></li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Steps to raise your value before selling</h2>
      <ol className="mt-3 ml-6 list-decimal space-y-2 text-gray-700">
        <li><strong>12–24 months before sale:</strong> reduce owner involvement. Hire a manager, document SOPs, transfer customer relationships to staff.</li>
        <li><strong>12 months before:</strong> clean up financials. Move to accrual accounting if not already; get statements reviewed by a CPA.</li>
        <li><strong>6–12 months before:</strong> diversify customers. If one client is 40% of revenue, target landing 2–3 new clients to spread risk.</li>
        <li><strong>6 months before:</strong> get a formal valuation from a business broker. Use it as the floor for your asking price.</li>
        <li><strong>3 months before:</strong> prepare the &ldquo;CIM&rdquo; (Confidential Information Memorandum) — the deck buyers will review.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Add-backs: legitimate vs aggressive</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Sellers often inflate EBITDA with &ldquo;add-backs&rdquo; — expenses
        the new owner won&apos;t have. Buyers scrutinise these heavily.
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Legitimate:</strong> owner&apos;s above-market salary (excess only), one-off legal fees, owner&apos;s personal car run through business.</li>
        <li><strong>Aggressive:</strong> &ldquo;potential&rdquo; future cost cuts, marketing the buyer &ldquo;won&apos;t need&rdquo;, family member salaries the buyer might keep.</li>
      </ul>
      <p className="mt-3 leading-relaxed text-gray-700">
        Buyers typically accept 50–70% of seller-claimed add-backs.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Calculate your range</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Use the{" "}
        <Link href="/business-valuation-calculator" className="text-brand-primary underline">
          Business Valuation Calculator
        </Link>{" "}
        — it runs revenue-multiple, EBITDA-multiple, and DCF
        side-by-side to produce a defensible range, not a single
        number. Buyers expect to negotiate within a range.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Bottom line</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>Most small businesses sell at 3–5× EBITDA.</li>
        <li>Recurring revenue, low customer concentration, and owner independence are the three biggest value drivers.</li>
        <li>Start preparing 18–24 months before selling — the work to raise multiples is operational, not financial.</li>
        <li>Always quote a range, not a single number.</li>
      </ul>
    </>
  );
}
