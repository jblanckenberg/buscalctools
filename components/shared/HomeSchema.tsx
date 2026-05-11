import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

export default function HomeSchema() {
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${SITE_NAME} — Free Business Calculators`,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    hasPart: TOOLS.map((t) => ({
      "@type": "WebApplication",
      name: t.name,
      url: `${SITE_URL}/${t.slug}`,
      description: t.desc,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collection) }}
      />
    </>
  );
}
