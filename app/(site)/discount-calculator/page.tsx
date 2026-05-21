import DiscountCalculator from "@/components/calculators/DiscountCalculator";
import CalculatorShell from "@/components/shared/CalculatorShell";
import FormulaBox from "@/components/shared/FormulaBox";
import FaqList from "@/components/shared/FaqList";
import LazyBelowFold from "@/components/shared/LazyBelowFold";
import RelatedTools from "@/components/shared/RelatedTools";
import Disclaimer from "@/components/shared/Disclaimer";
import GlossarySection from "@/components/shared/GlossarySection";
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

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Enter the original price and the discount percentage to see the sale
          price and savings amount. Switch to reverse mode to enter the
          original and sale price and have the effective percentage off
          calculated for you. The bulk savings table multiplies per-unit
          savings across typical order quantities so you can compare a
          volume promotion to a flat single-unit discount.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Discounting deeper than the margin</strong> — a 30% discount on a product with a 35% gross margin leaves about 7% net per sale. To match pre-discount profit you would need to roughly quintuple unit volume. Always run the post-discount price through the Profit Margin Calculator before publishing the offer.
          </li>
          <li>
            <strong className="text-brand-dark">Stacking discounts without recalculating</strong> — "20% off, then an extra 10% for newsletter sign-up" is not a 30% discount. It compounds to 28% (0.80 × 0.90 = 0.72). The reverse is also true for cumulative price rises. Apply each step separately in the calculator instead of adding the percentages.
          </li>
          <li>
            <strong className="text-brand-dark">Training customers to wait for sales</strong> — frequent across-the-board discounts erode willingness to pay full price. Repeat buyers learn the cycle and time their purchases. If you must run regular promotions, vary the format (bundle, free shipping, loyalty exclusive) rather than the same flat percentage off every month.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">When to use this calculator</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Use this when modelling a sale, a clearance event, a volume-tier promotion, or a coupon — anywhere you need to know the resulting price, the savings amount, or the implied percentage off from two prices. The bulk table is useful for B2B quantity quotes.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          To check whether the discounted price still earns enough margin, switch to the Profit Margin Calculator. If you are setting a brand-new everyday price (not a temporary reduction), use the Pricing Calculator instead.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Discounted Price = Original Price × (1 − Discount Percentage / 100)
Saving Amount    = Original Price − Discounted Price

Reverse: Discount % = ((Original − Discounted) / Original) × 100`}
        </pre>
      </FormulaBox>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A South African fashion boutique stocks a jacket at R1,200 retail
          and considers a 30% flash sale. The discounted price is R1,200 ×
          (1 − 0.30) = R840, a saving of R360 per unit. At normal full
          price the boutique was selling roughly 20 units per month; the
          owner expects discounting to roughly double that to 40 units.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The trap is to compare top-line revenue: 20 × R1,200 = R24,000
          full price versus 40 × R840 = R33,600 at the sale price — a 40%
          revenue lift that looks unambiguously good. The boutique&apos;s
          variable cost per jacket is R600. Contribution at full price is
          20 × (R1,200 − R600) = R12,000. Contribution on sale is 40 ×
          (R840 − R600) = R9,600. The boutique earns R2,400 less in gross
          profit despite doubling units sold.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The break-even unit volume that recovers the original R12,000 of
          contribution at the R240 sale-price contribution per unit is 50
          units — a 2.5× increase, not 2×. Discount promotions are worth
          running only when the volume uplift exceeds break-even AND the
          uplift is genuinely incremental (not cannibalising future
          full-price sales). The retail industry rule of thumb is that
          30%-off promotions need volume to roughly 2.3× to break even on
          gross profit, and only one in three promotions actually clear
          that bar.
        </p>
      </section>

      <FaqList items={META.faqs} />

      <GlossarySection
        items={[
          { term: "Discount Rate", definition: "The percentage taken off the original price. Apply it to the price first, then add tax on the discounted amount." },
          { term: "Effective Discount", definition: "The true percentage off when two or more discounts stack. Multiply the remaining-price factors rather than adding the percentages." },
          { term: "Contribution per Sale", definition: "Sale price minus variable cost — the per-unit gross profit that has to cover the lost margin from the discount through extra volume." },
        ]}
      />

      <LazyBelowFold minHeight={240} placeholderLabel="Related calculators loading">
        <RelatedTools slugs={["markup-calculator", "pricing-calculator", "profit-margin-calculator"]} />
      </LazyBelowFold>

      <LazyBelowFold minHeight={400} placeholderLabel="Methodology section loading">
        <MethodologyBox slug={SLUG} />
      </LazyBelowFold>

      <Disclaimer />
    </CalculatorShell>
  );
}
