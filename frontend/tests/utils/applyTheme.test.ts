import { afterEach, describe, expect, it } from "vitest";
import { applyTheme } from "~/utils/applyTheme";
import { THEME_STORAGE_KEY } from "~/utils/themeStorageKey";

describe("applyTheme", () => {
  afterEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("sets data-theme on the html element", () => {
    applyTheme("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("saves the choice", () => {
    applyTheme("dark");
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
  });
});
