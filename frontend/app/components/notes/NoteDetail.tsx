import { LinkedNotes } from "~/components/notes/LinkedNotes";
import { NoteActions } from "~/components/notes/NoteActions";
import { NoteMeta } from "~/components/notes/NoteMeta";
import { VersionHistory } from "~/components/notes/VersionHistory";
import { StatusChip } from "~/components/ui/StatusChip";
import type { Note } from "~/types/note";
import type { NoteLink } from "~/types/noteLink";
import type { NoteVersion } from "~/types/noteVersion";
import "./NoteDetail.css";

interface NoteDetailProps {
  note: Note;
  versions: NoteVersion[];
  links: NoteLink[];
}

// The full note page: text first, then how far to trust it, then its context.
export function NoteDetail({ note, versions, links }: NoteDetailProps) {
  return (
    <article className="note-detail">
      <header>
        <div className="note-detail__title-row">
          <h1 className="note-detail__title">{note.title}</h1>
          <StatusChip status={note.status} />
        </div>
        <p className="note-detail__summary">{note.summary}</p>
      </header>
      <NoteActions status={note.status} />
      <section>
        <h2 className="label-text note-detail__section-title">Content</h2>
        <div className="note-detail__content">{note.content}</div>
      </section>
      <section>
        <h2 className="label-text note-detail__section-title">Details</h2>
        <NoteMeta note={note} />
      </section>
      <section>
        <h2 className="label-text note-detail__section-title">Linked notes</h2>
        <LinkedNotes links={links} />
      </section>
      <section>
        <h2 className="label-text note-detail__section-title">History</h2>
        <VersionHistory versions={versions} />
      </section>
    </article>
  );
}
