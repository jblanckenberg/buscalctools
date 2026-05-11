import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead text-lg leading-relaxed text-gray-700">
        Cost-plus pricing is the simplest way to set a price: take your
        cost, add a markup, and that&apos;s your selling price. It&apos;s
        also the pricing method that lets the most money slip through your
        fingers. Here&apos;s when it works, when it doesn&apos;t, and how
        to use it without leaving margin on the table.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The formula</h2>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-brand-light p-4 text-sm font-mono">
{`Selling Price = Unit Cost × (1 + Markup %)

Example: $40 cost × 1.5 (50% markup) = $60 price`}
      </pre>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Why people use it</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>It&apos;s fast.</strong> No market research, no positioning analysis — just arithmetic.</li>
        <li><strong>It guarantees a margin.</strong> If your cost number is accurate, every sale clears the markup.</li>
        <li><strong>It&apos;s easy to explain.</strong> Customers, partners, and tax authorities all understand &ldquo;cost plus 30%&rdquo;.</li>
        <li><strong>It&apos;s defensible.</strong> Useful in government contracts and regulated industries where pricing must be justified.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Why it costs you money</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Cost-plus ignores the only thing that actually determines what
        you can charge: <strong>what the customer is willing to pay</strong>.
      </p>
      <p className="mt-3 leading-relaxed text-gray-700">
        Two examples of what cost-plus misses:
      </p>
      <ol className="mt-3 ml-6 list-decimal space-y-2 text-gray-700">
        <li>
          <strong>You&apos;re leaving money on the table.</strong> Suppose
          you cost $40 to deliver something a customer would happily pay
          $200 for. Cost-plus at 50% markup gives you $60. The customer
          walks out happy, you&apos;ve given away $140 of margin per
          sale.
        </li>
        <li>
          <strong>You&apos;re pricing above market.</strong> Your
          inefficient process means your cost is $120. Cost-plus gives
          you $180. Competitors charge $140 because their cost is $80.
          You lose every sale.
        </li>
      </ol>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The hidden trap: your cost number is probably wrong</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Most cost-plus pricing uses only direct cost (materials, direct
        labour). It ignores allocated overhead — rent, management salaries,
        software, marketing. If you add a 50% markup to direct cost and
        overhead is 40% of revenue, you&apos;re actually running at a 10%
        net margin, not 50%.
      </p>
      <p className="mt-3 leading-relaxed text-gray-700">
        Always use <strong>fully-loaded cost</strong> — direct cost plus
        allocated overhead per unit. The{" "}
        <Link href="/cost-per-unit-calculator" className="text-brand-primary underline">
          Cost Per Unit Calculator
        </Link>{" "}
        separates fixed from variable costs so you can see the true number.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">When cost-plus IS the right answer</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Government / defence contracts.</strong> Often require cost-plus pricing by regulation.</li>
        <li><strong>Custom manufacturing.</strong> Each unit is different; no market price exists.</li>
        <li><strong>Wholesale to retailers.</strong> Retailers expect a predictable cost-plus quote so they can set their own retail price.</li>
        <li><strong>Service businesses with stable costs.</strong> Cleaning, accounting, basic professional services where customers price-shop.</li>
        <li><strong>Commodity products.</strong> When the market dictates a tight price band, cost-plus tells you whether to play.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">How to use cost-plus without losing money</h2>
      <ol className="mt-3 ml-6 list-decimal space-y-2 text-gray-700">
        <li><strong>Calculate fully-loaded cost</strong>, not just direct cost.</li>
        <li><strong>Set a target margin, not a target markup.</strong> 30% margin and 30% markup are very different — see the difference in our markup vs margin guide.</li>
        <li><strong>Check the result against the market.</strong> If your cost-plus price is wildly above or below competitors, the issue is your cost, not the market.</li>
        <li><strong>Use it as a floor, not a default.</strong> Cost-plus gives you the minimum viable price. Then ask: what would customers pay if I positioned this differently?</li>
        <li><strong>Re-cost annually.</strong> Inputs change. A markup that was profitable last year may not be this year if supplier prices rose 8%.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">A safer alternative</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Use cost-plus as your floor and value-based pricing as your
        ceiling. Set the actual price somewhere in between, biased toward
        the value end. The{" "}
        <Link href="/pricing-calculator" className="text-brand-primary underline">
          Pricing Calculator
        </Link>{" "}
        does cost-plus and lets you toggle between margin-mode and
        markup-mode, and handles VAT/sales tax for UK/SA/US.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Bottom line</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>Cost-plus is fast and guarantees a margin — IF your cost is fully loaded.</li>
        <li>It ignores customer willingness to pay — usually the most valuable input.</li>
        <li>Use it as a floor for negotiation, not a default selling price.</li>
        <li>Re-cost annually; markups that worked last year may be losing money now.</li>
      </ul>
    </>
  );
}
