import SubscriptionPricingCalculator from "@/components/calculators/SubscriptionPricingCalculator";
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

const SLUG = "subscription-pricing-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "subscription-pricing-calculator",
  title: "Subscription Pricing Calculator — Monthly vs Annual | BusCalcTools",
  description:
    "Free subscription pricing calculator. Compare monthly vs annual LTV at any discount, find the break-even discount, and size your prepay incentive.",
});

export default function SubscriptionPricingPage() {
  return (
    <CalculatorShell
      h1="Subscription Pricing Calculator — Monthly vs Annual LTV"
      intro="Find the right annual-discount level by comparing customer lifetime value on monthly versus annual subscriptions — accounting for the retention boost annual contracts deliver."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema slug={SLUG} name="Subscription Pricing Calculator" description="Free subscription pricing calculator with monthly vs annual LTV and break-even discount." featureList={META.featureList} applicationSubCategory={META.applicationSubCategory} />
      <HowToSchema slug={SLUG} name={META.howToName} description={META.howToDescription} steps={META.howToSteps} />
      <SubscriptionPricingCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Subscription LTV = revenue per period × gross margin × expected customer lifespan. Monthly customer lifespan = 1 / monthly churn rate (e.g. 5% monthly churn → 20-month lifespan). Annual customer lifespan = 1 / annual churn rate (e.g. 20% annual churn → 5-year lifespan).
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The annual plan typically wins LTV even at a 15-20% discount because annual subscribers churn materially less than monthly subscribers — they've prepaid a year, faced a friction-laden cancel decision, and self-selected as higher-intent customers. The break-even discount is the rate at which the annual LTV exactly equals the monthly LTV; anything below it is a positive trade.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li><strong className="text-brand-dark">Setting the annual discount by reflex.</strong> &quot;Two months free&quot; (16.7%) is convention, not optimization. If your monthly churn is 8% but annual is 30%, you might be giving up margin by offering 17% — a 25% discount could still be a positive trade if it doubles annual conversions.</li>
          <li><strong className="text-brand-dark">Using revenue instead of gross-margin.</strong> LTV compares contribution to fixed costs and profit. A $30/mo product at 80% margin contributes $24/mo, not $30. Using revenue inflates LTV 25%.</li>
          <li><strong className="text-brand-dark">Assuming churn drops linearly.</strong> Annual churn isn&apos;t 12× monthly churn. The retention boost from prepayment is typically 30-50% lower churn — meaning a customer paying annual at 5% monthly churn (20 mo lifespan) typically lasts 3-5 years annual, not 1.67 years.</li>
        </ul>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Monthly LTV = Monthly Price × Gross Margin × (1 / Monthly Churn Rate) months
Annual LTV  = Annual Price × Gross Margin × (1 / Annual Churn Rate) years
              where Annual Price = Monthly Price × 12 × (1 − Annual Discount)

Break-Even Discount = 1 − (Monthly LTV / (Monthly Price × 12 × Margin × Annual Lifespan))

Example: $30/mo | 80% margin | 5% monthly churn (20-mo) | 20% annual churn (5-yr) | 17% discount
  Monthly LTV = $30 × 0.80 × 20 = $480
  Annual LTV  = ($30 × 12 × 0.83) × 0.80 × 5 = $298.80 × 5 × 0.80 ≈ $1,195
  Annual beats monthly by ~$715/customer despite the 17% discount.`}
        </pre>
      </FormulaBox>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A B2B SaaS charges $30/mo. Monthly churn 5% (20-month lifespan). Annual churn 20% (5-year lifespan, the typical 2-3× retention boost from annual commitment). Gross margin 80%. Standard 17% annual discount.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Monthly LTV = $30 × 0.80 × 20 = $480. Annual LTV = ($30 × 12 × 0.83) × 0.80 × 5 = $1,195. Annual wins by $715 per customer — 149% more LTV — despite the headline 17% revenue discount. The retention boost (4-5× the months retained) more than offsets the price cut.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Sensitivity. At the same retention assumption, the break-even discount is roughly 67% — you could discount annual contracts by two-thirds and still have parity LTV. Practically, no one offers that — it would create a perverse incentive against monthly and damage cash flow on the front end. The market converges on 15-25% discounts as the &quot;leaves margin while incentivizing&quot; band.
        </p>
      </section>

      <FaqList items={META.faqs} />

      <RelatedTools slugs={["pricing-calculator", "cac-ltv-calculator", "freelance-rate-calculator"]} />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
