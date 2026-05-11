import PricingCalculator from "@/components/calculators/PricingCalculator";
import CalculatorShell from "@/components/shared/CalculatorShell";
import FormulaBox from "@/components/shared/FormulaBox";
import FaqList from "@/components/shared/FaqList";
import RelatedTools from "@/components/shared/RelatedTools";
import Disclaimer from "@/components/shared/Disclaimer";
import WebAppSchema from "@/components/shared/WebAppSchema";
import { calculatorMetadata } from "@/lib/seo";

export const metadata = calculatorMetadata({
  slug: "pricing-calculator",
  title: "Pricing Calculator — Calculate Selling Price from Cost & Margin",
  description:
    "Calculate the optimal selling price from cost and target margin or markup. Includes VAT/sales tax. Free for USA, UK and South Africa.",
});

const FAQS = [
  { q: "How do I calculate the selling price from cost and margin?", a: "Selling Price = Cost ÷ (1 − Desired Margin). This formula is used when you know your cost and the profit margin percentage you want to achieve. Example: cost $50, target margin 40% → Selling Price = $50 ÷ 0.60 = $83.33." },
  { q: "What is cost-plus pricing?", a: "Cost-plus pricing means setting your price by adding a fixed markup to your cost. It is the simplest pricing method: know your cost, add your desired profit, and that is your price. The risk is that it ignores what the market will actually pay." },
  { q: "How do I price a service (not a product)?", a: "For services, \"cost\" includes your time at a target hourly rate plus any direct expenses. Use the Freelance Rate Calculator to determine your minimum hourly rate, then use this tool to set project prices that achieve your target margin." },
  { q: "Should I include VAT/sales tax in my advertised price?", a: "In the UK, consumer-facing prices must be displayed inclusive of VAT. In the USA, sales tax is typically added at checkout and not included in advertised prices. In South Africa, prices are generally displayed inclusive of VAT. This calculator handles all three conventions." },
  { q: "How does pricing affect profit margin?", a: "A small price increase has a disproportionately large effect on margin. If your cost is $50 and you sell at $70 (30% margin), a $5 price increase to $75 raises your margin to 33.3% — a 10% improvement in profitability from a 7% price increase." },
];

export default function PricingPage() {
  return (
    <CalculatorShell
      h1="Pricing Calculator — Find the Right Selling Price Instantly"
      intro="Set the optimal selling price from cost and target margin (or markup). Adds VAT or sales tax automatically by region."
    >
      <WebAppSchema
        slug="pricing-calculator"
        name="Pricing Calculator"
        description="Free pricing calculator — set selling price from cost and target margin or markup, with VAT/sales tax."
      />
      <PricingCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Toggle between margin-based pricing (you want X% margin on each
          sale) and markup-based pricing (you want to add X% on top of
          cost). The calculator returns the price both before and after
          tax. Tax pre-fills based on your region: 0% for the USA (sales
          tax added at checkout), 20% for the UK (VAT), 15% for South
          Africa (VAT).
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Selling Price (from margin) = Cost / (1 − Desired Margin / 100)
Selling Price (from markup) = Cost × (1 + Markup / 100)

Example (margin mode): Cost = $20 | Target Margin = 40%
  Selling Price = $20 / 0.60 = $33.33
  Equivalent Markup = ($13.33 / $20) × 100 = 66.7%`}
        </pre>
      </FormulaBox>

      <FaqList items={FAQS} />

      <RelatedTools slugs={["profit-margin-calculator", "markup-calculator"]} />

      <Disclaimer />
    </CalculatorShell>
  );
}
