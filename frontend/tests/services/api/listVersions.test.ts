import { describe, expect, it } from "vitest";
import { listVersions } from "~/services/api/listVersions";

describe("listVersions", () => {
  it("returns versions newest first", async () => {
    const versions = await listVersions("n_001");
    expect(versions.map((entry) => entry.version)).toEqual([3, 2, 1]);
  });

  it("returns only that note's versions", async () => {
    const versions = await listVersions("n_004");
    expect(versions.every((entry) => entry.noteId === "n_004")).toBe(true);
  });

  it("returns an empty list when there is no history", async () => {
    expect(await listVersions("n_008")).toEqual([]);
  });
});
