import { afterEach, describe, expect, it, vi } from "vitest";
import { readStoredTheme } from "~/utils/readStoredTheme";
import { THEME_STORAGE_KEY } from "~/utils/themeStorageKey";

function mockSystemDark(matches: boolean) {
  vi.stubGlobal("matchMedia", () => ({ matches }));
}

describe("readStoredTheme", () => {
  afterEach(() => {
    window.localStorage.clear();
    vi.unstubAllGlobals();
  });

  it("returns the saved theme", () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, "dark");
    expect(readStoredTheme()).toBe("dark");
  });

  it("ignores an unknown saved value", () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, "purple");
    mockSystemDark(false);
    expect(readStoredTheme()).toBe("light");
  });

  it("falls back to the system preference", () => {
    mockSystemDark(true);
    expect(readStoredTheme()).toBe("dark");
  });

  it("defaults to light when nothing is known", () => {
    expect(readStoredTheme()).toBe("light");
  });
});
