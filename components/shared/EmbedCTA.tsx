"use client";

import { useState } from "react";
import { embedSnippet, isEmbedSlug, type EmbedSlug } from "@/lib/embeds";

type Props = { slug: string };

export default function EmbedCTA({ slug }: Props) {
  const [copied, setCopied] = useState(false);
  if (!isEmbedSlug(slug)) return null;
  const snippet = embedSnippet(slug as EmbedSlug);

  async function copy() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      // Fire a Plausible custom event so we can attribute embed activation.
      // Safe-guard: window.plausible may be undefined if the script hasn't loaded.
      const w = window as unknown as {
        plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
      };
      w.plausible?.("Embed CTA Click", { props: { slug } });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Permission denied / clipboard unavailable — leave button state unchanged.
    }
  }

  return (
    <section className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-5">
      <details>
        <summary className="cursor-pointer text-sm font-semibold text-brand-dark">
          Embed this calculator on your site (free)
        </summary>
        <p className="mt-3 text-sm text-gray-700">
          Copy and paste the snippet below into any HTML page. The calculator
          loads in an auto-resizing iframe with no setup required. A small
          {" "}<em>Powered by BusCalcTools</em> credit appears below the
          calculator — please leave it in place.
        </p>
        <pre className="mt-3 overflow-x-auto rounded bg-white p-3 font-mono text-xs leading-relaxed text-gray-800">
{snippet}
        </pre>
        <button
          type="button"
          onClick={copy}
          className="mt-3 rounded bg-brand-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-dark"
        >
          {copied ? "Copied!" : "Copy embed code"}
        </button>
      </details>
    </section>
  );
}
