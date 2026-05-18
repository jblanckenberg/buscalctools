import AdSlot from "@/components/shared/AdSlot";
import AuthorCard from "@/components/shared/AuthorCard";
import Breadcrumbs, { type Crumb } from "@/components/shared/Breadcrumbs";
import FeaturedAnswer from "@/components/shared/FeaturedAnswer";
import HowToSteps from "@/components/shared/HowToSteps";
import Scenarios from "@/components/shared/Scenarios";
import { calcMeta, formatReviewDate } from "@/lib/calc-meta";

type Props = {
  h1: string;
  intro: string;
  breadcrumbs?: Crumb[];
  // Optional slug — when provided, the shell renders the calc's
  // featured-snippet answer block above the children (the live calculator).
  slug?: string;
  children: React.ReactNode;
};

export default function CalculatorShell({
  h1,
  intro,
  breadcrumbs,
  slug,
  children,
}: Props) {
  const meta = slug ? calcMeta(slug) : undefined;
  const hasHowTo = !!meta?.howToSteps && meta.howToSteps.length > 0;
  // Manual AdSense slot IDs — env-driven so we render nothing if not configured.
  // CLS is defended by reserving minHeight on each AdSlot wrapper. See P1.7.
  const topSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP;
  const resultsSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULTS;
  const eduSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_EDU;
  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      {topSlot ? (
        <AdSlot
          slot={topSlot}
          format="horizontal"
          minHeight={90}
          className="my-4"
        />
      ) : null}
      {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
          {h1}
        </h1>
        {meta?.lastReviewed ? (
          <p className="mt-2 text-sm text-gray-500">
            Last reviewed:{" "}
            <time dateTime={meta.lastReviewed} className="font-medium text-gray-700">
              {formatReviewDate(meta.lastReviewed)}
            </time>
          </p>
        ) : null}
        <p className="mt-2 max-w-2xl text-base text-gray-600">{intro}</p>
      </header>
      {slug && <FeaturedAnswer slug={slug} />}
      {children}
      {resultsSlot ? (
        <AdSlot
          slot={resultsSlot}
          format="rectangle"
          minHeight={250}
          className="my-6"
        />
      ) : null}
      {meta?.scenarios && meta.scenarios.length > 0 && (
        <Scenarios items={meta.scenarios} />
      )}
      {hasHowTo && meta && (
        <HowToSteps steps={meta.howToSteps} name={meta.howToName} />
      )}
      {eduSlot ? (
        <AdSlot
          slot={eduSlot}
          format="rectangle"
          minHeight={250}
          className="my-6"
        />
      ) : null}
      <AuthorCard variant="full" />
    </article>
  );
}
