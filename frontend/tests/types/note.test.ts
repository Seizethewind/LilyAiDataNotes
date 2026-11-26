import { describe, expect, it } from "vitest";
import { NOTE_SCOPES, NOTE_TYPES } from "~/types/note";
import type { Note, NoteSummary } from "~/types/note";

const note: Note = {
  id: "n_1",
  title: "Sample",
  summary: "A sample note.",
  type: "fact",
  project: "lily",
  scope: "global",
  source: "test",
  author: "tester",
  status: "draft",
  content: "Body",
  version: 1,
  parentId: null,
  supersedesId: null,
  relatedIds: [],
  changeNote: "",
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
  verifiedAt: null,
  validUntil: null,
  deletedAt: null,
};

describe("note types", () => {
  it("lists the note types", () => {
    expect([...NOTE_TYPES]).toEqual(["fact", "decision", "preference", "procedure", "log", "code"]);
  });

  it("lists the note scopes", () => {
    expect([...NOTE_SCOPES]).toEqual(["global", "project", "agent", "private"]);
  });

  it("rejects an unknown status at compile time", () => {
    // @ts-expect-error "archived" is not a NoteStatus
    const bad: Note = { ...note, status: "archived" };
    expect(bad.status).toBe("archived");
  });

  it("summary carries only list fields", () => {
    const summary: NoteSummary = {
      id: note.id,
      title: note.title,
      summary: note.summary,
      type: note.type,
      project: note.project,
      status: note.status,
      updatedAt: note.updatedAt,
    };
    expect(Object.keys(summary)).toHaveLength(7);
  });
});
