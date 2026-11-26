export const LINK_RELATIONS = ["related", "parent", "supersedes", "supersededBy"] as const;

export type LinkRelation = (typeof LINK_RELATIONS)[number];

// A neighbour of a note, with how it is connected.
export interface NoteLink {
  id: string;
  title: string;
  relation: LinkRelation;
}
