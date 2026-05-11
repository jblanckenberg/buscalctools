import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead text-lg leading-relaxed text-gray-700">
        Hire an employee or contract a freelancer? The contractor&apos;s
        day rate is always higher, so freelancers look more expensive.
        Once you account for the real cost of an employee — taxes,
        benefits, equipment, ramp time — the answer often flips.
        Here&apos;s the side-by-side.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Apples-to-apples scenario</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        A growing London-based product company needs senior frontend
        development for an upcoming launch. Two paths:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-1 text-gray-700">
        <li><strong>Hire</strong> a senior frontend engineer on £75,000 salary</li>
        <li><strong>Contract</strong> a senior freelance frontend at £600/day</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Employee true cost (annual)</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">Gross salary</td><td className="px-4 py-2 text-right font-mono">£75,000</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">+ Employer NIC (13.8%)</td><td className="px-4 py-2 text-right font-mono">£9,094</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">+ Pension (5%)</td><td className="px-4 py-2 text-right font-mono">£3,750</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">+ Private medical, life, perks</td><td className="px-4 py-2 text-right font-mono">£1,500</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">+ Equipment / software / training</td><td className="px-4 py-2 text-right font-mono">£2,500</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">+ Office desk allocation</td><td className="px-4 py-2 text-right font-mono">£3,500</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">+ Hiring cost (recruiter fee 15%)</td><td className="px-4 py-2 text-right font-mono">£11,250</td></tr>
            <tr className="bg-brand-light"><td className="px-4 py-2 font-semibold">Year-1 total</td><td className="px-4 py-2 text-right font-mono font-semibold">£106,594</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2 text-sm">Year-2 onward (no recruiter)</td><td className="px-4 py-2 text-right font-mono text-sm">£95,344</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Contractor true cost (annual equivalent)</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        At £600/day, full-time-equivalent (220 working days/year) =
        £132,000 if used continuously. But contractors rarely work
        full-time-equivalent for a single client. Real scenarios:
      </p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-brand-light">
            <tr className="text-left"><th className="px-4 py-2">Engagement</th><th className="px-4 py-2">Days/year</th><th className="px-4 py-2">Annual cost</th></tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">3-day/week engagement</td><td className="px-4 py-2">~150</td><td className="px-4 py-2">£90,000</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Full-time-equivalent for 6 months</td><td className="px-4 py-2">~110</td><td className="px-4 py-2">£66,000</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Project basis (~4 months total)</td><td className="px-4 py-2">~80</td><td className="px-4 py-2">£48,000</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 leading-relaxed text-gray-700">
        No employer NIC, no pension, no medical, no office desk, no
        long-term commitment.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Verdict by scenario</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-brand-light">
            <tr className="text-left"><th className="px-4 py-2">Need</th><th className="px-4 py-2">Cheaper option</th><th className="px-4 py-2">Why</th></tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Ongoing 5-day-a-week role for 2+ years</td><td className="px-4 py-2"><strong>Employee</strong></td><td className="px-4 py-2">Daily contractor cost compounds; employee cost flattens</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">3-day/week for ≤18 months</td><td className="px-4 py-2"><strong>Contractor</strong></td><td className="px-4 py-2">Avoids the £30k+ overhead premium</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Specialist skill needed for 4 months</td><td className="px-4 py-2"><strong>Contractor</strong></td><td className="px-4 py-2">Hiring + ramp time exceeds project length</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Permanent specialist role</td><td className="px-4 py-2"><strong>Employee</strong></td><td className="px-4 py-2">Continuity, institutional knowledge, no rate inflation</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">Uncertain workload</td><td className="px-4 py-2"><strong>Contractor</strong></td><td className="px-4 py-2">Easy to ramp up/down without redundancy costs</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The break-even calculation</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Rule of thumb: a contractor at day rate £X equals an employee at
        roughly £X × 130 salary (year 1). So £600/day ≈ £78,000 salary
        equivalent for a year of continuous engagement, accounting for
        all the employee overheads.
      </p>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-brand-light p-4 text-sm font-mono">
{`Employee-equivalent salary ≈ Contractor day rate × 130

£600/day × 130 = £78,000 salary equivalent
£500/day × 130 = £65,000 salary equivalent
£400/day × 130 = £52,000 salary equivalent`}
      </pre>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Non-cost factors</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Commitment / loyalty.</strong> Employees stay; contractors leave when the project ends.</li>
        <li><strong>Institutional knowledge.</strong> Long-term employees know the &ldquo;why&rdquo; behind decisions.</li>
        <li><strong>Flexibility.</strong> Contractors scale up/down without redundancy procedures.</li>
        <li><strong>Risk allocation.</strong> Contractors absorb their own sick leave, holidays, equipment failures.</li>
        <li><strong>IR35 risk (UK).</strong> Disguised employment can attract back-taxes if the engagement looks too employee-like.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Run your own numbers</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Use the{" "}
        <Link href="/employee-cost-calculator" className="text-brand-primary underline">
          Employee Cost Calculator
        </Link>{" "}
        to compute the all-in cost of a hire, then compare against
        contractor day rate × expected days/year for an apples-to-apples
        comparison. The{" "}
        <Link href="/freelance-rate-calculator" className="text-brand-primary underline">
          Freelance Rate Calculator
        </Link>{" "}
        shows what the contractor needs to charge to cover their own
        overheads.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Bottom line</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>Employee true cost is ~130% of salary; contractor headline rate is the full cost.</li>
        <li>For continuous 2+ year roles, employees usually win on cost.</li>
        <li>For specialist, project-based, or uncertain workloads, contractors win.</li>
        <li>Day rate × 130 = rough employee-salary-equivalent break-even.</li>
      </ul>
    </>
  );
}
