import InvoiceCalculator from "@/components/calculators/InvoiceCalculator";
import CalculatorShell from "@/components/shared/CalculatorShell";
import FormulaBox from "@/components/shared/FormulaBox";
import FaqList from "@/components/shared/FaqList";
import RelatedTools from "@/components/shared/RelatedTools";
import Disclaimer from "@/components/shared/Disclaimer";
import WebAppSchema from "@/components/shared/WebAppSchema";
import { calculatorMetadata } from "@/lib/seo";

export const metadata = calculatorMetadata({
  slug: "invoice-calculator",
  title: "Invoice Calculator — Calculate Invoice Total with Tax Instantly",
  description:
    "Build invoice totals from line items with automatic VAT, GST or sales tax calculation. Free invoice calculator for freelancers and small businesses.",
});

const FAQS = [
  { q: "How do I calculate an invoice total with VAT?", a: "Invoice Total with VAT = Subtotal × (1 + VAT Rate / 100). If your subtotal is £500 and VAT is 20%, your invoice total is £500 × 1.20 = £600. The VAT amount itself is £100." },
  { q: "How do I add a discount to an invoice?", a: "Apply the discount to the subtotal before calculating tax. Discounted Subtotal = Subtotal × (1 − Discount%/100). Then calculate tax on the discounted subtotal. Example: £1,000 subtotal, 10% discount = £900 discounted subtotal, then add 20% VAT = £1,080 total." },
  { q: "What is the difference between VAT and sales tax?", a: "VAT (UK/SA) is charged at each stage of the supply chain — businesses collect and remit it to the government. US Sales Tax is only charged at the final point of sale to the consumer. Both are consumption taxes but work differently for business billing." },
  { q: "Do I need to charge VAT on my invoices?", a: "In the UK, you must register for and charge VAT only if your taxable turnover exceeds £90,000 per year (2024 threshold). In South Africa, the threshold is R1 million. In the USA, sales tax rules vary by state and product type." },
  { q: "What should an invoice include?", a: "A valid invoice includes: your business name and address, client name and address, unique invoice number, invoice date, payment due date, itemised list of goods/services, applicable tax, total amount due, and payment instructions. For VAT invoices (UK/SA), include your VAT registration number." },
];

export default function InvoicePage() {
  return (
    <CalculatorShell
      h1="Invoice Calculator — Build Invoice Totals with Tax in Seconds"
      intro="Build an invoice from up to 5 line items. Adds VAT, GST or sales tax automatically based on your region. One-click copy of the result."
    >
      <WebAppSchema
        slug="invoice-calculator"
        name="Invoice Calculator"
        description="Free invoice calculator with VAT/GST/sales tax — build a total from up to five line items."
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

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Line Total = Quantity × Unit Rate
Subtotal   = Sum of all Line Totals
Tax Amount = (Subtotal − Discount Amount) × (Tax Rate / 100)
Invoice Total = Subtotal − Discount Amount + Tax Amount`}
        </pre>
      </FormulaBox>

      <FaqList items={FAQS} />

      <RelatedTools slugs={["freelance-rate-calculator", "net-profit-calculator"]} />

      <Disclaimer />
    </CalculatorShell>
  );
}
