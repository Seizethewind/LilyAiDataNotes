import type { NoteStatus } from "~/types/noteStatus";

// Optional metadata filters. They narrow the search before text matching.
export interface SearchFilters {
  status?: NoteStatus;
  project?: string;
}
