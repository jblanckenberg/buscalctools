import Link from "next/link";
import type { ReactNode } from "react";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import AuthorCard from "@/components/shared/AuthorCard";
import RelatedTools from "@/components/shared/RelatedTools";
import Disclaimer from "@/components/shared/Disclaimer";
import { AUTHOR } from "@/lib/author";
import type { Comparison } from "@/lib/comparisons";
import ComparisonSchema from "./ComparisonSchema";

type Props = {
  comparison: Comparison;
  children: ReactNode;
};

export default function ComparisonShell({ comparison, children }: Props) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <ComparisonSchema comparison={comparison} />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: comparison.title },
        ]}
      />

      <header className="mb-8">
        <Link
          href="/blog"
          className="text-sm font-medium text-brand-primary hover:underline"
        >
          ← Back to blog
        </Link>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
          {comparison.title}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          By{" "}
          <Link href="/about" className="text-brand-primary hover:underline">
            {AUTHOR.name}
          </Link>{" "}
          &middot; Published{" "}
          {new Date(comparison.publishedDate).toLocaleDateString("en", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      <div className="prose-content space-y-1 text-base leading-relaxed text-gray-800">
        {children}
      </div>

      <AuthorCard />

      <RelatedTools
        slugs={[comparison.embedsCalcSlug]}
        title="Calculator referenced in this comparison"
      />

      <Disclaimer />
    </article>
  );
}
