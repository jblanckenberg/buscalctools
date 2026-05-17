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

const FAQS = [
  { q: "How do I value a small business?", a: "The three most common methods for valuing a small business are: (1) Revenue Multiple — annual revenue × an industry-specific multiple, (2) EBITDA Multiple — earnings before interest/tax × a multiple (most reliable for profitable businesses), and (3) Discounted Cash Flow — present value of projected future cash flows." },
  { q: "What multiple is used to value a small business?", a: "Multiples vary by industry and profitability. Service businesses typically sell at 2–4× EBITDA. SaaS businesses at 4–10× revenue. Retail at 0.5–1.5× revenue. Manufacturing at 4–6× EBITDA. Businesses with strong recurring revenue and low customer concentration command higher multiples." },
  { q: "What makes a business more valuable?", a: "Key value drivers: recurring or contracted revenue, high customer retention, documented systems and processes (not owner-dependent), diversified customer base, strong brand, barriers to competition, and consistent year-on-year growth. Businesses that run without the owner command the highest multiples." },
  { q: "How much can I sell my business for on Flippa?", a: "Online businesses (content sites, SaaS, ecommerce) on Flippa typically sell for 30–42× monthly net profit. A site earning $3,000/month net would sell for $90,000–$126,000. Larger, more established businesses with proven traffic sell at higher multiples." },
  { q: "What is EBITDA and why is it used for business valuation?", a: "EBITDA (Earnings Before Interest, Tax, Depreciation, and Amortisation) is used because it removes non-cash charges and financing decisions, giving a cleaner picture of operational profitability that buyers can compare across businesses with different capital structures and tax situations." },
  { q: "Do business valuations differ in the US, UK, and South Africa?", a: "Methods are universal but multiples vary. US small businesses typically sell at 3–5× EBITDA (higher in tech), UK SMEs at 4–6× EBITDA (boosted by easier acquisition financing), and South African businesses at 2–4× EBITDA (higher country risk discount and thinner buyer pool). DCF discount rates also differ: 10–12% US, 9–11% UK, 14–18% SA. The same business is often worth 30–50% less in SA than in the US for structural reasons." },
  { q: "What is the most common business valuation mistake?", a: "Confusing what the owner thinks the business is worth (often based on years of effort and personal investment) with what a buyer will actually pay (based on future cash flow they'll inherit). Buyers don't care about sunk effort. Always start with the multiple methods (revenue, EBITDA, DCF) and treat the range they produce as the negotiation window — anchoring to a single number, especially a wishful one, kills deals." },
  { q: "What if my business is making a loss or has zero EBITDA?", a: "EBITDA-based valuation breaks down — a loss-making business cannot be valued on a multiple of negative earnings. Switch to revenue multiple (works for high-growth businesses without profit) or asset-based valuation (value of inventory, equipment, IP, customer contracts). Many software startups sell at 4–10× revenue even at a loss because buyers project future profitability. A traditional business with no profit usually sells at 0.3–0.8× revenue or for asset value only." },
  { q: "I have my valuation range — what do I do with it?", a: "Three uses. One: if selling, set the asking price at the top of the range and negotiate down toward the midpoint. Two: if buying, anchor your offer near the bottom of the range and use due diligence findings to justify staying low. Three: even if not transacting, the valuation is your scorecard — track it annually, and the levers that move it (recurring revenue, owner-independence, customer concentration) become your strategic priorities." },
  { q: "How is business valuation different from a fair price?", a: "Valuation is an analytical estimate based on numbers — EBITDA multiples, DCF assumptions, comparables. Fair price is what the market actually pays, which depends on negotiation, buyer competition, deal terms, and timing. A business valued at $500K via DCF might sell for $400K to a single buyer in a slow market, or $650K in a bidding war. Use valuation to know your defensible range; expect the actual price to land within it but rarely at the calculated midpoint." },
];

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

      <FaqList items={FAQS} />

      <RelatedTools
        slugs={["net-profit-calculator", "roi-calculator", "revenue-growth-calculator"]}
        surfaceComparisonsForCalc="business-valuation-calculator"
      />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
