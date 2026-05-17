import PaybackPeriodCalculator from "@/components/calculators/PaybackPeriodCalculator";
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

const SLUG = "payback-period-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "payback-period-calculator",
  title: "Payback Period Calculator — Years to Recoup | BusCalcTools",
  description:
    "Free payback period calculator. Get simple and discounted payback in years for any business investment. Color-coded urgency tier. Region-aware currency.",
});

const FAQS = [
  { q: "What is the payback period?", a: "The payback period is the time it takes for an investment to generate enough cash flow to recoup its initial cost. A $10,000 investment that generates $2,500 per year has a 4-year payback period. Shorter payback periods mean lower risk." },
  { q: "What is a good payback period for a business investment?", a: "Most businesses target payback periods of 2–3 years for equipment and 1–2 years for marketing investments. Investments with payback periods under 2 years are generally considered low-risk. Above 5 years requires careful consideration of opportunity cost." },
  { q: "What is discounted payback period?", a: "Discounted payback period accounts for the time value of money — future cash flows are worth less than present cash flows due to inflation and opportunity cost. It discounts each year's cash flow back to present value before cumulating toward the investment recovery point." },
  { q: "How is payback period different from ROI?", a: "ROI measures the total profitability of an investment as a percentage. Payback period measures how quickly you get your money back, without regard for what happens after that point. Both are useful: ROI for total return, payback for liquidity and risk assessment." },
  { q: "What are the limitations of payback period analysis?", a: "Payback period ignores cash flows after the recovery point (a 3-year payback investment that earns for 20 years vs 3 years is treated the same). Use it alongside ROI and NPV analysis for complete investment evaluation." },
  { q: "What discount rate should I use in the US, UK, and SA?", a: "The discount rate reflects your opportunity cost — what you'd earn investing the money elsewhere. US small businesses often use 10–15% (above stock market average to compensate for business risk). UK businesses 8–12% (in line with WACC for typical SMEs). South African businesses 13–18% (higher local interest rates and currency risk push the floor up). Use a higher rate if the investment is risky or the cash flows are uncertain." },
  { q: "What is the most common payback period mistake?", a: "Using projected cash flows that are too optimistic. A spreadsheet showing 4-year payback on equipment that promises $25,000 annual savings looks great — until the equipment underperforms by 30% and the real payback is 5.7 years. Always model a base case, a worst case (cash flows 25% lower), and a best case. If the worst case exceeds 5 years, the investment is fragile." },
  { q: "What if my annual cash flow is zero or negative?", a: "Simple payback becomes infinite (you'd never recover the investment) and the calculator returns an error. Negative cash flow means the investment is losing money in addition to not paying back. This isn't always disqualifying — an investment in brand or R&D may have negative direct cash flow but build long-term value. But it does mean payback period is the wrong evaluation tool; switch to ROI or strategic value assessment." },
  { q: "I have my payback period — what should I do with it?", a: "Compare it to two benchmarks. One: your maximum acceptable payback for that asset class — typically 2 years for marketing, 3 years for equipment, 5 years for property. If the calculator says longer, the project is too slow. Two: the asset's useful life — payback must be significantly shorter than how long the asset will keep earning. Equipment with 6-year life and 5-year payback gives only one year of pure profit; not enough margin for error." },
  { q: "How is payback different from break-even?", a: "Break-even asks \"how many units per period must I sell to cover ongoing costs?\" — it's an operational measure repeated every period. Payback asks \"how long until a one-off capital investment is recovered?\" — it's a one-time measure for a specific decision. A new product launch needs both: the unit volume to be operationally viable (break-even) and the months until the launch investment is recouped (payback)." },
];

export default function PaybackPeriodPage() {
  return (
    <CalculatorShell
      h1="Payback Period Calculator — Recoup Your Investment Timeframe"
      intro="How many years until an investment pays for itself. Optional discount rate for the more rigorous discounted-payback view that accounts for the time value of money."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema
        slug={SLUG}
        name="Payback Period Calculator"
        description="Free payback period calculator with simple and discounted payback for any business investment."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
      />
      <PaybackPeriodCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Simple payback divides the upfront investment by the annual cash
          inflow. If you spend $50,000 to earn back $18,000 per year, you
          recover the investment in 2.78 years. Discounted payback applies a
          discount rate to each year's cash flow first, so future returns
          count less than near-term ones — closer to how investors really
          value future income.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Simple Payback Period = Initial Investment / Annual Net Cash Inflow

Discounted Payback: Each year's cash flow is discounted: CF / (1 + r)^n
Count years until sum of discounted cash flows >= Initial Investment`}
        </pre>
      </FormulaBox>

      <FaqList items={FAQS} />

      <RelatedTools slugs={["roi-calculator", "break-even-calculator", "business-valuation-calculator"]} />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
