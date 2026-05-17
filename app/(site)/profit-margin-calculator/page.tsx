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

const FAQS = [
  {
    q: "What is a good profit margin for a small business?",
    a: "A gross profit margin above 40% is considered strong for most product businesses. Service businesses typically see higher margins (50–70%). Net profit margins of 10–20% are healthy for most small businesses. Use this calculator to benchmark your margin against these targets.",
  },
  {
    q: "What is the difference between profit margin and markup?",
    a: "Profit margin is calculated as a percentage of your selling price. Markup is calculated as a percentage of your cost. A 50% markup on a $10 cost gives a $15 selling price — but the margin on that sale is only 33%. They are different numbers for the same transaction.",
  },
  {
    q: "How do I calculate gross profit margin?",
    a: "Gross profit margin = ((Revenue − Cost of Goods Sold) / Revenue) × 100. For example, if you earn $100,000 in revenue and your COGS is $60,000, your gross profit is $40,000 and your gross margin is 40%.",
  },
  {
    q: "What is net profit margin?",
    a: "Net profit margin is your profit as a percentage of revenue after ALL costs — including COGS, operating expenses, interest, and taxes. It is the true bottom-line profitability measure. A 10% net margin means you keep $10 for every $100 of revenue earned.",
  },
  {
    q: "How is profit margin different in the UK vs USA?",
    a: "The calculation method is identical, but tax rates differ. In the UK, corporation tax is 25% (19% for profits under £50,000). In the USA, federal corporate tax is 21%, with additional state-level taxes. This calculator automatically adjusts for your selected region.",
  },
  {
    q: "What is the difference between gross, operating, and net margin?",
    a: "Gross margin deducts only the direct cost of producing what you sell. Operating margin also deducts rent, salaries, marketing, and other running costs — it shows how efficient the business is before financing and tax. Net margin deducts interest and tax too. The three numbers should always step down: gross > operating > net.",
  },
  {
    q: "What does it mean if my net profit margin is negative?",
    a: "A negative net margin means your total costs (COGS, operating expenses, interest, and tax) exceed your revenue — you are running at a loss for that period. Short-term losses are normal during early growth or seasonal dips, but a consistently negative margin signals either underpricing, bloated overheads, or weak demand. Diagnose by checking which line in the waterfall flips the result negative.",
  },
  {
    q: "What is the most common profit margin mistake?",
    a: "Confusing markup with margin is the most expensive error in small business. A shop owner applying \"50% markup\" thinking it equals a 50% margin actually earns only 33.3%. On annual revenue of $500,000 that gap is roughly $80,000 of profit gone missing. Always calculate the margin separately rather than assuming the markup percentage is what you keep.",
  },
  {
    q: "My revenue is zero — why does the margin show an error?",
    a: "Profit margin divides profit by revenue. When revenue is zero the calculation is mathematically undefined (division by zero), so the calculator shows a dash or error rather than a misleading 0% or 100%. Enter a non-zero revenue figure to see results. If you genuinely had no sales in the period, margin is not a meaningful metric — track cash burn instead.",
  },
  {
    q: "I have my margin number — what should I do with it?",
    a: "Compare it to your industry benchmark (10–20% net is healthy for most small businesses) and to your own prior periods. If margin is falling, the cause is usually either rising COGS (renegotiate suppliers), rising overhead (audit fixed costs), or undisciplined discounting (test smaller promotions). If margin is healthy but profit is small, the lever is volume — focus on driving more revenue at the same margin.",
  },
];

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

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Gross Profit Margin (%) = ((Revenue − COGS) / Revenue) × 100

Net Profit Margin (%) = ((Revenue − COGS − Operating Expenses − Tax) / Revenue) × 100

Example: Revenue = $50,000 | COGS = $30,000
  Gross Profit = $20,000
  Gross Profit Margin = (20,000 / 50,000) × 100 = 40%`}
        </pre>
      </FormulaBox>

      <FaqList items={FAQS} />

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
