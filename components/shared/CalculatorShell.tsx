import AuthorCard from "@/components/shared/AuthorCard";
import Breadcrumbs, { type Crumb } from "@/components/shared/Breadcrumbs";
import FeaturedAnswer from "@/components/shared/FeaturedAnswer";
import HowToSteps from "@/components/shared/HowToSteps";
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
  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
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
      {hasHowTo && meta && (
        <HowToSteps steps={meta.howToSteps} name={meta.howToName} />
      )}
      <AuthorCard variant="full" />
    </article>
  );
}
