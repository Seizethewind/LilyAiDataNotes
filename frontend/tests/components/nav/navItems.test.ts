import { describe, expect, it } from "vitest";
import { NAV_ITEMS } from "~/components/nav/navItems";

describe("NAV_ITEMS", () => {
  it("has unique paths that start with a slash", () => {
    const paths = NAV_ITEMS.map((item) => item.to);
    expect(new Set(paths).size).toBe(paths.length);
    for (const path of paths) expect(path.startsWith("/")).toBe(true);
  });

  it("links Notes and Trash", () => {
    const enabled = NAV_ITEMS.filter((item) => item.enabled).map((item) => item.label);
    expect(enabled).toEqual(["Notes", "Trash"]);
  });
});
