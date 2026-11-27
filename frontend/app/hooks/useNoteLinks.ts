import { useEffect, useState } from "react";
import { getNoteLinks } from "~/services/api/getNoteLinks";
import type { NoteLink } from "~/types/noteLink";

// The neighbours of one note. Empty when the note is unknown.
export function useNoteLinks(id: string | undefined) {
  const [links, setLinks] = useState<NoteLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getNoteLinks(id ?? "").then((result) => {
      if (cancelled) return;
      setLinks(result);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { links, loading };
}
