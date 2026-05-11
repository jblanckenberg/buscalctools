import EcommerceProfitCalculator from "@/components/calculators/EcommerceProfitCalculator";
import CalculatorShell from "@/components/shared/CalculatorShell";
import FormulaBox from "@/components/shared/FormulaBox";
import FaqList from "@/components/shared/FaqList";
import RelatedTools from "@/components/shared/RelatedTools";
import Disclaimer from "@/components/shared/Disclaimer";
import WebAppSchema from "@/components/shared/WebAppSchema";
import { calculatorMetadata } from "@/lib/seo";

export const metadata = calculatorMetadata({
  slug: "ecommerce-profit-calculator",
  title: "Ecommerce Profit Calculator — True Profit After Fees & Shipping",
  description:
    "Calculate true ecommerce profit per unit after Amazon, Etsy or eBay fees, shipping, ad spend and tax. Free for sellers worldwide.",
});

const FAQS = [
  { q: "Why is my ecommerce profit lower than I expected?", a: "Most sellers underestimate their true costs. Platform fees (10–20%), shipping (10–25% of revenue), advertising (10–30%), and payment processing all erode your margin. This calculator adds all these up — the result is often a shock for sellers who only calculated product cost vs. selling price." },
  { q: "What are Amazon FBA fees?", a: "Amazon FBA (Fulfilled by Amazon) charges a referral fee (typically 8–15% depending on category) plus fulfilment fees based on product size/weight (typically $3–$8 per unit). There are also monthly storage fees. Enter your total fee as a percentage of selling price in this calculator." },
  { q: "How do I calculate Etsy profit?", a: "Etsy charges a 6.5% transaction fee, a payment processing fee (3–4%), and a listing fee ($0.20 per item). Enter 6.5% as the platform fee and add the listing fee to your fixed costs. Etsy also collects VAT in the UK and SA on your behalf." },
  { q: "What profit margin should I target in ecommerce?", a: "Target a minimum net profit margin of 20–30% per unit after all fees and costs. Below 15% leaves no room for returns, price competition, or ad spend increases. Below 10% is generally not viable as a sustainable ecommerce business." },
  { q: "How does advertising cost affect ecommerce profitability?", a: "Advertising cost per sale (also called ACOS — Advertising Cost of Sale on Amazon) directly reduces your net profit. An ACOS of 30% on a $30 product means you spend $9 in ads per sale. Tracking ad spend per unit sold (not total campaign spend) is essential for accurate profitability analysis." },
];

export default function EcommercePage() {
  return (
    <CalculatorShell
      h1="Ecommerce Profit Calculator — Find Your True Profit Per Sale"
      intro="True per-unit profit after platform fees, shipping, ad spend, and tax. Presets for Amazon FBA, Etsy, eBay and Shopify."
    >
      <WebAppSchema
        slug="ecommerce-profit-calculator"
        name="Ecommerce Profit Calculator"
        description="Free ecommerce profit calculator — true per-unit profit after Amazon, Etsy, eBay or Shopify fees."
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

      <Disclaimer />
    </CalculatorShell>
  );
}
