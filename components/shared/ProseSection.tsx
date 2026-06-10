import React from "react";
import { renderProse } from "./VariantIntro";

type Props = {
  heading: string;
  text: string;
};

/**
 * A headed prose section that reuses the variant intro's markdown-lite renderer.
 * Used for the variant-specific "Worked example" block so each variant page is a
 * full destination rather than a thin intro + shared widget.
 */
export default function ProseSection({ heading, text }: Props) {
  return (
    <section className="my-8 max-w-3xl">
      <h2 className="mb-3 text-lg font-semibold text-brand-dark">{heading}</h2>
      <div className="text-base leading-relaxed text-gray-800">{renderProse(text)}</div>
    </section>
  );
}
