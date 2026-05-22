import Link from "next/link";
import CostPerUnitCalculator from "@/components/calculators/CostPerUnitCalculator";
import CalculatorShell from "@/components/shared/CalculatorShell";
import FormulaBox from "@/components/shared/FormulaBox";
import FaqList from "@/components/shared/FaqList";
import Disclaimer from "@/components/shared/Disclaimer";
import GlossarySection from "@/components/shared/GlossarySection";
import LazyMethodologyBox from "@/components/shared/LazyMethodologyBox";
import LazyRelatedTools from "@/components/shared/LazyRelatedTools";
import WebAppSchema from "@/components/shared/WebAppSchema";
import HowToSchema from "@/components/shared/HowToSchema";
import { calculatorMetadata } from "@/lib/seo";
import { calcBreadcrumb, calcMeta } from "@/lib/calc-meta";

const SLUG = "cost-per-unit-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "cost-per-unit-calculator",
  title: "Cost Per Unit Calculator — Total CPU | BusCalcTools",
  description:
    "Free cost per unit calculator. Split fixed and variable cost, get total CPU, and see how unit cost drops at higher production volumes.",
});

export default function CostPerUnitPage() {
  return (
    <CalculatorShell
      h1="Cost Per Unit Calculator — Know Your True Production Cost"
      intro="Split total costs into fixed and variable components, divide by units produced, and see how cost per unit changes with volume."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema
        slug={SLUG}
        name="Cost Per Unit Calculator"
        description="Free cost per unit calculator with volume scaling table showing economies of scale."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
      />
      <CostPerUnitCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Enter your total fixed costs (rent, equipment depreciation),
          total variable costs (materials, labour, packaging), and the
          number of units produced. The calculator returns fixed CPU,
          variable CPU, and total CPU. The volume scaling table shows
          how CPU drops as you produce more — the classic economies-of-scale
          effect.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Skipping owner labour in fixed costs</strong> — a working owner who pays themselves through profit (rather than a salary) often leaves their own time out of total cost. The cost-per-unit number is then understated, sometimes by 30–50%, and every margin downstream is wrong. Always plug in a market-rate salary for the founder before dividing by units.
          </li>
          <li>
            <strong className="text-brand-dark">Using planned volume, not actual</strong> — fixed cost per unit drops with volume only if you actually produce and sell that volume. Calculating CPU based on "100 units this month" when you sold 60 understates true cost by 67%. Use actual or realistic forecast volume, not the capacity number.
          </li>
          <li>
            <strong className="text-brand-dark">Forgetting freight, duties, and wastage</strong> — variable cost is more than the supplier invoice. Inbound freight, import duties, packaging, quality-control rejects, and damage in transit all add to the true variable cost per unit. A 5% wastage rate on a $40 input quietly adds $2 per good unit shipped.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">When to use this calculator</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Use this when production volume is decided and you want to know the per-unit floor your selling price must clear. It is the right tool when planning a manufacturing run, costing a new SKU, or modelling the cost benefit of larger batch sizes.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          If you are trying to figure out the volume you need to hit to cover costs at a given price, use the Break-Even Calculator. Once you have the per-unit cost, the Pricing Calculator turns it into a selling price that hits your target margin.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Fixed Cost Per Unit    = Total Fixed Costs / Number of Units
Variable Cost Per Unit = Total Variable Costs / Number of Units
Total Cost Per Unit    = (Total Fixed + Total Variable) / Number of Units

Example: Fixed $10,000 | Variable $5,000 | 500 units
  Fixed CPU    = $20
  Variable CPU = $10
  Total CPU    = $30`}
        </pre>
      </FormulaBox>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A UK furniture maker produces solid-oak dining chairs in a
          workshop outside Bristol. Monthly fixed costs total £18,000:
          £4,500 workshop lease, £11,200 for two craftsmen including
          employer NI, £900 insurance and utilities, £400 for design
          software and bookkeeping, and £1,000 for machinery depreciation.
          Variable cost per chair is £85: £52 of timber and joinery
          fittings, £20 of finish and fasteners, and £13 of consumables.
          The current production run is 60 chairs per month.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Total monthly cost = £18,000 + (60 × £85) = £23,100. Cost per
          unit = £23,100 ÷ 60 = £385. The fixed-cost component is £300 of
          that £385; variable cost is £85. If the maker increases output
          to 100 chairs per month (same workshop, same craftsmen, longer
          hours), total cost becomes £18,000 + £8,500 = £26,500 and cost
          per unit drops to £265 — a 31% reduction. Dropping to 40 chairs
          a month pushes cost per unit up to £535.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          This is the operating leverage that defines small-scale
          manufacturing: at 60 units the maker needs roughly £540 a chair
          to earn a 40% gross margin; at 100 units the same margin only
          needs £440. Pricing based on variable cost alone is the most
          common manufacturing mistake — an £85 chair priced at "40%
          markup" (£119) sells at a £266 loss against the full £385
          cost-per-unit. Always price against the loaded cost-per-unit at
          a realistic production volume, not the variable cost in
          isolation.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">What COGS actually includes — by business model</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Cost of goods sold (COGS) and cost-per-unit are not the same line item across business models. A manufacturer, an e-commerce retailer, and a professional services firm each draw the COGS boundary in a fundamentally different place — and getting it wrong is the most common cause of cost-per-unit numbers that don't match what an accountant or investor expects to see.
        </p>
        <h3 className="mt-4 text-base font-semibold text-brand-dark">Manufacturing</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Manufacturing COGS comprises three components: <strong className="text-brand-dark">direct materials</strong> (the raw inputs that physically become the product), <strong className="text-brand-dark">direct labour</strong> (the wages of the people who physically build the product), and <strong className="text-brand-dark">manufacturing overhead</strong> (factory rent, factory utilities, machinery depreciation, supervisor salaries, indirect production materials). US manufacturers above roughly $32 million in average gross receipts (the inflation-adjusted small-business exemption threshold under the Tax Cuts and Jobs Act — verify against the current IRS schedule) are forced under Section 263A UNICAP rules to capitalise an even wider set of indirect costs into inventory, including a share of purchasing, handling, and storage costs. Below that threshold the small-business exemption lets you expense those indirect costs in the period incurred.
        </p>
        <h3 className="mt-4 text-base font-semibold text-brand-dark">E-commerce and retail</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          E-commerce COGS is narrower and almost entirely landed-cost driven: <strong className="text-brand-dark">inventory purchase cost</strong> from the supplier, <strong className="text-brand-dark">inbound freight</strong> (ocean, air, last-mile to your warehouse), <strong className="text-brand-dark">import duties and customs broker fees</strong>, and <strong className="text-brand-dark">primary packaging</strong> that ships with the product. What does <em>not</em> belong in e-commerce COGS: customer acquisition cost (Meta and Google ad spend), affiliate commissions, marketplace listing fees on a percentage basis (those are sales expenses), platform subscription fees (Shopify Plus, BigCommerce), and outbound shipping if the customer is charged separately. Treating CAC as COGS — a frequent first-year mistake — overstates COGS and understates the marketing line, distorting both gross margin and contribution margin.
        </p>
        <h3 className="mt-4 text-base font-semibold text-brand-dark">Professional services</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Services-firm COGS is almost entirely <strong className="text-brand-dark">billable labour</strong> (the loaded hourly cost of the people doing client work) plus <strong className="text-brand-dark">direct project expenses</strong> (travel billed to the client, contractor pass-throughs, project-specific software licences). What stays out of services COGS: sales-team salaries, marketing, general administration, office rent for non-billable staff, and per-user SaaS subscriptions for back-office tools. The cleanest dividing line: if the cost would disappear when a client engagement ended, it belongs in COGS; if it persists regardless of whether a project is running, it belongs in SG&A.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Three industry worked examples</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The same calculator answers very different questions in different industries. The three worked examples below show the cost-per-unit breakdown for a manufactured widget at production volume, an e-commerce SKU at landed cost, and a professional-services billable hour at fully-loaded cost.
        </p>
        <h3 className="mt-4 text-base font-semibold text-brand-dark">1. Manufacturing — $14 widget at 10,000 units/year</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A US-based contract manufacturer produces 10,000 units a year of a small consumer-electronics widget. Per-unit variable cost: $6 of direct materials (PCB, enclosure, cable assembly), $3 of direct labour (12 minutes at a fully-loaded $15/hour line rate), and $5 of manufacturing overhead (factory rent, utilities, depreciation, supervision allocated per unit). Total cost per unit = $6 + $3 + $5 = <strong className="text-brand-dark">$14</strong>. Total annual production cost = 10,000 × $14 = $140,000.
          {/* Math verification: $6 materials + $3 labour + $5 overhead = $14/unit. 10,000 units × $14 = $140,000 total. */}
        </p>
        <h3 className="mt-4 text-base font-semibold text-brand-dark">2. E-commerce — $22 landed SKU</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A US Shopify retailer imports a houseware SKU from a Chinese supplier. Per-unit landed cost: $12 supplier cost (FOB Shenzhen), $3.50 inbound ocean and last-mile freight allocated per unit, $2.50 import duty and customs broker fee allocated per unit, $1.50 primary packaging, and $2.50 reserve for returns and breakage (5% of pre-reserve landed cost grossed up across saleable units). Total landed cost per unit = $12 + $3.50 + $2.50 + $1.50 + $2.50 = <strong className="text-brand-dark">$22.00</strong>. Marketing CAC ($18/order at current Meta rates) is deliberately excluded — it sits in SG&A, not COGS.
          {/* Math verification: $12 + $3.50 + $2.50 + $1.50 + $2.50 = $22.00 landed. */}
        </p>
        <h3 className="mt-4 text-base font-semibold text-brand-dark">3. Professional services — $95 fully-loaded hour</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A 10-person consulting firm prices client engagements off a fully-loaded billable hour. The per-hour cost build for a mid-level consultant: $50 base hourly wage ($104,000 annualised at 2,080 hours), $15 employer benefits and payroll taxes (30% load on base — health, retirement match, FICA, FUTA, SUTA), $20 dedicated software and desk allocation (Salesforce, project management, productivity suite, office space per FTE divided across billable hours), and $10 of practice-area overhead (training, certifications, professional liability insurance). Total fully-loaded cost per billable hour = $50 + $15 + $20 + $10 = <strong className="text-brand-dark">$95</strong>. The firm's billing rate of $185/hour produces a gross margin of ($185 − $95) / $185 = 48.6%.
          {/* Math verification: $50 + $15 + $20 + $10 = $95/hr. 30% load on $50 = $15. ($185-$95)/$185 = $90/$185 = 0.4865 = 48.6%. */}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">The volume effect — fixed costs and economies of scale</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Cost-per-unit falls as volume rises because fixed costs are spread across more units. Variable cost-per-unit is approximately constant in the short run (set aside bulk-purchase discounts); fixed cost-per-unit follows a hyperbolic curve down. The slope of that curve is what drives the entire concept of economies of scale.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A worked example makes it concrete. Suppose a small manufacturer has $50,000 in monthly fixed costs (workshop lease, salaried staff, equipment depreciation, insurance) and variable cost of $20 per unit (materials, packaging, hourly production labour). The cost-per-unit at four production volumes:
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-brand-light">
              <tr className="text-left">
                <th className="px-4 py-2 text-brand-dark">Monthly volume</th>
                <th className="px-4 py-2 text-brand-dark">Fixed CPU</th>
                <th className="px-4 py-2 text-brand-dark">Variable CPU</th>
                <th className="px-4 py-2 text-brand-dark">Total CPU</th>
                <th className="px-4 py-2 text-brand-dark">vs 1,000-unit baseline</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-2">1,000 units</td>
                <td className="px-4 py-2">$50.00</td>
                <td className="px-4 py-2">$20.00</td>
                <td className="px-4 py-2"><strong className="text-brand-dark">$70.00</strong></td>
                <td className="px-4 py-2">—</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-2">2,500 units</td>
                <td className="px-4 py-2">$20.00</td>
                <td className="px-4 py-2">$20.00</td>
                <td className="px-4 py-2"><strong className="text-brand-dark">$40.00</strong></td>
                <td className="px-4 py-2">−43%</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-2">5,000 units</td>
                <td className="px-4 py-2">$10.00</td>
                <td className="px-4 py-2">$20.00</td>
                <td className="px-4 py-2"><strong className="text-brand-dark">$30.00</strong></td>
                <td className="px-4 py-2">−57%</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-2">10,000 units</td>
                <td className="px-4 py-2">$5.00</td>
                <td className="px-4 py-2">$20.00</td>
                <td className="px-4 py-2"><strong className="text-brand-dark">$25.00</strong></td>
                <td className="px-4 py-2">−64%</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Math verification:
            1,000 units: $50,000/1,000 = $50 fixed; $50+$20 = $70. baseline.
            2,500 units: $50,000/2,500 = $20 fixed; $20+$20 = $40. ($70-$40)/$70 = 0.4286 ≈ 43%.
            5,000 units: $50,000/5,000 = $10 fixed; $10+$20 = $30. ($70-$30)/$70 = 0.5714 ≈ 57%.
            10,000 units: $50,000/10,000 = $5 fixed; $5+$20 = $25. ($70-$25)/$70 = 0.6429 ≈ 64%.
        */}
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Note the curve's diminishing returns. The jump from 1,000 to 2,500 units delivers a $30/unit cost reduction; the jump from 5,000 to 10,000 only delivers another $5/unit. This is why scale alone stops being a competitive moat past a certain volume — once fixed cost is spread thin enough, marginal-cost arguments (negotiating better variable cost) start dominating. For the inverse question — what volume do I need to cover my fixed cost at a given price — use the <Link href="/break-even-calculator" className="text-brand-primary hover:underline">break-even calculator</Link>.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">The make-vs-buy decision</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          One of the highest-stakes cost-per-unit decisions a growing business makes is whether to bring production in-house or continue outsourcing to a contract manufacturer or supplier. The answer is volume-dependent, and the break-even calculation is the same formula regardless of industry.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The structure: outsourcing has a higher variable cost per unit but no up-front capital commitment. In-house production has a lower variable cost but requires fixed-cost investment (tooling, equipment, dedicated staff). The two curves cross at a specific volume, and below that volume outsourcing wins; above it, in-house wins.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          <strong className="text-brand-dark">Worked example.</strong> A consumer-products company sells 25,000 units a year of a product currently outsourced to a contract manufacturer at a flat $14 per unit. Bringing production in-house would require $200,000 of tooling and equipment investment (amortised as fixed cost) plus $8 per unit of variable cost (materials and direct labour, lower than the contract price because the margin currently going to the contract manufacturer is captured internally). At what annual volume does in-house production become cheaper?
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Set in-house total cost equal to outsourced total cost: $200,000 + ($8 × V) = $14 × V. Solving: $200,000 = ($14 − $8) × V = $6 × V, so V = $200,000 / $6 = <strong className="text-brand-dark">33,333 units</strong>. Below 33,333 units annually, outsourcing wins. Above, in-house wins. At the company's current 25,000-unit volume, outsourcing is the right call by roughly ($14 − $8) × 25,000 − $200,000 = $150,000 − $200,000 = −$50,000 (in-house would <em>lose</em> $50,000 versus outsourcing at this volume).
          {/* Math verification: $200,000 / ($14-$8) = $200,000/$6 = 33,333.33 → 33,333 units. At 25,000: outsourced = $14 × 25k = $350k; in-house = $200k + $8 × 25k = $400k. Outsourcing $50k cheaper. */}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Three caveats to the textbook calculation. First, fixed-cost investments rarely sit at exactly the stated number — add 15-25% contingency for installation, certification, and the learning curve before steady-state throughput. Second, in-house production adds operational complexity (HR, quality control, supply chain management) that doesn't show up in the cost-per-unit but absolutely affects management bandwidth. Third, contract pricing rarely stays flat at the stated $14 — it tends to creep upward year-over-year, which shifts the break-even point downward and eventually justifies the in-house move regardless of current volume.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Marginal vs average cost — when each matters</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Two cost numbers describe the same production run from different angles, and confusing them leads to systematic pricing mistakes. <strong className="text-brand-dark">Average cost per unit</strong> = total cost ÷ total units. <strong className="text-brand-dark">Marginal cost per unit</strong> = the cost of producing exactly one more unit beyond the current volume. They are almost never equal, and they answer fundamentally different questions.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Worked example. A small manufacturer produces 1,000 units a month at $40,000 of total cost — $20,000 fixed plus $20,000 variable at $20 per unit. Average cost per unit = $40,000 ÷ 1,000 = <strong className="text-brand-dark">$40</strong>. Marginal cost of producing the 1,001st unit (assuming spare capacity and no new fixed cost) = $20 — the variable cost of just that one extra unit, since the fixed cost is already covered by the existing 1,000 units. The same business could accept a one-off order at $25/unit and earn $5 of contribution per unit, even though that price is well below the $40 average cost.
          {/* Math verification: 1,000 units, $20k fixed + $20k variable = $40k total. $40k/1,000 = $40/unit avg. Marginal cost with spare capacity = variable only = $20/unit. */}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Which number to use depends on the decision. <strong className="text-brand-dark">Pricing decisions</strong> hinge on marginal cost — a one-off contract or capacity-filling order is profitable any time the price exceeds marginal cost, even if it doesn't cover full average cost. <strong className="text-brand-dark">Investment decisions</strong> hinge on average cost — adding a new product line, expanding capacity, or entering a market is only profitable if the price clears full average cost across the planning horizon. Pricing every order on average cost leaves contribution on the table; pricing every order on marginal cost eventually bankrupts the business because fixed costs never get covered. The discipline is knowing which decision you're making and applying the right number.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common cost-per-unit mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Missing import duty and customs-broker fees in e-commerce COGS</strong> — a $12 FOB-China product looks like it should sell for $30 at a 60% margin until you remember that 5-25% duty, ocean freight, last-mile freight, and customs-broker fees can add $5-10 per unit. The "free" duty rate on most consumer goods imported into the US has narrowed since Section 301 China tariffs went into effect — many SKUs now carry an additional 7.5% or 25% on top of the base HTS rate. Always price off landed cost, never off invoice cost.
          </li>
          <li>
            <strong className="text-brand-dark">Treating CAC as COGS</strong> — customer acquisition cost (paid ad spend, affiliate commissions, influencer fees) is an operating expense, not a cost of goods sold. Including CAC in COGS overstates COGS, understates marketing spend, and distorts gross margin into something that looks alarming to an investor or accountant. Keep them on separate lines: COGS gives you gross margin; gross margin minus CAC gives you contribution margin.
          </li>
          <li>
            <strong className="text-brand-dark">Ignoring returns, refunds, and breakage</strong> — retail and e-commerce see typical return rates of 2-5% (higher in apparel — 10-30% — and in mattresses, where free-return policies push effective rates to 15%+). A 5% return rate on a $20 landed-cost SKU adds roughly $1/unit of unrecoverable cost (return shipping, restocking labour, write-offs on damaged returns) that has to be allocated across the units that <em>do</em> sell. Build a returns reserve into the cost-per-unit calculation; don't ignore it and hope for the best.
          </li>
          <li>
            <strong className="text-brand-dark">Using book depreciation for capex decisions</strong> — book depreciation (straight-line, 5-year MACRS, whatever the accountant runs) is a financial-reporting convention, not a cash-flow reality. For decision-making on whether to buy a piece of equipment, the relevant number is the cash outlay and the cash savings it produces, not the depreciation expense. Use book depreciation for the GAAP cost-per-unit number that flows into the income statement; use cash-flow numbers for the make-vs-buy decision.
          </li>
          <li>
            <strong className="text-brand-dark">Allocating overhead by units instead of by activity driver</strong> — splitting $100,000 of factory overhead across all units equally treats a complex low-volume SKU the same as a simple high-volume one, but the complex SKU likely consumes far more setup time, machine hours, and supervision. Activity-based costing (ABC) allocates overhead by the activity that drives it (machine hours, setups, inspection time), producing materially different per-SKU cost numbers. For the conceptual mechanics, see the cost-plus pricing explainer at <Link href="/blog/cost-plus-pricing-explained" className="text-brand-primary hover:underline">/blog/cost-plus-pricing-explained</Link>, which covers ABC overhead allocation in detail.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How cost-per-unit drives pricing decisions</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Cost-per-unit plays a different role in price-setting depending on the competitive structure of the market. In a true commodity — bulk materials, agricultural staples, generic components — the market price is set externally and cost-per-unit is the <strong className="text-brand-dark">floor</strong>: a producer must either sit below the market clearing price or exit. There's no room for cost-plus markup because the price is given exogenously. Cost-per-unit modelling in this context is about survival and operational discipline, not pricing.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          In B2B services, customised manufacturing, and most professional work, cost-per-unit is the <strong className="text-brand-dark">bottom of the value stack</strong>. The seller calculates a fully-loaded cost-per-unit, applies a target margin to get a floor price, and then layers value-based pricing on top — pricing the same deliverable higher for clients where it produces outsize value. The cost number sets the walk-away threshold; value sets the achievable ceiling. The cost-plus method is covered in detail at <Link href="/blog/cost-plus-pricing-explained" className="text-brand-primary hover:underline">/blog/cost-plus-pricing-explained</Link>; the trade-off versus pure value-based pricing is at <Link href="/blog/value-based-pricing-vs-cost-plus" className="text-brand-primary hover:underline">/blog/value-based-pricing-vs-cost-plus</Link>.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          In consumer products and software, cost-per-unit is often <strong className="text-brand-dark">just one input among many</strong>. A SaaS product with $0.50/user marginal cost can price at $10/user, $100/user, or $1,000/user depending on the segment served and the willingness-to-pay it commands. Cost is not the floor in any operationally meaningful sense at low marginal-cost businesses; pricing is governed by willingness-to-pay, competitive substitutes, and unit-economics targets like LTV/CAC ratio. The cost-per-unit number still matters for gross margin reporting and for marginal-cost decisions on infrastructure scaling, but it's not the primary pricing input.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Related tools and reading</h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
          <li><Link href="/break-even-calculator" className="text-brand-primary hover:underline">Break-even calculator</Link> — once you have the cost-per-unit, this tells you the volume needed at a given price to cover all costs.</li>
          <li><Link href="/markup-calculator" className="text-brand-primary hover:underline">Markup calculator</Link> — applies a markup percentage to cost-per-unit to derive a selling price.</li>
          <li><Link href="/pricing-calculator" className="text-brand-primary hover:underline">Pricing calculator</Link> — turns a cost-per-unit and target margin into a recommended selling price.</li>
          <li><Link href="/blog/cost-plus-pricing-explained" className="text-brand-primary hover:underline">Cost-plus pricing explained</Link> — the full method, ABC overhead allocation, and the trade-offs of margin- versus markup-based pricing.</li>
          <li><Link href="/blog/how-to-reduce-cost-per-unit" className="text-brand-primary hover:underline">How to reduce cost-per-unit</Link> — operational levers (volume, supplier negotiation, automation, waste reduction) that move the number down.</li>
        </ul>
      </section>

      <FaqList items={META.faqs} />

      <GlossarySection
        items={[
          { term: "Fixed Cost Per Unit", definition: "Total fixed costs divided by units produced. This number falls as volume rises — the source of economies of scale." },
          { term: "Variable Cost Per Unit", definition: "The per-unit cost that scales directly with each item produced — materials, packaging, freight, and direct labour." },
          { term: "Loaded Cost", definition: "The fully-allocated cost per unit including both variable and fixed components. The number a price must clear to earn a margin." },
        ]}
      />

      <LazyRelatedTools slugs={["break-even-calculator", "pricing-calculator"]} />

      <LazyMethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
