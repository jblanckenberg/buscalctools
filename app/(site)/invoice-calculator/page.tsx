import InvoiceCalculator from "@/components/calculators/InvoiceCalculator";
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

const SLUG = "invoice-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "invoice-calculator",
  title: "Invoice Calculator with VAT, GST & Sales Tax | BusCalcTools",
  description:
    "Free invoice calculator. Build invoice totals from up to 5 line items with automatic VAT, GST, or sales tax. Region-aware for freelancers and small businesses.",
});

export default function InvoicePage() {
  return (
    <CalculatorShell
      h1="Invoice Calculator — Build Invoice Totals with Tax in Seconds"
      intro="Build an invoice from up to 5 line items. Adds VAT, GST or sales tax automatically based on your region. One-click copy of the result."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema
        slug={SLUG}
        name="Invoice Calculator"
        description="Free invoice calculator with VAT/GST/sales tax — build a total from up to five line items."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
      />
      <InvoiceCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Add up to five line items with a description, quantity, and unit
          rate. The calculator multiplies quantity × rate for each line,
          sums them to a subtotal, applies any discount, then adds tax.
          Tax pre-fills based on your region: VAT 20% (UK), VAT 15% (SA),
          or 0% (USA — sales tax usually added at checkout).
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Applying tax before the discount</strong> — the correct order is discount first, then tax on the discounted subtotal. A $1,000 invoice with a 10% discount and 20% VAT should total $1,080 (= $900 × 1.20), not $1,100. Tax-first arithmetic overcharges the client and creates a VAT remittance mismatch with HMRC or SARS.
          </li>
          <li>
            <strong className="text-brand-dark">Non-sequential invoice numbers</strong> — UK and SA VAT rules require strictly sequential invoice numbering for audit purposes. Random or restarted numbering (jumping from INV-042 to INV-100, or restarting at INV-001 each quarter) is a flag in a VAT inspection. Use one continuous series across the business.
          </li>
          <li>
            <strong className="text-brand-dark">Vague payment terms</strong> — "net-30" or "payable on receipt" without an explicit due date leads to late payment. Always print the actual due date on the invoice (e.g. "Due 14 June 2026") and the payment method/details. Invoices with explicit due dates and bank details get paid 7–10 days faster on average.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">When to use this calculator</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Use this for one-off invoices when you do not have an accounting platform open, when you need to quote a total with tax for a client over email, or when verifying that your invoicing software calculated the right number. Region tax pre-fills cover the three most common setups.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          For ongoing client billing, a proper invoicing tool with templates and reminders pays for itself. If you are setting your hourly rate before quoting, run the numbers through the Freelance Rate Calculator first.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Line Total = Quantity × Unit Rate
Subtotal   = Sum of all Line Totals
Tax Amount = (Subtotal − Discount Amount) × (Tax Rate / 100)
Invoice Total = Subtotal − Discount Amount + Tax Amount`}
        </pre>
      </FormulaBox>

      <FaqList items={META.faqs} />

      <RelatedTools slugs={["freelance-rate-calculator", "net-profit-calculator"]} />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
