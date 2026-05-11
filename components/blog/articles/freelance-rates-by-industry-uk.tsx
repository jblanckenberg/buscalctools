import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead text-lg leading-relaxed text-gray-700">
        Day and hourly rate benchmarks for UK freelancers across the
        most-asked-about industries. Numbers compiled from public
        salary surveys, agency rate cards, and freelance platform data
        for 2025–2026. Real ranges, not aspirational averages.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">How to read these numbers</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Three tiers per discipline:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-1 text-gray-700">
        <li><strong>Junior</strong> — 1–3 years experience, generalist or limited portfolio</li>
        <li><strong>Mid</strong> — 4–8 years, specialised, agency or in-house background</li>
        <li><strong>Senior</strong> — 9+ years, in-demand specialist with case studies or recognised name</li>
      </ul>
      <p className="mt-3 leading-relaxed text-gray-700">
        Rates assume you&apos;re Inside-IR35 ineligible / contracting via
        your own limited company. Inside IR35 rates are typically 15–25%
        lower because of the umbrella company / PAYE deduction.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Software development</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-brand-light">
            <tr className="text-left"><th className="px-4 py-2">Role</th><th className="px-4 py-2">Junior</th><th className="px-4 py-2">Mid</th><th className="px-4 py-2">Senior</th></tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Frontend developer</td><td className="px-4 py-2">£250–£350</td><td className="px-4 py-2">£400–£550</td><td className="px-4 py-2">£600–£800</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Backend developer</td><td className="px-4 py-2">£300–£400</td><td className="px-4 py-2">£450–£600</td><td className="px-4 py-2">£650–£900</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">DevOps / SRE</td><td className="px-4 py-2">£350–£450</td><td className="px-4 py-2">£500–£700</td><td className="px-4 py-2">£800–£1,200</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Data engineer</td><td className="px-4 py-2">£350–£450</td><td className="px-4 py-2">£500–£700</td><td className="px-4 py-2">£800–£1,100</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Mobile (iOS / Android)</td><td className="px-4 py-2">£300–£400</td><td className="px-4 py-2">£450–£600</td><td className="px-4 py-2">£700–£900</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-gray-600">All figures = day rate £/day. Hourly ≈ day rate ÷ 7–8.</p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Design</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-brand-light">
            <tr className="text-left"><th className="px-4 py-2">Role</th><th className="px-4 py-2">Junior</th><th className="px-4 py-2">Mid</th><th className="px-4 py-2">Senior</th></tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">UX/UI designer</td><td className="px-4 py-2">£250–£350</td><td className="px-4 py-2">£400–£550</td><td className="px-4 py-2">£600–£900</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Brand / graphic designer</td><td className="px-4 py-2">£200–£300</td><td className="px-4 py-2">£350–£500</td><td className="px-4 py-2">£550–£800</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Product designer (digital)</td><td className="px-4 py-2">£300–£400</td><td className="px-4 py-2">£450–£650</td><td className="px-4 py-2">£700–£1,000</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Motion designer</td><td className="px-4 py-2">£250–£350</td><td className="px-4 py-2">£400–£600</td><td className="px-4 py-2">£650–£900</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Marketing &amp; content</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-brand-light">
            <tr className="text-left"><th className="px-4 py-2">Role</th><th className="px-4 py-2">Junior</th><th className="px-4 py-2">Mid</th><th className="px-4 py-2">Senior</th></tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">SEO specialist</td><td className="px-4 py-2">£250–£350</td><td className="px-4 py-2">£400–£600</td><td className="px-4 py-2">£700–£1,000</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Performance / PPC</td><td className="px-4 py-2">£250–£350</td><td className="px-4 py-2">£400–£550</td><td className="px-4 py-2">£650–£900</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Copywriter</td><td className="px-4 py-2">£200–£300</td><td className="px-4 py-2">£350–£500</td><td className="px-4 py-2">£600–£900</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Content strategist</td><td className="px-4 py-2">£300–£400</td><td className="px-4 py-2">£450–£600</td><td className="px-4 py-2">£700–£1,000</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Email marketer</td><td className="px-4 py-2">£250–£350</td><td className="px-4 py-2">£400–£550</td><td className="px-4 py-2">£600–£800</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Consulting &amp; strategy</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-brand-light">
            <tr className="text-left"><th className="px-4 py-2">Role</th><th className="px-4 py-2">Junior</th><th className="px-4 py-2">Mid</th><th className="px-4 py-2">Senior</th></tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Management consultant</td><td className="px-4 py-2">£400–£600</td><td className="px-4 py-2">£700–£1,000</td><td className="px-4 py-2">£1,200–£2,500</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Business analyst</td><td className="px-4 py-2">£350–£450</td><td className="px-4 py-2">£500–£700</td><td className="px-4 py-2">£800–£1,200</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Product manager (interim)</td><td className="px-4 py-2">£400–£500</td><td className="px-4 py-2">£600–£800</td><td className="px-4 py-2">£900–£1,400</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Project manager</td><td className="px-4 py-2">£350–£450</td><td className="px-4 py-2">£500–£700</td><td className="px-4 py-2">£800–£1,200</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Finance &amp; legal</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-brand-light">
            <tr className="text-left"><th className="px-4 py-2">Role</th><th className="px-4 py-2">Junior</th><th className="px-4 py-2">Mid</th><th className="px-4 py-2">Senior</th></tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Interim CFO / finance director</td><td className="px-4 py-2">—</td><td className="px-4 py-2">£800–£1,200</td><td className="px-4 py-2">£1,500–£2,500</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Management accountant</td><td className="px-4 py-2">£300–£400</td><td className="px-4 py-2">£450–£600</td><td className="px-4 py-2">£700–£1,000</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Bookkeeper</td><td className="px-4 py-2">£25–£35/hr</td><td className="px-4 py-2">£40–£55/hr</td><td className="px-4 py-2">£60–£80/hr</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Solicitor (commercial)</td><td className="px-4 py-2">—</td><td className="px-4 py-2">£200–£350/hr</td><td className="px-4 py-2">£400–£700/hr</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">How to position above the range</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Visible specialist niche.</strong> &ldquo;React developer&rdquo; sits in the range; &ldquo;React/Three.js performance specialist&rdquo; sits above it.</li>
        <li><strong>Quantified case studies.</strong> &ldquo;Reduced page load 60% on a 500-page enterprise site&rdquo; is worth a 30% rate premium over &ldquo;built fast websites&rdquo;.</li>
        <li><strong>Stakeholder access.</strong> Working with C-suite directly commands higher rates than working through middle management.</li>
        <li><strong>Distribution channels.</strong> Inbound from LinkedIn / newsletter / podcast appearances commands 30–50% over inbound from job boards.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Calculate your own</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Use the{" "}
        <Link href="/freelance-rate-calculator" className="text-brand-primary underline">
          Freelance Rate Calculator
        </Link>{" "}
        — set region to UK to get tax-buffer notes appropriate for Class
        2/4 NI and income tax.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Bottom line</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>Senior UK rates start around £600–£700/day in most disciplines.</li>
        <li>Specialised seniors in dev, finance, and consulting can clear £1,000+/day.</li>
        <li>Inside IR35 erodes 15–25% from the headline rate.</li>
        <li>Position with quantified niches and direct stakeholder access to break above-range.</li>
      </ul>
    </>
  );
}
