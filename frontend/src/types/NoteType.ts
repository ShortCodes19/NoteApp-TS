interface NoteType {
  _id: string;
  title: string;
  content: string;
}

type CreateNoteType = Omit<NoteType, "_id">;

export type { NoteType, CreateNoteType };
