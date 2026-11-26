import type { Note } from "~/types/note";

type NoteOverrides = Partial<Note> & Pick<Note, "id" | "title">;

// Fills every field a mock note needs, so mock data only lists what differs.
export function buildNote(overrides: NoteOverrides): Note {
  return {
    summary: "",
    type: "fact",
    project: "lilyaidatanotes",
    scope: "global",
    source: "manual",
    author: "human",
    status: "draft",
    content: "",
    version: 1,
    parentId: null,
    supersedesId: null,
    relatedIds: [],
    changeNote: "",
    createdAt: "2026-11-01T09:00:00Z",
    updatedAt: "2026-11-01T09:00:00Z",
    verifiedAt: null,
    validUntil: null,
    deletedAt: null,
    ...overrides,
  };
}
