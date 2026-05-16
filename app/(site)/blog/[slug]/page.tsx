import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS_LAST_REVIEWED, PUBLISHED_POSTS, postBySlug } from "@/lib/blog/posts";
import { ARTICLE_BODIES } from "@/components/blog/articles";
import RelatedTools from "@/components/shared/RelatedTools";
import Disclaimer from "@/components/shared/Disclaimer";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import AuthorCard from "@/components/shared/AuthorCard";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { hreflang } from "@/lib/seo";
import { AUTHOR, AUTHOR_URL } from "@/lib/author";

export async function generateStaticParams() {
  return PUBLISHED_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${slug}`;
  return {
    // Use absolute so the layout template doesn't push article titles
    // over 70 chars with "| BusCalcTools" appended.
    title: { absolute: post.title },
    description: post.description,
    alternates: { canonical: url, languages: hreflang(url) },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post || post.status !== "published") notFound();

  const Body = ARTICLE_BODIES[post.slug];
  if (!Body) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.lastModified ?? POSTS_LAST_REVIEWED,
    author: {
      "@type": "Person",
      name: AUTHOR.name,
      url: AUTHOR_URL,
      jobTitle: AUTHOR.jobTitle,
      ...(AUTHOR.sameAs.length > 0 ? { sameAs: AUTHOR.sameAs } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${slug}`,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".lead"],
    },
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <header className="mb-8">
        <Link href="/blog" className="text-sm font-medium text-brand-primary hover:underline">
          ← Back to blog
        </Link>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
          {post.title}
        </h1>
        {post.publishedAt && (
          <p className="mt-2 text-sm text-gray-500">
            By{" "}
            <Link href="/about" className="text-brand-primary hover:underline">
              {AUTHOR.name}
            </Link>{" "}
            &middot; Published{" "}
            {new Date(post.publishedAt).toLocaleDateString("en", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
      </header>

      <div className="prose-content space-y-1 text-base leading-relaxed text-gray-800">
        <Body />
      </div>

      <AuthorCard />

      <RelatedTools slugs={post.related} title="Calculators referenced in this article" />

      <Disclaimer />
    </article>
  );
}
