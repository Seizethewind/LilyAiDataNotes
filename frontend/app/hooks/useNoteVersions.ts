import { useEffect, useState } from "react";
import { listVersions } from "~/services/api/listVersions";
import type { NoteVersion } from "~/types/noteVersion";

// The saved versions of one note, newest first.
export function useNoteVersions(id: string | undefined) {
  const [versions, setVersions] = useState<NoteVersion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listVersions(id ?? "").then((result) => {
      if (cancelled) return;
      setVersions(result);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { versions, loading };
}
