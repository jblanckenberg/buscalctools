import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead text-lg leading-relaxed text-gray-700">
        Charge 50% markup, and your margin is only 33%. If that sentence
        confused you, you&apos;re in good company — confusing margin and markup
        is one of the most common (and most expensive) pricing mistakes in
        small business. They&apos;re not the same number. This guide explains
        the difference, shows you how to convert between them, and gives
        you a quick reference table you can keep next to your pricing
        sheet.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">
        The one-sentence difference
      </h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        <strong>Markup is a percentage of your cost.</strong> Margin is a
        percentage of your <strong>selling price</strong>. Same sale, same
        profit in dollars — but two completely different percentage numbers.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">
        A worked example
      </h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        You buy widgets for $40 each. You sell them for $60. Your profit per
        widget is $20.
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-1 text-gray-700">
        <li>
          <strong>Markup</strong>: $20 profit ÷ $40 cost = <strong>50% markup</strong>
        </li>
        <li>
          <strong>Margin</strong>: $20 profit ÷ $60 selling price = <strong>33% margin</strong>
        </li>
      </ul>
      <p className="mt-3 leading-relaxed text-gray-700">
        Both numbers describe the same sale. They&apos;re not in conflict — they
        just measure profit against different bases (cost vs. selling price).
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">
        Why this matters: a real pricing disaster
      </h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        A bakery owner once told us: &ldquo;I add 30% to my costs because I
        want a 30% margin.&rdquo; She didn&apos;t — she was getting a 23%
        margin. Over a year of sales, that error cost her tens of thousands
        of dollars in profit she thought she was making.
      </p>
      <p className="mt-3 leading-relaxed text-gray-700">
        If you want a 30% margin on a $40 cost, you need to charge $57.14 —
        which is a 43% markup, not a 30% markup. The conversion formula:
      </p>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-brand-light p-4 text-sm font-mono">
{`Margin (%) = Markup / (100 + Markup) × 100
Markup (%) = Margin / (100 − Margin) × 100`}
      </pre>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">
        Quick-reference conversion table
      </h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-brand-light">
            <tr className="text-left">
              <th className="px-4 py-2 text-brand-dark">Markup</th>
              <th className="px-4 py-2 text-brand-dark">→ Margin</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">10%</td><td className="px-4 py-2">9.1%</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">25%</td><td className="px-4 py-2">20%</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">33%</td><td className="px-4 py-2">25%</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">50%</td><td className="px-4 py-2">33.3%</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">75%</td><td className="px-4 py-2">42.9%</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">100%</td><td className="px-4 py-2">50%</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">200%</td><td className="px-4 py-2">66.7%</td></tr>
            <tr className="border-t border-gray-200"><td className="px-4 py-2">300%</td><td className="px-4 py-2">75%</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-gray-600">
        Notice that to double your money on a sale (100% markup), the margin
        is only 50%. Margin can never exceed 100% — it&apos;s capped by the
        selling price.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">
        Which one should you use?
      </h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Both, depending on the question you&apos;re answering.
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>
          <strong>Use markup when pricing from cost.</strong> &ldquo;What
          should I charge?&rdquo; → Take your cost, apply a markup
          percentage. This is the simplest, fastest pricing method.
        </li>
        <li>
          <strong>Use margin when measuring profitability.</strong>{" "}
          &ldquo;How much of every dollar I bring in is profit?&rdquo; →
          That&apos;s margin. Investors, finance teams, and benchmarking
          all use margin.
        </li>
        <li>
          <strong>Convert between them when comparing.</strong> A supplier
          says they take 30% markup; your accountant says you need 40%
          margin. These are talking about different things — convert one
          to the other before deciding.
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">
        The trap: industry norms vary
      </h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Different industries quote prices in different ways. Retail
        traditionally thinks in markup (&ldquo;keystone&rdquo; means
        100% markup = 50% margin). Restaurants think in margin (a 30%
        food cost = 70% margin on food). Manufacturing thinks in margin.
        Online ad platforms quote in both, often confusingly. Always
        check which one you&apos;re looking at.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">
        Try it yourself
      </h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Use our free{" "}
        <Link href="/markup-calculator" className="text-brand-primary underline">
          Markup Calculator
        </Link>{" "}
        to convert cost to selling price at any markup — it shows the
        equivalent margin side-by-side so you can never mix them up again.
        For measuring your actual business margin, use the{" "}
        <Link href="/profit-margin-calculator" className="text-brand-primary underline">
          Profit Margin Calculator
        </Link>
        . Pricing a new product? The{" "}
        <Link href="/pricing-calculator" className="text-brand-primary underline">
          Pricing Calculator
        </Link>{" "}
        works from either direction (target margin or target markup) and
        adds region-appropriate VAT or sales tax.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">
        Key takeaways
      </h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>Markup is profit ÷ cost. Margin is profit ÷ selling price.</li>
        <li>For the same sale, markup is always a higher percentage than margin.</li>
        <li>50% markup = 33% margin. 100% markup = 50% margin.</li>
        <li>Use markup to set prices; use margin to measure profitability.</li>
        <li>Always confirm which one a supplier, employee, or competitor is quoting before reacting.</li>
      </ul>
    </>
  );
}
