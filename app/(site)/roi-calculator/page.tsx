import RoiCalculator from "@/components/calculators/RoiCalculator";
import CalculatorShell from "@/components/shared/CalculatorShell";
import FormulaBox from "@/components/shared/FormulaBox";
import FaqList from "@/components/shared/FaqList";
import RelatedTools from "@/components/shared/RelatedTools";
import Disclaimer from "@/components/shared/Disclaimer";
import MethodologyBox from "@/components/shared/MethodologyBox";
import EmbedCTA from "@/components/shared/EmbedCTA";
import WebAppSchema from "@/components/shared/WebAppSchema";
import HowToSchema from "@/components/shared/HowToSchema";
import { calculatorMetadata } from "@/lib/seo";
import { calcBreadcrumb, calcMeta } from "@/lib/calc-meta";

const SLUG = "roi-calculator";
const META = calcMeta(SLUG)!;

export const metadata = calculatorMetadata({
  slug: "roi-calculator",
  title: "ROI Calculator — Annualised Return | BusCalcTools",
  description:
    "Free ROI calculator. Get total and annualised return on any business investment — marketing, equipment, training — in seconds. Compare projects fairly.",
});

export default function RoiPage() {
  return (
    <CalculatorShell
      h1="ROI Calculator — Calculate Return on Investment Instantly"
      intro="Measure return on any business spend — marketing, equipment, training. Add a time period to get an annualised rate so you can compare investments of different lengths."
      breadcrumbs={calcBreadcrumb(SLUG)}
      slug={SLUG}
    >
      <WebAppSchema
        slug={SLUG}
        name="ROI Calculator"
        description="Free return on investment calculator with annualised ROI for any business spend."
        featureList={META.featureList}
        applicationSubCategory={META.applicationSubCategory}
      />
      <HowToSchema
        slug={SLUG}
        name={META.howToName}
        description={META.howToDescription}
        steps={META.howToSteps}
      />
      <RoiCalculator />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">How it works</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Enter your initial investment (what you spent) and your net return
          (what came back). The calculator returns ROI as a percentage and
          net profit in cash. Add an investment period in months to also
          get an annualised ROI — essential for comparing a 6-month
          campaign against a 2-year purchase fairly.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">Common mistakes</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-brand-dark">Counting revenue as the return</strong> — a campaign generating $50,000 from $10,000 spend looks like 400% ROI, but if COGS on that revenue was $35,000, the actual profit is $5,000 and the true ROI is -50%. Always use net profit (revenue minus the cost of fulfilling it), not gross revenue, in the numerator.
          </li>
          <li>
            <strong className="text-brand-dark">Not annualising for different durations</strong> — a 35% return over 18 months is not better than a 25% return over 12 months. Annualise both before comparing (18-month 35% = 22.5% annualised). Without annualisation, longer-duration investments look artificially stronger.
          </li>
          <li>
            <strong className="text-brand-dark">Ignoring the next-best alternative</strong> — a 30% ROI on a marketing investment looks good in isolation, but if paying down 12% debt would have been the alternative, the marketing only outperformed by 18%. Compare every investment to the opportunity cost (debt paydown, other projects, a cash reserve), not zero.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-brand-dark">When to use this calculator</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Use this for any discrete business spend with a measurable return: a marketing campaign, a piece of equipment, a training programme, a new software platform. It is the right tool for after-the-fact post-mortems and for go/no-go decisions on a single project.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          If you care about how quickly the cash comes back (rather than total return), use the Payback Period Calculator. To value the whole business as an investment rather than a single project, the Business Valuation Calculator is the right tool.
        </p>
      </section>

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`ROI (%) = ((Net Return − Initial Investment) / Initial Investment) × 100

Annualised ROI = ((1 + ROI/100) ^ (12/months) − 1) × 100

Example: Investment = $10,000 | Net Return = $13,500 | Period = 18 months
  ROI           = (3,500 / 10,000) × 100 = 35%
  Annualised    = ((1.35) ^ (12/18) − 1) × 100 = 22.5%`}
        </pre>
      </FormulaBox>

      <FaqList items={META.faqs} />

      <RelatedTools slugs={["break-even-calculator", "business-valuation-calculator", "payback-period-calculator"]} />

      <EmbedCTA slug={SLUG} />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
