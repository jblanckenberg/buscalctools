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
];

export default function DiscountPage() {
  return (
    <CalculatorShell
      h1="Discount & Sale Price Calculator — Instant Percentage Off"
      intro="Discounted price, savings, and effective percentage off. Works both directions and includes a bulk-savings table for volume pricing."
      breadcrumbs={calcBreadcrumb(SLUG)}
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
