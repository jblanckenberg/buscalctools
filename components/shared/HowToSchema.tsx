import { SITE_URL } from "@/lib/site";

export type HowToStep = {
  name: string;
  text: string;
};

type Props = {
  slug: string;
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string; // ISO 8601 duration, e.g. "PT30S"
};

export default function HowToSchema({
  slug,
  name,
  description,
  steps,
  totalTime = "PT30S",
}: Props) {
  const url = `${SITE_URL}/${slug}`;
  const ld = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    totalTime,
    estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
    supply: [],
    tool: [{ "@type": "HowToTool", name }],
    step: steps.map((s, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: s.name,
      text: s.text,
      url: `${url}#step-${idx + 1}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  );
}
