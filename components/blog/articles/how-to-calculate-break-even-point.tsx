import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead text-lg leading-relaxed text-gray-700">
        Your break-even point is the number of units you need to sell to
        cover all costs — neither making nor losing money. It&apos;s the
        single most useful number in early-stage business planning, and
        90% of business plans get it wrong because they forget half their
        costs.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The formula in one line</h2>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-brand-light p-4 text-sm font-mono">
{`Break-Even Units = Fixed Costs / (Selling Price − Variable Cost Per Unit)

The denominator is called the "contribution margin" —
the profit each unit contributes toward covering fixed costs.`}
      </pre>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Step 1: List your fixed costs</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Fixed costs don&apos;t change with how many units you sell. List
        the monthly amount for each, then sum to get total monthly fixed
        cost. Typical items:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-1 text-gray-700">
        <li>Rent or mortgage on premises</li>
        <li>Salaries (not commissions)</li>
        <li>Insurance, licences, subscriptions</li>
        <li>Software and SaaS subscriptions</li>
        <li>Loan interest payments</li>
        <li>Accountant and legal retainers</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Step 2: Calculate variable cost per unit</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Variable costs change with every unit you sell. Per-unit items:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-1 text-gray-700">
        <li>Raw materials or product cost</li>
        <li>Direct labour to make the unit</li>
        <li>Packaging and shipping out</li>
        <li>Sales commission per unit</li>
        <li>Platform fees (Amazon, Etsy, Stripe)</li>
        <li>Payment processing fees</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Step 3: Calculate contribution margin per unit</h2>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-brand-light p-4 text-sm font-mono">
{`Contribution Margin = Selling Price − Variable Cost

Example: $40 sell price − $15 variable cost = $25 contribution

Each unit you sell contributes $25 toward covering fixed costs.`}
      </pre>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Step 4: Divide and round up</h2>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-brand-light p-4 text-sm font-mono">
{`Fixed Costs $10,000 / month
Contribution Margin $25 per unit
Break-Even Units = 10,000 / 25 = 400 units / month

Always round UP. You don't break even at 399.`}
      </pre>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Step 5: Translate to revenue and timeframe</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        400 units × $40 = $16,000/month break-even revenue. Divide
        $16,000 by 30 days = $533/day or $22/hour during opening hours.
        Now you know exactly what daily volume to watch for.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Common mistakes</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Forgetting your own salary.</strong> Founders often leave themselves out of fixed costs. If you need to pay yourself $4,000/month, add it.</li>
        <li><strong>Treating step costs as fixed.</strong> Some costs are &ldquo;step-fixed&rdquo; — they jump up at certain volumes (one more shift, second warehouse). Calculate break-even within each step.</li>
        <li><strong>Forgetting taxes.</strong> Simple break-even ignores tax, which is fine because tax only kicks in above zero profit. But your &ldquo;target profit&rdquo; calculation needs the pre-tax figure.</li>
        <li><strong>Ignoring seasonality.</strong> Monthly average smooths over a 3-month peak and 9 quiet months. Calculate seasonally if your business is seasonal.</li>
        <li><strong>Per-unit cost confusion.</strong> Bulk discounts mean variable cost per unit drops at volume. Use your most likely scenario, not best case.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Targeting a specific profit</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Once you know break-even, target profit is easy:
      </p>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-brand-light p-4 text-sm font-mono">
{`Units for Target Profit = (Fixed Costs + Target Profit) / Contribution Margin

Example: $10k fixed + $3k profit target = $13k needed
  $13,000 / $25 = 520 units needed`}
      </pre>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">When to recalculate</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Break-even isn&apos;t a one-and-done number. Recalculate whenever:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-1 text-gray-700">
        <li>You change your selling price</li>
        <li>Supplier costs rise or fall by more than 5%</li>
        <li>You hire or fire (changes fixed costs significantly)</li>
        <li>You move premises</li>
        <li>You add a major recurring expense</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Run yours now</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Plug your numbers into the{" "}
        <Link href="/break-even-calculator" className="text-brand-primary underline">
          Break-Even Calculator
        </Link>{" "}
        — it also produces a chart showing your revenue and cost lines
        crossing at the break-even point, which is useful for investor
        decks and bank loan applications. If your variable cost is hard
        to pin down, the{" "}
        <Link href="/cost-per-unit-calculator" className="text-brand-primary underline">
          Cost Per Unit Calculator
        </Link>{" "}
        helps you split fixed from variable costs at different volumes.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Bottom line</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>Break-even = Fixed Costs ÷ Contribution Margin.</li>
        <li>Always round up to whole units.</li>
        <li>Include your own salary in fixed costs.</li>
        <li>Recalculate after any significant price, cost, or staffing change.</li>
      </ul>
    </>
  );
}
