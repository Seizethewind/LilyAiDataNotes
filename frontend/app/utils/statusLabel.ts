import type { NoteStatus } from "~/types/noteStatus";

const LABELS: Record<NoteStatus, string> = {
  draft: "Draft",
  verified: "Verified",
  disputed: "Disputed",
  superseded: "Superseded",
};

// The text shown on a status chip.
export function statusLabel(status: NoteStatus): string {
  return LABELS[status];
}
