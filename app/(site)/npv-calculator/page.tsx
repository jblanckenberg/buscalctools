import NpvCalculator from "@/components/calculators/NpvCalculator";
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

const SLUG = "npv-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "npv-calculator",
  title: "NPV Calculator — Net Present Value, Instant | BusCalcTools",
  description:
    "Free NPV calculator. Discount up to 15 future cash flows back to today, get an accept/reject decision, and see the per-period present-value breakdown.",
});

export default function NpvPage() {
  return (
    <CalculatorShell
      h1="NPV Calculator — Net Present Value of Any Project"
      intro="Decide whether a project clears your cost of capital. Enter the initial investment, each future cash flow, and your discount rate — the calculator returns the NPV, an accept/reject decision, and the per-period present-value breakdown."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema
        slug={SLUG}
        name="NPV Calculator"
        description="Free online net present value calculator with per-period breakdown and accept/reject decision."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
      />
      <NpvCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How NPV works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Net Present Value is the cleanest way to answer "should we do this project?".
          The idea is simple: a dollar today is worth more than a dollar in five
          years, because today's dollar could be invested at your required rate of
          return. NPV asks: when every future cash flow is discounted back to today
          at that rate, does the project return more than it cost? Positive NPV
          ⇒ the project clears your hurdle. Negative NPV ⇒ the project earns less
          than your alternative, even if the absolute cash flows look attractive.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The discount rate is the one input that does most of the work. Use your
          weighted average cost of capital if you have one; otherwise use your
          required rate of return — typically 8–12% for small businesses without
          complex capital structures. A higher rate is more conservative and
          pushes more projects toward reject.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Worked example</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          A founder is evaluating a $10,000 piece of equipment that should
          generate $4,000 per year for three years, after which it has no salvage
          value. At a 10% required return, the NPV is &minus;$52.59 — the project
          falls just short of clearing the hurdle. The cash flows are real but
          the timing makes them worth slightly less than the up-front cost. The
          decision: reject as proposed, or renegotiate (lower the equipment cost,
          extend the life, find a higher-revenue use).
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Same numbers at an 8% discount rate produce an NPV of &#43;$309.43 — the
          project clears the hurdle. This sensitivity to the discount rate is
          where NPV decisions live or die: a one-point change can flip
          accept-to-reject. Always stress-test the NPV at ±2% of your assumed
          rate before committing.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`NPV = -Initial Investment + Σ (Cash Flow[t] / (1 + r)^t)
      for t = 1..N

where r = discount rate (decimal)
      t = period number (1, 2, 3, ...)
      N = number of periods

Decision rule:
  NPV ≥ 0  →  ACCEPT — the project clears your discount rate
  NPV < 0  →  REJECT — the project earns less than your alternative

Example: -$10,000 + $4,000/yr for 3 years at 10%
  PV[1] = 4000 / 1.10 = 3636.36
  PV[2] = 4000 / 1.21 = 3305.79
  PV[3] = 4000 / 1.331 = 3005.26
  NPV = -10000 + 3636.36 + 3305.79 + 3005.26 = -52.59`}
        </pre>
      </FormulaBox>

      <FaqList items={META.faqs} />

      <GlossarySection
        items={[
          { term: "Discount rate", definition: "The required rate of return used to compare future cash flows against today's value. Higher rate = more conservative." },
          { term: "Present value", definition: "What a future cash flow is worth today, after discounting at the chosen rate." },
          { term: "WACC", definition: "Weighted average cost of capital — the blended cost of a company's debt and equity. The standard textbook discount rate for project NPV." },
          { term: "Hurdle rate", definition: "The minimum return a project must earn to be accepted. Set above WACC to add a risk premium." },
          { term: "Terminal value", definition: "The lump-sum value assigned to a project's cash flows beyond the explicit forecast period, added to the final period's flow before discounting." },
        ]}
      />

      <LazyRelatedTools slugs={["roi-calculator", "payback-period-calculator", "business-valuation-calculator"]} />

      <LazyMethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
