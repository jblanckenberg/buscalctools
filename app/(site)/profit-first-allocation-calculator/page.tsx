import ProfitFirstAllocationCalculator from "@/components/calculators/ProfitFirstAllocationCalculator";
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

const SLUG = "profit-first-allocation-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "profit-first-allocation-calculator",
  title: "Profit First Calculator — Michalowicz Allocations | BusCalcTools",
  description:
    "Free Profit First allocation calculator. Auto-detects your revenue tier and applies Mike Michalowicz's target percentages for Profit, Owner's Pay, Tax, and OpEx.",
});

export default function ProfitFirstAllocationPage() {
  return (
    <CalculatorShell
      h1="Profit First Allocation Calculator — Michalowicz TAPs"
      intro="Auto-detect your Profit First revenue tier (A through E) and see exactly how much of each month's Real Revenue belongs in Profit, Owner's Pay, Tax, and Operating Expenses bank accounts."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema slug={SLUG} name="Profit First Allocation Calculator" description="Free Profit First allocation calculator with auto-detected revenue tier." featureList={META.featureList} applicationSubCategory={META.applicationSubCategory} />
      <HowToSchema slug={SLUG} name={META.howToName} description={META.howToDescription} steps={META.howToSteps} />
      <ProfitFirstAllocationCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Mike Michalowicz&apos;s Profit First system reverses the standard
          Sales − Expenses = Profit equation. Instead, profit is taken first:
          Sales − Profit = Expenses. Each month, you allocate Real Revenue
          (gross revenue minus materials and subcontractors that pass through)
          across four separate bank accounts according to Target Allocation
          Percentages (TAPs) for your revenue tier.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The calculator auto-detects your tier from annual Real Revenue
          (monthly × 12). Tier A businesses ($0-$250k) allocate 50% to Owner&apos;s
          Pay because the owner IS the business. Tier D businesses ($1M-$5M)
          allocate only 10% to Owner&apos;s Pay because the team carries the work
          and OpEx legitimately needs the headcount — the percentages scale
          with operational maturity.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li><strong className="text-brand-dark">Skipping Real Revenue.</strong> For a contractor or e-commerce business with 40% materials, allocating against gross revenue puts you 40% over budget on everything. Always compute Real Revenue first.</li>
          <li><strong className="text-brand-dark">Adopting target TAPs immediately.</strong> Michalowicz recommends gradual transition — start at your current allocation pattern and shift 1-3 percentage points per quarter toward the target. Going from 0% profit to 5% overnight breaks operations and triggers spending-cuts panic.</li>
          <li><strong className="text-brand-dark">Treating tax as optional.</strong> The Tax account is the one most owners raid in tight months. Touching it creates the IRS-quarterly-payment problem every freelance accountant warns about. Use a separate institution if needed to add friction.</li>
          <li><strong className="text-brand-dark">Aggregating accounts.</strong> The system relies on multiple physical bank accounts forcing the allocation discipline. Calculating allocations on a spreadsheet while keeping one mixed account defeats the behavioural mechanism Profit First depends on.</li>
        </ul>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Real Revenue = Top-Line Revenue − (Materials + Subcontractor Pass-Through)

Tier A ($0-$250k annual RR):    Profit 5%   Owner Pay 50%  Tax 15%  OpEx 30%
Tier B ($250k-$500k):           Profit 10%  Owner Pay 35%  Tax 15%  OpEx 40%
Tier C ($500k-$1M):             Profit 15%  Owner Pay 20%  Tax 15%  OpEx 50%
Tier D ($1M-$5M):               Profit 10%  Owner Pay 10%  Tax 15%  OpEx 65%
Tier E ($5M-$10M):              Profit 15%  Owner Pay 5%   Tax 15%  OpEx 65%

Example: $30,000/mo revenue, 15% materials
  Real Revenue = $30,000 × 0.85 = $25,500/mo
  Annual Real Revenue = $306,000 → Tier B
  Profit:    $2,550/mo   Owner Pay: $8,925/mo
  Tax:       $3,825/mo   OpEx:      $10,200/mo`}
        </pre>
      </FormulaBox>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A graphic design studio runs $30,000/month in revenue. 15% goes to subcontractors (freelance designers used for overflow capacity). Real Revenue = $30,000 × 0.85 = $25,500/month. Annualised: $306,000 → Tier B.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Tier B TAPs: Profit 10%, Owner&apos;s Pay 35%, Tax 15%, OpEx 40%. Monthly allocations: Profit $2,550, Owner&apos;s Pay $8,925, Tax $3,825, OpEx $10,200. The Profit account is touched only quarterly — half distributed to the owner as a profit bonus, half saved as a reserve. Owner&apos;s Pay funds the owner&apos;s monthly draw. Tax funds quarterly 1040-ES payments. OpEx covers everything else: rent, software, marketing, occasional contractors above subcontractor allocation.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          What if OpEx of $10,200 is too tight given current $14,000/month expenses? Three options. (1) Cut expenses to fit — the entire point of Profit First, force the constraint. (2) Increase Real Revenue — same allocations work better at $36,000/month gross. (3) Phase in: start at current allocation, shift 1-2 percentage points per quarter toward target until you reach Tier B levels in 12-18 months. Michalowicz strongly recommends path 3 — overnight cuts usually fail.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">When to use this calculator</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Use this when you are adopting the Profit First system for the first time, when annual revenue crosses into a new tier and the target percentages should shift, or when you want a single monthly bank-allocation rhythm rather than a profit-and-loss-driven owner draw. It is built for owner-operated small businesses where cash discipline matters more than accounting nuance.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          If you are pricing a service rather than allocating revenue, the Freelance Rate Calculator is the better starting point. To check whether the bank balance and the income statement actually agree, run the Cash Flow Calculator alongside this allocation view.
        </p>
      </section>

      <FaqList items={META.faqs} />

      <GlossarySection
        items={[
          { term: "Real Revenue", definition: "Top-line revenue minus pass-through costs like materials and subcontractors. The base for Profit First allocations." },
          { term: "TAPs", definition: "Target Allocation Percentages — the share of Real Revenue assigned to each account at your tier." },
          { term: "Profit Distribution", definition: "The quarterly transfer from the Profit account to the owner. Half is paid as a bonus, half kept as reserve." },
        ]}
      />

      <LazyRelatedTools slugs={["cash-flow-calculator", "net-profit-calculator", "freelance-rate-calculator"]} />

      <LazyMethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
