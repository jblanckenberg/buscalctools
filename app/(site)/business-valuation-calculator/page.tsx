import BusinessValuationCalculator from "@/components/calculators/BusinessValuationCalculator";
import CalculatorShell from "@/components/shared/CalculatorShell";
import FormulaBox from "@/components/shared/FormulaBox";
import FaqList from "@/components/shared/FaqList";
import RelatedTools from "@/components/shared/RelatedTools";
import Disclaimer from "@/components/shared/Disclaimer";
import MethodologyBox from "@/components/shared/MethodologyBox";
import WebAppSchema from "@/components/shared/WebAppSchema";
import HowToSchema from "@/components/shared/HowToSchema";
import { calculatorMetadata } from "@/lib/seo";
import { calcBreadcrumb, calcMeta } from "@/lib/calc-meta";

const SLUG = "business-valuation-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "business-valuation-calculator",
  title: "Business Valuation Calculator — 3 Methods | BusCalcTools",
  description:
    "Free business valuation calculator. Revenue multiple, EBITDA multiple, and 5-year DCF side-by-side. Get a defensible range, not just a single number.",
});

export default function BusinessValuationPage() {
  return (
    <CalculatorShell
      h1="Business Valuation Calculator — Estimate Your Business Worth"
      intro="Three standard valuation methods side-by-side — revenue multiple, EBITDA multiple, and a 5-year discounted cash flow with terminal value."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema
        slug={SLUG}
        name="Business Valuation Calculator"
        description="Free business valuation calculator using revenue multiple, EBITDA multiple, and DCF methods."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
      />
      <BusinessValuationCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The calculator runs three valuation methods in parallel: revenue
          times an industry multiple (good for high-growth businesses
          without profit yet), EBITDA times a multiple (most common for
          profitable SMEs), and a discounted cash flow projection
          (rigorous but assumption-heavy). The range across the three
          methods is more useful than any single number — buyers and
          sellers should expect to negotiate within that range.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Anchoring to a single number</strong> — owners often quote one valuation figure as if it were the price. A buyer will run the same three methods and produce their own range. The realistic deal happens inside the overlap of the two ranges. Always present a range and treat the midpoint as a starting point for negotiation, not a fact.
          </li>
          <li>
            <strong className="text-brand-dark">Confusing sunk effort with value</strong> — a buyer is purchasing future cash flow they will inherit, not the years of work that built the business. Time, founder sacrifice, and personal capital invested do not appear in any valuation formula. Strip emotional attachment to the cost basis before negotiating; otherwise asking prices drift 30–50% above any defensible number.
          </li>
          <li>
            <strong className="text-brand-dark">Using inflated EBITDA</strong> — "owner-adjusted" or "addback" EBITDA often pads the number with personal expenses run through the business, one-off legal fees, or above-market owner salary normalised back to zero. Most buyers reverse aggressive addbacks during due diligence and renegotiate the price downward. Use a conservative EBITDA and let the buyer find the upside themselves.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">When to use this calculator</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Use this when preparing for a sale, evaluating an acquisition, raising equity capital, or setting a defensible internal valuation for share buybacks, ESOP grants, or estate planning. The three-method range is also a useful annual scorecard even when no transaction is planned.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          If you are evaluating a single investment within the business rather than the whole entity, the ROI Calculator or Payback Period Calculator is more focused. To project the revenue trajectory that feeds the valuation, the Revenue Growth Calculator is the right starting point.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Revenue Valuation = Annual Revenue × Revenue Multiple
EBITDA Valuation  = EBITDA × EBITDA Multiple

DCF Valuation:
  Year N PV       = FCF × (1+growth)^N / (1+discount)^N
  Terminal Value  = FCF × (1+growth)^6 / (discount − growth)
  Total DCF       = Sum of 5-year PVs + PV of Terminal Value`}
        </pre>
      </FormulaBox>

      <FaqList items={META.faqs} />

      <RelatedTools
        slugs={["net-profit-calculator", "roi-calculator", "revenue-growth-calculator"]}
        surfaceComparisonsForCalc="business-valuation-calculator"
      />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
