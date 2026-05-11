import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead text-lg leading-relaxed text-gray-700">
        Etsy looks like the simplest marketplace fee structure of any
        — 6.5% transaction fee and you&apos;re set. It isn&apos;t.
        Between listing fees, payment processing, Offsite Ads, and the
        Etsy Plus subscription, sellers regularly hand over 10–15% of
        revenue. This is the full breakdown.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Every fee Etsy charges</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Listing fee — $0.20 per item.</strong> Charged when you list, and again every 4 months if the item doesn&apos;t sell, and again after each sale (you re-list). Adds up fast for shops with 200+ SKUs.</li>
        <li><strong>Transaction fee — 6.5% of the total sale price</strong> including shipping the buyer paid you. Charged on every sale.</li>
        <li><strong>Payment processing fee — varies by country.</strong> US: 3% + $0.25. UK: 4% + £0.20. Stacked on top of the transaction fee.</li>
        <li><strong>Currency conversion fee — 2.5%</strong> if the buyer pays in a different currency from your listing.</li>
        <li><strong>Offsite Ads fee — 12% or 15%</strong> of the sale, but only on sales that come from off-platform ads Etsy ran. Mandatory if your shop made over $10k in the last 12 months; otherwise optional.</li>
        <li><strong>Etsy Plus subscription — $10/month</strong> for advanced shop customisation. Optional.</li>
        <li><strong>Pattern site — $15/month</strong> for the standalone storefront. Optional.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">VAT (UK/EU/SA sellers)</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Etsy collects VAT on UK, EU, and some other buyers&apos; purchases
        and remits it to tax authorities — sellers see the gross-of-VAT
        price but only receive the net-of-VAT amount. UK buyers pay 20%
        VAT on top of your listed price (depending on your settings). SA
        sellers handle their own VAT separately at 15%.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">A worked example: $40 handmade item</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        US-based seller. Listed at $40, buyer pays $40 + $5 shipping =
        $45 total. Not from Offsite Ads. Etsy Plus subscriber.
      </p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">Buyer pays</td><td className="px-4 py-2 text-right font-mono">$45.00</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">− Transaction fee (6.5% of $45)</td><td className="px-4 py-2 text-right font-mono text-brand-danger">−$2.93</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">− Payment processing (3% + $0.25)</td><td className="px-4 py-2 text-right font-mono text-brand-danger">−$1.60</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">− Listing fee (this sale)</td><td className="px-4 py-2 text-right font-mono text-brand-danger">−$0.20</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">− Shipping cost you incurred</td><td className="px-4 py-2 text-right font-mono text-brand-danger">−$5.00</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">− Materials cost</td><td className="px-4 py-2 text-right font-mono text-brand-danger">−$8.00</td></tr>
            <tr className="bg-brand-light"><td className="px-4 py-2 font-semibold">Net to seller</td><td className="px-4 py-2 text-right font-mono font-semibold">$27.27 (60.6%)</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 leading-relaxed text-gray-700">
        Etsy fees took $4.73 (10.5% of the gross transaction). Without
        the cost of materials and shipping, the seller netted 60.6% of
        what the buyer paid — better than Amazon FBA, worse than direct
        sales.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The Offsite Ads question</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        If you&apos;re under $10k/year in sales, you can opt OUT of
        Offsite Ads. Above $10k, you&apos;re forced in. Etsy spends money
        advertising your listings on Google, Facebook, etc. — when a sale
        traces back to one of those ads, they take 12% (or 15% if
        you&apos;re under $10k voluntarily participating) of the sale on
        top of all other fees. This makes some sales unprofitable. Either
        bake it into your prices or stay under $10k.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">How to price for Etsy</h2>
      <ol className="mt-3 ml-6 list-decimal space-y-2 text-gray-700">
        <li><strong>Calculate your fully-loaded cost per item</strong> including materials, packaging, time at a target hourly rate.</li>
        <li><strong>Add 15% buffer for Etsy fees</strong> (transaction + payment processing + occasional Offsite Ad hit).</li>
        <li><strong>Add your desired margin on top.</strong> 30–50% is typical for handmade.</li>
        <li><strong>Sanity-check against competitors.</strong> Etsy is price-transparent — too far above or below the median for similar items hurts conversion.</li>
        <li><strong>Use the listing&apos;s shipping price strategically.</strong> Free shipping (built into price) shows a green &ldquo;Free shipping&rdquo; badge that lifts conversion 5–15%.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Run your own numbers</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Use the{" "}
        <Link href="/ecommerce-profit-calculator" className="text-brand-primary underline">
          Ecommerce Profit Calculator
        </Link>{" "}
        and pick the Etsy preset (6.5% platform fee). Add payment
        processing and any ad spend manually to see true per-unit profit.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Bottom line</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>Etsy&apos;s headline 6.5% transaction fee is misleading — real fee load is 10–15%.</li>
        <li>Listing fees ($0.20) repeat after every 4 months and every sale — significant for big shops.</li>
        <li>Offsite Ads are mandatory above $10k/year — bake 12–15% into pricing.</li>
        <li>Free shipping (priced-in) typically converts better than paid shipping.</li>
      </ul>
    </>
  );
}
