import RoeCalculator from "@/components/calculators/RoeCalculator";
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

const SLUG = "roe-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: SLUG,
  title: "ROE Calculator — Return on Equity, Instant | BusCalcTools",
  description:
    "Free return on equity (ROE) calculator. Measures the return generated on shareholders' capital. Health tier and industry-benchmark context for any SMB.",
});

export default function RoePage() {
  return (
    <CalculatorShell
      h1="ROE Calculator — Return on Equity"
      intro="The single most-watched return metric in fundamental investing. Measures how much profit a business generates for each dollar of equity capital — and therefore how productively owner money is being used."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema slug={SLUG} name="ROE Calculator" description="Free return on equity (ROE) calculator with health tier." featureList={META.featureList} applicationSubCategory={META.applicationSubCategory} />
      <HowToSchema slug={SLUG} name={META.howToName} description={META.howToDescription} steps={META.howToSteps} />
      <RoeCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          ROE answers: "How efficiently is this business turning owner capital
          into profit?" A 20% ROE means the business generates 20¢ of after-tax
          profit per dollar of equity per year. Higher is better — but very
          high ROE often signals high leverage, not pure operating excellence.
          Always read ROE alongside debt-to-equity to understand whether the
          return comes from operations or from financial engineering.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`ROE = (Net Income / Shareholders' Equity) × 100

Decision tiers:
  ≥ 20%   →  Excellent — premium-quality public benchmark
  15–20%  →  Strong — at or above S&P 500 long-run average
  8–15%   →  Modest
  < 8%    →  Weak — equity may be better deployed elsewhere
  < 0%    →  Negative — equity destroyed

Du Pont decomposition:
  ROE = Net Margin × Asset Turnover × Equity Multiplier
      = (NI/Revenue) × (Revenue/Assets) × (Assets/Equity)

Example: $60k net income / $400k equity = 15% → Strong`}
        </pre>
      </FormulaBox>

      <FaqList items={META.faqs} />

      <GlossarySection
        items={[
          { term: "ROE", definition: "Return on equity — net income as a percentage of shareholders' equity." },
          { term: "Du Pont identity", definition: "ROE decomposed into margin × turnover × leverage, isolating the three drivers." },
          { term: "Net income", definition: "After-tax profit for the period. The numerator of ROE." },
          { term: "Equity multiplier", definition: "Total assets divided by equity. The leverage component of the Du Pont decomposition." },
        ]}
      />

      <LazyRelatedTools slugs={["roa-calculator", "roi-calculator", "debt-to-equity-calculator", "net-profit-calculator"]} />
      <LazyMethodologyBox slug={SLUG} />
      <Disclaimer />
    </CalculatorShell>
  );
}
