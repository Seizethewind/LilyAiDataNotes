import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeScript } from "~/components/nav/ThemeScript";
import { THEME_STORAGE_KEY } from "~/utils/themeStorageKey";

// Rendering does not run the script, so the test runs its text by hand.
function runScript() {
  const { container } = render(<ThemeScript />);
  const code = container.querySelector("script")?.textContent ?? "";
  new Function(code)();
}

describe("ThemeScript", () => {
  afterEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    vi.unstubAllGlobals();
  });

  it("applies the saved theme", () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, "dark");
    runScript();
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("follows a dark system preference when nothing is saved", () => {
    vi.stubGlobal("matchMedia", () => ({ matches: true }));
    runScript();
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("ignores an unknown saved value", () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, "purple");
    vi.stubGlobal("matchMedia", () => ({ matches: false }));
    runScript();
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });
});
