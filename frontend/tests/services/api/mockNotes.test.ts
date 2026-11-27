import { describe, expect, it } from "vitest";
import { mockNotes } from "~/services/api/mockNotes";
import { NOTE_STATUSES } from "~/types/noteStatus";

const ids = new Set(mockNotes.map((note) => note.id));

describe("mockNotes", () => {
  it("has unique ids", () => {
    expect(ids.size).toBe(mockNotes.length);
  });

  it("only links to notes that exist", () => {
    for (const note of mockNotes) {
      const targets = [...note.relatedIds, note.parentId, note.supersedesId];
      for (const target of targets) {
        if (target !== null) expect(ids.has(target), `${note.id} -> ${target}`).toBe(true);
      }
    }
  });

  it.each(NOTE_STATUSES)("includes a %s note", (status) => {
    expect(mockNotes.some((note) => note.status === status)).toBe(true);
  });

  it("includes deleted notes for the trash", () => {
    expect(mockNotes.filter((note) => note.deletedAt !== null).length).toBeGreaterThan(0);
  });
});
