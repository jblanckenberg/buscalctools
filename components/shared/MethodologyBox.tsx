import { calcMeta, LAST_VERIFIED } from "@/lib/calc-meta";

type Props = {
  slug: string;
};

export default function MethodologyBox({ slug }: Props) {
  const meta = calcMeta(slug);
  if (!meta) return null;

  return (
    <section className="mt-12 rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-base font-semibold text-brand-dark">
          Methodology &amp; sources
        </h2>
        <span className="text-xs font-medium text-gray-500">
          Rates last verified: {LAST_VERIFIED}
        </span>
      </div>

      {meta.methodologyNote && (
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          {meta.methodologyNote}
        </p>
      )}

      {meta.sources && meta.sources.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Primary sources
          </h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            {meta.sources.map((s) => (
              <li key={s.url}>
                {s.region && (
                  <span className="mr-2 inline-block min-w-[32px] rounded bg-brand-light px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-dark">
                    {s.region}
                  </span>
                )}
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary hover:underline"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-500">
        Rates are reviewed annually or when a region changes its headline rate.
        If you spot one that&apos;s out of date, email{" "}
        <a href="mailto:hello@buscalctools.com" className="underline">
          hello@buscalctools.com
        </a>
        .
      </p>
    </section>
  );
}
