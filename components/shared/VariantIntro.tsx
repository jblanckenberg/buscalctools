import React from "react";

type Props = {
  intro: string;
};

export function isOperatorStub(intro: string): boolean {
  return intro.startsWith("[OPERATOR_TO_FILL:");
}

/**
 * Minimal markdown renderer for variant intros.
 * Supports:
 *   - paragraph breaks on \n\n
 *   - a paragraph whose every non-empty line starts with "- " becomes a <ul>
 *   - **bold** inside any text becomes <strong>
 * Anything else is rendered as plain text inside <p>.
 */
function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const pattern = /\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(<strong key={`b${key++}`}>{match[1]}</strong>);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length === 0 ? [text] : parts;
}

function renderParagraph(para: string, i: number): React.ReactNode {
  const lines = para.split("\n").map((l) => l.trim()).filter(Boolean);
  const isList = lines.length > 0 && lines.every((l) => l.startsWith("- "));
  if (isList) {
    return (
      <ul key={i} className="mt-3 list-disc pl-6">
        {lines.map((l, j) => (
          <li key={j} className="mt-1">
            {renderInline(l.slice(2))}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p key={i} className="mt-3 first:mt-0">
      {renderInline(para)}
    </p>
  );
}

/**
 * Render markdown-lite prose (paragraphs, simple lists, **bold**) to React nodes.
 * Shared by VariantIntro and ProseSection so intros and worked examples render
 * identically.
 */
export function renderProse(text: string): React.ReactNode[] {
  return text.split("\n\n").map((para, i) => renderParagraph(para, i));
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
      {renderProse(intro)}
    </section>
  );
}
