import { Page } from "~/components/layout/Page";
import { NoteList } from "~/components/notes/NoteList";
import { EmptyState } from "~/components/ui/EmptyState";
import { useTrash } from "~/hooks/useTrash";

export function meta() {
  return [{ title: "Trash · LilyAiDataNotes" }];
}

export default function TrashPage() {
  const { notes, loading } = useTrash();

  return (
    <Page title="Trash" description="Deleted notes are kept here instead of being erased.">
      {loading ? (
        <p role="status">Loading trash…</p>
      ) : notes.length === 0 ? (
        <EmptyState title="Trash is empty" message="Deleted notes will show up here." />
      ) : (
        <NoteList notes={notes} />
      )}
    </Page>
  );
}
