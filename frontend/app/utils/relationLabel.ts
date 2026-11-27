import type { LinkRelation } from "~/types/noteLink";

const LABELS: Record<LinkRelation, string> = {
  related: "Related",
  parent: "Parent",
  supersedes: "Replaces",
  supersededBy: "Replaced by",
};

// The text shown next to a linked note.
export function relationLabel(relation: LinkRelation): string {
  return LABELS[relation];
}
