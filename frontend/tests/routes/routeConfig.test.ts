import { describe, expect, it } from "vitest";
import routes from "~/routes";

describe("route config", () => {
  it("serves the home page, notes, a note and the trash", () => {
    expect(routes.map((entry) => [entry.path ?? "(index)", entry.file])).toEqual([
      ["(index)", "routes/_index.tsx"],
      ["notes", "routes/notes.tsx"],
      ["notes/:noteId", "routes/notes.$noteId.tsx"],
      ["trash", "routes/trash.tsx"],
    ]);
  });
});
