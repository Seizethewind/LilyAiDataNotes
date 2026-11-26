import { mockNotes } from "~/services/api/mockNotes";
import type { LinkRelation, NoteLink } from "~/types/noteLink";

// Mirrors GET /notes/{id}/links: the note's neighbours and how they connect.
// Deleted and missing neighbours are left out.
export async function getNoteLinks(id: string): Promise<NoteLink[]> {
  const note = mockNotes.find((candidate) => candidate.id === id);
  if (!note) return [];

  const wanted: [string, LinkRelation][] = [
    ...note.relatedIds.map((relatedId): [string, LinkRelation] => [relatedId, "related"]),
    ...(note.parentId ? [[note.parentId, "parent"] as [string, LinkRelation]] : []),
    ...(note.supersedesId ? [[note.supersedesId, "supersedes"] as [string, LinkRelation]] : []),
    ...mockNotes
      .filter((other) => other.supersedesId === id)
      .map((other): [string, LinkRelation] => [other.id, "supersededBy"]),
  ];

  return wanted.flatMap(([linkId, relation]) => {
    const target = mockNotes.find((candidate) => candidate.id === linkId);
    return target && target.deletedAt === null
      ? [{ id: target.id, title: target.title, relation }]
      : [];
  });
}
