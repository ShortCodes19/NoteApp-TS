interface NoteType {
  _id: string;
  title: string;
  content: string;
}

type CreateNoteType = Omit<NoteType, "_id">;

interface authResponse {
  message: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

interface registerType {
  name: string;
  email: string;
  password: string;
}

type loginType = Omit<registerType, "name">;

export type { CreateNoteType, NoteType, registerType, loginType, authResponse };
