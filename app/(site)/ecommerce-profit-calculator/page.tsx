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

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Treating VAT as revenue</strong> — UK and SA sellers show prices inclusive of VAT, so the gross deposit from a marketplace looks larger than the actual sale. VAT goes to HMRC or SARS, not into your bank balance. Strip it out before subtracting fees, or per-unit profit will be overstated by 13–17%.
          </li>
          <li>
            <strong className="text-brand-dark">Ignoring returns and refunds</strong> — apparel and electronics can see return rates of 15–30%, and a returned item forfeits the platform fee, the shipping out, and usually the ad spend that won the sale. Profitability calculated on shipped units overstates true take-home; build a return allowance into shipping or ACOS to model the real economics.
          </li>
          <li>
            <strong className="text-brand-dark">Spending on ads without tracking per-unit ACOS</strong> — total monthly ad spend tells you nothing about whether each sale is profitable. Track advertising cost per sold unit (ACOS). A $30 product with a $9 ad cost (30% ACOS) and a 40% gross margin only nets $3 after fees and shipping — paid traffic at that level is unsustainable.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">When to use this calculator</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Use this for every new SKU on Amazon FBA, Etsy, eBay, or Shopify before you list it, and re-run quarterly as platform fees and ad costs drift up. It is built specifically for marketplace sellers who pay variable platform fees, shipping, and ad costs that do not appear on a standard income statement.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          If you are not a marketplace seller and want a simple gross/net margin view, the Profit Margin Calculator is faster. If you are setting the selling price from scratch with a target margin in mind, start with the Pricing Calculator and then audit the result here.
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

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A US Amazon FBA seller lists a kitchen product at $29.99. Landed
          product cost (including freight from the supplier and inbound
          shipping to an Amazon warehouse) is $8.00. Amazon&apos;s FBA
          fulfilment fee for the size tier is $4.50. The 15% referral fee
          comes to $4.50. Sponsored-product PPC averaged out across recent
          sales runs at $3.00 per unit sold (a 10% ACoS). A reserve for
          returns and damages adds $1.50, and the variable shipping back to
          customers in edge cases averages $0.80.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Adding all costs: $8.00 + $4.50 + $4.50 + $3.00 + $1.50 + $0.80 =
          $22.30. True per-unit profit is $29.99 − $22.30 = $7.69 — a 25.6%
          net margin. The seller&apos;s naive maths (price minus product
          cost) suggested $21.99 of profit per unit and 73% margin. The
          $14.30 of platform-and-fulfilment costs is the gap most Amazon
          sellers miss until they run a complete profit calculation.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The two biggest levers are PPC and return rates. Cutting PPC from
          $3.00 to $2.00 per sale (an 8% ACoS instead of 10%) lifts net
          profit to $8.69 — a 13% per-unit profit increase from a single
          metric. Reducing the return reserve from $1.50 to $0.50 by fixing
          a product-defect cluster does the same. Both levers are usually
          within the seller&apos;s control; the FBA fee and referral fee
          are not.
        </p>
      </section>

      <FaqList items={META.faqs} />

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-brand-dark">Glossary</h2>
        <dl className="mt-3 space-y-3 text-sm text-gray-700">
          <div>
            <dt className="font-semibold text-brand-dark">Platform Fee</dt>
            <dd>The marketplace cut taken on each sale. Amazon referral fees are typically 15%; Etsy charges 6.5% transaction plus listing and payment fees; eBay sits around 12-15%.</dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-dark">ACoS</dt>
            <dd>Advertising cost of sale — ad spend divided by ad-attributed revenue. The per-unit ad cost that has to come out of gross margin before it becomes profit.</dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-dark">FBA</dt>
            <dd>Fulfilment by Amazon — Amazon stores, picks, packs and ships your inventory in exchange for a per-unit fulfilment fee based on size and weight.</dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-dark">Landed Cost</dt>
            <dd>The all-in product cost including supplier price, inbound freight, duties, and inspection. The right number to use in this calculator, not the supplier invoice alone.</dd>
          </div>
        </dl>
      </section>

      <RelatedTools slugs={["profit-margin-calculator", "markup-calculator"]} />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
