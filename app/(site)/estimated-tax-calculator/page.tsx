import EstimatedTaxCalculator from "@/components/calculators/EstimatedTaxCalculator";
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

const SLUG = "estimated-tax-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "estimated-tax-calculator",
  title: "Estimated Tax Calculator — Quarterly Safe Harbor | BusCalcTools",
  description:
    "Free quarterly estimated tax calculator for freelancers and small businesses. IRS safe-harbor (100% / 110% prior year vs 90% current) with due dates.",
});

export default function EstimatedTaxPage() {
  return (
    <CalculatorShell
      h1="Estimated Tax Calculator — Quarterly Safe Harbor"
      intro="Calculate the quarterly estimated-tax payment that keeps you penalty-free under the IRS safe-harbor rules — and which of the two rules applies to you."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema
        slug={SLUG}
        name="Estimated Tax Calculator"
        description="Free quarterly estimated tax calculator with IRS safe-harbor rules and due dates."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
      />
      <EstimatedTaxCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The IRS requires anyone expecting to owe $1,000+ beyond their
          withholding to make quarterly estimated payments. The penalty for
          missing them is interest-based — currently about 8% annualised on
          the underpayment, charged quarter-by-quarter.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The safe harbor is the IRS&apos;s structured "this much is enough"
          calculation. Pay the LESSER of: (a) 100% of last year&apos;s total
          tax (110% if prior-year AGI exceeded $150,000), or (b) 90% of
          this year&apos;s estimated tax. Whichever route is cheaper, splitting
          it into four equal payments and meeting the due dates eliminates
          the underpayment penalty regardless of actual year-end liability.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The prior-year route is almost always simpler and safer when your
          income is rising — you only need to know last year&apos;s number, not
          forecast this year&apos;s. The current-year route is better when income
          is dropping materially, because 90% of a smaller forecast can
          undercut last year&apos;s 100%/110%.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Underpaying Q1 because cash is tight</strong> — the IRS expects four equal payments. Underpaying early quarters then catching up at year-end still triggers a penalty for the underpaid quarters. If cash flow forces uneven payments, use Form 2210 Schedule AI to annualise income — but that&apos;s significantly more paperwork than just paying evenly.
          </li>
          <li>
            <strong className="text-brand-dark">Forgetting state estimated taxes</strong> — most states with income tax have parallel quarterly schedules (often same due dates). California&apos;s schedule is famously front-loaded (30% Q1, 40% Q2, 0% Q3, 30% Q4). Calculate state estimates separately using your state&apos;s 540-ES (or equivalent).
          </li>
          <li>
            <strong className="text-brand-dark">Treating the safe harbor as a refund maximiser</strong> — the safe harbor protects against penalty, not under-saving. If your real liability is $30,000 and you pay $20,000 (100% of last year), you&apos;re penalty-free at year-end but owe $10,000 by April 15 next year. Plan the cash for the true liability, not just the safe harbor.
          </li>
          <li>
            <strong className="text-brand-dark">Missing the Q1 deadline because you&apos;re filing 2025</strong> — April 15 is both the tax-filing deadline AND Q1 estimated-payment deadline. People focused on the 1040 sometimes forget to mail the first 1040-ES voucher. Set the payment up automatically through IRS Direct Pay.
          </li>
        </ul>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Safe Harbor (annual)
  Prior-Year Rule:  100% × prior year tax     (110% if AGI > $150k)
  Current-Year Rule: 90% × current year tax estimate
  Safe Harbor     = MIN(Prior-Year Rule, Current-Year Rule)

Quarterly Payment = (Safe Harbor − Withholding) / 4

TY 2026 Due Dates:
  Q1: April 15, 2026
  Q2: June  15, 2026
  Q3: September 15, 2026
  Q4: January 15, 2027`}
        </pre>
      </FormulaBox>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A consultant&apos;s 2025 Form 1040 showed a total tax of $20,000 with
          $120,000 AGI. For 2026, they project income rising about 25%, so
          expected total tax is $25,000. Withholding from a small part-time
          W-2 job covers $8,000.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Prior-year safe harbor: $20,000 × 100% = $20,000 (AGI was below
          $150k, so no 110% step-up). Current-year safe harbor: $25,000 × 90%
          = $22,500. Lower is the prior-year rule at $20,000. Withholding
          covers $8,000, so the remaining $12,000 must be paid in four
          quarterly installments: $3,000 each by Apr 15, Jun 15, Sep 15, and
          Jan 15, 2027.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Note the trap: meeting the $20,000 safe harbor protects against
          penalty, but they still owe an additional $5,000 by April 15, 2027
          when the actual $25,000 tax bill is computed. The calculator&apos;s
          quarterly figure is the penalty-floor, not the full liability.
          For full-coverage planning, save the larger 90% × current-year
          number ($22,500/4 = $5,625 quarterly) — pays the safe harbor with
          headroom for the year-end true-up.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">When to use this calculator</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Use this any quarter you have self-employment or business income that is not subject to W-2 withholding. It is the right tool for freelancers, sole proprietors, single-member LLC owners, S-corp shareholders taking distributions, and partners with K-1 income — anyone who is responsible for moving their own tax payments to the IRS on the quarterly schedule.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          If most of your income runs through W-2 withholding and the side income is small, increasing your W-2 withholding via Form W-4 can cover the gap without quarterly vouchers. To see how much SE tax sits inside your projected liability, pair this with the Self-Employment Tax Calculator.
        </p>
      </section>

      <FaqList items={META.faqs} />

      <GlossarySection
        items={[
          { term: "Safe Harbor", definition: "The IRS-structured payment level that eliminates the underpayment penalty regardless of year-end true-up. The lesser of last year's tax or ninety percent of this year's estimate." },
          { term: "1040-ES", definition: "The IRS voucher used to pay quarterly estimated tax. Mail with payment or pay electronically via IRS Direct Pay." },
          { term: "Underpayment Penalty", definition: "An interest-based charge applied quarter-by-quarter when payments fall below the safe harbor threshold. Currently around eight percent annualised." },
        ]}
      />

      <LazyBelowFold minHeight={240} placeholderLabel="Related calculators loading">
        <RelatedTools
          slugs={["self-employment-tax-calculator", "s-corp-election-calculator", "cash-flow-calculator"]}
        />
      </LazyBelowFold>

      <LazyBelowFold minHeight={400} placeholderLabel="Methodology section loading">
        <MethodologyBox slug={SLUG} />
      </LazyBelowFold>

      <Disclaimer />
    </CalculatorShell>
  );
}
