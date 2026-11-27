import { useState } from "react";
import { Page } from "~/components/layout/Page";
import { NoteList } from "~/components/notes/NoteList";
import { FilterChips } from "~/components/ui/FilterChips";
import { SearchField } from "~/components/ui/SearchField";
import { useNotes } from "~/hooks/useNotes";
import { NOTE_STATUSES } from "~/types/noteStatus";
import { STATUS_FILTER_OPTIONS } from "~/utils/statusFilterOptions";

export function meta() {
  return [{ title: "Notes · LilyAiDataNotes" }];
}

export default function NotesPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const status = NOTE_STATUSES.find((candidate) => candidate === filter);
  const { notes, loading } = useNotes(query, { status });

  return (
    <Page
      title="Notes"
      description="Everything Lily knows, ranked by how far it can be trusted."
    >
      <SearchField value={query} onChange={setQuery} />
      <FilterChips
        options={STATUS_FILTER_OPTIONS}
        selected={filter}
        onSelect={setFilter}
        label="Status"
      />
      {loading ? <p role="status">Loading notes…</p> : <NoteList notes={notes} />}
    </Page>
  );
}
