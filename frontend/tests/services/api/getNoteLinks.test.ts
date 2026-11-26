import { describe, expect, it } from "vitest";
import { getNoteLinks } from "~/services/api/getNoteLinks";

describe("getNoteLinks", () => {
  it("returns related notes", async () => {
    const links = await getNoteLinks("n_001");
    expect(links.map((link) => [link.id, link.relation])).toEqual([
      ["n_002", "related"],
      ["n_003", "related"],
    ]);
  });

  it("returns the note a note supersedes", async () => {
    const links = await getNoteLinks("n_006");
    expect(links).toEqual([
      { id: "n_005", title: "Sample: Old API key note", relation: "supersedes" },
    ]);
  });

  it("returns the note that replaced it", async () => {
    const links = await getNoteLinks("n_005");
    expect(links.map((link) => [link.id, link.relation])).toEqual([["n_006", "supersededBy"]]);
  });

  it("returns an empty list for an unknown id", async () => {
    expect(await getNoteLinks("nope")).toEqual([]);
  });
});
