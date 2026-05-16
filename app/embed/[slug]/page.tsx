import { notFound } from "next/navigation";
import EmbedResizer from "./embed-resizer";
import { EMBED_SLUGS, isEmbedSlug, type EmbedSlug } from "@/lib/embeds";
import { SITE_NAME, SITE_URL } from "@/lib/site";

import ProfitMarginCalculator from "@/components/calculators/ProfitMarginCalculator";
import BreakEvenCalculator from "@/components/calculators/BreakEvenCalculator";
import RoiCalculator from "@/components/calculators/RoiCalculator";
import CashFlowCalculator from "@/components/calculators/CashFlowCalculator";

const REGISTRY: Record<EmbedSlug, { name: string; Component: () => JSX.Element }> = {
  "profit-margin-calculator": {
    name: "Profit Margin Calculator",
    Component: ProfitMarginCalculator,
  },
  "break-even-calculator": {
    name: "Break-Even Calculator",
    Component: BreakEvenCalculator,
  },
  "roi-calculator": {
    name: "ROI Calculator",
    Component: RoiCalculator,
  },
  "cash-flow-calculator": {
    name: "Cash Flow Calculator",
    Component: CashFlowCalculator,
  },
};

export function generateStaticParams() {
  return EMBED_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export const metadata = {
  robots: { index: false, follow: false },
};

export default function EmbedPage({ params }: { params: { slug: string } }) {
  if (!isEmbedSlug(params.slug)) notFound();
  const slug = params.slug as EmbedSlug;
  const { name, Component } = REGISTRY[slug];

  return (
    <>
      <h1
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: "#111",
          marginBottom: 12,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {name}
      </h1>
      <Component />
      <p
        style={{
          fontSize: 11,
          color: "#666",
          marginTop: 16,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        Open the full calculator at{" "}
        <a
          href={`${SITE_URL}/${slug}`}
          target="_blank"
          rel="noopener"
          style={{ color: "#0070f3" }}
        >
          {SITE_NAME}
        </a>
        .
      </p>
      <EmbedResizer slug={slug} />
    </>
  );
}
