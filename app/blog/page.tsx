import Link from "next/link";
import type { Metadata } from "next";
import { POSTS, PUBLISHED_POSTS } from "@/lib/blog/posts";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog — Small Business Pricing, Profit & Operations Guides",
  description:
    "Practical guides on pricing, profit margins, cash flow, valuation, and hiring for small business owners and freelancers. Free, no sign-up.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

const draftPosts = POSTS.filter((p) => p.status === "draft");

export default function BlogIndex() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
          Blog
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-gray-600">
          Practical guides for small business owners and freelancers — pricing,
          profit, cash flow, valuation, and hiring. Each piece complements one
          or more of our free calculators.
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Latest
        </h2>
        <div className="space-y-4">
          {PUBLISHED_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-brand-primary hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-brand-dark">{post.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{post.description}</p>
              <span className="mt-3 inline-block text-sm font-medium text-brand-primary">
                Read article →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {draftPosts.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
            Coming soon
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {draftPosts.map((post) => (
              <li
                key={post.slug}
                className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-3"
              >
                <span className="block text-sm font-medium text-gray-700">{post.title}</span>
                <span className="block text-xs text-gray-500">{post.keyword}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
