import NetProfitCalculator from "@/components/calculators/NetProfitCalculator";
import CalculatorShell from "@/components/shared/CalculatorShell";
import FormulaBox from "@/components/shared/FormulaBox";
import FaqList from "@/components/shared/FaqList";
import LazyBelowFold from "@/components/shared/LazyBelowFold";
import RelatedTools from "@/components/shared/RelatedTools";
import Disclaimer from "@/components/shared/Disclaimer";
import GlossarySection from "@/components/shared/GlossarySection";
import MethodologyBox from "@/components/shared/MethodologyBox";
import WebAppSchema from "@/components/shared/WebAppSchema";
import HowToSchema from "@/components/shared/HowToSchema";
import { calculatorMetadata } from "@/lib/seo";
import { calcBreadcrumb, calcMeta } from "@/lib/calc-meta";

const SLUG = "net-profit-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "net-profit-calculator",
  title: "Net Profit Calculator — Full Waterfall | BusCalcTools",
  description:
    "Free net profit calculator. Walk revenue down through COGS, OpEx, interest, and tax with a visual waterfall. Region-aware corporate tax for USA, UK, SA.",
});

export default function NetProfitPage() {
  return (
    <CalculatorShell
      h1="Net Profit Calculator — Full Profit Waterfall from Revenue to Net"
      intro="See exactly how revenue becomes bottom-line profit after COGS, operating expenses, interest, and tax."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema
        slug={SLUG}
        name="Net Profit Calculator"
        description="Free net profit calculator with full revenue-to-net-profit waterfall — COGS, OpEx, interest, tax."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
      />
      <NetProfitCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The calculator walks down the income statement: start with revenue,
          deduct COGS to get gross profit, deduct operating expenses for
          operating profit (EBIT), deduct interest for earnings before
          tax (EBT), then deduct tax. What remains is net profit. The
          waterfall on the right shows each step.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Leaving the owner's salary out of OpEx</strong> — sole owners who draw dividends or distributions often skip a salary line entirely, which inflates net profit by their entire labour cost. Always include a market-rate salary for the founder in operating expenses; otherwise the business looks more profitable than it is and every comparison to peers is distorted.
          </li>
          <li>
            <strong className="text-brand-dark">Confusing net profit with cash in the bank</strong> — net profit is an accounting result that recognises revenue when invoiced (not when paid) and includes non-cash items like depreciation. A profitable business can run out of cash, and a loss-making one can be cash-rich. Pair this calculator with the Cash Flow Calculator before making spending decisions.
          </li>
          <li>
            <strong className="text-brand-dark">Applying tax to a loss</strong> — when EBT is negative there is no tax payable in any of the three regions, and the loss can usually be carried forward against future profits. Owners sometimes still book a "tax provision" out of habit, which double-counts the loss. This calculator correctly applies tax only on positive earnings before tax.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">When to use this calculator</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Use this when you want a full income-statement walk from revenue to bottom line, including interest and tax. It is the right tool at year-end, when modelling the impact of a new debt facility, or when explaining to a co-owner where the profit actually ends up.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          If you only need the percentage margins (gross, operating, net) without the dollar waterfall, the Profit Margin Calculator is faster. To assess whether a specific investment generates an acceptable return on capital, use the ROI Calculator instead.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Gross Profit         = Revenue − COGS
Operating Profit     = Gross Profit − Operating Expenses
EBT                  = Operating Profit − Interest Expense
Tax                  = EBT × Tax Rate / 100   (only on positive EBT)
Net Profit           = EBT − Tax
Net Profit Margin    = Net Profit / Revenue × 100`}
        </pre>
      </FormulaBox>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A US bootstrapped SaaS closes the year at $1.2M annual recurring
          revenue. Direct cost of revenue (hosting, third-party APIs,
          customer support salaries) comes to $180,000. Operating expenses
          (engineering and product salaries, marketing, office, software,
          accountancy) total $720,000. The business took a $400,000 term
          loan in year two and pays $40,000 of annual interest on it.
          Federal corporate tax sits at 21%.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Walking the waterfall: gross profit is $1.2M − $180k = $1.02M, an
          85% gross margin (typical for a software business). Operating
          profit is $1.02M − $720k = $300,000, a 25% operating margin.
          Pre-tax profit after the $40k of interest is $260,000. Federal
          tax on that is $54,600. Net profit lands at $205,400 — a 17.1%
          net margin.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A 17% net margin is solid for a bootstrapped SaaS; VC-backed
          companies usually run lower (they re-invest gross profit into
          growth) while mature private-equity-style SaaS targets 25–35%.
          The biggest lever in this waterfall is operating expenses: a 10%
          OpEx reduction ($72k saved) flows almost entirely through to net
          profit and pushes net margin to roughly 22%. Cost discipline at
          the OpEx layer is usually a bigger profit lever than top-line
          revenue growth.
        </p>
      </section>

      <FaqList items={META.faqs} />

      <GlossarySection
        items={[
          { term: "COGS", definition: "Cost of goods sold — the direct costs of producing what you sell. Materials, direct labour, freight in. Excludes overhead and admin." },
          { term: "EBIT", definition: "Earnings before interest and tax — gross profit minus operating expenses. The headline operating-profit number." },
          { term: "EBT", definition: "Earnings before tax — operating profit after deducting interest expense. The base figure for calculating corporate tax." },
          { term: "Net Profit Margin", definition: "Net profit divided by revenue. The percentage of every dollar of sales that becomes profit after all costs and tax." },
        ]}
      />

      <LazyBelowFold minHeight={240} placeholderLabel="Related calculators loading">
        <RelatedTools slugs={["profit-margin-calculator", "roi-calculator"]} />
      </LazyBelowFold>

      <LazyBelowFold minHeight={400} placeholderLabel="Methodology section loading">
        <MethodologyBox slug={SLUG} />
      </LazyBelowFold>

      <Disclaimer />
    </CalculatorShell>
  );
}
