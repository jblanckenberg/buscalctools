import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead text-lg leading-relaxed text-gray-700">
        Cost per unit is the most under-watched number in small business.
        Reduce it by 10% without raising prices and you&apos;ve grown net
        profit by far more than 10%. Here are seven proven levers,
        ordered from quickest-win to highest-impact.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">First, know what your CPU actually is</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Most owners under-count CPU because they only include direct
        materials. Real cost per unit includes:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-1 text-gray-700">
        <li>Raw materials and components</li>
        <li>Direct labour to produce</li>
        <li>Packaging</li>
        <li>Allocated overhead (rent, utilities, management — total fixed cost / units made)</li>
        <li>Shipping inbound (to you) and outbound (to customer) if you absorb it</li>
        <li>Quality reject / scrap rate (if you scrap 5%, real CPU is 5% higher)</li>
      </ul>
      <p className="mt-3 leading-relaxed text-gray-700">
        Use the{" "}
        <Link href="/cost-per-unit-calculator" className="text-brand-primary underline">
          Cost Per Unit Calculator
        </Link>{" "}
        to break this into fixed and variable components first.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">1. Renegotiate supplier contracts</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Your suppliers raised prices over the last 18 months. They expect
        you to ask for them back. Specific tactics that work:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-1 text-gray-700">
        <li>Ask for 90-day payment terms in exchange for current pricing</li>
        <li>Get three competing quotes and share the lowest with your incumbent</li>
        <li>Commit to higher volume for a lower per-unit rate</li>
        <li>Pay upfront for an annual quantity to lock in price</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">2. Bulk buying (with caution)</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Buying 12 months of inventory at 15% discount looks like a no-brainer.
        It isn&apos;t if you only sell 6 months&apos; worth, the product
        has an expiry, or you tie up cash you needed for marketing. Rule
        of thumb: only bulk-buy what you will sell in 6 months or less.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">3. Increase production volume to spread fixed costs</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Fixed cost per unit drops as volume rises. If your factory costs
        $20,000/month regardless, going from 500 → 750 units produced
        drops fixed CPU from $40 to $26.67. That&apos;s a $13.33 per-unit
        improvement before any other change. The catch: you need actual
        demand for those extra 250 units.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">4. Redesign for manufacturability</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Small product changes can produce large cost savings. Common moves:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-1 text-gray-700">
        <li>Reduce part count (fewer SKUs to stock, less assembly time)</li>
        <li>Swap one material for a cheaper equivalent (PET vs glass, MDF vs hardwood for hidden parts)</li>
        <li>Simplify packaging (no inner box, smaller outer, less printing)</li>
        <li>Standardise hardware across products (one screw type instead of three)</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">5. Cut scrap and rework</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        A 5% reject rate means real CPU is 5% above what you think it is.
        If you scrap $5 of materials per finished good, that&apos;s pure
        margin compression. Run a one-month tally of every rejected /
        reworked unit and tackle the top three causes. Quality control at
        the input stage (inspect incoming materials) is cheaper than at
        the output stage.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">6. Automate the most repetitive step</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Don&apos;t automate everything — pick the single most repetitive,
        most error-prone step in your process and automate just that. A
        $4,000 packaging machine that saves 30 seconds per unit pays back
        in months at any decent volume. The biggest wins are often in the
        boring middle of the process, not the glamorous front-end.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">7. Relocate, in-source, or out-source</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Strategic moves with higher upside but more risk:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Move production overseas</strong> if scale justifies the logistics overhead. Typically only viable above several thousand units/month.</li>
        <li><strong>In-source a step</strong> you were paying a margin on. If your packaging vendor charges $1.50 and the actual cost is $0.40, can you do it yourself?</li>
        <li><strong>Out-source a non-core step.</strong> Conversely, if a vendor specialises in something you do badly, paying their price might still beat your in-house cost.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The combined effect</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Stack two or three of these and you&apos;ll typically see 8–20%
        CPU reduction within a quarter. At the same selling price, that
        flows almost entirely to net profit — a small business doing
        $500k revenue at 10% net margin and shaving 10% off COGS
        (currently 50% of revenue) gains $25,000/year of profit.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Bottom line</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>Calculate fully-loaded CPU first — most owners under-count it.</li>
        <li>Renegotiation and volume scaling are usually the quickest wins.</li>
        <li>Redesign and scrap reduction have the highest absolute savings.</li>
        <li>Don&apos;t chase savings that compromise quality — defects and returns cost more than the savings.</li>
      </ul>
    </>
  );
}
