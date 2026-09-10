import React, { useState } from "react";
import type { CreateNoteType } from "../types/NoteType";

interface NoteFormProps {
  onAdd: (note: CreateNoteType) => void;
}
const NoteForm = ({ onAdd }: NoteFormProps) => {
  const [inputs, setInputs] = useState({ title: "", content: "" });

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

    onAdd(newNote);
    setInputs({ title: "", content: "" });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputs.title}
          name="title"
          onChange={handleChange}
          placeholder="Title"
        />

        <textarea
          name="content"
          value={inputs.content}
          onChange={handleChange}
          placeholder="Write..."
        ></textarea>

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default NoteForm;
