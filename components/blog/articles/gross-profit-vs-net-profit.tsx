import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead text-lg leading-relaxed text-gray-700">
        Two profit numbers, two very different stories. Gross profit makes
        most businesses look healthier than they are; net profit is what
        you actually take home. This guide walks down the income statement
        and shows you why the gap between the two is where most businesses
        die.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The one-line definitions</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Gross profit</strong> = Revenue − Cost of Goods Sold (COGS).</li>
        <li><strong>Net profit</strong> = Revenue − COGS − Operating Expenses − Interest − Tax.</li>
      </ul>
      <p className="mt-3 leading-relaxed text-gray-700">
        Gross profit answers: &ldquo;Does each product sell for more than it
        costs to make?&rdquo;<br />
        Net profit answers: &ldquo;Does the entire business make money after
        running it?&rdquo;
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">A worked example</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        A small ecommerce business does $500,000 in revenue this year.
      </p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">Revenue</td><td className="px-4 py-2 text-right font-mono">$500,000</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">− COGS (products + shipping in)</td><td className="px-4 py-2 text-right font-mono">$250,000</td></tr>
            <tr className="border-b border-gray-200 bg-brand-light"><td className="px-4 py-2 font-semibold">Gross profit</td><td className="px-4 py-2 text-right font-mono font-semibold">$250,000 (50%)</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">− Operating expenses</td><td className="px-4 py-2 text-right font-mono">$150,000</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">− Interest</td><td className="px-4 py-2 text-right font-mono">$8,000</td></tr>
            <tr className="border-b border-gray-200"><td className="px-4 py-2">− Tax (21%)</td><td className="px-4 py-2 text-right font-mono">$19,320</td></tr>
            <tr className="bg-brand-light"><td className="px-4 py-2 font-semibold">Net profit</td><td className="px-4 py-2 text-right font-mono font-semibold">$72,680 (14.5%)</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 leading-relaxed text-gray-700">
        Same business, two stories. &ldquo;50% gross margin&rdquo; sounds
        excellent. &ldquo;14.5% net margin&rdquo; is healthy but not
        spectacular. Both are true.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Why investors care more about net profit</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Net profit is what&apos;s actually available to pay shareholders,
        reinvest, or save. Gross profit is a number on a spreadsheet. A
        business can have stellar gross margin and still be unprofitable
        if overhead is too high — software companies are often this story
        in their early years. A business can have modest gross margin and
        be massively profitable through ruthless cost control (Walmart,
        Costco).
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Why operators care more about gross profit</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Gross profit is the lever you can move quickly. Raise prices, cut
        COGS, change product mix — gross margin moves within a quarter.
        Operating expenses (rent, salaries) are mostly locked in.
        Day-to-day operators focus on gross margin because that&apos;s the
        controllable variable.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Where each gets used</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Pricing decisions:</strong> gross margin. You want each sale to make sense before overhead.</li>
        <li><strong>Tax filing:</strong> net profit. Tax is calculated on net, not gross.</li>
        <li><strong>Loan applications:</strong> both — banks look at debt-service coverage which uses net profit + interest add-back (≈ EBITDA).</li>
        <li><strong>Investor pitches:</strong> gross margin to show scalability; net margin (or path to it) to show viability.</li>
        <li><strong>Selling the business:</strong> net profit and EBITDA — buyers value the bottom line they&apos;ll inherit.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">The trap: rising revenue with falling net margin</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Many small businesses grow revenue happily while net margin shrinks.
        Why? They add staff, software, and office space faster than gross
        profit grows. Revenue doubles, gross profit doubles, but operating
        expenses triple — net profit collapses. Always track gross profit
        per employee and OpEx as a percentage of revenue alongside top-line
        growth.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">See your own numbers</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        For a quick check, use the{" "}
        <Link href="/profit-margin-calculator" className="text-brand-primary underline">
          Profit Margin Calculator
        </Link>
        . For the full revenue-to-net-profit waterfall (the table style
        used in the example above), use the{" "}
        <Link href="/net-profit-calculator" className="text-brand-primary underline">
          Net Profit Calculator
        </Link>
        .
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Bottom line</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>Gross profit = how much each sale clears after direct cost.</li>
        <li>Net profit = what&apos;s left after running the entire business.</li>
        <li>Operators optimise gross; investors value net.</li>
        <li>The gap between the two is your overhead — watch it relative to revenue.</li>
      </ul>
    </>
  );
}
