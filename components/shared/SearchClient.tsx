"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { TOOLS } from "@/lib/tools";
import { PUBLISHED_POSTS } from "@/lib/blog/posts";
import { TOPICS } from "@/lib/topics";

type Match = {
  type: "calc" | "post" | "topic";
  title: string;
  href: string;
  desc: string;
  score: number;
};

function score(haystack: string, needle: string): number {
  if (!needle) return 0;
  const h = haystack.toLowerCase();
  const n = needle.toLowerCase();
  if (h === n) return 100;
  if (h.startsWith(n)) return 60;
  if (h.includes(n)) return 30;
  // word-level partial match
  const words = n.split(/\s+/).filter(Boolean);
  let hits = 0;
  for (const w of words) {
    if (h.includes(w)) hits++;
  }
  return hits > 0 ? (hits / words.length) * 20 : 0;
}

export default function SearchClient() {
  const params = useSearchParams();
  const router = useRouter();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);

  useEffect(() => {
    setQuery(initial);
  }, [initial]);

  const matches = useMemo<Match[]>(() => {
    const q = query.trim();
    if (!q) return [];

    const calcMatches: Match[] = TOOLS.map((t) => {
      const s =
        score(t.name, q) * 2 +
        score(t.desc, q) +
        score(t.slug.replace(/-/g, " "), q);
      return {
        type: "calc" as const,
        title: t.name,
        href: `/${t.slug}`,
        desc: t.desc,
        score: s,
      };
    }).filter((m) => m.score > 0);

    const postMatches: Match[] = PUBLISHED_POSTS.map((p) => {
      const s =
        score(p.title, q) * 2 +
        score(p.description, q) +
        score(p.keyword, q);
      return {
        type: "post" as const,
        title: p.title,
        href: `/blog/${p.slug}`,
        desc: p.description,
        score: s,
      };
    }).filter((m) => m.score > 0);

    const topicMatches: Match[] = TOPICS.map((t) => {
      const s = score(t.name, q) * 1.5 + score(t.description, q);
      return {
        type: "topic" as const,
        title: `${t.name} (topic hub)`,
        href: `/topics/${t.slug}`,
        desc: t.description,
        score: s,
      };
    }).filter((m) => m.score > 0);

    return [...calcMatches, ...postMatches, ...topicMatches].sort(
      (a, b) => b.score - a.score
    );
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-2">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try 'profit margin' or 'amazon fees' or 'break-even'..."
            className="min-h-[44px] flex-1 rounded-lg border border-gray-300 bg-white px-4 text-base text-brand-dark placeholder:text-gray-400 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
            autoFocus
          />
          <button
            type="submit"
            className="rounded-lg bg-brand-primary px-5 py-2 text-sm font-semibold text-white hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </form>

      {query.trim() === "" ? (
        <p className="text-sm text-gray-500">
          Start typing to search 18 calculators, 25 guides, and 4 topic hubs.
        </p>
      ) : matches.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center">
          <p className="text-sm font-medium text-brand-dark">
            No matches for &ldquo;{query}&rdquo;.
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Try a shorter or more general term, or browse the{" "}
            <Link href="/" className="text-brand-primary underline">
              full calculator directory
            </Link>
            .
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {matches.slice(0, 30).map((m, i) => (
            <li key={`${m.type}-${i}`}>
              <Link
                href={m.href}
                className="block rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-brand-primary"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h2 className="text-base font-semibold text-brand-dark">{m.title}</h2>
                  <span className="rounded bg-brand-light px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-dark">
                    {m.type === "calc" ? "Calculator" : m.type === "post" ? "Guide" : "Topic"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{m.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
