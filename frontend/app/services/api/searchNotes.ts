import { mockNotes } from "~/services/api/mockNotes";
import { toNoteSummary } from "~/services/api/toNoteSummary";
import type { NoteSummary } from "~/types/note";
import type { NoteStatus } from "~/types/noteStatus";
import type { SearchFilters } from "~/types/searchFilters";

// Verified first, then draft, then notes that should be trusted less.
const RANK: Record<NoteStatus, number> = {
  verified: 0,
  draft: 1,
  disputed: 2,
  superseded: 3,
};

// Mirrors GET /notes/search: filter, match text, rank. Deleted notes are skipped.
export async function searchNotes(
  query: string = "",
  filters: SearchFilters = {},
): Promise<NoteSummary[]> {
  const needle = query.trim().toLowerCase();
  return mockNotes
    .filter((note) => note.deletedAt === null)
    .filter((note) => !filters.status || note.status === filters.status)
    .filter((note) => !filters.project || note.project === filters.project)
    .filter(
      (note) =>
        needle === "" ||
        [note.title, note.summary, note.content].some((text) => text.toLowerCase().includes(needle)),
    )
    .sort((a, b) => RANK[a.status] - RANK[b.status] || b.updatedAt.localeCompare(a.updatedAt))
    .map(toNoteSummary);
}
