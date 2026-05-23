import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS_LAST_REVIEWED, PUBLISHED_POSTS, postBySlug } from "@/lib/blog/posts";
import { blogFaqs } from "@/lib/blog/faqs";
import { ARTICLE_BODIES } from "@/components/blog/articles";
import LazyRelatedTools from "@/components/shared/LazyRelatedTools";
import LazyAuthorCard from "@/components/shared/LazyAuthorCard";
import Disclaimer from "@/components/shared/Disclaimer";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
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

  const faqs = blogFaqs(slug);
  const faqSchema =
    faqs && faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  // LCP preload — every blog post has /blog/<slug>/hero.{webp,jpg} (priority
  // image). The responsive hero generator emits /blog/<slug>/hero-{480,768,
  // 1200}.{avif,webp} alongside. Preload the AVIF set so the browser starts
  // the LCP fetch in parallel with HTML parse rather than after CSS parse +
  // <picture> resolution. imageSrcSet + imageSizes mirror the <picture>
  // sources so the browser preloads the exact variant it will end up using.
  const heroStem = `/blog/${slug}/hero`;
  const heroPreloadSrcSet = `${heroStem}-480.avif 480w, ${heroStem}-768.avif 768w, ${heroStem}-1200.avif 1200w`;
  const heroPreloadSizes =
    "(max-width: 640px) 100vw, (max-width: 1024px) 768px, 1200px";

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <link
        rel="preload"
        as="image"
        href={`${heroStem}-1200.avif`}
        imageSrcSet={heroPreloadSrcSet}
        imageSizes={heroPreloadSizes}
        type="image/avif"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

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

      <LazyAuthorCard />

      <LazyRelatedTools slugs={post.related} title="Calculators referenced in this article" />

      <Disclaimer />
    </article>
  );
}
