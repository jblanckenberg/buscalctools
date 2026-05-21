import PayrollTaxCalculator from "@/components/calculators/PayrollTaxCalculator";
import CalculatorShell from "@/components/shared/CalculatorShell";
import FormulaBox from "@/components/shared/FormulaBox";
import FaqList from "@/components/shared/FaqList";
import LazyBelowFold from "@/components/shared/LazyBelowFold";
import RelatedTools from "@/components/shared/RelatedTools";
import Disclaimer from "@/components/shared/Disclaimer";
import MethodologyBox from "@/components/shared/MethodologyBox";
import WebAppSchema from "@/components/shared/WebAppSchema";
import HowToSchema from "@/components/shared/HowToSchema";
import { calculatorMetadata } from "@/lib/seo";
import { calcBreadcrumb, calcMeta } from "@/lib/calc-meta";

const SLUG = "payroll-tax-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "payroll-tax-calculator",
  title: "Payroll Tax Calculator — Employer Burden | BusCalcTools",
  description:
    "Free US payroll tax calculator for employers. FICA, FUTA, state UI + workers comp combined into total per-employee and total payroll burden.",
});

export default function PayrollTaxPage() {
  return (
    <CalculatorShell
      h1="Payroll Tax Calculator — Employer Burden (TY 2026)"
      intro="Estimate the total employer-side payroll-tax burden — FICA, FUTA, state unemployment, and workers compensation — for any payroll size and headcount."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema slug={SLUG} name="Payroll Tax Calculator" description="Free 2026 US employer payroll-tax calculator." featureList={META.featureList} applicationSubCategory={META.applicationSubCategory} />
      <HowToSchema slug={SLUG} name={META.howToName} description={META.howToDescription} steps={META.howToSteps} />
      <PayrollTaxCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Employer-side payroll taxes total roughly 7.65-13% of gross wages depending on state. The federal portion is fixed: FICA (Social Security 6.2% to $184,500 wage base + Medicare 1.45% uncapped) plus FUTA (0.6% on first $7,000 per employee after state credit). The variable portion is state unemployment insurance and workers compensation, which together typically add 1.5-7%. The calculator handles the SS wage-base cap automatically.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li><strong className="text-brand-dark">Ignoring state UI experience rating.</strong> New employers pay the &quot;new employer rate&quot; (often the highest band) for 2-3 years before being reassigned based on actual unemployment claims. Established employers with low claims can pay 0.5% in states where new employers pay 4-5%.</li>
          <li><strong className="text-brand-dark">Forgetting workers comp variance.</strong> Office staff costs $0.20-0.50 per $100 wages; construction $5-15 per $100. The calculator&apos;s 1.5-6% bands assume mixed white-collar — adjust upward for hazardous industries.</li>
          <li><strong className="text-brand-dark">Counting employee FICA in employer burden.</strong> The 7.65% withheld from employees doesn&apos;t cost the employer directly (it reduces take-home pay). Only the matching 7.65% employer-side portion is true payroll-tax burden.</li>
        </ul>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Federal Employer Payroll Taxes (2026):
  Social Security:    6.2% × wages up to $184,500 per employee
  Medicare:           1.45% × all wages (no cap)
  FUTA:               0.6% × first $7,000 per employee (after state credit)

Variable (state, employer-paid):
  State UI:           0.5-5% depending on state + experience rating
  Workers Comp:       0.2-15% depending on industry + state

Total employer burden typically 9-13% of gross wages.

Example: $500,000 payroll, 8 employees ($62,500 avg), moderate state (~3.5%):
  FICA      = $500,000 × 7.65% = $38,250
  FUTA      = 8 × $7,000 × 0.6% = $336
  State     = $500,000 × 3.5% = $17,500
  Total     = $56,086 (11.2% of payroll)`}
        </pre>
      </FormulaBox>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A 12-employee professional-services firm in Colorado runs $850,000 of annual payroll (average wage ~$70,800 — none breach the SS wage base). State combined rate (UI + workers comp for office work): moderate ~3.5%.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          FICA = $850,000 × 7.65% = $65,025. FUTA = 12 × $7,000 × 0.6% = $504. State = $850,000 × 3.5% = $29,750. Total employer tax = $95,279, or 11.2% of payroll. Per-employee burden: ~$7,940/year.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Same firm in California (high tier ~6%): state portion becomes $51,000, total rises to ~$116,529 — 13.7% of payroll. $21k/year more on the same workforce, all from the higher state rate. Important variable for site-selection decisions, especially for headcount-heavy businesses.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">When to use this calculator</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Use this when budgeting headcount additions, when sizing payroll for an annual operating plan, when negotiating salary against a fully-loaded cost target, or when comparing the true cost of opening operations in different US states. The employer payroll tax burden typically adds nine to thirteen percent on top of gross wages and is one of the larger non-salary line items in any small-business budget.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          If you want to see total per-employee cost including benefits, workspace, equipment, and overhead, the Employee Cost Calculator extends this view. If you are pricing your own time as an owner rather than computing employer-side burden, switch to the Self-Employment Tax Calculator.
        </p>
      </section>

      <FaqList items={META.faqs} />

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-brand-dark">Glossary</h2>
        <dl className="mt-3 space-y-3 text-sm text-gray-700">
          <div>
            <dt className="font-semibold text-brand-dark">FICA</dt>
            <dd>Federal Insurance Contributions Act tax — the combined 7.65 percent Social Security and Medicare employer share. Social Security caps at the annual wage base; Medicare has no cap.</dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-dark">FUTA</dt>
            <dd>Federal Unemployment Tax Act — a 0.6 percent federal levy on the first seven thousand dollars of each employee's annual wages, after the standard state credit.</dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-dark">State UI</dt>
            <dd>State unemployment insurance — a state-administered employer tax whose rate is adjusted each year based on the employer's actual claims experience. New employers start at a default rate for two to three years.</dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-dark">Workers Compensation</dt>
            <dd>Mandatory insurance covering on-the-job injuries. Premium varies dramatically by industry — office staff at a fraction of a percent, construction in the high single digits or more.</dd>
          </div>
          <div>
            <dt className="font-semibold text-brand-dark">Experience Rating</dt>
            <dd>The state UI mechanism that adjusts an established employer's rate up or down based on the unemployment claims actually filed by former employees.</dd>
          </div>
        </dl>
      </section>

      <LazyBelowFold minHeight={240} placeholderLabel="Related calculators loading">
        <RelatedTools slugs={["employee-cost-calculator", "self-employment-tax-calculator", "hourly-to-salary-calculator"]} />
      </LazyBelowFold>

      <LazyBelowFold minHeight={400} placeholderLabel="Methodology section loading">
        <MethodologyBox slug={SLUG} />
      </LazyBelowFold>

      <Disclaimer />
    </CalculatorShell>
  );
}
