import ProfitMarginCalculator from "@/components/calculators/ProfitMarginCalculator";
import CalculatorShell from "@/components/shared/CalculatorShell";
import FormulaBox from "@/components/shared/FormulaBox";
import FaqList from "@/components/shared/FaqList";
import RelatedTools from "@/components/shared/RelatedTools";
import Disclaimer from "@/components/shared/Disclaimer";
import MethodologyBox from "@/components/shared/MethodologyBox";
import EmbedCTA from "@/components/shared/EmbedCTA";
import WebAppSchema from "@/components/shared/WebAppSchema";
import HowToSchema from "@/components/shared/HowToSchema";
import { calculatorMetadata } from "@/lib/seo";
import { calcBreadcrumb, calcMeta } from "@/lib/calc-meta";

const SLUG = "profit-margin-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "profit-margin-calculator",
  title: "Profit Margin Calculator: Gross & Net Margin | BusCalcTools",
  description:
    "Free profit margin calculator. Get gross, operating, and net margin instantly with region-aware tax for USA, UK, and South Africa. No sign-up — start now.",
  ogTitle: "Profit Margin Calculator — Free, Instant",
});

export default function ProfitMarginPage() {
  return (
    <CalculatorShell
      h1="Profit Margin Calculator — Instant, Free Results"
      intro="Calculate gross, operating, and net profit margin from your revenue and cost figures. Switches automatically between USA, UK, and South Africa tax rates."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema
        slug={SLUG}
        name="Profit Margin Calculator"
        description="Free online profit margin calculator for small businesses — calculates gross, operating, and net margin."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
      />
      <ProfitMarginCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Enter your total revenue and your cost of goods sold (COGS) — the
          direct costs to produce or buy what you sell. Gross profit is what
          remains. Add your operating expenses (rent, salaries, marketing) to
          see operating margin. Add your tax rate to see true net profit
          margin after tax. Results update on every keystroke; there is no
          submit button.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Tax rates pre-fill from your selected region: 21% for the USA
          (federal corporate), 25% for the UK (corporation tax, 19% small
          profits rate applies under £50,000), and 27% for South Africa
          (standard corporate). Override the rate if your business has a
          different effective rate.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Confusing margin with markup</strong> — margin is profit as a percentage of selling price; markup is profit as a percentage of cost. A 50% markup on a $40 cost gives a $60 selling price, but that is only a 33.3% margin. Owners who treat the two as interchangeable typically over-discount and under-earn.
          </li>
          <li>
            <strong className="text-brand-dark">Using gross margin for owner-draw decisions</strong> — gross margin only deducts COGS, so it looks healthy even when rent, payroll, and software are eating the rest. For "how much can I take out of the business?" the right number is net margin, after operating expenses and tax. A 45% gross margin can quietly hide a 4% net margin.
          </li>
          <li>
            <strong className="text-brand-dark">Forgetting payroll taxes and contractor fees</strong> — operating expenses must include employer-side payroll taxes (roughly 7.65% in the US, 15.05% employer NI in the UK), workers' comp, and any contractor or platform fees. Leaving them out can overstate operating margin by 3–5 percentage points.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">When to use this calculator</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Use this calculator when you already have a selling price (or actual revenue) and want to check whether existing margins are healthy or have eroded. It is the right tool for diagnosing why monthly profit is lower than expected and for comparing margins across products in your line-up.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          If you are <em>setting</em> a brand-new price from cost, the Pricing Calculator is more direct. If you want to walk every line of the income statement from revenue down to net profit, use the Net Profit Calculator instead.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Gross Profit Margin (%) = ((Revenue − COGS) / Revenue) × 100

Net Profit Margin (%) = ((Revenue − COGS − Operating Expenses − Tax) / Revenue) × 100

Example: Revenue = $50,000 | COGS = $30,000
  Gross Profit = $20,000
  Gross Profit Margin = (20,000 / 50,000) × 100 = 40%`}
        </pre>
      </FormulaBox>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A specialty coffee roaster trading in the UK closes the year with
          £420,000 of revenue. Cost of goods sold — green beans, packaging,
          freight, and the wages directly tied to roasting — comes to £210,000.
          Operating expenses — café rent, two baristas, accounting software,
          insurance, marketing — total £140,000. Corporation tax is the small
          profits rate of 19% (taxable profit sits below £50,000).
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The waterfall runs as follows: gross profit is £420,000 − £210,000 =
          £210,000, which divided by revenue gives a 50% gross margin —
          healthy for specialty coffee, where 45–55% is typical. Operating
          profit is £210,000 − £140,000 = £70,000, a 16.7% operating margin.
          Corporation tax at 19% on £70,000 is £13,300, leaving £56,700 of net
          profit and a 13.5% net margin.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A 13.5% net margin is comfortably above the 10% small-business floor
          and signals the business is funding owner draws, future stock buys,
          and a small reserve from the same year's trading. If gross margin
          had instead dropped to 40% — perhaps because a coffee-bean
          supplier raised prices and the roaster absorbed the cost — gross
          profit would have fallen to £168,000, operating profit to £28,000,
          and net margin to roughly 5.4%. That single supplier decision is
          the difference between a healthy and a marginal year, and it is the
          kind of erosion this calculator surfaces in seconds.
        </p>
      </section>

      <FaqList items={META.faqs} />

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-brand-dark">Glossary</h2>
        <dl className="mt-3 space-y-3 text-sm text-gray-700">
          <div>
            <dt className="font-semibold text-brand-dark">COGS (Cost of Goods Sold)</dt>
            <dd>The direct cost of producing or buying the goods you sold during a period — raw materials, manufacturing labour, freight in.</dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-dark">Operating Expenses (OpEx)</dt>
            <dd>Ongoing costs to run the business that are not tied to a specific unit sold — rent, salaries, software, marketing.</dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-dark">Net Profit</dt>
            <dd>The bottom-line profit after all costs and taxes have been subtracted from revenue.</dd>
          </div>
        </dl>
      </section>

      <RelatedTools
        slugs={["markup-calculator", "pricing-calculator", "net-profit-calculator"]}
        surfaceComparisonsForCalc="profit-margin-calculator"
      />

      <EmbedCTA slug={SLUG} />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
