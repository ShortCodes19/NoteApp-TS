import { useState } from "react";
import type { CreateNoteType, NoteType } from "./types/NoteType";
import NoteForm from "./components/NoteForm";

const App = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);

  const createNote = (note: CreateNoteType): void => {
    const newNote = { _id: crypto.randomUUID(), ...note };
    setNotes((prev) => [...prev, newNote]);
  };

  console.log(notes);
  return (
    <div>
      <NoteForm onAdd={createNote} />
    </div>
  );
};

export default App;
