// One saved version of a note. Old versions are never overwritten.
export interface NoteVersion {
  noteId: string;
  version: number;
  changeNote: string;
  author: string;
  createdAt: string;
}
