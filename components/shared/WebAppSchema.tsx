import { authorPersonLd, reviewerPersonLd } from "@/lib/author";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type Props = {
  slug: string;
  name: string;
  description: string;
  featureList?: string[];
  applicationSubCategory?: string;
};

export default function WebAppSchema({
  slug,
  name,
  description,
  featureList,
  applicationSubCategory = "Calculator",
}: Props) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    url: `${SITE_URL}/${slug}`,
    description,
    applicationCategory: "FinanceApplication",
    applicationSubCategory,
    operatingSystem: "Any (web-based, runs in browser)",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
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
    dateModified: "2026-05-17",
    ...(featureList && featureList.length > 0 ? { featureList } : {}),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  );
}
