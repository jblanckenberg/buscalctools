import { SITE_URL } from "@/lib/site";

type Props = {
  name: string;
  description: string;
  items: { name: string; slug: string; description?: string }[];
};

export default function ItemListSchema({ name, description, items }: Props) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    numberOfItems: items.length,
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${SITE_URL}/${item.slug}`,
      name: item.name,
      ...(item.description ? { description: item.description } : {}),
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  );
}
