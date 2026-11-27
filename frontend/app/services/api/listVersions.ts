import { mockVersions } from "~/services/api/mockVersions";
import type { NoteVersion } from "~/types/noteVersion";

// Every saved version of a note, newest first.
export async function listVersions(noteId: string): Promise<NoteVersion[]> {
  return mockVersions
    .filter((entry) => entry.noteId === noteId)
    .sort((a, b) => b.version - a.version);
}
