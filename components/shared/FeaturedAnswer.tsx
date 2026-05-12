import { calcMeta } from "@/lib/calc-meta";
import { SITE_URL } from "@/lib/site";

type Props = {
  slug: string;
};

// Renders a 40-60 word direct answer above the live calculator, formatted to
// win featured snippets (position 0) and voice-search citations. The .lead
// class is referenced by the Speakable schema on this page, so the answer
// becomes the text voice assistants read aloud.
export default function FeaturedAnswer({ slug }: Props) {
  const meta = calcMeta(slug);
  if (!meta?.featuredAnswer) return null;

  // Emit a separate WebPage JSON-LD with speakable so the calc page is
  // voice-snippet eligible (Article schema also carries speakable on /blog).
  const speakableLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: `${SITE_URL}/${slug}`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".lead"],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }}
      />
      <div className="mb-6 rounded-xl border-l-4 border-brand-primary bg-brand-light/60 px-5 py-4">
        <p className="lead text-base font-medium leading-relaxed text-brand-dark">
          {meta.featuredAnswer}
        </p>
      </div>
    </>
  );
}
