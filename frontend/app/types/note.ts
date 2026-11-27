import type { NoteStatus } from "~/types/noteStatus";

// Field meanings come from docs/API.md and docs/DATABASE.md.
// The API returns snake_case JSON. The services layer maps it to these
// camelCase names when the real API is connected.
export const NOTE_TYPES = [
  "fact",
  "decision",
  "preference",
  "procedure",
  "log",
  "code",
] as const;

export type NoteType = (typeof NOTE_TYPES)[number];

export const NOTE_SCOPES = ["global", "project", "agent", "private"] as const;

export type NoteScope = (typeof NOTE_SCOPES)[number];

export interface Note {
  id: string;
  title: string;
  summary: string;
  type: NoteType;
  project: string;
  scope: NoteScope;
  source: string;
  author: string;
  status: NoteStatus;
  content: string;
  version: number;
  parentId: string | null;
  supersedesId: string | null;
  relatedIds: string[];
  changeNote: string;
  createdAt: string;
  updatedAt: string;
  verifiedAt: string | null;
  validUntil: string | null;
  deletedAt: string | null;
}

// What a list or search result carries. Full text is fetched by id.
export type NoteSummary = Pick<
  Note,
  "id" | "title" | "summary" | "type" | "project" | "status" | "updatedAt"
>;
