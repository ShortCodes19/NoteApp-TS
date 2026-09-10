import React, { useEffect, useState } from "react";
import type { CreateNoteType, NoteType } from "../types/NoteType";

interface NoteFormProps {
  onAdd: (note: CreateNoteType) => void;
  editingId: NoteType | null;
  updateNote: (id: string, updatedNote: CreateNoteType) => void;
  onCancel?: () => void;
}

const NoteForm = ({
  onAdd,
  editingId,
  updateNote,
  onCancel,
}: NoteFormProps) => {
  const [inputs, setInputs] = useState({ title: "", content: "" });

  useEffect(() => {
    if (editingId) {
      setInputs({
        title: editingId.title,
        content: editingId.content,
      });
    } else {
      setInputs({ title: "", content: "" });
    }
  }, [editingId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputs.title.trim() || !inputs.content.trim()) return;

    const newNote: CreateNoteType = {
      title: inputs.title.trim(),
      content: inputs.content.trim(),
    };

    if (editingId !== null) {
      updateNote(editingId._id, newNote);
    } else {
      onAdd(newNote);
    }
    setInputs({ title: "", content: "" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={inputs.title}
          onChange={handleChange}
          placeholder="title"
        />

        <textarea
          name="content"
          value={inputs.content}
          onChange={handleChange}
          placeholder="Write"
        ></textarea>

        <button type="submit">{editingId ? "Update" : "Add"}</button>
        {editingId && onCancel && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default NoteForm;
