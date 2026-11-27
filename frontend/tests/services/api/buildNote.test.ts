import { describe, expect, it } from "vitest";
import { buildNote } from "~/services/api/buildNote";

describe("buildNote", () => {
  it("fills defaults", () => {
    const note = buildNote({ id: "n_x", title: "T" });
    expect(note.status).toBe("draft");
    expect(note.version).toBe(1);
    expect(note.relatedIds).toEqual([]);
    expect(note.deletedAt).toBeNull();
  });

  it("lets overrides win", () => {
    const note = buildNote({ id: "n_x", title: "T", status: "verified", version: 4 });
    expect(note.status).toBe("verified");
    expect(note.version).toBe(4);
  });
});
