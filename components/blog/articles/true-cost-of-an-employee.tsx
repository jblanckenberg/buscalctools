import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead text-lg leading-relaxed text-gray-700">
        Hire an employee on $60,000 salary, and you&apos;ll pay closer
        to $80,000 by the time the year is out. The 30–45% premium on
        top of salary is non-negotiable and often surprises first-time
        employers. This is the full breakdown of what an employee
        actually costs.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The six cost layers</h2>
      <ol className="mt-3 ml-6 list-decimal space-y-2 text-gray-700">
        <li>Gross salary (the offer letter number)</li>
        <li>Employer payroll taxes</li>
        <li>Mandatory pension / retirement contributions</li>
        <li>Benefits (health insurance, perks)</li>
        <li>Equipment, software, training</li>
        <li>Office space and overhead allocation</li>
      </ol>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Employer payroll tax by region</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-brand-light">
            <tr className="text-left"><th className="px-4 py-2">Region</th><th className="px-4 py-2">Rate</th><th className="px-4 py-2">Components</th></tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200"><td className="px-4 py-2 font-medium">USA</td><td className="px-4 py-2">~11%</td><td className="px-4 py-2">FICA 7.65% (SS + Medicare) + FUTA 0.6% + SUTA ~2.7%</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2 font-medium">UK</td><td className="px-4 py-2">13.8%</td><td className="px-4 py-2">Employer NIC on earnings above secondary threshold</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2 font-medium">South Africa</td><td className="px-4 py-2">~2%</td><td className="px-4 py-2">UIF 1% + SDL 1% (SDL exemption for small biz)</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Pension / retirement</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>UK:</strong> auto-enrolment minimum 3% employer contribution on qualifying earnings. Often higher in tech / professional services (5–10%).</li>
        <li><strong>USA:</strong> 401(k) match is not legally required but is competitive expectation. Typical match: 50% up to 6% of salary = 3% on top.</li>
        <li><strong>South Africa:</strong> no statutory employer pension. Many employers offer 5–10% provident fund contributions to attract talent.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Health and benefits</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>USA:</strong> private health insurance is the big one — $7,000–$15,000/year per employee for a decent plan. Mandatory in companies of 50+ employees under the ACA.</li>
        <li><strong>UK:</strong> NHS covers basics. Private medical insurance is a perk costing £400–£1,200/employee/year. Cycle-to-work, gym, life insurance add £200–£500.</li>
        <li><strong>South Africa:</strong> private medical aid contributions £100–£300/month (R2,000–R6,000) per employee depending on tier.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Equipment, software, training</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Annualised costs to set up and maintain a working employee:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-1 text-gray-700">
        <li>Laptop / desk setup (amortised over 3 years): £400–£800/year</li>
        <li>Phone / SaaS / collaboration tools: £300–£800/year</li>
        <li>Onboarding cost (HR time, training, ramp): £1,000–£3,000 in year 1</li>
        <li>Ongoing learning budget: £500–£1,500/year</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Office space allocation</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Office space cost per desk, even in flexible-working arrangements:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-1 text-gray-700">
        <li>London / NYC / SF: £4,000–£8,000 per desk/year</li>
        <li>Manchester / regional UK city: £1,500–£3,500</li>
        <li>Smaller markets / co-working: £1,200–£2,500</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">A worked example: £45,000 salary in the UK</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">Gross salary</td><td className="px-4 py-2 text-right font-mono">£45,000</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">+ Employer NIC (13.8% on £35,900)</td><td className="px-4 py-2 text-right font-mono">£4,954</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">+ Pension (5% employer contribution)</td><td className="px-4 py-2 text-right font-mono">£2,250</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">+ Private medical (£800)</td><td className="px-4 py-2 text-right font-mono">£800</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">+ Equipment, SaaS, training</td><td className="px-4 py-2 text-right font-mono">£2,000</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">+ Office desk allocation</td><td className="px-4 py-2 text-right font-mono">£3,000</td></tr>
            <tr className="bg-brand-light"><td className="px-4 py-2 font-semibold">Total annual cost</td><td className="px-4 py-2 text-right font-mono font-semibold">£58,004 (129%)</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 leading-relaxed text-gray-700">
        £58k = 129% of the £45k offer. Year-one is usually higher because
        of onboarding overhead.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Hourly cost — for hire-vs-contractor decisions</h2>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-brand-light p-4 text-sm font-mono">
{`True Hourly Cost = Total Annual / 2,080 (52 × 40)
                 = £58,004 / 2,080
                 = £27.89/hr nominal

Cost Per Productive Hour ≈ Total / 1,700
                          = £34/hr (accounts for leave + admin)`}
      </pre>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">When to hire vs use a contractor</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Hire</strong> when the work is ongoing, full-time, and central to the business. The 30–45% overhead becomes worth it for stability and culture.</li>
        <li><strong>Use a contractor</strong> for short-term, specialist, or variable workload — even at a higher headline rate, total cost is usually lower over 1–2 years.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Calculate your own</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Use the{" "}
        <Link href="/employee-cost-calculator" className="text-brand-primary underline">
          Employee Cost Calculator
        </Link>{" "}
        — employer tax rate pre-fills by region (US/UK/SA) and you can
        adjust each cost layer to match your situation.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Bottom line</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>Employees cost 25–45% on top of salary, depending on region and benefits.</li>
        <li>Payroll tax is the biggest layer in UK; private health is the biggest in US.</li>
        <li>Always budget on fully-loaded cost when planning hires.</li>
        <li>Cost-per-productive-hour is usually ~£35 for a £45k salary — and that&apos;s the real comparison point against contractor rates.</li>
      </ul>
    </>
  );
}
