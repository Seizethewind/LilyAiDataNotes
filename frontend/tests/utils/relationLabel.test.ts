import { describe, expect, it } from "vitest";
import { LINK_RELATIONS } from "~/types/noteLink";
import { relationLabel } from "~/utils/relationLabel";

describe("relationLabel", () => {
  it.each(LINK_RELATIONS)("%s has a label", (relation) => {
    expect(relationLabel(relation).length).toBeGreaterThan(0);
  });

  it("words replacement links from the reader's side", () => {
    expect(relationLabel("supersedes")).toBe("Replaces");
    expect(relationLabel("supersededBy")).toBe("Replaced by");
  });
});
