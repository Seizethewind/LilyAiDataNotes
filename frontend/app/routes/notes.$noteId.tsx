import { useParams } from "react-router";
import { Page } from "~/components/layout/Page";
import { NoteDetail } from "~/components/notes/NoteDetail";
import { EmptyState } from "~/components/ui/EmptyState";
import { useNote } from "~/hooks/useNote";
import { useNoteLinks } from "~/hooks/useNoteLinks";
import { useNoteVersions } from "~/hooks/useNoteVersions";

export function meta() {
  return [{ title: "Note · LilyAiDataNotes" }];
}

const BACK = { to: "/notes", label: "← All notes" };

export default function NoteRoute() {
  const { noteId } = useParams();
  const { note, loading } = useNote(noteId);
  const { links } = useNoteLinks(noteId);
  const { versions } = useNoteVersions(noteId);

  if (loading) {
    return (
      <Page back={BACK}>
        <p role="status">Loading note…</p>
      </Page>
    );
  }
  if (!note) {
    return (
      <Page back={BACK}>
        <EmptyState
          title="Note not found"
          message="It may have been moved to the trash, or it never existed."
        />
      </Page>
    );
  }
  return (
    <Page back={BACK}>
      <NoteDetail note={note} versions={versions} links={links} />
    </Page>
  );
}
