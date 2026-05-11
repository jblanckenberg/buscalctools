import BurnRateCalculator from "@/components/calculators/BurnRateCalculator";
import CalculatorShell from "@/components/shared/CalculatorShell";
import FormulaBox from "@/components/shared/FormulaBox";
import FaqList from "@/components/shared/FaqList";
import RelatedTools from "@/components/shared/RelatedTools";
import Disclaimer from "@/components/shared/Disclaimer";
import WebAppSchema from "@/components/shared/WebAppSchema";
import { calculatorMetadata } from "@/lib/seo";

export const metadata = calculatorMetadata({
  slug: "burn-rate-calculator",
  title: "Burn Rate Calculator — How Long Does Your Cash Last?",
  description:
    "Calculate startup burn rate and runway. Find out exactly how many months of cash you have left. Free tool for founders.",
});

const FAQS = [
  { q: "What is burn rate?", a: "Burn rate is the rate at which a company spends its cash reserves. Gross burn rate is total monthly expenses. Net burn rate is expenses minus revenue — the net cash being consumed each month. A startup with $500,000 in the bank and a $50,000 net burn rate has 10 months of runway." },
  { q: "What is a startup runway?", a: "Runway is the number of months a company can operate before running out of cash, calculated as: Current Cash / Monthly Net Burn Rate. Investors typically want to see at least 18 months of runway. Below 9 months is a critical situation requiring immediate action." },
  { q: "What is a healthy burn rate for a startup?", a: "There is no single healthy burn rate — it depends on your stage and funding. What matters is the ratio of burn to progress. A startup burning $100,000/month with rapid revenue growth may be more healthy than one burning $20,000/month with no growth." },
  { q: "How do I extend my runway?", a: "Runway extension strategies: cut non-essential costs immediately, accelerate revenue collection, offer annual payment discounts to customers, renegotiate vendor contracts, pause hiring, and identify break-even milestones to reduce burn systematically." },
  { q: "When should a startup raise more funding?", a: "Start fundraising when you have 9–12 months of runway remaining. Fundraising typically takes 3–6 months, so starting at 12 months gives you a buffer. Never start fundraising with less than 6 months of runway — desperation weakens your negotiating position." },
];

export default function BurnRatePage() {
  return (
    <CalculatorShell
      h1="Burn Rate & Runway Calculator — Months of Cash Remaining"
      intro="Gross burn, net burn, and runway in months — the three numbers every founder needs to know at all times."
    >
      <WebAppSchema
        slug="burn-rate-calculator"
        name="Burn Rate & Runway Calculator"
        description="Free burn rate and runway calculator — how many months of cash before a startup runs out."
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

      <Disclaimer />
    </CalculatorShell>
  );
}
