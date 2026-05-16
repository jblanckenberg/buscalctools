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
