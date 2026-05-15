import { BEEHIIV_FORM_URL } from "@/lib/newsletter";

export default function NewsletterCapture() {
  return (
    <section className="border-t border-gray-200 bg-brand-light/40">
      <div className="mx-auto max-w-2xl px-4 py-8 text-center">
        <h2 className="text-xl font-semibold text-brand-dark">
          One short email a month
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          New calculators, pricing tactics, and small-business numbers worth
          knowing. No spam, unsubscribe in one click.
        </p>
        <form
          action={BEEHIIV_FORM_URL}
          method="post"
          target="_blank"
          className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center"
        >
          <label htmlFor="nl-email" className="sr-only">Email address</label>
          <input
            id="nl-email"
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm sm:w-72"
          />
          <button
            type="submit"
            className="rounded bg-brand-primary px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
