import { useEffect, useState } from "react";
import { getNote } from "~/services/api/getNote";
import type { Note } from "~/types/note";

// One note by id. note stays null when it is missing or deleted.
export function useNote(id: string | undefined) {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getNote(id ?? "").then((result) => {
      if (cancelled) return;
      setNote(result);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { note, loading };
}
