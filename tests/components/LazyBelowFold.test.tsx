import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act, cleanup } from "@testing-library/react";
import LazyBelowFold from "@/components/shared/LazyBelowFold";

class MockIO {
  cb: IntersectionObserverCallback;
  constructor(cb: IntersectionObserverCallback) {
    this.cb = cb;
  }
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  // helper to simulate entering viewport
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

describe("LazyBelowFold", () => {
  it("renders placeholder before intersection", () => {
    render(
      <LazyBelowFold minHeight={200} placeholderLabel="below-fold-placeholder">
        <div>real children</div>
      </LazyBelowFold>,
    );
    expect(screen.queryByText("real children")).toBeNull();
    expect(screen.getByLabelText("below-fold-placeholder")).toBeTruthy();
  });

  it("renders children after IntersectionObserver fires isIntersecting=true", () => {
    render(
      <LazyBelowFold minHeight={200} placeholderLabel="below-fold-placeholder">
        <div>real children</div>
      </LazyBelowFold>,
    );
    expect(lastIO).not.toBeNull();
    act(() => lastIO!.fire(true));
    expect(screen.getByText("real children")).toBeTruthy();
  });

  it("falls back to rendering children when IntersectionObserver is unavailable (SSR / old browser)", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    render(
      <LazyBelowFold minHeight={200} placeholderLabel="below-fold-placeholder">
        <div>real children</div>
      </LazyBelowFold>,
    );
    expect(screen.getByText("real children")).toBeTruthy();
  });
});
