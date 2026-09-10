import { useEffect, useState } from "react";
import type { CreateNoteType, NoteType } from "./types/NoteType";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import {
  getNotesAPI,
  createNoteAPI,
  deleteNoteAPI,
  updateNoteAPI,
} from "./services/NoteApi";

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

  const createNote = async (note: CreateNoteType): Promise<void> => {
    try {
      const data = await createNoteAPI(note);
      setNotes((prev) => [...prev, data.note]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id: string): Promise<void> => {
    try {
      await deleteNoteAPI(id);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const editNote = (id: string): void => {
    const note = notes.find((note) => note._id === id);

    if (!note) return;
    setEditingId(note);
  };

  const updateNote = async (
    id: string,
    updatedNote: CreateNoteType,
  ): Promise<void> => {
    try {
      const data = await updateNoteAPI(id, updatedNote);
      setNotes((prev) =>
        prev.map((note) => (note._id === id ? data.note : note)),
      );
    } catch (error) {
      console.log(error);
    }
    setEditingId(null);
  };

  const canceledit = () => {
    setEditingId(null);
  };

  return (
    <div>
      <p>{notes.length}</p>
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
