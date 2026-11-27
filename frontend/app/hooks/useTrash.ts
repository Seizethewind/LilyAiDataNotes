import { useEffect, useState } from "react";
import { listTrash } from "~/services/api/listTrash";
import type { NoteSummary } from "~/types/note";

// Deleted notes, most recently deleted first.
export function useTrash() {
  const [notes, setNotes] = useState<NoteSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    listTrash().then((result) => {
      if (cancelled) return;
      setNotes(result);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { notes, loading };
}
