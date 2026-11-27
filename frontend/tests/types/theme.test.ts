import { describe, expect, it } from "vitest";
import { THEMES } from "~/types/theme";

describe("THEMES", () => {
  it("lists light and dark", () => {
    expect([...THEMES]).toEqual(["light", "dark"]);
  });
});
