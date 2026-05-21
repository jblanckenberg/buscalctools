import BusinessValuationCalculator from "@/components/calculators/BusinessValuationCalculator";
import CalculatorShell from "@/components/shared/CalculatorShell";
import FormulaBox from "@/components/shared/FormulaBox";
import FaqList from "@/components/shared/FaqList";
import Disclaimer from "@/components/shared/Disclaimer";
import LazyMethodologyBox from "@/components/shared/LazyMethodologyBox";
import LazyRelatedTools from "@/components/shared/LazyRelatedTools";
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

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A US plumbing-services business is preparing to sell. Twelve-
          month revenue is $1,400,000. EBITDA — earnings before
          interest, tax, depreciation, and amortisation — is $320,000
          (a 23% EBITDA margin, healthy for skilled-trades services).
          Seller&apos;s Discretionary Earnings (SDE) — EBITDA plus the
          owner&apos;s salary and personal expenses run through the
          business — is $260,000. Three-year average revenue growth is
          8% annually.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Three valuation methods produce three different numbers.
          Revenue multiple at 0.6× (typical for trades services) =
          $840,000. EBITDA multiple at 4.2× (the midpoint of the 3–5×
          range typical for $300k-EBITDA service businesses) =
          $1,344,000. SDE multiple at 3.0× (typical for owner-operator
          businesses) = $780,000. The defensible asking range is
          roughly $850k to $1.35M, with the centre of gravity around
          $1.05M.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The negotiation usually pits seller-anchored SDE against
          buyer-anchored EBITDA. Sellers prefer SDE because the
          owner-salary add-back is real (a new owner won&apos;t draw
          the same salary) — but buyers know they need to install
          professional management, which costs roughly the same. The
          EBITDA multiple is the more honest number for a buyer who
          will not be operating the business hands-on. A reasonable
          deal closes near 4.0× EBITDA = $1.28M with seller financing
          on 20–30% of the price, contingent on a 12-month earn-out
          tied to maintaining 8% growth. Independent SBA-backed
          appraisals are normally required by lenders financing the
          acquisition.
        </p>
      </section>

      <FaqList items={META.faqs} />

      <LazyRelatedTools
        slugs={["net-profit-calculator", "roi-calculator", "revenue-growth-calculator"]}
        surfaceComparisonsForCalc="business-valuation-calculator"
      />

      <LazyMethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
