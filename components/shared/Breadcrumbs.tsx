import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export type Crumb = {
  label: string;
  href?: string; // omit for current page (final crumb)
};

type Props = {
  items: Crumb[];
};

export default function Breadcrumbs({ items }: Props) {
  if (items.length === 0) return null;

  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-4 text-xs">
        <ol className="flex flex-wrap items-center gap-1.5 text-gray-500">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={idx} className="flex items-center gap-1.5">
                {item.href && !isLast ? (
                  <Link href={item.href} className="hover:text-brand-primary">
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? "text-brand-dark font-medium" : ""}>
                    {item.label}
                  </span>
                )}
                {!isLast && <span aria-hidden className="text-gray-300">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </>
  );
}
