import { describe, expect, it } from "vitest";
import { buildNote } from "~/services/api/buildNote";
import { toNoteSummary } from "~/services/api/toNoteSummary";

describe("toNoteSummary", () => {
  it("keeps only the list fields", () => {
    const note = buildNote({ id: "n_x", title: "T", content: "long text" });
    const summary = toNoteSummary(note);
    expect(Object.keys(summary).sort()).toEqual(
      ["id", "project", "status", "summary", "title", "type", "updatedAt"],
    );
  });
});
