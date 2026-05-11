import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead text-lg leading-relaxed text-gray-700">
        Profitable businesses go bust every day. The cause is almost
        never lack of profit — it&apos;s timing. Customer pays in 60 days;
        rent is due tomorrow. Profit and cash are different things. This
        guide is about managing the cash, not the profit.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Cash flow vs profit — the one-line difference</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Profit</strong> = revenue earned − costs incurred. Accounting concept.</li>
        <li><strong>Cash flow</strong> = cash actually received − cash actually paid. Bank balance concept.</li>
      </ul>
      <p className="mt-3 leading-relaxed text-gray-700">
        You can have $100,000 of profit on paper while your bank account
        sits at zero, because customers haven&apos;t paid yet and you
        already paid suppliers. This is how profitable businesses fail.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The seven habits that prevent a cash crunch</h2>

      <h3 className="mt-6 text-lg font-semibold text-brand-dark">1. Invoice the day you deliver, not the end of the month</h3>
      <p className="mt-2 leading-relaxed text-gray-700">
        Most small businesses delay invoicing until end of month for
        &ldquo;convenience&rdquo;. If a customer pays NET-30 from invoice
        date, sending the invoice 3 weeks later means cash arrives 7 weeks
        after the work was done. Invoice the same day; it&apos;s 30 minutes
        of admin saved at the cost of 21 days of cash.
      </p>

      <h3 className="mt-6 text-lg font-semibold text-brand-dark">2. Offer a small early-payment discount</h3>
      <p className="mt-2 leading-relaxed text-gray-700">
        &ldquo;2/10 NET-30&rdquo; — 2% discount if paid within 10 days,
        full amount due in 30. That 2% is a steep annualised cost (~37%
        APR), but if your alternative is a bank overdraft or invoice
        finance at 8–15%, the early discount is cheaper. Only worth it if
        your customers actually act on it; many won&apos;t.
      </p>

      <h3 className="mt-6 text-lg font-semibold text-brand-dark">3. Get deposits or staged payments</h3>
      <p className="mt-2 leading-relaxed text-gray-700">
        Don&apos;t finance your customers&apos; orders. Standard terms by
        sector:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-1 text-gray-700">
        <li>Custom manufacturing: 30–50% deposit on order, balance on delivery</li>
        <li>Services / projects: 25%/50%/25% (start / midpoint / completion)</li>
        <li>SaaS: annual upfront with 10–15% discount</li>
        <li>Construction: monthly applications for payment against work done</li>
      </ul>

      <h3 className="mt-6 text-lg font-semibold text-brand-dark">4. Negotiate longer terms with your suppliers</h3>
      <p className="mt-2 leading-relaxed text-gray-700">
        If you pay suppliers NET-14 and customers pay you NET-45, you
        finance a month of working capital from your own pocket. Push
        suppliers to NET-30 or NET-45. They&apos;ll usually agree if
        you&apos;ve been paying reliably — the relationship has built-in
        leverage.
      </p>

      <h3 className="mt-6 text-lg font-semibold text-brand-dark">5. Maintain a 3-month cash reserve</h3>
      <p className="mt-2 leading-relaxed text-gray-700">
        Three months of operating expenses, held in a separate account
        you don&apos;t touch except in emergency. Build it gradually by
        routing a fixed percentage (5–10%) of every cash receipt into the
        reserve until it&apos;s full. The discipline matters more than
        the amount.
      </p>

      <h3 className="mt-6 text-lg font-semibold text-brand-dark">6. Forecast cash 12 weeks ahead, every week</h3>
      <p className="mt-2 leading-relaxed text-gray-700">
        A weekly 12-week cash flow forecast tells you what next month and
        the month after will look like. Update it every Monday. The first
        month you do this, you&apos;ll discover something you didn&apos;t
        know — a tax payment, a quarterly software bill, a customer
        you&apos;d forgotten was overdue. The forecast is more valuable
        than the forecasting.
      </p>

      <h3 className="mt-6 text-lg font-semibold text-brand-dark">7. Chase overdue invoices aggressively</h3>
      <p className="mt-2 leading-relaxed text-gray-700">
        Polite first reminder one day after due date. Firmer email at day
        7. Phone call at day 14. Cease-supply warning at day 30.
        Invoice-finance handover or small claims at day 60. The longer an
        invoice ages, the less likely it gets paid in full.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The cash conversion cycle</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        The number that captures cash flow health is the{" "}
        <strong>cash conversion cycle</strong> — how many days between
        spending cash on inputs and receiving cash from customers.
      </p>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-brand-light p-4 text-sm font-mono">
{`Cash Conversion Cycle = DIO + DSO − DPO

DIO = Days Inventory Outstanding (how long stock sits)
DSO = Days Sales Outstanding (how long customers take to pay)
DPO = Days Payable Outstanding (how long you take to pay suppliers)

Lower is better. Best-in-class is negative (you collect before you pay).`}
      </pre>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">When the crunch hits anyway</h2>
      <ol className="mt-3 ml-6 list-decimal space-y-2 text-gray-700">
        <li>Delay every non-essential payment by 7–14 days. Suppliers won&apos;t notice.</li>
        <li>Call customers with overdue balances and ask for partial payment now, balance later.</li>
        <li>Pause discretionary marketing spend.</li>
        <li>Talk to your bank before you miss a payment, not after.</li>
        <li>Invoice finance / factoring as a last resort — it&apos;s expensive but fast.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Project yours</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Build a 12-month projection in the{" "}
        <Link href="/cash-flow-calculator" className="text-brand-primary underline">
          Cash Flow Calculator
        </Link>{" "}
        — month-by-month income vs expense with the lowest balance
        highlighted. For startups specifically, the{" "}
        <Link href="/burn-rate-calculator" className="text-brand-primary underline">
          Burn Rate Calculator
        </Link>{" "}
        translates cash flow into runway months.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Bottom line</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>Cash flow ≠ profit. Profitable businesses can run out of money.</li>
        <li>Invoice immediately; chase overdue; take deposits.</li>
        <li>Push supplier terms longer than customer terms whenever possible.</li>
        <li>Maintain 3 months of reserve. Forecast 12 weeks ahead, weekly.</li>
      </ul>
    </>
  );
}
