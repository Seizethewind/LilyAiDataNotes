import { NoteCard } from "~/components/notes/NoteCard";
import { EmptyState } from "~/components/ui/EmptyState";
import type { NoteSummary } from "~/types/note";
import "./NoteList.css";

export function NoteList({ notes }: { notes: NoteSummary[] }) {
  if (notes.length === 0) {
    return <EmptyState title="No notes found" message="Try a different search or filter." />;
  }
  return (
    <ul className="note-list">
      {notes.map((note) => (
        <li key={note.id}>
          <NoteCard note={note} />
        </li>
      ))}
    </ul>
  );
}
