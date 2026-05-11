import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead text-lg leading-relaxed text-gray-700">
        UK invoice requirements aren&apos;t complicated, but the
        consequences of getting them wrong are. An invoice missing
        required elements isn&apos;t legally enforceable and may not be
        VAT-reclaimable by your customer. Here&apos;s what HMRC actually
        requires, what differs for VAT invoices, and the small details
        people miss.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Required on every UK invoice (HMRC minimum)</h2>
      <ol className="mt-3 ml-6 list-decimal space-y-2 text-gray-700">
        <li><strong>A unique invoice number.</strong> Sequential, no gaps. Most accounting software handles this automatically.</li>
        <li><strong>Your business name and address.</strong> The trading name on Companies House, or your trading name + your registered company name if different.</li>
        <li><strong>The customer&apos;s name and address.</strong></li>
        <li><strong>Description of goods or services supplied.</strong> Specific enough that a third party could understand what was sold.</li>
        <li><strong>Date the goods/services were supplied.</strong> &ldquo;Tax point&rdquo; in HMRC language.</li>
        <li><strong>Date the invoice was issued.</strong> Can be the same as supply date.</li>
        <li><strong>Total amount owed.</strong> Clearly shown.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">If you&apos;re a limited company</h2>
      <ul className="mt-3 ml-6 list-disc space-y-1 text-gray-700">
        <li>Full company name (the one on the Certificate of Incorporation)</li>
        <li>Company registration number</li>
        <li>Registered office address (even if you trade from elsewhere)</li>
        <li>If you mention any director&apos;s name, you must list all directors</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Additional required on VAT invoices</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        If you&apos;re VAT-registered (compulsory above £90,000 turnover
        as of 2024), invoices need extra fields:
      </p>
      <ol className="mt-3 ml-6 list-decimal space-y-2 text-gray-700">
        <li><strong>The words &ldquo;VAT invoice&rdquo;</strong> somewhere on the document.</li>
        <li><strong>Your VAT registration number.</strong> 9-digit format (GB123 4567 89).</li>
        <li><strong>The tax point</strong> (date of supply for VAT purposes).</li>
        <li><strong>Subtotal exclusive of VAT.</strong> For each line item if rates differ.</li>
        <li><strong>VAT rate applied</strong> (20% standard, 5% reduced, 0% zero-rated).</li>
        <li><strong>Total VAT charged.</strong> Shown separately from subtotal.</li>
        <li><strong>Gross total including VAT.</strong></li>
        <li><strong>If using cash accounting scheme:</strong> note &ldquo;Cash accounting scheme&rdquo;.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Simplified VAT invoices (under £250)</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        For sales under £250 inc VAT, a simplified VAT invoice is
        allowed. It still needs:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-1 text-gray-700">
        <li>Your name, address, VAT number</li>
        <li>Tax point date</li>
        <li>Description of goods/services</li>
        <li>VAT rate and total inc-VAT amount</li>
      </ul>
      <p className="mt-3 leading-relaxed text-gray-700">
        Receipts from a till usually count as simplified VAT invoices.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">A standard UK invoice template</h2>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-brand-light p-4 text-xs font-mono">
{`INVOICE                                    Invoice No: 2026-0042
                                           Date: 11 May 2026
From: [Your trading name]                  Tax point: 11 May 2026
      [Address line 1]
      [City, Postcode]                     Due: 10 June 2026 (NET-30)
      Company No: 12345678
      VAT No: GB 123 4567 89

To:   [Customer name]
      [Address]

Description                          Qty    Rate    Net
─────────────────────────────────────────────────────────
Brand identity design — Phase 1       1   £2,500  £2,500
Logo refinement (revisions ×3)        1     £500    £500

                                  Subtotal     £3,000.00
                                  VAT @ 20%      £600.00
                                  TOTAL        £3,600.00

Payment: BACS to Sort 12-34-56 Acc 12345678 ref 2026-0042
Terms: NET-30. Late payment under the Late Payment of Commercial
Debts (Interest) Act 1998: interest at 8% above Bank of England
base rate + £40 fee.`}
      </pre>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Late payment legislation</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        UK businesses have a statutory right to claim late payment
        interest plus a fixed fee on overdue commercial invoices:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-1 text-gray-700">
        <li>Interest at 8% above Bank of England base rate</li>
        <li>£40 fixed fee for invoices under £1,000</li>
        <li>£70 for £1,000–£10,000</li>
        <li>£100 for over £10,000</li>
      </ul>
      <p className="mt-3 leading-relaxed text-gray-700">
        Mentioning this on your invoice doesn&apos;t help collection
        directly but raises the cost of ignoring you.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Storage and digital invoicing</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        HMRC requires you to keep invoices for at least 6 years. PDF
        copies are fine. Making Tax Digital rules (mandatory for
        VAT-registered businesses) require digital records and
        submissions via approved software.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Common mistakes</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li><strong>Missing VAT number on VAT invoices.</strong> Customer can&apos;t reclaim VAT — they&apos;ll send the invoice back.</li>
        <li><strong>Numbering with gaps.</strong> HMRC questions why. Don&apos;t skip numbers.</li>
        <li><strong>Vague descriptions.</strong> &ldquo;Services rendered&rdquo; isn&apos;t specific enough for VAT-reclaimable purchases.</li>
        <li><strong>Wrong VAT rate.</strong> Children&apos;s clothing 0%, domestic energy 5%, most goods 20%. Get it wrong, you owe HMRC the difference.</li>
        <li><strong>No payment terms.</strong> If not specified, NET-30 is assumed by default — but customers will pay later.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Build your invoice now</h2>
      <p className="mt-3 leading-relaxed text-gray-700">
        Use the{" "}
        <Link href="/invoice-calculator" className="text-brand-primary underline">
          Invoice Calculator
        </Link>{" "}
        — set region to UK to pre-fill VAT at 20%, add line items, and
        copy the result into your invoice template.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-brand-dark">Bottom line</h2>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700">
        <li>Unique number, both addresses, supply date, total — minimum on every invoice.</li>
        <li>VAT invoices need VAT number, rate, and VAT amount shown separately.</li>
        <li>Limited companies must show company number and registered address.</li>
        <li>Keep digital copies for 6 years; MTD-compliant software if VAT-registered.</li>
      </ul>
    </>
  );
}
