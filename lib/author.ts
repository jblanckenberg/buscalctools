import { SITE_NAME, SITE_URL } from "@/lib/site";

// Single-author site. Update these once you've decided what to publish.
// The sameAs array is for E-E-A-T signal — add real LinkedIn / X / GitHub URLs.
export const AUTHOR = {
  slug: "james-blanckenberg",
  name: "James Blanckenberg",
  jobTitle: "Founder, BusCalcTools",
  shortBio:
    "Founder of BusCalcTools and FinnCalc. Builds practical financial calculators for small business owners and freelancers across the US, UK, and South Africa.",
  longBio: [
    "I started BusCalcTools after watching too many small business owners make pricing decisions on bad maths. The 50% markup ≠ 50% margin mistake alone costs UK and US small firms an estimated five-figure sum per year — multiplied across millions of businesses, that's a lot of profit left on the table.",
    "The site exists for one job: give business owners a calculator that loads in under two seconds, runs entirely in the browser, switches between US, UK, and South Africa tax rules automatically, and tells you what your numbers actually mean instead of just spitting out a percentage.",
    "I previously built FinnCalc — a sister site covering personal-finance calculators — using the same philosophy. Both projects are fully independent: no client work, no investors, no agenda beyond making the maths accessible.",
    "If a calculator on this site has produced a result that contradicts your accountant, your accountant is probably right — the calculators are designed as a fast sanity check, not professional advice. Sources for tax rates and benchmark figures are linked on each calculator page.",
  ],
  // Real identity URLs for Person.sameAs (Google E-E-A-T signal). Add more
  // platforms (X, GitHub, Crunchbase, etc.) as accounts come online.
  sameAs: [
    "https://www.linkedin.com/in/james-blanckenberg-154a1312/",
  ],
  // Optional: a real headshot file at /public/<filename>.jpg + this URL.
  image: undefined as string | undefined,
};

export const AUTHOR_URL = `${SITE_URL}/about`;

export function authorPersonLd() {
  return {
    "@type": "Person",
    name: AUTHOR.name,
    url: AUTHOR_URL,
    jobTitle: AUTHOR.jobTitle,
    description: AUTHOR.shortBio,
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(AUTHOR.sameAs.length > 0 ? { sameAs: AUTHOR.sameAs } : {}),
    ...(AUTHOR.image ? { image: AUTHOR.image } : {}),
  };
}

// Standalone variant for use as a top-level JSON-LD block (e.g. About page).
// When embedding the Person inside another schema (e.g. as SoftwareApplication.author),
// use authorPersonLd() instead — nested @context is invalid JSON-LD.
export function authorPersonLdStandalone() {
  return {
    "@context": "https://schema.org",
    ...authorPersonLd(),
  };
}
