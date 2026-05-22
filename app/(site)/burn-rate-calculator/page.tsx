import BurnRateCalculator from "@/components/calculators/BurnRateCalculator";
import CalculatorShell from "@/components/shared/CalculatorShell";
import FormulaBox from "@/components/shared/FormulaBox";
import FaqList from "@/components/shared/FaqList";
import Disclaimer from "@/components/shared/Disclaimer";
import LazyMethodologyBox from "@/components/shared/LazyMethodologyBox";
import LazyRelatedTools from "@/components/shared/LazyRelatedTools";
import WebAppSchema from "@/components/shared/WebAppSchema";
import HowToSchema from "@/components/shared/HowToSchema";
import { calculatorMetadata } from "@/lib/seo";
import { calcBreadcrumb, calcMeta } from "@/lib/calc-meta";

const SLUG = "burn-rate-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "burn-rate-calculator",
  title: "Burn Rate Calculator — Months of Runway | BusCalcTools",
  description:
    "Free burn rate and runway calculator. Get gross burn, net burn, runway in months, and your cash-exhaustion date. Built for founders and finance teams.",
});

export default function BurnRatePage() {
  return (
    <CalculatorShell
      h1="Burn Rate & Runway Calculator — Months of Cash Remaining"
      intro="Gross burn, net burn, and runway in months — the three numbers every founder needs to know at all times."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema
        slug={SLUG}
        name="Burn Rate & Runway Calculator"
        description="Free burn rate and runway calculator — how many months of cash before a startup runs out."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
      />
      <BurnRateCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Net burn rate is monthly expenses minus monthly revenue — the
          actual cash being consumed. Runway is your cash balance divided
          by net burn. If revenue exceeds expenses you're cash-flow
          positive and runway is effectively unlimited. The calculator
          also estimates roughly when cash runs out at the current trajectory.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Using a single-month snapshot</strong> — January burn looks huge if you paid an annual SaaS bill that month. February looks great because the bill is gone. Neither number is real. Always use a 3-month rolling average and pull annual or one-off items into a separate line so the underlying trend is visible.
          </li>
          <li>
            <strong className="text-brand-dark">Starting fundraising too late</strong> — fundraising takes 3–6 months in healthy markets and 9+ months in tight ones. Beginning conversations with under 6 months of runway forces accepting bad terms or bridge financing. The action threshold is 12 months of runway, not 6.
          </li>
          <li>
            <strong className="text-brand-dark">Cutting growth before cutting waste</strong> — when runway is short, founders often slash marketing and sales first because they are the easiest line items to zero out. That kills future revenue and shortens runway further. Cut overlapping tools, premium office space, and underperforming hires before touching the growth engine.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">When to use this calculator</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Use this for the single founder/investor health metric — months of runway given current cash and net monthly burn. It is the right tool for board updates, investor decks, and any conversation that needs one number rather than a full forecast.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          For a month-by-month forecast with seasonal lumps and tax dates, use the Cash Flow Calculator instead. To pressure-test what happens when revenue ramps fast enough to make burn negative, pair this with the Break-Even Calculator.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Gross Burn Rate = Total Monthly Expenses
Net Burn Rate   = Monthly Expenses − Monthly Revenue
Runway (months) = Current Cash Balance / Net Burn Rate

If Net Burn Rate ≤ 0, runway is infinite (cash-flow positive).`}
        </pre>
      </FormulaBox>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A US seed-stage SaaS startup closes a $1.8M seed round.
          Monthly costs after hiring the planned team: six engineers at
          $12,000 fully-loaded (salary plus 25% benefits and payroll
          taxes) = $72,000. Founder cash compensation: $8,000. Cloud and
          third-party tools: $5,000. Office and operations: $3,000.
          Marketing and sales: $2,000. Gross burn rate = $90,000 per
          month. Revenue is currently $5,000 in monthly recurring
          revenue from early customers.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Net burn rate = $90,000 − $5,000 = $85,000 per month. Runway
          = $1.8M ÷ $85,000 ≈ 21 months. The fundraising rule of thumb
          is to begin a Series A process at 12–14 months of runway
          remaining (which gives roughly 6 months to close before
          falling below 6 months, the point at which negotiation
          leverage collapses). 21 months gives this team approximately
          7–9 months to focus on growth before fundraising preparation
          becomes urgent.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The two levers that change the picture meaningfully are cutting
          cost or accelerating revenue. Reducing gross burn by 15%
          ($13,500 a month, perhaps by deferring two hires) extends
          runway to 25 months. Tripling MRR from $5k to $15k over the
          next six months drops net burn to $75,000 and pushes runway
          past 24 months. Investors expect MRR growth of 15–20% month-
          on-month at this stage, so the revenue lever is the one to
          obsess over — but cost cuts buy planning room while the
          growth motion is still being figured out.
        </p>
      </section>

      <FaqList items={META.faqs} />

      <LazyRelatedTools slugs={["cash-flow-calculator", "break-even-calculator", "business-valuation-calculator"]} />

      <LazyMethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
