import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead text-lg leading-relaxed text-gray-700">
        The most common freelance mistake: setting an hourly rate by
        looking at job-board competitors and undercutting them by 10%.
        That&apos;s how freelancers end up burned out, broke, and back
        in a full-time job. Here&apos;s how to actually calculate a
        rate that works.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Step 1: Start with your annual take-home target</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Not your gross — your take-home. Be specific. What do you need to
        live the life you want? Add a buffer for retirement savings,
        because you have no employer pension contribution.
      </p>
      <p className="mt-3 leading-relaxed text-gray-700">
        Example: $60,000 net annual income target.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Step 2: Add the tax buffer</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        As a freelancer, you pay your own taxes. Add 25–35% on top of
        your take-home to cover income tax and self-employment levies.
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-1 text-gray-700">
        <li><strong>USA:</strong> add 25–30% (15.3% SE tax + federal + state)</li>
        <li><strong>UK:</strong> add 20–30% (income tax + Class 2/4 NIC)</li>
        <li><strong>South Africa:</strong> add 25–35% (income tax bands + provisional tax)</li>
      </ul>
      <p className="mt-3 leading-relaxed text-gray-700">
        $60,000 × 1.30 = <strong>$78,000 pre-tax</strong>.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Step 3: Add business overhead</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Every annual cost of running your freelance business:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-1 text-gray-700">
        <li>Software / SaaS subscriptions ($600–$3,000)</li>
        <li>Computer + equipment (amortised annual, ~$1,500)</li>
        <li>Phone, internet, home-office allocation ($1,200–$2,400)</li>
        <li>Professional insurance ($500–$2,000)</li>
        <li>Accountant ($800–$2,000)</li>
        <li>Professional memberships, courses, conferences ($500–$2,500)</li>
        <li>Marketing / website ($600–$3,000)</li>
      </ul>
      <p className="mt-3 leading-relaxed text-gray-700">
        Typical total: $5,000–$10,000. Add $6,000.{" "}
        <strong>$78,000 + $6,000 = $84,000 needed gross.</strong>
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Step 4: Calculate billable hours</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Not all working hours are billable. A typical freelancer:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-1 text-gray-700">
        <li>Works 40 hours/week, but only bills 20–25 hours/week</li>
        <li>The rest goes on admin, marketing, sales, training, unpaid revisions</li>
        <li>Takes ~6 weeks off per year (holidays + sick + downtime)</li>
      </ul>
      <p className="mt-3 leading-relaxed text-gray-700">
        Annual billable hours = (52 − 6) × 25 = <strong>1,150 hours/year</strong>.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Step 5: Divide</h2>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-brand-light p-4 text-sm font-mono">
{`Minimum Rate = $84,000 / 1,150 = $73.04 / hour

This is the floor. Anything below this loses money.`}
      </pre>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Step 6: Add profit buffer</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        The minimum rate covers your needs at the assumed billable hours.
        Add a buffer (10–20%) for: lower-volume months, scope creep on
        fixed-price work, and saving toward future investments.
      </p>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-brand-light p-4 text-sm font-mono">
{`Recommended Rate = $73.04 × 1.15 = $84 / hour

Day rate = $84 × 8 = $672 / day`}
      </pre>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The signals you&apos;re charging right</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>You win <strong>30–50%</strong> of competitive proposals. Winning 80%+ means you&apos;re too cheap.</li>
        <li>You can take 2 weeks unpaid leave without panic.</li>
        <li>You don&apos;t resent clients who push back on price.</li>
        <li>You can afford to turn down work that&apos;s off-brand or low-value.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Common mistakes</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Forgetting the tax buffer.</strong> &ldquo;I made $80,000&rdquo; → tax bill of $20,000 → $60,000 net. Plan for it from day one.</li>
        <li><strong>Assuming 40 billable hours.</strong> No experienced freelancer bills 40 hours. 20–25 is realistic.</li>
        <li><strong>Hourly thinking on project work.</strong> If you can deliver in 5 hours what others take 20, charge for the value, not the time. Move to project pricing.</li>
        <li><strong>Anchoring to ex-employer salary.</strong> A $50/hour equivalent salary needs to translate to ~$100/hour freelance to maintain the same take-home — half your gross goes to tax, overhead, and non-billable time.</li>
        <li><strong>Discounting the first client.</strong> The first client sets your floor. Anchor low and you&apos;ll fight to raise rates forever.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Project pricing (when you&apos;re ready)</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Hourly rates penalise efficiency. As you get better, projects
        take less time, so charging hourly means earning less for the
        same outcome. Once you have a steady client base, transition to
        fixed-price project work based on the outcome&apos;s value to
        the client. Your effective hourly rate often jumps 2–3×.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Run yours now</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Use the{" "}
        <Link href="/freelance-rate-calculator" className="text-brand-primary underline">
          Freelance Rate Calculator
        </Link>{" "}
        with your real numbers. It applies region-specific tax buffer
        notes (US/UK/SA) and shows both minimum and recommended rates.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Bottom line</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>Start from your annual take-home target, add tax (25–35%), add overhead.</li>
        <li>Divide by realistic billable hours — 1,150–1,400/year, not 2,080.</li>
        <li>Add a 10–20% profit buffer for slow months.</li>
        <li>If you win every proposal, your rate is too low.</li>
      </ul>
    </>
  );
}
