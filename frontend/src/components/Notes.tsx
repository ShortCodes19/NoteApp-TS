import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CreateNoteType, NoteType } from "../types/NoteType";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import {
  getNotesAPI,
  createNoteAPI,
  deleteNoteAPI,
  updateNoteAPI,
} from "../services/NoteApi";
import { useAuth } from "../context/AuthContext";

const getErrorMessage = (err: unknown): string => {
  return (
    (err as { response?: { data?: { message?: string } } })?.response?.data
      ?.message ?? "Something went wrong. Please try again."
  );
};

const Notes = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [editingId, setEditingId] = useState<NoteType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadNote = async () => {
      try {
        const data = await getNotesAPI();
        setNotes(data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    loadNote();
  }, []);

  const createNote = async (note: CreateNoteType): Promise<void> => {
    try {
      const data = await createNoteAPI(note);
      setNotes((prev) => [...prev, data.note]);
      setError("");
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const deleteNote = async (id: string): Promise<void> => {
    const confirmed = window.confirm(
      "Delete this note? This cannot be undone.",
    );
    if (!confirmed) return;

    try {
      await deleteNoteAPI(id);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      if (editingId?._id === id) setEditingId(null);
      setError("");
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const editNote = (id: string): void => {
    const note = notes.find((note) => note._id === id);
    if (!note) return;
    setEditingId(note);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      setError("");
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleLogout = useCallback(async () => {
    await logout();
    navigate("/login", { replace: true });
  }, [logout, navigate]);

  const firstName = user?.name?.split(" ")[0] ?? "";

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-slate-50 to-primary-50">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight text-slate-900">
                NoteApp
              </h1>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus:ring-2 focus:ring-red-400/40 focus:outline-none"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {firstName ? `Welcome back, ${firstName} 👋` : "Your notes"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {notes.length === 0
              ? "You have no notes yet."
              : `You have ${notes.length} ${notes.length === 1 ? "note" : "notes"}.`}
          </p>
        </div>

        {error && (
          <div className="mb-6 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <svg
              className="mt-0.5 h-4 w-4 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex flex-1 items-center justify-between gap-4">
              <span>{error}</span>
              <button
                onClick={() => setError("")}
                className="text-sm font-medium hover:underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <NoteForm
          onAdd={createNote}
          editingId={editingId}
          updateNote={updateNote}
          onCancel={() => setEditingId(null)}
        />

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
              All notes
            </h3>
            <span className="rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-semibold text-primary-700">
              {notes.length}
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white/80 py-16">
              <div className="flex items-center gap-3 text-slate-500">
                <svg
                  className="h-5 w-5 animate-spin text-primary-600"
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
                <span className="text-sm font-medium">Loading notes…</span>
              </div>
            </div>
          ) : (
            <NoteList notes={notes} onDelete={deleteNote} onEdit={editNote} />
          )}
        </section>
      </main>
    </div>
  );
};

export default Notes;
