interface NoteType {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

type CreateNoteType = Omit<NoteType, "_id" | "createdAt" | "updatedAt">;

interface authResponse {
  message: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

type checkAuthResponse = Omit<authResponse, "message">;

interface registerType {
  name: string;
  email: string;
  password: string;
}

type loginType = Omit<registerType, "name">;

export type {
  CreateNoteType,
  NoteType,
  registerType,
  loginType,
  authResponse,
  checkAuthResponse,
};
