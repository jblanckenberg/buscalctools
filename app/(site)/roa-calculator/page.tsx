import RoaCalculator from "@/components/calculators/RoaCalculator";
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

const SLUG = "roa-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: SLUG,
  title: "ROA Calculator — Return on Assets, Instant | BusCalcTools",
  description:
    "Free ROA calculator. Measures how efficiently a business uses its asset base to generate profit. Health tier with industry-specific benchmark context.",
});

export default function RoaPage() {
  return (
    <CalculatorShell
      h1="ROA Calculator — Return on Assets"
      intro="The cleanest leverage-agnostic measure of operating productivity. Asks: how much profit does each dollar of assets generate? Useful for comparing companies with different capital structures."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema slug={SLUG} name="ROA Calculator" description="Free return on assets (ROA) calculator with health tier." featureList={META.featureList} applicationSubCategory={META.applicationSubCategory} />
      <HowToSchema slug={SLUG} name={META.howToName} description={META.howToDescription} steps={META.howToSteps} />
      <RoaCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          ROA measures operating productivity stripped of capital-structure
          effects. A heavily-leveraged company can show a strong ROE while
          having weak ROA — the difference is the leverage. ROA reveals the
          underlying earning power of the asset base itself. Asset-light
          businesses (software, services) naturally score higher; capital-intensive
          businesses (manufacturing, utilities, transport) naturally score lower.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`ROA = (Net Income / Total Assets) × 100

Decision tiers:
  ≥ 15%   →  Exceptional — asset-light software / services
  8–15%   →  Strong
  4–8%    →  Modest — typical of capital-intensive industries
  < 4%    →  Weak — assets not earning their keep
  < 0%    →  Negative — destroying value

Industry benchmarks (typical):
  Software / SaaS:       15–25%
  Consumer goods:        8–12%
  Manufacturing:         5–8%
  Retail:                5–10%
  Utilities / transport: 2–5%

Example: $80k net income / $1M assets = 8% → Strong`}
        </pre>
      </FormulaBox>

      <FaqList items={META.faqs} />

      <GlossarySection
        items={[
          { term: "ROA", definition: "Return on assets — net income as a percentage of total assets." },
          { term: "Asset turnover", definition: "Revenue divided by total assets. A direct driver of ROA via the Du Pont decomposition." },
          { term: "Total assets", definition: "Cash + AR + inventory + PP&E + intangibles. Everything the business owns." },
          { term: "Asset-light", definition: "A business whose value comes from intangibles or services rather than physical assets — naturally high ROA." },
        ]}
      />

      <LazyRelatedTools slugs={["roe-calculator", "roi-calculator", "net-profit-calculator", "inventory-turnover-calculator"]} />
      <LazyMethodologyBox slug={SLUG} />
      <Disclaimer />
    </CalculatorShell>
  );
}
