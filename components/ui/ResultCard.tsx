import { clsx } from "clsx";

export type ResultTier = "good" | "caution" | "bad" | "neutral";

const tierClasses: Record<ResultTier, { wrap: string; pill: string; pillText: string }> = {
  good: {
    wrap: "border-brand-accent/30 bg-brand-accent/10",
    pill: "bg-brand-accent text-white",
    pillText: "Healthy",
  },
  caution: {
    wrap: "border-brand-warning/40 bg-brand-warning/10",
    pill: "bg-brand-warning text-white",
    pillText: "Caution",
  },
  bad: {
    wrap: "border-brand-danger/40 bg-brand-danger/10",
    pill: "bg-brand-danger text-white",
    pillText: "Action needed",
  },
  neutral: {
    wrap: "border-gray-200 bg-white",
    pill: "bg-brand-light text-brand-dark",
    pillText: "Result",
  },
};

type Props = {
  label: string;
  value: string;
  tier?: ResultTier;
  interpretation?: string;
  hint?: string;
  primary?: boolean;
};

export default function ResultCard({
  label,
  value,
  tier = "neutral",
  interpretation,
  hint,
  primary = false,
}: Props) {
  const t = tierClasses[tier];
  return (
    <div
      className={clsx(
        "rounded-xl border p-4 sm:p-5",
        t.wrap,
        primary && "sm:p-6"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">
          {label}
        </p>
        {tier !== "neutral" && (
          <span
            className={clsx(
              "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
              t.pill
            )}
          >
            {t.pillText}
          </span>
        )}
      </div>
      <p
        className={clsx(
          "mt-1 font-bold tracking-tight text-brand-dark",
          primary ? "text-3xl sm:text-4xl" : "text-2xl"
        )}
      >
        {value}
      </p>
      {interpretation && (
        <p className="mt-2 text-sm text-gray-700">{interpretation}</p>
      )}
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}
