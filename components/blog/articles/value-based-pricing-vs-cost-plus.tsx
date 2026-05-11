import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead text-lg leading-relaxed text-gray-700">
        Two opposite philosophies. Cost-plus prices from the inside out:
        what does it cost, plus what we want to make. Value-based prices
        from the outside in: what is it worth to the customer, minus what
        they pay. The difference between them can be 5× on the same
        product.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The two approaches side by side</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-brand-light">
            <tr className="text-left">
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">Cost-plus</th>
              <th className="px-4 py-2">Value-based</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200"><td className="px-4 py-2 font-medium">Starting point</td><td className="px-4 py-2">Your cost</td><td className="px-4 py-2">Customer&apos;s perceived value</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2 font-medium">Time to set</td><td className="px-4 py-2">Minutes</td><td className="px-4 py-2">Weeks of research</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2 font-medium">Defends against</td><td className="px-4 py-2">Pricing under cost</td><td className="px-4 py-2">Pricing under value</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2 font-medium">Typical margin</td><td className="px-4 py-2">20–40%</td><td className="px-4 py-2">50–80%</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2 font-medium">Works best for</td><td className="px-4 py-2">Commodities, custom work</td><td className="px-4 py-2">Specialised, differentiated, B2B</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">A worked example</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        A freelance brand designer redesigns a small business logo. The
        designer&apos;s time costs $1,500 of billable hours.
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Cost-plus</strong> at 40% markup: $1,500 × 1.4 = $2,100. Done in 30 seconds.</li>
        <li><strong>Value-based:</strong> What does a great brand identity unlock for this client? A B2B SaaS company will use the logo on $5M of pitch decks over 5 years. Value framing: $8,000–$15,000.</li>
      </ul>
      <p className="mt-3 leading-relaxed text-gray-700">
        Same designer, same hours of work, same deliverable. Six-times-higher
        price — if the designer can frame the conversation around the
        value of the outcome, not the cost of the input.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">When value-based wins</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Specialised expertise.</strong> The buyer can&apos;t easily compare you to others.</li>
        <li><strong>High-stakes decisions.</strong> Legal, M&amp;A advisory, executive coaching — getting it wrong is expensive.</li>
        <li><strong>Quantifiable outcomes.</strong> &ldquo;This will save you $500k/year&rdquo; supports much higher fees.</li>
        <li><strong>B2B.</strong> Companies care about ROI; people care about price.</li>
        <li><strong>Differentiated products.</strong> If you&apos;re the only place that does X, you can price what X is worth.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">When cost-plus is fine</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Commodities.</strong> The market sets the price; cost-plus tells you whether to compete.</li>
        <li><strong>Government / regulated contracts.</strong> Cost-plus is often legally required.</li>
        <li><strong>Wholesale.</strong> Retailers expect a predictable cost+markup quote.</li>
        <li><strong>Custom one-offs.</strong> No market price exists; cost-plus is the only sane anchor.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">How to move toward value-based pricing</h2>
      <ol className="mt-3 ml-6 list-decimal space-y-2 text-gray-700">
        <li><strong>Identify the outcome you produce, not the task.</strong> Not &ldquo;design a logo&rdquo; → &ldquo;create a brand identity that wins the next round of investor pitches&rdquo;.</li>
        <li><strong>Quantify it.</strong> Time saved, revenue gained, cost avoided. Even rough estimates anchor the conversation.</li>
        <li><strong>Talk to customers about what they paid for similar outcomes</strong> before quoting yours.</li>
        <li><strong>Tiered packaging.</strong> Offer Bronze/Silver/Gold so customers self-select into higher tiers based on perceived need.</li>
        <li><strong>Quote ranges, not points.</strong> &ldquo;$8,000–$15,000&rdquo; signals you charge based on scope, not a fixed sticker.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The pragmatic middle ground</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Most small businesses can&apos;t fully commit to value-based
        pricing — it takes time and research per customer. The practical
        approach: <strong>use cost-plus as the floor</strong>, then
        adjust upward based on customer-specific value signals. Use the{" "}
        <Link href="/pricing-calculator" className="text-brand-primary underline">
          Pricing Calculator
        </Link>{" "}
        to find your cost-plus floor and your target margin, then add
        a value-based premium on top.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Bottom line</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>Cost-plus is internal-facing; value-based is customer-facing.</li>
        <li>The price gap between the two on the same product can be 2–10×.</li>
        <li>Specialised B2B work benefits most from value-based; commodity work doesn&apos;t.</li>
        <li>Use cost-plus as the floor; price as high above it as the customer&apos;s perceived value allows.</li>
      </ul>
    </>
  );
}
