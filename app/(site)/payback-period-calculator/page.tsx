import PaybackPeriodCalculator from "@/components/calculators/PaybackPeriodCalculator";
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

const SLUG = "payback-period-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "payback-period-calculator",
  title: "Payback Period Calculator — Years to Recoup | BusCalcTools",
  description:
    "Free payback period calculator. Get simple and discounted payback in years for any business investment. Color-coded urgency tier. Region-aware currency.",
});

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

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Using over-optimistic cash flows</strong> — a spreadsheet showing 4-year payback on equipment promising $25,000/year savings looks great until the kit underperforms by 30% and the real payback is 5.7 years. Always model a base case, a worst case (cash flows 25% lower), and a best case. If the worst case exceeds 5 years, the investment is fragile.
          </li>
          <li>
            <strong className="text-brand-dark">Ignoring what happens after payback</strong> — payback period treats a 3-year payback investment that earns for 20 years the same as one that earns for 3. Two projects with identical payback can have wildly different total returns. Pair payback with ROI or NPV to see the post-recovery value.
          </li>
          <li>
            <strong className="text-brand-dark">Skipping the discount rate</strong> — simple payback assumes a dollar in year 5 is worth the same as a dollar today. It isn't, especially at higher inflation or in higher-rate markets like SA. For investments over 3 years, always use discounted payback (10–12% US, 9–11% UK, 13–18% SA) rather than the simple version.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">When to use this calculator</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Use this when you need to know how quickly a one-off investment recovers itself — equipment, a website rebuild, a marketing push with a measurable revenue lift, a property fit-out. Shorter payback = lower risk. This is the right tool when liquidity and risk matter more than total return.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          If you care about the total return rather than the speed, the ROI Calculator is more relevant. To model the monthly cash impact of the investment alongside the rest of the business, use the Cash Flow Calculator.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Simple Payback Period = Initial Investment / Annual Net Cash Inflow

Discounted Payback: Each year's cash flow is discounted: CF / (1 + r)^n
Count years until sum of discounted cash flows >= Initial Investment`}
        </pre>
      </FormulaBox>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A UK commercial printing business buys a new digital printer for
          £45,000. The new machine reduces outsourced print jobs and
          enables higher-margin same-day work; the owner projects
          incremental gross profit of £18,000 per year over the
          machine&apos;s useful life of seven years. Simple payback period
          = £45,000 ÷ £18,000 = 2.5 years.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Discounted payback period applies a discount rate to each
          year&apos;s cash inflow to reflect the time value of money. At a
          10% discount rate, year-1 cash flow of £18,000 is worth £16,364
          in today&apos;s pounds; year 2 is worth £14,876; year 3 worth
          £13,524. Cumulative discounted cash flow after three years is
          £44,764 — still £236 short of the £45,000 investment. The
          discounted payback lands at roughly 3.0 years, six months
          longer than the simple figure.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          UK small-business owners typically use a 3-year payback as
          the cut-off for capital investments — anything that pays back
          faster usually clears the bar. This printer comfortably
          qualifies. But payback alone misses the most important
          number: the post-payback "tail". After the machine pays
          itself off, the remaining 4.5 years of useful life generate
          roughly £81,000 of additional gross profit — the actual
          economic return on the investment is the tail, not the
          recovery period. Pair payback with ROI for a complete
          picture: payback measures speed of capital recovery, ROI
          measures total return.
        </p>
      </section>

      <FaqList items={META.faqs} />

      <LazyRelatedTools slugs={["npv-calculator", "irr-calculator", "roi-calculator"]} />

      <LazyMethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
