import { Link } from "react-router";
import type { NoteLink } from "~/types/noteLink";
import { relationLabel } from "~/utils/relationLabel";
import "./LinkedNotes.css";

// Neighbours of a note, so a reader can follow the context around it.
export function LinkedNotes({ links }: { links: NoteLink[] }) {
  if (links.length === 0) {
    return <p className="linked-notes__empty">No linked notes.</p>;
  }
  return (
    <ul className="linked-notes">
      {links.map((link) => (
        <li key={`${link.relation}-${link.id}`}>
          <Link to={`/notes/${link.id}`} className="linked-notes__link">
            <span className="label-text">{relationLabel(link.relation)}</span>
            <span>{link.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
