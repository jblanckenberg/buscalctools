import { describe, it, expect } from "vitest";
import { BLOG_FAQS, blogFaqs } from "@/lib/blog/faqs";
import { POSTS } from "@/lib/blog/posts";

describe("blog FAQs", () => {
  it("blogFaqs returns array for slugs with FAQs", () => {
    expect(blogFaqs("profit-margin-vs-markup-difference")).toBeDefined();
    expect(blogFaqs("value-based-pricing-vs-cost-plus")).toBeDefined();
    expect(blogFaqs("cost-plus-pricing-explained")).toBeDefined();
  });

  it("blogFaqs returns undefined for slugs without FAQs", () => {
    expect(blogFaqs("how-business-loans-work")).toBeUndefined();
  });

  it("every FAQ slug exists in POSTS", () => {
    for (const slug of Object.keys(BLOG_FAQS)) {
      expect(POSTS.find((p) => p.slug === slug)).toBeDefined();
    }
  });

  it("every FAQ has non-empty question and answer", () => {
    for (const [slug, faqs] of Object.entries(BLOG_FAQS)) {
      for (const faq of faqs) {
        expect(faq.question.length, `${slug} question`).toBeGreaterThan(5);
        expect(faq.answer.length, `${slug} answer`).toBeGreaterThan(20);
      }
    }
  });
});
