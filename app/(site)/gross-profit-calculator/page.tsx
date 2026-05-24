import GrossProfitCalculator from "@/components/calculators/GrossProfitCalculator";
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

const SLUG = "gross-profit-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: SLUG,
  title: "Gross Profit Calculator — Revenue, COGS, Margin | BusCalcTools",
  description:
    "Free gross profit calculator. Enter revenue and COGS to get gross profit in dollars and gross margin percentage, with a health tier comparing your number to industry benchmarks.",
});

export default function GrossProfitPage() {
  return (
    <CalculatorShell
      h1="Gross Profit Calculator — Revenue Minus COGS"
      intro="Calculate the gross profit and gross margin from any revenue and cost-of-goods-sold pair. The first profitability number every founder should know before pricing decisions or operating-cost cuts."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema slug={SLUG} name="Gross Profit Calculator" description="Free gross profit and gross margin calculator." featureList={META.featureList} applicationSubCategory={META.applicationSubCategory} />
      <HowToSchema slug={SLUG} name={META.howToName} description={META.howToDescription} steps={META.howToSteps} />
      <GrossProfitCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Gross profit is what's left when you subtract the direct cost of producing
          what you sold (COGS) from revenue. Gross margin is that profit expressed
          as a percentage of revenue. Both numbers are upstream of all operating
          expenses — rent, marketing, salaries, R&D — and they're the first place
          to look when profitability is slipping. A falling gross margin means
          your pricing isn't keeping up with cost, or your cost is creeping up
          on you. Neither problem is solved by cutting opex.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Gross Profit = Revenue − COGS

Gross Margin (%) = (Gross Profit / Revenue) × 100

Example: Revenue $100,000 | COGS $60,000
  Gross Profit = $40,000
  Gross Margin = 40%

Benchmarks:
  Software / SaaS:        70–90%
  Premium retail / brand: 50–60%
  General retail:         30–45%
  Restaurants:            60–70% (food cost ~30–40%)
  Commodity wholesale:    10–20%`}
        </pre>
      </FormulaBox>

      <FaqList items={META.faqs} />

      <GlossarySection
        items={[
          { term: "Gross profit", definition: "Revenue minus cost of goods sold. The first profitability line before any operating expense is deducted." },
          { term: "Gross margin", definition: "Gross profit as a percentage of revenue. The cleanest period-to-period comparison metric." },
          { term: "COGS", definition: "Cost of Goods Sold — direct costs of producing what you sold: materials, direct labour, inbound freight, packaging." },
          { term: "Operating margin", definition: "Profit after operating expenses (sales, G&A, R&D) but before interest and tax. Always lower than gross margin." },
        ]}
      />

      <LazyRelatedTools slugs={["profit-margin-calculator", "markup-calculator", "net-profit-calculator", "pricing-calculator"]} />

      <LazyMethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
