import { useState } from "react";
import type { CreateNoteType, NoteType } from "./types/NoteType";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

const App = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);

  const createNote = (note: CreateNoteType): void => {
    const newNote = { _id: crypto.randomUUID(), ...note };
    setNotes((prev) => [...prev, newNote]);
  };

  return (
    <div>
      <NoteForm onAdd={createNote} />
      <NoteList notes={notes} />
    </div>
  );
};

export default App;
