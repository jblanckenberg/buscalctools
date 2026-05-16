import { SITE_NAME, SITE_URL } from "@/lib/site";
import { AUTHOR, AUTHOR_URL } from "@/lib/author";
import type { Comparison } from "@/lib/comparisons";

type Props = {
  comparison: Comparison;
};

export default function ComparisonSchema({ comparison }: Props) {
  const url = `${SITE_URL}/compare/${comparison.slug}`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: comparison.title,
    description: comparison.description,
    datePublished: comparison.publishedDate,
    dateModified: comparison.updatedDate,
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
      "@id": url,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".lead"],
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: comparison.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  );
}
