import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import CalculatorShell from "@/components/shared/CalculatorShell";
import VariantIntro, { isOperatorStub } from "@/components/shared/VariantIntro";
import VariantSchema from "@/components/shared/VariantSchema";
import HowToSchema from "@/components/shared/HowToSchema";
import FormulaBox from "@/components/shared/FormulaBox";
import RelatedTools from "@/components/shared/RelatedTools";
import Disclaimer from "@/components/shared/Disclaimer";
import MethodologyBox from "@/components/shared/MethodologyBox";
import { variantMetadata } from "@/lib/seo";
import { calcMeta, calcBreadcrumb } from "@/lib/calc-meta";
import { allVariantParams, getVariant } from "@/lib/variants";

type Params = { calculator: string; variant: string };

export function generateStaticParams() {
  return allVariantParams();
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { calculator, variant } = await params;
  const v = getVariant(calculator, variant);
  if (!v) return {};
  const meta = variantMetadata({ calcSlug: calculator, variant: v });
  if (isOperatorStub(v.intro)) {
    return { ...meta, robots: { index: false, follow: true } };
  }
  return meta;
}

const CALCULATOR_COMPONENT: Record<string, React.ComponentType> = {
  "profit-margin-calculator": dynamic(
    () => import("@/components/calculators/ProfitMarginCalculator"),
  ),
  "markup-calculator": dynamic(() => import("@/components/calculators/MarkupCalculator")),
  "freelance-rate-calculator": dynamic(
    () => import("@/components/calculators/FreelanceRateCalculator"),
  ),
  "break-even-calculator": dynamic(
    () => import("@/components/calculators/BreakEvenCalculator"),
  ),
  "cash-flow-calculator": dynamic(
    () => import("@/components/calculators/CashFlowCalculator"),
  ),
  "business-loan-calculator": dynamic(
    () => import("@/components/calculators/BusinessLoanCalculator"),
  ),
  "roi-calculator": dynamic(() => import("@/components/calculators/RoiCalculator")),
};

export default async function VariantPage({ params }: { params: Promise<Params> }) {
  const { calculator, variant } = await params;
  const v = getVariant(calculator, variant);
  const meta = calcMeta(calculator);
  if (!v || !meta) notFound();

  const Calculator = CALCULATOR_COMPONENT[calculator];
  if (!Calculator) notFound();

  const breadcrumbs = [
    ...calcBreadcrumb(calculator),
    { label: v.label },
  ];

  return (
    <CalculatorShell
      h1={`${meta.applicationSubCategory}${v.h1Suffix}`}
      intro={v.description}
      breadcrumbs={breadcrumbs}
      slug={calculator}
    >
      <VariantSchema
        calcSlug={calculator}
        variantSlug={v.slug}
        name={v.title.replace(/ \| BusCalcTools$/, "")}
        description={v.description}
        featureList={meta.featureList}
        applicationSubCategory={meta.applicationSubCategory}
      />
      <HowToSchema
        slug={`${calculator}/${v.slug}`}
        name={meta.howToName}
        description={meta.howToDescription}
        steps={meta.howToSteps}
      />
      <VariantIntro intro={v.intro} />
      <Calculator />
      <FormulaBox>
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
          {`See parent calculator at /${calculator} for the full formula reference.`}
        </pre>
      </FormulaBox>
      <RelatedTools slugs={[calculator]} />
      <MethodologyBox slug={calculator} />
      <Disclaimer />
    </CalculatorShell>
  );
}
