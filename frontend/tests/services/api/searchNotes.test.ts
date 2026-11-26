import { describe, expect, it } from "vitest";
import { searchNotes } from "~/services/api/searchNotes";

const ids = (notes: { id: string }[]) => notes.map((note) => note.id);

describe("searchNotes", () => {
  it("returns every live note for an empty query", async () => {
    expect(await searchNotes()).toHaveLength(8);
  });

  it("skips deleted notes", async () => {
    expect(ids(await searchNotes())).not.toContain("n_t01");
  });

  it("matches text without caring about case", async () => {
    expect(ids(await searchNotes("RENDER"))).toEqual(["n_001"]);
  });

  it("ranks verified before draft", async () => {
    expect(ids(await searchNotes("backup"))).toEqual(["n_002", "n_003"]);
  });

  it("puts verified first and superseded last, newest first within a rank", async () => {
    const result = ids(await searchNotes());
    expect(result.slice(0, 4)).toEqual(["n_006", "n_001", "n_002", "n_004"]);
    expect(result[result.length - 1]).toBe("n_005");
  });

  it("filters by status", async () => {
    expect(ids(await searchNotes("", { status: "disputed" }))).toEqual(["n_007"]);
  });

  it("filters by project", async () => {
    expect(ids(await searchNotes("", { project: "terminal-lily" }))).toEqual(["n_008"]);
  });

  it("returns nothing when nothing matches", async () => {
    expect(await searchNotes("zzzz")).toEqual([]);
  });
});
