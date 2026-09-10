import { useEffect, useState } from "react";
import type { CreateNoteType, NoteType } from "./types/NoteType";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import { getNotesAPI } from "./services/NoteApi";

const App = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [editingId, setEditingId] = useState<NoteType | null>(null);

  useEffect(() => {
    const loadNote = async () => {
      try {
        const data = await getNotesAPI();
        setNotes(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadNote();
  }, []);

  const createNote = (note: CreateNoteType): void => {
    const newNote = { _id: crypto.randomUUID(), ...note };
    setNotes((prev) => [...prev, newNote]);
  };

  const deleteNote = (id: string): void => {
    setNotes((prev) => prev.filter((note) => note._id !== id));
  };

  const editNote = (id: string): void => {
    const note = notes.find((note) => note._id === id);

    if (!note) return;
    setEditingId(note);
  };

  const updateNote = (id: string, updatedNote: CreateNoteType): void => {
    setNotes((prev) =>
      prev.map((note) =>
        note._id === id ? { ...note, ...updatedNote } : note,
      ),
    );
    setEditingId(null);
  };

  const canceledit = () => {
    setEditingId(null);
  };

  return (
    <div>
      <NoteForm
        onAdd={createNote}
        editingId={editingId}
        updateNote={updateNote}
        onCancel={canceledit}
      />
      <NoteList notes={notes} onDelete={deleteNote} onEdit={editNote} />
    </div>
  );
};

export default App;
