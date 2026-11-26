import { mockNotes } from "~/services/api/mockNotes";
import { toNoteSummary } from "~/services/api/toNoteSummary";
import type { NoteSummary } from "~/types/note";

// Deleted notes, most recently deleted first.
export async function listTrash(): Promise<NoteSummary[]> {
  return mockNotes
    .filter((note) => note.deletedAt !== null)
    .sort((a, b) => (b.deletedAt ?? "").localeCompare(a.deletedAt ?? ""))
    .map(toNoteSummary);
}
