import type { NoteStatus } from "~/types/noteStatus";
import { statusLabel } from "~/utils/statusLabel";
import "./StatusChip.css";

export function StatusChip({ status }: { status: NoteStatus }) {
  return (
    <span className={`ui-status-chip ui-status-chip--${status}`}>{statusLabel(status)}</span>
  );
}
