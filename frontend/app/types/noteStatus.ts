// Status values come from docs/API.md. Writes from AI keys always start as "draft".
export const NOTE_STATUSES = ["draft", "verified", "disputed", "superseded"] as const;

export type NoteStatus = (typeof NOTE_STATUSES)[number];
