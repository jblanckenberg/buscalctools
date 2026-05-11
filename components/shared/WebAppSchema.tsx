import { SITE_URL } from "@/lib/site";

type Props = {
  slug: string;
  name: string;
  description: string;
};

export default function WebAppSchema({ slug, name, description }: Props) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url: `${SITE_URL}/${slug}`,
    description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  );
}
