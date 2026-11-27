import { Link } from "react-router";
import { StatusChip } from "~/components/ui/StatusChip";
import type { NoteSummary } from "~/types/note";
import { formatRelativeTime } from "~/utils/formatRelativeTime";
import "./NoteCard.css";

// One row in a list or search result. Links to the full note.
export function NoteCard({ note }: { note: NoteSummary }) {
  const meta = `${note.type} · ${note.project} · ${formatRelativeTime(note.updatedAt)}`;
  return (
    <Link to={`/notes/${note.id}`} className="note-card">
      <div className="note-card__header">
        <h3 className="note-card__title">{note.title}</h3>
        <StatusChip status={note.status} />
      </div>
      <p className="note-card__summary line-clamp-2">{note.summary}</p>
      <p className="note-card__meta">{meta}</p>
    </Link>
  );
}
