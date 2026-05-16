type Props = {
  intro: string;
};

export function isOperatorStub(intro: string): boolean {
  return intro.startsWith("[OPERATOR_TO_FILL:");
}

export default function VariantIntro({ intro }: Props) {
  const stub = isOperatorStub(intro);
  if (stub) {
    return (
      <section
        className="operator-todo my-6 rounded border-2 border-dashed border-amber-400 bg-amber-50 p-4 text-sm text-amber-900"
        data-stub="true"
        aria-label="Operator content placeholder"
      >
        <strong>OPERATOR_TO_FILL — </strong>
        <code className="font-mono text-xs">{intro}</code>
      </section>
    );
  }
  return (
    <section className="my-6 max-w-3xl text-base leading-relaxed text-gray-800">
      {intro.split("\n\n").map((para, i) => (
        <p key={i} className="mt-3 first:mt-0">
          {para}
        </p>
      ))}
    </section>
  );
}
