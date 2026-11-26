import { mockNotes } from "~/services/api/mockNotes";
import type { Note } from "~/types/note";

// Mirrors GET /notes/{id}. Missing and deleted notes both come back as null.
export async function getNote(id: string): Promise<Note | null> {
  const note = mockNotes.find((candidate) => candidate.id === id);
  return note && note.deletedAt === null ? note : null;
}
