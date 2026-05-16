"use client";

import { useEffect } from "react";

/**
 * Client-side resize observer that posts the iframe's body height to the
 * parent window via postMessage. Wire format MUST match the parent listener
 * in src/embed/shared.ts.
 */
export default function EmbedResizer({ slug }: { slug: string }) {
  useEffect(() => {
    let lastHeight = 0;
    function postHeight() {
      const h = document.body.scrollHeight;
      if (h === lastHeight) return;
      lastHeight = h;
      window.parent.postMessage(
        { type: "bct-embed-resize", slug, height: h },
        "*",
      );
    }
    postHeight();
    const ro = new ResizeObserver(() => postHeight());
    ro.observe(document.body);
    window.addEventListener("resize", postHeight);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", postHeight);
    };
  }, [slug]);
  return null;
}
