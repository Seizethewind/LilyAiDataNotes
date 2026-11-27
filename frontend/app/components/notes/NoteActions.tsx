import { Button } from "~/components/ui/Button";
import type { NoteStatus } from "~/types/noteStatus";
import "./NoteActions.css";

interface NoteActionsProps {
  status: NoteStatus;
  onVerify?: () => void;
  onDelete?: () => void;
}

// Human-only actions. A button with no handler is shown disabled until the
// real API is connected.
export function NoteActions({ status, onVerify, onDelete }: NoteActionsProps) {
  return (
    <div className="note-actions">
      {status !== "verified" && (
        <Button onClick={onVerify} disabled={!onVerify}>
          Verify
        </Button>
      )}
      <Button variant="ghost" onClick={onDelete} disabled={!onDelete}>
        Move to trash
      </Button>
    </div>
  );
}
