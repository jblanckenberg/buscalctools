import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import ItemListSchema from "@/components/shared/ItemListSchema";
import Disclaimer from "@/components/shared/Disclaimer";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  TOPICS,
  topicBySlug,
  topicCalcs,
  topicPosts,
} from "@/lib/topics";

export async function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = topicBySlug(slug);
  if (!topic) return {};
  const url = `${SITE_URL}/topics/${slug}`;
  return {
    title: topic.title,
    description: topic.description,
    alternates: { canonical: url },
    openGraph: {
      title: topic.title,
      description: topic.description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: topic.title,
      description: topic.description,
    },
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = topicBySlug(slug);
  if (!topic) notFound();

  const calcs = topicCalcs(topic);
  const posts = topicPosts(topic);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <ItemListSchema
        name={`${topic.name} calculators`}
        description={topic.description}
        items={calcs.map((c) => ({
          name: c.name,
          slug: c.slug,
          description: c.desc,
        }))}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: topic.name },
        ]}
      />

      <header className="mb-10 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
          {topic.h1}
        </h1>
        <p className="mt-4 text-lg text-gray-600">{topic.intro}</p>
        {topic.body.map((para, i) => (
          <p key={i} className="mt-4 text-sm leading-relaxed text-gray-700">
            {para}
          </p>
        ))}
      </header>

      <section className="mt-8">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Calculators in this topic
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {calcs.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="block rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-brand-primary hover:shadow-md"
            >
              <h3 className="mb-2 text-lg font-semibold text-brand-dark">{c.name}</h3>
              <p className="text-sm text-gray-600">{c.desc}</p>
              <span className="mt-3 inline-block text-sm font-medium text-brand-primary">
                Open calculator →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Guides
        </h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="block rounded-lg border border-gray-200 bg-white p-5 transition-colors hover:border-brand-primary"
              >
                <h3 className="text-base font-semibold text-brand-dark">{p.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{p.description}</p>
                <span className="mt-2 inline-block text-sm font-medium text-brand-primary">
                  Read →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 rounded-xl bg-brand-light p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-dark">
          Related topics
        </h2>
        <ul className="mt-3 flex flex-wrap gap-3">
          {topic.siblings.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/topics/${s.slug}`}
                className="inline-block rounded-full border border-brand-primary px-4 py-1.5 text-sm font-medium text-brand-primary hover:bg-brand-primary hover:text-white"
              >
                {s.name} →
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Disclaimer />
    </div>
  );
}
