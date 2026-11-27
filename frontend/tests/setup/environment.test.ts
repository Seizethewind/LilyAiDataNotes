import { describe, expect, it } from "vitest";

// Smoke test: proves the test runner, the jsdom DOM and the jest-dom
// matchers from setup.ts are all wired up. It tests no app code.
describe("test environment", () => {
  it("provides a DOM and jest-dom matchers", () => {
    document.body.innerHTML = "<p>hello</p>";
    expect(document.querySelector("p")).toBeInTheDocument();
  });
});
