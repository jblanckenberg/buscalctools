import { authorPersonLd, reviewerPersonLd } from "@/lib/author";
import { calcMeta, CALC_META_BASELINE_DATE } from "@/lib/calc-meta";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type Props = {
  calcSlug: string;
  variantSlug: string;
  name: string;
  description: string;
  featureList?: string[];
  applicationSubCategory?: string;
};

export default function VariantSchema({
  calcSlug,
  variantSlug,
  name,
  description,
  featureList,
  applicationSubCategory = "Calculator",
}: Props) {
  const parentUrl = `${SITE_URL}/${calcSlug}`;
  const variantUrl = `${parentUrl}/${variantSlug}`;
  const dateModified = calcMeta(calcSlug)?.lastReviewed ?? CALC_META_BASELINE_DATE;
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url: variantUrl,
    description,
    applicationCategory: "FinanceApplication",
    applicationSubCategory,
    operatingSystem: "Any (web-based, runs in browser)",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    isPartOf: {
      "@type": "WebApplication",
      "@id": parentUrl,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    author: authorPersonLd(),
    reviewedBy: reviewerPersonLd(),
    dateModified,
    ...(featureList && featureList.length > 0 ? { featureList } : {}),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  );
}
