import RAndDTaxCreditCalculator from "@/components/calculators/RAndDTaxCreditCalculator";
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

const SLUG = "r-and-d-tax-credit-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "r-and-d-tax-credit-calculator",
  title: "R&D Tax Credit Calculator — Section 41 ASC | BusCalcTools",
  description:
    "Free US R&D tax credit calculator using the Alternative Simplified Credit (ASC) method. Wages, supplies, contract research, payroll-tax offset eligibility.",
});

export default function RAndDTaxCreditPage() {
  return (
    <CalculatorShell
      h1="R&amp;D Tax Credit Calculator — Section 41 ASC Method"
      intro="Estimate the federal R&amp;D tax credit using the Alternative Simplified Credit (ASC) method — including the payroll-tax offset for qualified small businesses (pre-profit startups)."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema slug={SLUG} name="R&D Tax Credit Calculator" description="Free US Section 41 R&D tax credit calculator (ASC method)." featureList={META.featureList} applicationSubCategory={META.applicationSubCategory} />
      <HowToSchema slug={SLUG} name={META.howToName} description={META.howToDescription} steps={META.howToSteps} />
      <RAndDTaxCreditCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The R&amp;D tax credit (IRC §41) rewards businesses for spending on qualified
          research activities. The Alternative Simplified Credit (ASC) method —
          used by most filers — equals 14% of the amount by which current-year
          Qualified Research Expenditures (QREs) exceed 50% of the prior-three-year
          average QREs. First-time claimers with no prior QRE history get a flat 6%
          of current-year QREs instead.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          QREs are: qualified researcher wages (W-2, time-allocated to qualified
          activities), qualified supplies (consumables used in R&amp;D, not capital
          equipment), and 65% of contract research payments (the 65% factor reflects
          that the IRS gives less credit when a third party rather than your employees
          does the work). The credit reduces federal income tax for profitable
          companies; pre-profit startups under $5M of gross receipts (Qualified Small
          Business) can use up to $500,000 of the credit per year to offset employer
          payroll tax instead — meaningful cash relief for unprofitable R&amp;D-heavy
          startups.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          <strong>v1 limitation:</strong> The credit AMOUNT calculation is mechanical,
          but determining whether your activities QUALIFY is the harder problem.
          Section 41 requires a four-part test: permitted purpose (new or improved
          business component), elimination of technological uncertainty, process of
          experimentation, and technological in nature. Routine software customization,
          most marketing activities, and post-launch fixes generally don&apos;t
          qualify. Specialist R&amp;D credit firms or experienced CPAs typically take
          12-25% of the resulting credit as their fee — well worth it given the audit
          risk of getting qualification wrong.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li><strong className="text-brand-dark">Claiming non-qualifying activities.</strong> The audit risk is real and the IRS has aggressively challenged R&amp;D claims since 2015. Routine product configuration, customer support, marketing, market research, post-implementation fixes, and adapting existing technology to specific customer needs all generally don&apos;t qualify. Substantially-new development of products, processes, software algorithms, formulas, or techniques is the qualifying scope.</li>
          <li><strong className="text-brand-dark">Skipping contemporaneous documentation.</strong> Form 6765 requires more than the calculator output — you need time-tracking by employee, project descriptions tied to the four-part test, and records of the technical uncertainty being resolved. Without these, the credit fails on audit even if the math is right.</li>
          <li><strong className="text-brand-dark">Forgetting the payroll-tax offset for startups.</strong> Pre-profit QSBs (gross receipts &lt; $5M, no gross receipts more than 5 years before the current year) can use up to $500,000 of R&amp;D credit against the 6.2% employer-side Social Security tax. This is real cash even for companies with no income-tax liability — and most startup founders don&apos;t know it exists.</li>
          <li><strong className="text-brand-dark">Including capital expenditures as supplies.</strong> Servers, lab equipment, and major capital purchases are depreciated under MACRS, not credited under §41. Only consumable supplies (prototype materials, test fluids, expendable lab consumables) count as QRE supplies.</li>
        </ul>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Total Current QREs = Wages + Supplies + (Contract Research × 0.65)

ASC Standard (with 3+ years of prior QREs):
  Credit = 14% × MAX(0, Current QREs − 50% × Prior 3-Yr Average QREs)

ASC First-Time (no prior 3-yr history):
  Credit = 6% × Current QREs

Payroll-Tax Offset (QSB only):
  Eligible if gross receipts < $5M AND no gross receipts >5 years ago
  Maximum offset: $500,000 per year
  Applied against employer 6.2% Social Security in quarter after filing

Example: $200k wages + $20k supplies + $50k contract research
  QREs = $200,000 + $20,000 + $50,000 × 0.65 = $252,500
  First-time ASC: $252,500 × 6% = $15,150 credit
  With $150k prior 3-yr avg: $252,500 − $75,000 = $177,500 incremental
                              × 14% = $24,850 credit`}
        </pre>
      </FormulaBox>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A 3-year-old SaaS startup spent the year developing a new ML-driven
          feature. Three engineers spent 60-80% of their time on qualifying
          activities (technical uncertainty around novel model architecture,
          process of experimentation across multiple approaches). Time-allocated
          W-2 wages: $200,000. Cloud GPU usage and prototype data licenses:
          $20,000. Specialised contractor hired for 6 months: $50,000.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Total QREs = $200,000 + $20,000 + $50,000 × 0.65 = $252,500. Prior
          3-year average: $150,000 (smaller R&amp;D investment in prior years).
          ASC credit = 14% × ($252,500 − $75,000) = 14% × $177,500 = $24,850.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The startup&apos;s gross receipts: $1.5M — below the $5M QSB threshold,
          so they can use the credit against payroll tax. Their annual employer
          Social Security on $500,000 of total payroll is about $31,000. The
          $24,850 credit covers 80% of that for the quarter following the return
          filing — essentially $25,000 of free cash flow they wouldn&apos;t
          otherwise have, with no income-tax liability required.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Cost-benefit note. Hiring a specialist R&amp;D credit firm to qualify
          the activities and prepare Form 6765 typically costs $3,000-$10,000 for
          this size of credit. Net benefit: ~$15-22k. Without specialist help and
          contemporaneous documentation, the audit risk usually swamps the
          benefit — most casual filers find the credit clawed back plus penalties
          when examined.
        </p>
      </section>

      <FaqList items={META.faqs} />

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-brand-dark">Glossary</h2>
        <dl className="mt-3 space-y-3 text-sm text-gray-700">
          <div>
            <dt className="font-semibold text-brand-dark">QRE</dt>
            <dd>Qualified research expenditure — the wage, supply, and contract-research dollars that count toward the §41 credit base.</dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-dark">ASC</dt>
            <dd>Alternative Simplified Credit — the more common method for calculating the credit, equal to 14 percent of the increase over half of the prior three-year average QREs.</dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-dark">QSB</dt>
            <dd>Qualified small business — a company with under five million in gross receipts and no gross receipts more than five years before the current tax year. Eligible to offset payroll tax with the credit.</dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-dark">Four-Part Test</dt>
            <dd>The §41 qualification framework: permitted purpose, technological uncertainty, process of experimentation, and technological in nature.</dd>
          </div>
        </dl>
      </section>

      <RelatedTools slugs={["self-employment-tax-calculator", "section-179-calculator", "estimated-tax-calculator"]} />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
