import type { HowToStep } from "@/components/shared/HowToSchema";

type Props = { steps: HowToStep[]; name: string };

export default function HowToSteps({ steps, name }: Props) {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold text-brand-dark">{name}</h2>
      <ol className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
        {steps.map((s, i) => (
          <li key={s.name} id={`step-${i + 1}`} className="flex gap-3">
            <span aria-hidden="true" className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-primary/10 text-xs font-semibold text-brand-primary">
              {i + 1}
            </span>
            <div>
              <strong className="block text-brand-dark">{s.name}</strong>
              <span>{s.text}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
