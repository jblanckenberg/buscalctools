import IrrCalculator from "@/components/calculators/IrrCalculator";
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

const SLUG = "irr-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "irr-calculator",
  title: "IRR Calculator — Internal Rate of Return | BusCalcTools",
  description:
    "Free IRR calculator. Find the discount rate that makes NPV zero. Newton-Raphson solver with bisection fallback for cash flows of any shape.",
});

export default function IrrPage() {
  return (
    <CalculatorShell
      h1="IRR Calculator — Internal Rate of Return"
      intro="Find the break-even discount rate for any project — the rate that makes net present value exactly zero. Use it to rank projects when capital is constrained, or to test whether a deal clears your hurdle."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema
        slug={SLUG}
        name="IRR Calculator"
        description="Free online internal rate of return calculator with Newton-Raphson solver."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
      />
      <IrrCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How IRR works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          The Internal Rate of Return is the discount rate that would make the
          NPV of all cash flows exactly zero. Said differently: IRR is the
          rate the project itself earns on the money it absorbs. If your
          hurdle rate is 10% and the project's IRR is 14%, the project beats
          your hurdle by 4 percentage points. If IRR is 7%, the project earns
          less than your alternative, even if the absolute dollars look good.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          IRR is solved iteratively because no closed-form solution exists for
          general cash-flow series. This calculator uses Newton-Raphson with a
          bisection fallback for shapes Newton-Raphson can't converge on.
          Most converge in under 10 iterations.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Find r such that:
  0 = -Initial + Σ (Cash Flow[t] / (1 + r)^t)  for t = 1..N

Decision rule:
  IRR ≥ hurdle rate  →  ACCEPT
  IRR < hurdle rate  →  REJECT

Example: -$1,000 then $400/yr for 3 years
  0 = -1000 + 400/(1+r) + 400/(1+r)^2 + 400/(1+r)^3
  Solving:  r ≈ 9.70%

If hurdle is 10%, the project just barely misses ⇒ reject.
If hurdle is 8%, the project clears ⇒ accept.`}
        </pre>
      </FormulaBox>

      <FaqList items={META.faqs} />

      <GlossarySection
        items={[
          { term: "IRR", definition: "The discount rate that makes NPV equal zero. The rate the project itself earns on absorbed cash." },
          { term: "Hurdle rate", definition: "The minimum return required for accept. Compare IRR against this number to make the call." },
          { term: "Newton-Raphson", definition: "An iterative numerical method for finding roots of equations. The default IRR solver." },
          { term: "Sign change", definition: "Required for IRR to exist. Any cash-flow series with all-negative or all-positive flows has no IRR." },
          { term: "Multiple IRRs", definition: "When cash flows have more than one sign change, multiple IRRs can exist mathematically. Use NPV instead." },
        ]}
      />

      <LazyRelatedTools slugs={["npv-calculator", "roi-calculator", "payback-period-calculator"]} />

      <LazyMethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
