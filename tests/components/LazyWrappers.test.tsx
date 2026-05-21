import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import LazyRelatedTools from "@/components/shared/LazyRelatedTools";
import LazyMethodologyBox from "@/components/shared/LazyMethodologyBox";

class MockIO {
  cb: IntersectionObserverCallback;
  constructor(cb: IntersectionObserverCallback) {
    this.cb = cb;
  }
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  fire(isIntersecting: boolean) {
    this.cb([{ isIntersecting } as IntersectionObserverEntry], this as any);
  }
}

let lastIO: MockIO | null = null;

beforeEach(() => {
  lastIO = null;
  vi.stubGlobal("IntersectionObserver", function (cb: IntersectionObserverCallback) {
    lastIO = new MockIO(cb);
    return lastIO;
  });
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("LazyRelatedTools", () => {
  it("renders a placeholder before intersection", () => {
    render(<LazyRelatedTools slugs={["roi-calculator"]} />);
    expect(screen.getByLabelText("Related calculators loading")).toBeTruthy();
  });
});

describe("LazyMethodologyBox", () => {
  it("renders a placeholder before intersection", () => {
    render(<LazyMethodologyBox slug="break-even-calculator" />);
    expect(screen.getByLabelText("Methodology section loading")).toBeTruthy();
  });
});
