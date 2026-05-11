import Link from "next/link";
import { toolBySlug } from "@/lib/tools";

type Props = {
  slugs: string[];
  title?: string;
};

export default function RelatedTools({ slugs, title = "Related calculators" }: Props) {
  const tools = slugs.map(toolBySlug).filter(Boolean) as NonNullable<ReturnType<typeof toolBySlug>>[];
  if (tools.length === 0) return null;
  return (
    <section className="mt-12">
      <h2 className="mb-4 text-lg font-semibold text-brand-dark">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link
            key={t.slug}
            href={`/${t.slug}`}
            className="block rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-brand-primary"
          >
            <h3 className="text-base font-semibold text-brand-dark">{t.name}</h3>
            <p className="mt-1 text-sm text-gray-600">{t.desc}</p>
            <span className="mt-2 inline-block text-sm font-medium text-brand-primary">
              Open →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
