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

const FAQS = [
  { q: "What is ROI?", a: "ROI (Return on Investment) is a measure of the profitability of an investment expressed as a percentage of the original cost. An ROI of 35% means you earned $35 in profit for every $100 invested. A positive ROI means the investment was profitable; a negative ROI means it was a loss." },
  { q: "How do I calculate ROI?", a: "ROI (%) = ((Net Return − Investment Cost) / Investment Cost) × 100. Net Return is the total income or value generated. Investment Cost is what you paid. Example: invest $5,000, earn back $6,500 — ROI = (1,500/5,000) × 100 = 30%." },
  { q: "What is a good ROI for a small business?", a: "A 15–30% annual ROI is considered good for most small business investments. Marketing campaigns with ROI above 100% (you earn back more than double what you spent) are excellent. Any positive ROI means the investment paid off more than doing nothing." },
  { q: "What is annualised ROI and when should I use it?", a: "Annualised ROI converts a total ROI figure into an equivalent yearly rate, allowing you to compare investments held for different periods. Use it when comparing a 6-month investment against a 2-year investment on an equal basis." },
  { q: "How is ROI used in marketing?", a: "Marketing ROI measures the revenue generated from a campaign relative to what it cost to run it. An ROI above 100% means the campaign returned more revenue than it cost. Most businesses target marketing ROI of 200–500% (earning $2–$5 for every $1 spent)." },
  { q: "Should I include tax in ROI calculations?", a: "Use pre-tax figures when comparing investments to keep the analysis consistent, then apply tax separately at the end. Tax rates differ by jurisdiction (US 21% federal, UK 25%, SA 27%) and by investment type (capital gains often taxed differently from operating profit). Calculating ROI gross-of-tax means the same investment looks the same in every region; tax adjustments are applied as a final layer when deciding actual cash retained." },
  { q: "What is the most common ROI mistake?", a: "Counting revenue as the return instead of profit. A marketing campaign that generated $50,000 in revenue from $10,000 spend looks like 400% ROI — but if the COGS on that revenue was $35,000, the actual profit is $5,000 and the true ROI is negative 50%. Always use net return (revenue minus the costs of fulfilling that revenue), not gross revenue, in the numerator." },
  { q: "What if my ROI is negative or zero?", a: "Negative ROI means the investment lost money — you got back less than you put in. Zero ROI means you broke even. Neither is automatically a failure: a marketing test with -10% ROI may have produced valuable customer insight, and a brand-building investment may have zero direct ROI but improve future conversion rates. Quantify the non-financial return before writing off the spend." },
  { q: "I have my ROI number — what should I do with it?", a: "Compare it to two benchmarks. One: your hurdle rate — the minimum return you require for any investment, typically 15–20% annualised for small businesses. Below that, the cash is better deployed elsewhere. Two: the next-best alternative — if a marketing campaign returned 35% but a debt repayment would have saved 9% interest, the campaign wins. ROI is only useful when compared against an alternative use of the same money." },
  { q: "How is ROI different from payback period?", a: "ROI measures the size of the return (percentage of money earned back). Payback period measures the speed of the return (months until you recover the original spend). A $10,000 investment returning $15,000 over 5 years has 50% ROI but 4-year payback. A $10,000 investment returning $12,000 over 12 months has only 20% ROI but 10-month payback. Use ROI for total returns, payback for cash-flow planning and risk." },
];

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

      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`ROI (%) = ((Net Return − Initial Investment) / Initial Investment) × 100

Annualised ROI = ((1 + ROI/100) ^ (12/months) − 1) × 100

Example: Investment = $10,000 | Net Return = $13,500 | Period = 18 months
  ROI           = (3,500 / 10,000) × 100 = 35%
  Annualised    = ((1.35) ^ (12/18) − 1) × 100 = 22.5%`}
        </pre>
      </FormulaBox>

      <FaqList items={FAQS} />

      <RelatedTools slugs={["break-even-calculator", "business-valuation-calculator", "payback-period-calculator"]} />

      <EmbedCTA slug={SLUG} />

      <MethodologyBox slug={SLUG} />

      <Disclaimer />
    </CalculatorShell>
  );
}
