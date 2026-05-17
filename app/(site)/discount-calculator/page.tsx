import DiscountCalculator from "@/components/calculators/DiscountCalculator";
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

const SLUG = "discount-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "discount-calculator",
  title: "Discount Calculator — Sale Price & % Off | BusCalcTools",
  description:
    "Free discount calculator. Sale price, savings amount, and effective % off — forward or reverse mode. Bulk savings table for volume pricing decisions.",
});

const FAQS = [
  { q: "How do I calculate a discount?", a: "Discounted Price = Original Price × (1 − Discount Percentage / 100). If a $100 item is 25% off, the discount is $25 and the sale price is $75. The savings amount is the original price minus the discounted price." },
  { q: "How do I calculate the percentage off from two prices?", a: "Percentage off = ((Original Price − Sale Price) / Original Price) × 100. If a $100 item is selling for $70, the discount is 30%. Use this calculator's reverse mode to do this automatically." },
  { q: "What is a good discount percentage to offer?", a: "Typical retail discounts run 10–40%. Below 10% rarely drives action. Above 50% can signal poor quality or hurt brand perception unless framed as a clearance event. Consider your margin — a 30% discount on a 35% margin product nearly eliminates profit." },
  { q: "How do I calculate bulk savings?", a: "Multiply the per-unit savings by the quantity. If each unit saves $5 and you buy 100 units, total bulk savings is $500. The bulk savings table in this calculator does this automatically for typical quantities." },
  { q: "Should I offer a percentage or a dollar discount?", a: "Percentages feel larger on low-priced items (\"50% off!\" on $20). Dollar amounts feel larger on high-priced items (\"$200 off!\" on $1000). Research shows customers respond more strongly to the framing that produces the bigger number." },
  { q: "Are discounts taxed differently in the UK, US, and SA?", a: "VAT in the UK (20%) and South Africa (15%) is calculated on the discounted price, so the customer pays less tax as well as less for the item. US sales tax works the same way at the state level — it applies to the post-discount amount. The exception is manufacturer coupons in the US, where some states tax the pre-coupon price. This calculator handles the standard case." },
  { q: "What is the most common discounting mistake?", a: "Discounting deeper than the margin can absorb. A 30% discount on a product with a 35% gross margin cuts your profit per sale from 35% to roughly 7%. To break even on profit you would need to nearly quintuple unit sales to compensate. Always check the post-discount margin (use the Profit Margin Calculator) before publishing the offer, not after the campaign ends." },
  { q: "What if the discount is 100% or more?", a: "A 100% discount means the item is free — sale price is zero and savings equal the original price. The calculator handles this correctly. Discounts above 100% are not mathematically meaningful and the calculator caps the input. If you want to give customers more value than the item costs (e.g. a $50 cashback on a $30 product), structure it as a separate rebate rather than a discount percentage." },
  { q: "I have my discounted price — how do I decide whether the promotion is worth it?", a: "Calculate three numbers. First, the per-unit profit after the discount (price minus all costs). Second, the break-even uplift — how many extra units you need to sell to match pre-discount profit. Third, your realistic expected uplift based on past promotions. If expected uplift comfortably exceeds break-even uplift, run the discount; if not, try a smaller discount or a bundle instead." },
  { q: "How is a discount different from a markdown?", a: "A discount is a temporary price reduction (a sale, a coupon, a flash promotion) — the regular price returns afterwards. A markdown is a permanent reprice, usually applied to clear slow-moving or end-of-season stock. Discounts are a marketing lever; markdowns are an inventory cleanup. Both use the same percentage-off maths, but they signal very different things to customers and affect long-term price perception differently." },
];

export default function DiscountPage() {
  return (
    <CalculatorShell
      h1="Discount & Sale Price Calculator — Instant Percentage Off"
      intro="Discounted price, savings, and effective percentage off. Works both directions and includes a bulk-savings table for volume pricing."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema
        slug={SLUG}
        name="Discount & Sale Price Calculator"
        description="Free discount calculator — sale price, savings, percentage off, and bulk savings table."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
      />
      <DiscountCalculator />

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Discounted Price = Original Price × (1 − Discount Percentage / 100)
Saving Amount    = Original Price − Discounted Price

Reverse: Discount % = ((Original − Discounted) / Original) × 100`}
        </pre>
      </FormulaBox>

      <FaqList items={FAQS} />

      <RelatedTools slugs={["markup-calculator", "pricing-calculator", "profit-margin-calculator"]} />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
