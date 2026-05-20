import SelfEmploymentTaxCalculator from "@/components/calculators/SelfEmploymentTaxCalculator";
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

const SLUG = "self-employment-tax-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "self-employment-tax-calculator",
  title: "Self-Employment Tax Calculator — TY 2026 | BusCalcTools",
  description:
    "Free 2026 self-employment tax calculator. SE tax (15.3%) plus federal income tax plus state tax, with quarterly estimated payment for freelancers and sole proprietors.",
});

export default function SelfEmploymentTaxPage() {
  return (
    <CalculatorShell
      h1="Self-Employment Tax Calculator — TY 2026"
      intro="Estimate the full tax bill for a freelancer or sole proprietor — SE tax (Social Security + Medicare), federal income tax, state tax, plus the quarterly payment to send to the IRS."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema
        slug={SLUG}
        name="Self-Employment Tax Calculator"
        description="Free 2026 self-employment tax calculator with quarterly estimated payment."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
      />
      <SelfEmploymentTaxCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Self-employment tax replaces the FICA payroll tax that W-2 employees
          pay through withholding. The rate is 15.3% — 12.4% Social Security
          and 2.9% Medicare — applied to 92.35% of net SE earnings. The
          92.35% adjustment exists because employees only pay half of FICA;
          the other half comes from the employer. Since the self-employed pay
          both halves, they get a deduction for the employer-equivalent share
          before the rate is applied.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          On top of SE tax sits federal income tax, computed against the
          standard bracket system after standard deduction. Half of the SE
          tax is deductible from AGI for income-tax purposes — this is the
          most-missed deduction on first-year 1040 Schedule SE filings.
          Most freelancers underpay by 5-15% in year one because they
          forget this and the QBI deduction (not modelled in v1).
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Forgetting the half-SE-tax deduction</strong> — every $10,000 of SE income generates roughly $1,413 of SE tax, and half ($706) reduces your AGI for federal-income-tax purposes. Skipping this is the most common rookie 1040-ES error. The calculator includes it automatically.
          </li>
          <li>
            <strong className="text-brand-dark">Skipping QBI</strong> — Section 199A allows a 20% deduction on qualified business income for most non-specified-service trades, phased out above $241,950 / $483,900 (2026 estimates). This calculator does not model it because the phase-out logic is too involved for a v1; assume your effective rate could be 4-7 percentage points lower than shown if you qualify.
          </li>
          <li>
            <strong className="text-brand-dark">Not setting aside quarterly money</strong> — if you owe $1,000+ in tax beyond withholding, the IRS requires quarterly estimated payments. Missing them triggers underpayment penalties of about 8% annualised. Bank the quarterly figure shown by this calculator the moment each invoice is paid.
          </li>
        </ul>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`SE Base       = Net SE Income × 92.35%
SE Tax        = SE Base × 15.3%  (SS capped at $184,500 in 2026)
                = SE Base × 12.4% (SS portion, up to wage base)
                + SE Base × 2.9%  (Medicare, no cap)

AGI           = SE Income + Other − ½ × SE Tax
Taxable       = AGI − Standard Deduction
Federal Tax   = Bracket-based on Taxable (10% → 37%)
State Tax     = Approximate effective rate by state tier
Total Tax     = SE Tax + Federal Tax + State Tax
Quarterly     = Total ÷ 4`}
        </pre>
      </FormulaBox>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A single freelance graphic designer earns $80,000 net (gross revenue
          minus business expenses) in tax year 2026. No other income. Lives in
          Colorado (moderate state tax tier ~5%).
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          SE base = $80,000 × 92.35% = $73,880. SE tax = $73,880 × 15.3% =
          $11,303. Half SE tax ($5,651) reduces AGI. AGI = $80,000 − $5,651 =
          $74,349. Standard deduction = $15,000. Taxable income = $59,349.
          Federal tax at single brackets: 10% on first $11,925 ($1,193) +
          12% on next $36,550 ($4,386) + 22% on remaining $10,874 ($2,392) =
          $7,971 federal. State tax = $80,000 × 5% = $4,000. Total tax =
          $11,303 + $7,971 + $4,000 = $23,274. Quarterly = $5,819.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Effective rate is 29.1%. The same freelancer in Texas (no state tax)
          would owe $19,274 total — about $4,000 less. The same freelancer
          in California (high tier, 9%) would owe $26,474 — about $3,200 more.
          State choice is one of the single biggest variables in
          self-employment tax planning, often larger than the federal
          differences between filing statuses.
        </p>
      </section>

      <FaqList items={META.faqs} />

      <RelatedTools
        slugs={["s-corp-election-calculator", "estimated-tax-calculator", "freelance-rate-calculator"]}
      />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
