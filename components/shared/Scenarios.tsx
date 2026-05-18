import Link from "next/link";

export type Scenario = { label: string; href: string };

export default function Scenarios({ items }: { items: Scenario[] }) {
  if (!items?.length) return null;
  return (
    <section className="mt-10" aria-labelledby="scenarios-heading">
      <h2 id="scenarios-heading" className="text-lg font-semibold text-brand-dark">
        Try these scenarios
      </h2>
      <p className="mt-1 text-sm text-gray-600">
        Pre-filled examples — click any chip to load the inputs and result.
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((s) => (
          <li key={s.href}>
            <Link
              href={s.href}
              className="inline-block rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-brand-dark transition-colors hover:border-brand-primary hover:text-brand-primary"
            >
              {s.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
