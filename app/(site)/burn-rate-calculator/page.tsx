import BurnRateCalculator from "@/components/calculators/BurnRateCalculator";
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

const SLUG = "burn-rate-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "burn-rate-calculator",
  title: "Burn Rate Calculator — Months of Runway | BusCalcTools",
  description:
    "Free burn rate and runway calculator. Get gross burn, net burn, runway in months, and your cash-exhaustion date. Built for founders and finance teams.",
});

const FAQS = [
  { q: "What is burn rate?", a: "Burn rate is the rate at which a company spends its cash reserves. Gross burn rate is total monthly expenses. Net burn rate is expenses minus revenue — the net cash being consumed each month. A startup with $500,000 in the bank and a $50,000 net burn rate has 10 months of runway." },
  { q: "What is a startup runway?", a: "Runway is the number of months a company can operate before running out of cash, calculated as: Current Cash / Monthly Net Burn Rate. Investors typically want to see at least 18 months of runway. Below 9 months is a critical situation requiring immediate action." },
  { q: "What is a healthy burn rate for a startup?", a: "There is no single healthy burn rate — it depends on your stage and funding. What matters is the ratio of burn to progress. A startup burning $100,000/month with rapid revenue growth may be more healthy than one burning $20,000/month with no growth." },
  { q: "How do I extend my runway?", a: "Runway extension strategies: cut non-essential costs immediately, accelerate revenue collection, offer annual payment discounts to customers, renegotiate vendor contracts, pause hiring, and identify break-even milestones to reduce burn systematically." },
  { q: "When should a startup raise more funding?", a: "Start fundraising when you have 9–12 months of runway remaining. Fundraising typically takes 3–6 months, so starting at 12 months gives you a buffer. Never start fundraising with less than 6 months of runway — desperation weakens your negotiating position." },
  { q: "Do US, UK, and South African startups think about runway differently?", a: "The maths is identical, but the cushion expectations differ. US VC-backed startups typically target 18–24 months of runway between rounds because Series A and B fundraising is competitive and slow. UK and EU founders often run leaner — 12–18 months — because angel and seed rounds close faster but at smaller cheque sizes. South African founders frequently need 24+ months because the local VC market is thinner and forex risk on USD costs adds volatility." },
  { q: "What is the most common burn rate mistake?", a: "Using a single-month snapshot rather than a 3-month rolling average. A founder who paid an annual SaaS bill in January will see January burn that overstates true monthly spend by 30–50%, panic, and overcorrect. Always smooth burn over the last three months, and pull out one-off items (legal fees, annual contracts) into a separate line so the underlying trend is visible." },
  { q: "What if my revenue is higher than my expenses?", a: "Net burn is negative — you're cash-flow positive and runway is effectively infinite at the current trajectory. The calculator returns \"profitable\" rather than a runway number. Congratulations, but stay disciplined: the metric to watch shifts from runway to cash conversion (how quickly profit becomes bank balance) and the next milestone becomes reinvestment ROI rather than survival." },
  { q: "How is burn rate different from cash flow?", a: "Burn rate is a summary metric — typically one number for monthly net cash consumption, used by founders and investors as a quick health check. Cash flow is a detailed forecast — month-by-month income and expense lines projected forward. Burn rate tells you how long the runway is; a cash flow projection tells you which month the bumps are. Use burn for board updates, cash flow for operational planning." },
  { q: "I know my runway — what action does it dictate?", a: "Above 18 months: focus on growth and product, not fundraising. 12–18 months: start warming investor conversations and tightening unit economics. 9–12 months: begin formal fundraising and identify cost cuts that don't damage growth. Under 6 months: assume fundraising will fail and execute a path to breakeven (cut burn 30–50%, even at the cost of growth speed). Match the action to the runway band, not your mood." },
];

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

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Gross Burn Rate = Total Monthly Expenses
Net Burn Rate   = Monthly Expenses − Monthly Revenue
Runway (months) = Current Cash Balance / Net Burn Rate

If Net Burn Rate ≤ 0, runway is infinite (cash-flow positive).`}
        </pre>
      </FormulaBox>

      <FaqList items={FAQS} />

      <RelatedTools slugs={["cash-flow-calculator", "break-even-calculator", "business-valuation-calculator"]} />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
