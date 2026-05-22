import SCorpElectionCalculator from "@/components/calculators/SCorpElectionCalculator";
import CalculatorShell from "@/components/shared/CalculatorShell";
import FormulaBox from "@/components/shared/FormulaBox";
import FaqList from "@/components/shared/FaqList";
import Disclaimer from "@/components/shared/Disclaimer";
import GlossarySection from "@/components/shared/GlossarySection";
import LazyMethodologyBox from "@/components/shared/LazyMethodologyBox";
import LazyRelatedTools from "@/components/shared/LazyRelatedTools";
import WebAppSchema from "@/components/shared/WebAppSchema";
import HowToSchema from "@/components/shared/HowToSchema";
import { calculatorMetadata } from "@/lib/seo";
import { calcBreadcrumb, calcMeta } from "@/lib/calc-meta";

const SLUG = "s-corp-election-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "s-corp-election-calculator",
  title: "S-Corp Election Calculator — Tax Savings vs LLC | BusCalcTools",
  description:
    "Free S-corp election calculator. Compare LLC default tax to S-corp election with reasonable salary, distribution, and compliance overhead — see when the switch pays.",
});

export default function SCorpElectionPage() {
  return (
    <CalculatorShell
      h1="S-Corp Election Calculator — When the Switch Pays Off"
      intro="Compare the tax bill on a default LLC to the same net profit run through an S-corp election — including the reasonable-salary trap and compliance overhead the marketing decks always forget."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema
        slug={SLUG}
        name="S-Corp Election Calculator"
        description="Free 2026 S-corp election break-even calculator including compliance overhead."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
      />
      <SCorpElectionCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Under the LLC default, every dollar of net profit is subject to
          self-employment tax (15.3% on the first $184,500 of SE base in 2026,
          2.9% Medicare above). An S-corp splits profit into two buckets:
          reasonable salary (subject to payroll/FICA tax at the same 15.3%
          effective rate) and distributions (taxed only as income, no FICA).
          The savings come from moving as much of the profit as possible into
          the distribution bucket.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The catch is &quot;reasonable salary&quot;. The IRS expects the salary portion
          to match what someone would be paid to do the same work as an
          employee. Setting salary at 20% of profit to maximise distribution
          savings is a well-known audit trigger. Common defensible ratios sit
          at 40-70% of profit depending on industry and revenue size; the
          calculator&apos;s 60% default sits in the middle of this band.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The other catch is compliance overhead. Running an S-corp adds a
          payroll service, an 1120-S federal return, a state corporate return,
          W-2 and K-1 filings, and an extra accounting hour or two each
          month. The all-in overhead is typically $1,500-5,000 per year.
          Below ~$40-50k of net profit, the SE tax savings rarely exceed this
          overhead — that&apos;s the practical break-even threshold.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Setting salary too low</strong> — &quot;reasonable salary&quot; is the IRS&apos;s favourite S-corp audit issue. Look at the BLS Occupational Employment Statistics for your role + region as the defensible baseline. Going materially below that figure invites a payroll-tax adjustment and a 100% penalty on the underpayment.
          </li>
          <li>
            <strong className="text-brand-dark">Ignoring state corporate tax</strong> — many states tax S-corps separately even though they pass through federally. New York City&apos;s general corporation tax, Tennessee&apos;s franchise + excise tax, and California&apos;s 1.5% S-corp tax all eat into the savings. The state-tier dropdown above approximates the additional bite, but a state-specific check with a CPA is essential.
          </li>
          <li>
            <strong className="text-brand-dark">Electing too early</strong> — most accountants suggest waiting until net profit clears $40-50k consistently before bothering with the election. The break-even point only stays positive after that. Filing Form 2553 at lower profit is paying compliance overhead for tax savings that don&apos;t materialise.
          </li>
          <li>
            <strong className="text-brand-dark">Forgetting SE tax has a cap</strong> — the 12.4% Social Security portion stops at $184,500 of SE base in 2026. Past that, only the 2.9% Medicare remains. S-corp savings on distributions above the wage base shrink to about 2.9% of the distribution amount, not 15.3%. High-income S-corp arithmetic is materially different from mid-income.
          </li>
        </ul>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`LLC Default
  SE Tax     = min(profit, $184,500/0.9235) × 0.9235 × 15.3%
             + max(0, profit − that cap) × 0.9235 × 2.9%
  Total      = SE Tax + Federal Income Tax + State Tax

S-Corp Election
  Salary     = profit × salary %
  Dist       = profit − salary
  FICA Tax   = min(salary, $184,500) × 15.3%
             + max(0, salary − $184,500) × 2.9%
  Total      = FICA Tax + Federal Income Tax (on full profit)
             + State Tax + Overhead ($1.5k-5k/yr)

Annual Savings = LLC Total − S-Corp Total
Break-even profit: typically $40-60k`}
        </pre>
      </FormulaBox>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A consultant in Texas (no state income tax) clears $150,000 of net
          profit. Reasonable salary at 60% = $90,000. Distribution = $60,000.
          S-corp compliance overhead = $2,500.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          LLC default: SE base = $150,000 × 92.35% = $138,525. SE tax = $138,525
          × 15.3% = $21,194. Federal income tax (approx 20% effective at this
          band) = $30,000. Total = ~$51,200.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          S-corp: FICA on $90,000 salary = $13,770. Federal income tax on full
          $150,000 ≈ $30,000 (same as LLC, since federal income tax is on
          combined wages + distribution). Plus overhead $2,500. Total =
          $46,270. Savings = $4,930 per year.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          That $4,930 is worth the election — but the margin tightens if the
          reasonable salary needs to be higher (say 75% would shave savings
          to about $2,700) or if state corporate tax applies. The same
          consultant in California would lose another $2,250 to the 1.5%
          franchise tax + extra state filing, dropping the net benefit to
          roughly $2,700 — still positive but materially smaller.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">When to use this calculator</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Use this when you have an LLC or sole proprietorship that has consistently cleared roughly forty to sixty thousand dollars of net profit and you want to know whether electing S-corp status delivers enough self-employment tax savings to justify the added payroll and compliance overhead. Re-run the numbers each year as profit grows or as the reasonable-salary band tightens.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          If profit is still climbing toward the break-even threshold, hold the election and continue with the LLC default. Pair the result here with the Estimated Tax Calculator to see whether the quarterly payment schedule changes meaningfully after the election.
        </p>
      </section>

      <FaqList items={META.faqs} />

      <GlossarySection
        items={[
          { term: "Reasonable Salary", definition: "The W-2 wage an S-corp owner-employee must pay themselves for the work they actually perform. Set too low and the IRS will re-characterise distributions as wages." },
          { term: "Distribution", definition: "The portion of S-corp profit paid to owners after reasonable salary. Subject to income tax but not FICA, which is where the S-corp savings live." },
          { term: "Form 2553", definition: "The IRS election form an LLC or C-corp files to be taxed as an S-corp. Generally due within 75 days of the start of the tax year you want the election to take effect." },
        ]}
      />

      <LazyRelatedTools
        slugs={["self-employment-tax-calculator", "estimated-tax-calculator", "freelance-rate-calculator"]}
      />

      <LazyMethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
