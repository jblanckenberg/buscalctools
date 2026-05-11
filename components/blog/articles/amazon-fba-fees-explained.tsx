import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead text-lg leading-relaxed text-gray-700">
        First-time Amazon FBA sellers usually look at their cost and
        selling price, do the math, and think they&apos;ll make decent
        margin. Then the fees start landing. Here&apos;s every Amazon FBA
        fee, what it costs, and a worked example of what actually reaches
        your bank.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The five fee types</h2>
      <ol className="mt-3 ml-6 list-decimal space-y-3 text-gray-700">
        <li>
          <strong>Referral fee</strong> — Amazon&apos;s commission on each
          sale. 8–15% of the selling price depending on category. Books
          and electronics 8%; most categories 15%; jewellery up to 20%.
        </li>
        <li>
          <strong>FBA fulfilment fee</strong> — covers picking, packing,
          shipping to the customer. Based on product size and weight.
          $3–$8 per unit for small standard; $8–$20+ for oversized.
        </li>
        <li>
          <strong>Monthly storage fee</strong> — charged for the cube feet
          your inventory occupies. $0.83/cu ft Jan–Sep, $2.40/cu ft Oct–Dec
          (peak season).
        </li>
        <li>
          <strong>Long-term storage fee</strong> — surcharge on inventory
          sitting in Amazon&apos;s warehouses for over 180 days, then
          365 days. $1.50–$6.90/cu ft on top of standard storage.
        </li>
        <li>
          <strong>Returns / disposal fees</strong> — Amazon charges for
          processing returns, disposing of unsellable stock, or removing
          stock back to you. $0.30–$1.20 per unit typically.
        </li>
      </ol>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The optional-but-essential fees</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Advertising (Sponsored Products / Brands).</strong> Not technically a fee but functionally required to get visibility. Typical ACOS (Advertising Cost of Sale) is 15–35% of revenue from ads.</li>
        <li><strong>Professional Seller account.</strong> $39.99/month flat (USA). Required above 40 sales/month.</li>
        <li><strong>Inbound shipping</strong> to Amazon&apos;s fulfilment centres. You pay this; it&apos;s your cost of getting stock to them.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">A worked example: $29.99 skincare product</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Standard-size beauty product, 8oz bottle, sold via FBA in the US.
      </p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">Selling price</td><td className="px-4 py-2 text-right font-mono">$29.99</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">− Referral fee (15%)</td><td className="px-4 py-2 text-right font-mono text-brand-danger">−$4.50</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">− FBA fulfilment (small standard)</td><td className="px-4 py-2 text-right font-mono text-brand-danger">−$3.86</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">− Storage (per unit, blended)</td><td className="px-4 py-2 text-right font-mono text-brand-danger">−$0.20</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">− Ads (25% ACOS)</td><td className="px-4 py-2 text-right font-mono text-brand-danger">−$7.50</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">− Inbound shipping per unit</td><td className="px-4 py-2 text-right font-mono text-brand-danger">−$0.60</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">− Product cost (landed)</td><td className="px-4 py-2 text-right font-mono text-brand-danger">−$5.00</td></tr>
            <tr className="bg-brand-light"><td className="px-4 py-2 font-semibold">Net profit per sale</td><td className="px-4 py-2 text-right font-mono font-semibold">$8.33 (28%)</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 leading-relaxed text-gray-700">
        The same product sold direct (not via FBA) at $24.99 might net
        more: no referral fee, no FBA fulfilment, but you handle shipping
        and customer service yourself. The trade-off is volume — Amazon
        FBA gets you discoverability.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">How to minimise FBA fees</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Get into the &ldquo;small standard&rdquo; size band.</strong> The fulfilment-fee jump from small standard to large standard is significant. Shrink your packaging if you&apos;re close to the boundary.</li>
        <li><strong>Move inventory through fast.</strong> Long-term storage fees kick in at 180 days. Reduce reorder quantities if stock is sitting.</li>
        <li><strong>Don&apos;t over-stock before peak.</strong> Q4 storage rates are 3× the rest of the year.</li>
        <li><strong>Manage ACOS aggressively.</strong> Ads are the biggest cost on most listings. Negative keywords, dayparting, and pausing under-performers can cut ACOS 20–40%.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">VAT / sales tax</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        US marketplace facilitator laws mean Amazon collects and remits
        sales tax on your behalf in nearly all states — you don&apos;t
        see it. UK and EU sellers face VAT directly: Amazon charges VAT
        on the selling price, you remit it if VAT-registered. SA: VAT
        applies on standard-rated digital goods sold to SA buyers.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Run your own numbers</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Use the{" "}
        <Link href="/ecommerce-profit-calculator" className="text-brand-primary underline">
          Ecommerce Profit Calculator
        </Link>{" "}
        with the Amazon FBA preset (15% platform fee pre-filled) plus
        your shipping, ads, and product cost to see true per-unit profit.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Bottom line</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>Amazon FBA fees typically take 30–50% of the selling price.</li>
        <li>Referral (8–15%), fulfilment ($3–$8), storage, and ads are the four major buckets.</li>
        <li>Aim for ≥30% net margin per unit to survive returns, ad cost spikes, and seasonality.</li>
        <li>Manage inventory turnover to avoid long-term storage and peak-season storage premiums.</li>
      </ul>
    </>
  );
}
