import { describe, expect, it } from "vitest";
import { getNote } from "~/services/api/getNote";

describe("getNote", () => {
  it("returns the full note", async () => {
    const note = await getNote("n_001");
    expect(note?.title).toBe("Sample: Hosting decision");
    expect(note?.content).not.toBe("");
  });

  it("returns null for an unknown id", async () => {
    expect(await getNote("nope")).toBeNull();
  });

  it("returns null for a deleted note", async () => {
    expect(await getNote("n_t01")).toBeNull();
  });
});
