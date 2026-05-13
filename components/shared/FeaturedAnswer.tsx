import { calcMeta } from "@/lib/calc-meta";
import { SITE_URL } from "@/lib/site";

type Props = {
  slug: string;
};

// Renders a 40-60 word direct answer above the live calculator, formatted to
// win featured snippets (position 0). When the calc has a voiceAnswer (~29
// words, Google's voice-snippet sweet spot) it's wrapped in .speakable-answer
// so voice assistants read the condensed version instead of the full block.
export default function FeaturedAnswer({ slug }: Props) {
  const meta = calcMeta(slug);
  if (!meta?.featuredAnswer) return null;

  // Selector priority: prefer the tight voice answer when present, else fall
  // back to the full lead block so the page stays voice-eligible either way.
  const speakableSelector = meta.voiceAnswer ? ".speakable-answer" : ".lead";

  const speakableLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: `${SITE_URL}/${slug}`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [speakableSelector],
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
          {meta.voiceAnswer ? (
            <span className="speakable-answer">{meta.voiceAnswer}</span>
          ) : (
            meta.featuredAnswer
          )}
        </p>
      </div>
    </>
  );
}
