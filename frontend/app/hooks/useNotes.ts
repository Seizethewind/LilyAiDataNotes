import { useEffect, useState } from "react";
import { searchNotes } from "~/services/api/searchNotes";
import type { NoteSummary } from "~/types/note";
import type { SearchFilters } from "~/types/searchFilters";

// Search results for the list screen. Reruns when the query or a filter changes.
export function useNotes(query: string, filters: SearchFilters = {}) {
  const [notes, setNotes] = useState<NoteSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const { status, project } = filters;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    searchNotes(query, { status, project }).then((result) => {
      if (cancelled) return;
      setNotes(result);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [query, status, project]);

  return { notes, loading };
}
