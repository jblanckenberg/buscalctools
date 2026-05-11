export type FaqItem = {
  q: string;
  a: string;
};

type Props = {
  items: FaqItem[];
  title?: string;
};

export default function FaqList({ items, title = "Frequently Asked Questions" }: Props) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section className="mt-12">
      <h2 className="mb-4 text-lg font-semibold text-brand-dark">{title}</h2>
      <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
        {items.map((item, idx) => (
          <details key={idx} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-brand-dark">
              {item.q}
              <span className="text-brand-primary transition-transform group-open:rotate-180" aria-hidden>
                ▾
              </span>
            </summary>
            <div className="px-5 pb-4 text-sm leading-relaxed text-gray-700">
              {item.a}
            </div>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </section>
  );
}
