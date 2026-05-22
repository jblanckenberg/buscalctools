type GlossaryItem = {
  term: string;
  definition: string;
};

type Props = {
  items: GlossaryItem[];
  className?: string;
};

export default function GlossarySection({ items, className }: Props) {
  if (items.length === 0) return null;
  return (
    <section className={className ?? "mt-12"}>
      <h2 className="text-lg font-semibold text-brand-dark">Glossary</h2>
      <dl className="mt-3 space-y-3 text-sm text-gray-700">
        {items.map((item, idx) => (
          <div key={idx}>
            <dt className="font-semibold text-brand-dark">{item.term}</dt>
            <dd>{item.definition}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
