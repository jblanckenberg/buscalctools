"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  minHeight?: number;
  placeholderLabel?: string;
  rootMargin?: string;
};

export default function LazyBelowFold({
  children,
  minHeight = 200,
  placeholderLabel = "Loading section",
  rootMargin = "200px",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const didReveal = useRef(false);
  const [visible, setVisible] = useState(() => typeof window === "undefined");

  useEffect(() => {
    if (didReveal.current) return;
    if (typeof IntersectionObserver === "undefined") {
      didReveal.current = true;
      setVisible(true);
      return;
    }
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            didReveal.current = true;
            setVisible(true);
            io.disconnect();
            return;
          }
        }
      },
      { rootMargin },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [rootMargin]);

  if (visible) return <>{children}</>;
  return (
    <div
      ref={ref}
      aria-label={placeholderLabel}
      style={{ minHeight, contentVisibility: "auto" }}
    />
  );
}
