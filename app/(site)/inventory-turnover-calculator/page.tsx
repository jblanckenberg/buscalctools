import InventoryTurnoverCalculator from "@/components/calculators/InventoryTurnoverCalculator";
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

const SLUG = "inventory-turnover-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "inventory-turnover-calculator",
  title: "Inventory Turnover Calculator — Ratio & Days | BusCalcTools",
  description:
    "Free inventory turnover calculator. Find your ratio, days in inventory, and how you compare against industry benchmarks for retail, manufacturing, and B2B.",
});

export default function InventoryTurnoverPage() {
  return (
    <CalculatorShell
      h1="Inventory Turnover Calculator — Ratio & Days in Inventory"
      intro="Calculate how many times per year you turn your inventory and how long average stock sits on the shelf — with industry-benchmark comparison."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema slug={SLUG} name="Inventory Turnover Calculator" description="Free inventory turnover calculator with industry-benchmark guidance." featureList={META.featureList} applicationSubCategory={META.applicationSubCategory} />
      <HowToSchema slug={SLUG} name={META.howToName} description={META.howToDescription} steps={META.howToSteps} />
      <InventoryTurnoverCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Inventory turnover = Cost of Goods Sold ÷ Average Inventory. Average inventory is (beginning + ending) / 2. The ratio tells you how many times per year you completely cycle through your stock. Days in inventory = 365 ÷ turnover — the average number of days a unit sits before being sold.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Low turnover ties up cash, raises holding costs (insurance, warehousing, obsolescence), and risks markdowns. Very high turnover risks stockouts and lost sales. The right number depends on industry: grocery (15-30), apparel retail (4-8), automotive dealers (8-12), heavy machinery (1-3), B2B services or capital goods (1-2). Track yours over time as a leading indicator of operational efficiency.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li><strong className="text-brand-dark">Using revenue instead of COGS.</strong> Some old textbooks use Revenue / Inventory — this overstates turnover by the gross margin percentage. Modern accounting practice is COGS / Inventory; use this.</li>
          <li><strong className="text-brand-dark">Single-snapshot inventory.</strong> Using just the year-end inventory figure (instead of averaging begin + end) distorts seasonal businesses. For a more accurate read, use the average of 12 monthly inventory snapshots — most ERPs export this.</li>
          <li><strong className="text-brand-dark">Treating high turnover as automatically good.</strong> A 50× turnover in a non-perishable goods business may signal chronic stockouts and lost revenue. The right turnover is the one that minimises stockouts AND markdowns simultaneously — usually 6-15 for retail, 5-10 for manufacturing.</li>
        </ul>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Turnover Ratio = Annual COGS / Average Inventory
  Average Inventory = (Beginning + Ending) / 2

Days in Inventory = 365 / Turnover Ratio

Industry Benchmarks (rough medians):
  Grocery / FMCG:           15-30×
  Apparel retail:            4-8×
  Specialty retail:          3-6×
  Restaurants:              30-100× (food spoilage forces fast turns)
  Auto dealers:              8-12×
  Manufacturing:             5-10×
  Heavy machinery / B2B:     1-3×
  Capital goods:             0.5-1.5×

Example: COGS $600,000 | Begin $120k, End $100k
  Avg Inventory  = $110,000
  Turnover       = $600,000 / $110,000 = 5.45× per year
  Days           = 365 / 5.45 ≈ 67 days`}
        </pre>
      </FormulaBox>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A specialty retailer has $600,000 of COGS, $120,000 beginning inventory, $100,000 ending inventory. Average = $110,000. Turnover = 600 / 110 = 5.45×/year. Days in inventory = 365 / 5.45 = 67 days. Versus specialty-retail benchmark of 3-6×, this is healthy.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          What if the same business had $200,000 of inventory instead? Average = $160k, turnover drops to 3.75×, days rise to 97. Same COGS, but the extra $50k tied up in inventory generates carrying costs (insurance, warehousing, capital cost) of typically 15-25% per year — or $7,500-$12,500. Cutting inventory back to $110,000 frees that cash AND reduces carrying costs.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The flip side: cutting too aggressively risks stockouts. A retailer with 9× turnover (40 days) may be losing 5-10% of sales to out-of-stock incidents. The right level is the one that minimises the SUM of holding costs and lost-sales costs — usually 6-8× for specialty retail.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">When to use this calculator</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Use this when you stock physical inventory and want to see whether you are turning it efficiently relative to your sector — retail, wholesale, light manufacturing, or distribution. It is also the right tool when planning a buying cycle, evaluating a slow-moving SKU, or building the working-capital section of a credit application.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          If you sell services rather than goods, inventory turnover is not a relevant metric — switch to the Working Capital Calculator or the Cash Flow Calculator. For a deeper dive into how slow inventory ties up cash, pair this with the Working Capital Calculator to see the cash-conversion-cycle picture.
        </p>
      </section>

      <FaqList items={META.faqs} />

      <GlossarySection
        items={[
          { term: "Turnover Ratio", definition: "Annual cost of goods sold divided by average inventory. How many times you completely cycle through stock in a year." },
          { term: "Days in Inventory", definition: "365 divided by the turnover ratio. The average number of days a unit sits on the shelf before being sold." },
          { term: "Carrying Cost", definition: "The annual cost of holding inventory — insurance, warehousing, capital cost, obsolescence, shrinkage. Typically fifteen to twenty-five percent of average inventory value." },
        ]}
      />

      <LazyBelowFold minHeight={240} placeholderLabel="Related calculators loading">
        <RelatedTools slugs={["working-capital-calculator", "dso-calculator", "cash-flow-calculator"]} />
      </LazyBelowFold>

      <LazyBelowFold minHeight={400} placeholderLabel="Methodology section loading">
        <MethodologyBox slug={SLUG} />
      </LazyBelowFold>

      <Disclaimer />
    </CalculatorShell>
  );
}
