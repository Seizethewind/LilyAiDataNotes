import type { NoteVersion } from "~/types/noteVersion";

// Placeholder history. The latest version of a note matches its `version`.
export const mockVersions: NoteVersion[] = [
  {
    noteId: "n_001",
    version: 1,
    changeNote: "First draft.",
    author: "human",
    createdAt: "2026-11-05T09:00:00Z",
  },
  {
    noteId: "n_001",
    version: 2,
    changeNote: "Chose Render.",
    author: "human",
    createdAt: "2026-11-12T09:00:00Z",
  },
  {
    noteId: "n_001",
    version: 3,
    changeNote: "Added the database plan.",
    author: "human",
    createdAt: "2026-11-20T08:00:00Z",
  },
  {
    noteId: "n_004",
    version: 1,
    changeNote: "First draft.",
    author: "lily-agent",
    createdAt: "2026-11-14T12:00:00Z",
  },
  {
    noteId: "n_004",
    version: 2,
    changeNote: "Added the expand step.",
    author: "human",
    createdAt: "2026-11-18T12:00:00Z",
  },
];
