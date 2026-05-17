import EcommerceProfitCalculator from "@/components/calculators/EcommerceProfitCalculator";
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

const SLUG = "ecommerce-profit-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "ecommerce-profit-calculator",
  title: "Ecommerce Profit Calculator — Amazon, Etsy | BusCalcTools",
  description:
    "Free ecommerce profit calculator. True profit per unit after platform fees, shipping, ads, and VAT. Presets for Amazon FBA, Etsy, eBay, Shopify.",
});

const FAQS = [
  { q: "Why is my ecommerce profit lower than I expected?", a: "Most sellers underestimate their true costs. Platform fees (10–20%), shipping (10–25% of revenue), advertising (10–30%), and payment processing all erode your margin. This calculator adds all these up — the result is often a shock for sellers who only calculated product cost vs. selling price." },
  { q: "What are Amazon FBA fees?", a: "Amazon FBA (Fulfilled by Amazon) charges a referral fee (typically 8–15% depending on category) plus fulfilment fees based on product size/weight (typically $3–$8 per unit). There are also monthly storage fees. Enter your total fee as a percentage of selling price in this calculator." },
  { q: "How do I calculate Etsy profit?", a: "Etsy charges a 6.5% transaction fee, a payment processing fee (3–4%), and a listing fee ($0.20 per item). Enter 6.5% as the platform fee and add the listing fee to your fixed costs. Etsy also collects VAT in the UK and SA on your behalf." },
  { q: "What profit margin should I target in ecommerce?", a: "Target a minimum net profit margin of 20–30% per unit after all fees and costs. Below 15% leaves no room for returns, price competition, or ad spend increases. Below 10% is generally not viable as a sustainable ecommerce business." },
  { q: "How does advertising cost affect ecommerce profitability?", a: "Advertising cost per sale (also called ACOS — Advertising Cost of Sale on Amazon) directly reduces your net profit. An ACOS of 30% on a $30 product means you spend $9 in ads per sale. Tracking ad spend per unit sold (not total campaign spend) is essential for accurate profitability analysis." },
  { q: "How does VAT change my ecommerce profit in the UK and SA?", a: "If you are VAT-registered, the gross selling price is shown inclusive of 20% VAT in the UK or 15% in South Africa. You owe that VAT to HMRC or SARS, so it never reaches your bank account. The calculator strips it out before calculating profit. In the US, sales tax is collected at checkout and remitted to the state — also not your money. Always work in net-of-tax numbers when comparing per-unit profitability." },
  { q: "What is the biggest mistake new ecommerce sellers make on profit?", a: "Pricing based on product cost alone and ignoring variable costs per sale. A $20 product that cost $8 looks like a 60% margin — until you subtract a $3 platform fee, $4 shipping, $3 ad spend, and $0.60 in payment processing. Real net profit is $1.40, or 7%. Run every product through this calculator before launching, and re-run quarterly as fees and ad costs change." },
  { q: "What if I have returns or refunds — how do I factor those in?", a: "Returns are usually expressed as a percentage of orders (5–15% is typical, higher in apparel). To bake them in, increase your platform fee or shipping cost slightly to reflect the real cost per sold-and-kept unit. For example, a 10% return rate on a product that costs $4 to ship adds about $0.40 in absorbed shipping per net sale. Returns also forfeit the original ad spend, so add a small premium to ACOS too." },
  { q: "What if my advertising cost per sale is zero?", a: "That means you are getting all your traffic from organic, repeat, or referral sources — the most profitable kind of revenue. The calculator will return a higher net profit, which is correct, but be cautious about assuming this can scale. Most ecommerce businesses need paid ads to grow beyond their existing audience. Model the same product with a realistic ACOS (20–30%) to see what scaled economics look like." },
  { q: "How is ecommerce profit different from a regular profit margin calculation?", a: "A regular profit margin treats cost as a single COGS line. Ecommerce profit breaks variable costs into four moving parts — product cost, platform fee, shipping, and ads — because each one behaves differently. Platform fees scale with price, shipping scales with weight, and ad cost scales with competition. Treating them separately exposes which lever to pull when margin slips, instead of just \"costs are up.\"" },
];

export default function EcommercePage() {
  return (
    <CalculatorShell
      h1="Ecommerce Profit Calculator — Find Your True Profit Per Sale"
      intro="True per-unit profit after platform fees, shipping, ad spend, and tax. Presets for Amazon FBA, Etsy, eBay and Shopify."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema
        slug={SLUG}
        name="Ecommerce Profit Calculator"
        description="Free ecommerce profit calculator — true per-unit profit after Amazon, Etsy, eBay or Shopify fees."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
      />
      <EcommerceProfitCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Pick the platform you sell on — fee percentage pre-fills. Enter
          your selling price, product cost, shipping cost, and advertising
          cost per sale. For UK and SA, VAT is removed from the gross
          selling price first. What's left after all deductions is what
          actually reaches your bank account per unit sold.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Net Profit = Selling Price − Product Cost − Platform Fee − Shipping − Ad Spend − VAT

Platform Fee = Selling Price × (Platform Fee % / 100)

Example: $29.99 sale | $8 cost | 15% fee | $3.50 shipping | $2 ads
  Platform Fee = $4.50
  Net Profit   = $29.99 − $8 − $4.50 − $3.50 − $2 = $11.99
  Net Margin   = 40%`}
        </pre>
      </FormulaBox>

      <FaqList items={FAQS} />

      <RelatedTools slugs={["profit-margin-calculator", "markup-calculator"]} />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
