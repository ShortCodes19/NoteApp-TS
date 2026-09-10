import { useEffect, useState } from "react";
import type { CreateNoteType, NoteType } from "./types/NoteType";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import {
  createNoteAPI,
  getNotes,
  updateNoteAPI,
  deleteNoteAPI,
} from "./services/NoteApi";

const App = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [editingId, setEditingId] = useState<NoteType | null>(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadNotes();
  }, []);

  const createNotes = async (note: CreateNoteType): Promise<void> => {
    try {
      const newNote: NoteType = await createNoteAPI(note);
      setNotes((prev) => [...prev, newNote]);
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
      setEditingId(null);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelEdit = (): void => {
    setEditingId(null);
  };

  return (
    <div>
      <NoteForm
        onAdd={createNotes}
        updateNote={updateNote}
        editingId={editingId}
        onCancel={cancelEdit}
      />
      <NoteList notes={notes} onDelete={deleteNote} onEdit={editNote} />
    </div>
  );
};

export default App;
