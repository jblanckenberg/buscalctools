import Link from "next/link";
import ComparisonEmbed from "@/components/compare/ComparisonEmbed";

export default function Article() {
  return (
    <>
      <p className="lead text-lg leading-relaxed text-gray-700">
        Same business, two valuation methods, two completely different answers.
        I&apos;ve watched a $1M-revenue agency get priced at $1.5M on a 3×
        EBITDA multiple and $3M on a discounted cash flow model assuming 15%
        growth and a 12% discount rate. One of those numbers is what the
        business actually sells for. The other is the number that shows up on
        page seven of the broker&apos;s pitch deck. For sub-$5M businesses the
        spread between DCF and multiples is rarely small, and the gap is the
        single most expensive misunderstanding I see owners walk into. This
        guide draws the line: when each method earns its keep, why DCF almost
        always loses for owner-operated deals, and how to use both without
        kidding yourself about the result.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">
        The 30-second difference
      </h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        DCF takes the cash flow you expect to generate over the next 5–10
        years, discounts each year back to today using a weighted average cost
        of capital (WACC), adds a terminal value for everything beyond the
        forecast window, and sums it all up. Multiples skip the forecasting
        and ask a blunter question: what are businesses like yours actually
        selling for right now? You take your trailing-twelve-month EBITDA (or
        SDE, for owner-operated deals under roughly $2M cash flow), look up
        the comparable transaction range from sources like the{" "}
        <a
          href="https://www.bizbuysell.com/insight-report/"
          className="text-brand-primary hover:underline"
          target="_blank"
          rel="noopener"
        >
          BizBuySell Insight Report
        </a>{" "}
        or the IBBA Market Pulse, and multiply. DCF is theoretically rigorous.
        Multiples are empirically how deals actually close.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">
        Side-by-side comparison
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-gray-300 bg-brand-light/40">
              <th className="px-3 py-2 text-left font-semibold text-brand-dark">
                Dimension
              </th>
              <th className="px-3 py-2 text-left font-semibold text-brand-dark">
                DCF
              </th>
              <th className="px-3 py-2 text-left font-semibold text-brand-dark">
                Multiples
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-3 py-2 font-semibold">Inputs required</td>
              <td className="px-3 py-2">
                5-year forecast (revenue, costs, capex, working capital),
                WACC, terminal growth rate, terminal multiple or perpetuity
                formula.
              </td>
              <td className="px-3 py-2">
                Last twelve months EBITDA or SDE, plus a comp set from
                BizBuySell, Pratt&apos;s Stats / DealStats, or industry
                rules-of-thumb.
              </td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-semibold">Time to run</td>
              <td className="px-3 py-2">
                Several hours to build properly, plus a few days arguing with
                your accountant about the discount rate.
              </td>
              <td className="px-3 py-2">
                Ten minutes once your add-backs are clean and you&apos;ve
                pulled the comp range.
              </td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-semibold">Sensitivity</td>
              <td className="px-3 py-2">
                Enormous. A one-point change in WACC shifts the answer
                10–15%. Terminal growth is where most valuations get cherry-
                picked.
              </td>
              <td className="px-3 py-2">
                Moderate. Depends on the quality of your comp set; one
                outlier deal in a thin market skews everything.
              </td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-semibold">Buyer credibility</td>
              <td className="px-3 py-2">
                Loved by PE buyers and family offices who run their own DCF
                anyway. Treated with polite suspicion by strategic buyers.
              </td>
              <td className="px-3 py-2">
                The default language of brokers, lenders (SBA underwriters
                think in multiples), and most strategic buyers under $5M.
              </td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-semibold">Best for</td>
              <td className="px-3 py-2">
                High-growth businesses, recurring-revenue SaaS, deals over
                $5M enterprise value, or anything with no usable comp set.
              </td>
              <td className="px-3 py-2">
                Sub-$5M owner-operated deals, &ldquo;main street&rdquo;
                businesses with deep comp data, retirement sales, strategic
                acquisitions.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-6 leading-relaxed text-gray-700">
        Plug in your revenue, EBITDA, and growth rate to see both methods
        side-by-side. The calculator outputs a revenue multiple, an EBITDA
        multiple, an SDE multiple where relevant, and a five-year DCF — so
        you can see exactly where the methods agree, where they diverge,
        and which assumptions are doing the heavy lifting on the DCF side.
      </p>

      <ComparisonEmbed slug="business-valuation-calculator" />

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">
        Worked example: a $1M revenue agency
      </h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Let&apos;s run real numbers. Digital marketing agency, $1M in revenue,
        $500k EBITDA (a 50% margin is normal for a well-run boutique services
        firm), 15% revenue growth over the last three years, owner-operated
        with six employees, retainer-based revenue at roughly 90% recurring.
        Owner pays themselves $150k a year, which means seller&apos;s
        discretionary earnings (SDE) is $650k once you add the owner&apos;s
        comp back. This is a healthy, sellable business.
      </p>
      <p className="mt-3 leading-relaxed text-gray-700">
        <strong>Multiples valuation.</strong> The 2024–2025 BizBuySell and
        IBBA data put sub-$5M digital marketing agencies at roughly 3–5× SDE,
        with retainer-heavy shops landing nearer the top of the band. At 3.5×
        SDE the agency is worth $2.275M. At 4.5× it&apos;s $2.925M. Call it
        $2.5M as a midpoint. That number is defensible because there are
        recently-closed comparables behind it.
      </p>
      <p className="mt-3 leading-relaxed text-gray-700">
        <strong>DCF valuation.</strong> Project five years at 12% growth
        (we&apos;ve trimmed it from 15% on the assumption that growth slows),
        hold the 50% EBITDA margin flat, assume 3% terminal growth and a 14%
        WACC (a fair number for a small private business with no debt — sanity
        check it against{" "}
        <a
          href="https://pages.stern.nyu.edu/~adamodar/"
          className="text-brand-primary hover:underline"
          target="_blank"
          rel="noopener"
        >
          Damodaran&apos;s industry cost-of-capital tables
        </a>
        ). Year-one cash flow is $560k, then $627k, $702k, $786k, and $881k by
        year five. Terminal value is $881k × 1.03 / (0.14 − 0.03) = $8.25M,
        which present-values back to roughly $4.29M. Sum the present value of
        years 1–5 (about $2.34M) and the discounted terminal value, and you
        land at an enterprise value near $6.6M.
      </p>
      <p className="mt-3 leading-relaxed text-gray-700">
        <strong>The spread.</strong> DCF says $6.6M. Multiples say $2.5M.
        That&apos;s a 2.6× gap on the exact same business with the exact same
        cash flows. Which is right? Multiples. If this agency hits the open
        market, the broker will pitch $5M-plus in the deck, qualified buyers
        will counter at $2–3M, and the deal will close somewhere around
        $2.5–3M. DCF gives the seller a number that assumes the buyer pays
        today for cash flows the buyer has to earn themselves. That&apos;s
        exactly the conversation every buyer is trying not to have. DCF
        flatters the seller; multiples flatter the buyer; the deal closes
        near the multiples number.
      </p>
      <p className="mt-3 leading-relaxed text-gray-700">
        And the DCF number isn&apos;t even stable. Drop the assumed growth
        rate from 12% to 8% (still healthy for a mature agency), and the
        enterprise value drops to roughly $5.6M. Bump the WACC from 14% to
        17% to account for key-person risk (it&apos;s a six-person shop
        where the owner is the rainmaker), and you&apos;re back near $4.5M.
        Do both at once and you&apos;re at $3.8M — getting closer to the
        multiples answer, which is the point. The multiples number is
        roughly what you get when you stop assuming the future will be
        kinder than the present.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">
        When DCF is the right method
      </h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        DCF earns its keep in four specific situations.
      </p>
      <p className="mt-3 leading-relaxed text-gray-700">
        First, high-growth businesses. If you&apos;re compounding at 30% a
        year, current EBITDA is a bad anchor — by the time the deal closes,
        next year&apos;s number is already meaningfully bigger. DCF captures
        the trajectory; a trailing multiple penalises you for not having
        already grown into the future you can credibly forecast.
      </p>
      <p className="mt-3 leading-relaxed text-gray-700">
        Second, deals over roughly $5M enterprise value, which is also the
        upper end of SBA 7(a) loan eligibility and where the buyer pool
        starts to skew toward financial sponsors. PE firms, family offices,
        and search funds run a DCF internally whether you present one or not.
        Showing them yours, with the assumptions on the table, is a credibility
        move. Hand-waving the multiple is not.
      </p>
      <p className="mt-3 leading-relaxed text-gray-700">
        Third, predictable contracted cash flows. Long-dated SaaS contracts,
        regulated utilities, infrastructure, anything where the next five
        years of revenue is genuinely visible. DCF rewards predictability with
        a higher present value; multiples lump you in with messier comps and
        leave money on the table.
      </p>
      <p className="mt-3 leading-relaxed text-gray-700">
        Fourth, niche businesses with no usable comp set. A patent-licensing
        shop, a vertical software company with three competitors none of whom
        have transacted recently, a specialty manufacturer with a unique
        moat. When there are no comparables, DCF isn&apos;t the best option,
        it&apos;s the only option.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">
        When multiples are the right method
      </h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        For most sub-$5M EBITDA businesses, multiples win on every dimension
        that matters: speed, defensibility, and alignment with how the buyer
        is actually thinking.
      </p>
      <p className="mt-3 leading-relaxed text-gray-700">
        Owner-operated &ldquo;main street&rdquo; businesses — HVAC contractors,
        dental practices, accounting firms, restaurants, e-commerce shops — sit
        squarely in the multiples zone. The comp data is plentiful (BizBuySell
        publishes a free quarterly Insight Report; the IBBA Market Pulse is also
        free; Pratt&apos;s Stats / DealStats is the paid gold standard), the
        buyer is usually another small operator, and the deal closes on a
        rule-of-thumb multiple that the buyer&apos;s lender has already
        green-lit. Service businesses typically transact at 2–4× SDE; product
        and e-commerce often 3–5×; niche software pushes 4–8×.
      </p>
      <p className="mt-3 leading-relaxed text-gray-700">
        Strategic buyers — the industry acquirer who has bought ten of these
        in the last five years — already have the multiple in their head
        before they open your information memorandum. Trying to talk them
        out of it with a 40-tab DCF model is a poor use of negotiating
        leverage. Meet them on their terms, then negotiate the multiple up
        with quality-of-earnings evidence.
      </p>
      <p className="mt-3 leading-relaxed text-gray-700">
        SDE-based deals (anything under roughly $2M of cash flow) live and
        die on multiples because reported EBITDA understates what an
        owner-operator actually takes home. The standard comp data for this
        band is published in SDE terms, not EBITDA terms — fight that and
        you&apos;ll look like an amateur.
      </p>
      <p className="mt-3 leading-relaxed text-gray-700">
        Distressed sales and retirement deals are the third clear case: the
        value sits in the customer book and key contracts, not in a five-year
        growth story, so a forward-looking DCF tends to overstate things and
        get re-priced in due diligence.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">
        The honest answer: use both
      </h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Triangulate. Run both methods and report both in the information
        memorandum. Here&apos;s the rule I use: roughly 80% of small-business
        deals close within 20% of the multiples number. So lead with the
        multiple, and let DCF do sanity-check duty. If your DCF comes out 3×
        higher than your multiples number, your growth or margin assumptions
        are too rich and a smart buyer will tear them apart in diligence. If
        DCF comes out below the multiples number, the multiples in your
        sector are probably inflated and the deal will get re-priced down
        anyway — better to know now than during exclusivity.
      </p>
      <p className="mt-3 leading-relaxed text-gray-700">
        For sellers: anchor the conversation on the multiple (it&apos;s where
        the buyer&apos;s head already is) and use the DCF to defend any
        premium you&apos;re asking for above the comp range. For buyers: build
        your own DCF whether or not the seller hands you one, so you
        understand the assumption stack that the broker is selling you. If
        their valuation needs 20% growth for five years and your industry
        runs at 5%, walk. A professional valuation from a credentialed
        appraiser (ASA, CVA, or ABV) typically runs $5–10k and is worth it
        on deals north of $2M, anything that&apos;ll be financed by an SBA
        7(a) loan (the lender will require one anyway), or any partner
        buyout where the price will be litigated later. Below that, a clean
        spreadsheet, the free BizBuySell and IBBA reports, and a properly
        adjusted EBITDA line will do the same job for free.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">
        Four mistakes I keep seeing
      </h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        <strong>Using public-company multiples on a private SME.</strong>{" "}
        Publicly traded comparables trade at premium multiples because they
        offer liquidity, governance, and scale that your business does not.
        Haircut a public multiple by 30–40% before you even start, then
        haircut again for size. A listed marketing services group trading at
        10× EBITDA does not mean your $500k-EBITDA agency is worth $5M.
      </p>
      <p className="mt-3 leading-relaxed text-gray-700">
        <strong>Forecasting 20% growth forever in your DCF.</strong> Terminal
        value typically accounts for 50–70% of the total DCF answer, and
        terminal value is exquisitely sensitive to the long-run growth rate
        you assume. Anything above 3–4% in perpetuity is mathematically
        equivalent to claiming you&apos;ll eventually own the global economy.
        Buyers know this. Cap terminal growth at GDP-plus-a-bit and you&apos;ll
        save yourself an awkward diligence call.
      </p>
      <p className="mt-3 leading-relaxed text-gray-700">
        <strong>Ignoring (or overstating) owner add-backs in EBITDA.</strong>{" "}
        A clean quality-of-earnings exercise will normalise owner comp to
        market rate, strip out one-off expenses, and remove personal items
        the owner ran through the business. Skip this and the buyer&apos;s
        accountant will do it for you, less generously. Overdo it (every
        dinner is &ldquo;client development&rdquo;) and the buyer will
        discount the whole add-back schedule.
      </p>
      <p className="mt-3 leading-relaxed text-gray-700">
        <strong>Not pricing in customer concentration.</strong> If one
        customer is more than 20% of revenue, every buyer will haircut both
        the multiple and the DCF cash flows for risk. If it&apos;s more than
        40%, half your buyer pool walks away regardless of method. Disclose
        it early, price it in honestly, and consider whether you can
        diversify before going to market.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">
        Related guides
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-gray-700">
        <li>
          <Link
            href="/blog/how-to-value-a-business-to-sell"
            className="text-brand-primary hover:underline"
          >
            How to Value a Business to Sell: A 2026 Owner&apos;s Guide
          </Link>
        </li>
        <li>
          <Link
            href="/blog/ebitda-vs-net-profit"
            className="text-brand-primary hover:underline"
          >
            EBITDA vs Net Profit: Which Number Actually Matters?
          </Link>
        </li>
      </ul>
    </>
  );
}
