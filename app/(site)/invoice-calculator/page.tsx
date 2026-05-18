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

const FAQS = [
  { q: "How do I calculate an invoice total with VAT?", a: "Invoice Total with VAT = Subtotal × (1 + VAT Rate / 100). If your subtotal is £500 and VAT is 20%, your invoice total is £500 × 1.20 = £600. The VAT amount itself is £100." },
  { q: "How do I add a discount to an invoice?", a: "Apply the discount to the subtotal before calculating tax. Discounted Subtotal = Subtotal × (1 − Discount%/100). Then calculate tax on the discounted subtotal. Example: £1,000 subtotal, 10% discount = £900 discounted subtotal, then add 20% VAT = £1,080 total." },
  { q: "What is the difference between VAT and sales tax?", a: "VAT (UK/SA) is charged at each stage of the supply chain — businesses collect and remit it to the government. US Sales Tax is only charged at the final point of sale to the consumer. Both are consumption taxes but work differently for business billing." },
  { q: "Do I need to charge VAT on my invoices?", a: "In the UK, you must register for and charge VAT only if your taxable turnover exceeds £90,000 per year (the threshold raised from £85,000 on 1 April 2024 and remains in force). In South Africa, the threshold is R1 million. In the USA, sales tax rules vary by state and product type." },
  { q: "What should an invoice include?", a: "A valid invoice includes: your business name and address, client name and address, unique invoice number, invoice date, payment due date, itemised list of goods/services, applicable tax, total amount due, and payment instructions. For VAT invoices (UK/SA), include your VAT registration number." },
  { q: "How is invoicing different in the US, UK, and SA?", a: "US invoices typically have no tax unless the seller has nexus in a sales-tax state, in which case it's added per-state. UK invoices must show VAT (20%) once you're registered, broken out separately, with your VAT number visible. South African invoices show VAT (15%) the same way, plus your VAT vendor number. Invoice numbering must be sequential in the UK and SA — random numbering can cause problems in a VAT audit." },
  { q: "What is the most common invoicing mistake?", a: "Applying tax before subtracting the discount, instead of after. If a $1,000 invoice has a 10% discount and 20% VAT, the correct calculation is ($1,000 − $100) × 1.20 = $1,080. Applying VAT first gives $1,200 minus $100 = $1,100 — a $20 overcharge to the client and a VAT remittance mismatch. This calculator does it in the correct order; verify your own invoicing software does the same." },
  { q: "What if my client is in a different country — do I still charge VAT?", a: "In the UK, B2B services to a VAT-registered business in another country are usually zero-rated (no VAT charged, but the invoice must show the client's VAT number and a reverse-charge note). B2C services across borders follow different rules per country. South African export rules are similar but require proof of export. When in doubt, charge zero VAT and note \"reverse charge applies\" — confirm with an accountant." },
  { q: "What if my quantity or rate is zero on a line item?", a: "The line total becomes zero and is excluded from the subtotal, which is mathematically correct but probably not what you meant. Either delete the line entirely (cleaner) or replace with the intended value. A zero line on the printed invoice can confuse clients into asking why it's there — most invoicing best practice is to keep the invoice tight to billable items only." },
  { q: "I have my invoice total — what should I do before sending?", a: "Five-second checklist. One: invoice number is sequential and unique. Two: payment due date is explicit (not just \"net-30\" — write the actual date). Three: payment instructions include bank details or a link. Four: tax breakdown matches the calculator output. Five: keep a copy in your records (legally required for 6 years in the UK, 5 in SA, 7 in most US states). Send via email with PDF attached — chasing late payment is much easier with a clear audit trail." },
];

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

      <FaqList items={FAQS} />

      <RelatedTools slugs={["freelance-rate-calculator", "net-profit-calculator"]} />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
