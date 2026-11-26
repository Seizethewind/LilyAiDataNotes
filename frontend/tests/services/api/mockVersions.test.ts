import { describe, expect, it } from "vitest";
import { mockNotes } from "~/services/api/mockNotes";
import { mockVersions } from "~/services/api/mockVersions";

describe("mockVersions", () => {
  it("only describes notes that exist", () => {
    const ids = new Set(mockNotes.map((note) => note.id));
    for (const entry of mockVersions) {
      expect(ids.has(entry.noteId), entry.noteId).toBe(true);
    }
  });

  it("ends at the note's current version", () => {
    for (const note of mockNotes.filter((n) => mockVersions.some((v) => v.noteId === n.id))) {
      const latest = Math.max(...mockVersions.filter((v) => v.noteId === note.id).map((v) => v.version));
      expect(latest, note.id).toBe(note.version);
    }
  });
});
