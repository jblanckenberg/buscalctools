import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead text-lg leading-relaxed text-gray-700">
        Discounts are seductive — they reliably move stock and drive
        signups. They&apos;re also one of the fastest ways to erode your
        margin and train customers to never pay full price again. This
        guide shows you when discounts help, when they hurt, and how to
        structure them so they pay for themselves.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The math nobody runs</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        A 20% discount sounds modest. But if your gross margin was 40%
        before the discount, 20% off the price cuts your margin to 25%.
        To make the same profit, you need to sell <strong>60% more units</strong>.
        Most discounts don&apos;t generate 60% more volume.
      </p>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-brand-light p-4 text-sm font-mono">
{`Required volume increase = Old Margin / New Margin − 1

Example: 40% margin → 25% margin (after 20% discount)
  40% / 25% − 1 = 60% more unit sales needed to break even`}
      </pre>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">When discounts make money</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Clearing genuine excess stock.</strong> The alternative is writing it off; any cash recovery is profit.</li>
        <li><strong>Acquiring high-LTV customers.</strong> Loss-leader the first purchase if you have data showing 80%+ of new customers come back at full price.</li>
        <li><strong>Filling slack capacity.</strong> Hotels, gyms, software with marginal costs near zero — better to fill the room/seat at a discount than leave it empty.</li>
        <li><strong>Volume-based B2B deals.</strong> Bigger quantity covers the per-unit margin loss.</li>
        <li><strong>Time-limited urgency campaigns.</strong> 48-hour sales that don&apos;t repeat avoid training customers to wait.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">When discounts lose money</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Predictable, recurring promotions.</strong> &ldquo;25% off every Black Friday&rdquo; → customers wait for it and never pay full price.</li>
        <li><strong>Across-the-board sitewide discounts.</strong> You discount items that would have sold anyway.</li>
        <li><strong>Discounting to match a competitor.</strong> Race-to-the-bottom dynamics destroy both businesses.</li>
        <li><strong>Discounting a perceived-premium product.</strong> Signals the brand isn&apos;t worth the original price.</li>
        <li><strong>Discounting without measuring incremental sales.</strong> Without a control group, you can&apos;t tell if the discount caused the lift or coincided with it.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Five better discount structures</h2>
      <ol className="mt-3 ml-6 list-decimal space-y-2 text-gray-700">
        <li><strong>Conditional discounts.</strong> &ldquo;15% off if you buy 3+&rdquo; — moves units without devaluing the product.</li>
        <li><strong>Bundle discounts.</strong> Two products together at 15% off — protects each product&apos;s standalone price.</li>
        <li><strong>Loyalty / repeat-customer discounts.</strong> Reward existing high-LTV customers; new buyers still see full price.</li>
        <li><strong>Annual prepay discounts (SaaS).</strong> 10–20% off for upfront annual payment — improves cash flow more than it costs in margin.</li>
        <li><strong>Tiered volume discounts.</strong> Pricing breaks at 10, 50, 100 units — encourages larger orders without devaluing the single-unit price.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">A discount approval framework</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Before approving any discount, answer these three questions:
      </p>
      <ol className="mt-3 ml-6 list-decimal space-y-2 text-gray-700">
        <li><strong>What volume lift do I need to break even on the discount?</strong> Use the formula above. If the answer is &gt;30% and there&apos;s no specific reason to expect that lift, the discount loses money.</li>
        <li><strong>Would this customer have bought without the discount?</strong> If yes, you&apos;re giving away margin on a sale you&apos;d have made anyway.</li>
        <li><strong>What does the discount signal long-term?</strong> Is this a one-off event, or are you training customers to wait?</li>
      </ol>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">A worked example: was the sale worth it?</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        A retailer runs 20% off for a week. Sales rise from 100 units/week
        to 150 units/week.
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>Normal week: 100 units × $50 × 40% margin = $2,000 gross profit</li>
        <li>Sale week: 150 units × $40 × (margin now 25%, so $10) = $1,500 gross profit</li>
      </ul>
      <p className="mt-3 leading-relaxed text-gray-700">
        50% more units sold, but $500 LESS gross profit. The volume lift
        wasn&apos;t enough to justify the margin compression. Use the{" "}
        <Link href="/discount-calculator" className="text-brand-primary underline">
          Discount Calculator
        </Link>{" "}
        to model your own scenarios before committing to a sale.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Bottom line</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>A small discount has a disproportionately large impact on margin.</li>
        <li>Discounts only pay off when they cause genuine incremental sales — not just timing shifts.</li>
        <li>Conditional discounts (volume, bundle, loyalty, prepay) protect the standalone price while still moving units.</li>
        <li>Never run repeating sitewide promotions — you train customers to wait for them.</li>
      </ul>
    </>
  );
}
