import type { Note, NoteSummary } from "~/types/note";

// Keeps only the fields a list or search result carries.
export function toNoteSummary(note: Note): NoteSummary {
  const { id, title, summary, type, project, status, updatedAt } = note;
  return { id, title, summary, type, project, status, updatedAt };
}
