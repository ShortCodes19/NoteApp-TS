import React, { useEffect, useState } from "react";
import type { CreateNoteType, NoteType } from "../types/NoteType";

interface NoteFormProps {
  onAdd: (note: CreateNoteType) => Promise<void>;
  updateNote: (id: string, updatedNote: CreateNoteType) => void;
  editingId: NoteType | null;
  onCancel: () => void;
}

const NoteForm = ({
  onAdd,
  updateNote,
  editingId,
  onCancel,
}: NoteFormProps) => {
  const [inputs, setInputs] = useState({ title: "", content: "" });
  const [saving, setSaving] = useState(false);

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
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.title.trim() || !inputs.content.trim()) return;

    const newNote: CreateNoteType = {
      title: inputs.title.trim(),
      content: inputs.content.trim(),
    };

    setSaving(true);
    try {
      if (editingId !== null) {
        await updateNote(editingId._id, newNote);
      } else {
        await onAdd(newNote);
      }
      setInputs({ title: "", content: "" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex items-center gap-2">
        {editingId ? (
          <>
            <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
              Editing note
            </span>
            <h3 className="text-sm font-medium text-slate-500">
              {editingId.title}
            </h3>
          </>
        ) : (
          <h3 className="text-base font-semibold text-slate-900">
            New note
          </h3>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={inputs.title}
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 placeholder-slate-400 shadow-sm transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:outline-none"
        />

        <textarea
          name="content"
          value={inputs.content}
          onChange={handleChange}
          placeholder="Write your thoughts here…"
          rows={4}
          className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:outline-none"
        ></textarea>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving || !inputs.title.trim() || !inputs.content.trim()}
            className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 focus:ring-2 focus:ring-primary-500/40 focus:outline-none active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? (
              <svg
                className="h-4 w-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            ) : (
              <svg
                className="mr-1.5 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            )}
            {editingId ? "Update note" : "Add note"}
          </button>

          {editingId && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 focus:ring-2 focus:ring-slate-400/40 focus:outline-none"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
