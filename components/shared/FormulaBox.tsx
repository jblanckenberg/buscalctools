type Props = {
  title?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export default function FormulaBox({
  title = "See the formula",
  children,
  defaultOpen = false,
}: Props) {
  return (
    <details
      open={defaultOpen}
      className="group mt-6 rounded-xl border border-gray-200 bg-white"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-3 text-sm font-semibold text-brand-dark">
        {title}
        <span className="text-brand-primary transition-transform group-open:rotate-180" aria-hidden>
          ▾
        </span>
      </summary>
      <div className="border-t border-gray-200 px-5 py-4 text-sm leading-relaxed text-gray-700">
        {children}
      </div>
    </details>
  );
}
