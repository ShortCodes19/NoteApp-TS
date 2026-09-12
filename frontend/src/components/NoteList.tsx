import type { NoteType } from "../types/NoteType";
import NoteCard from "./NoteCard";

interface NoteListProps {
  notes: NoteType[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const NoteList = ({ notes, onDelete, onEdit }: NoteListProps) => {
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white/60 px-6 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50">
          <svg
            className="h-8 w-8 text-primary-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-slate-900">
          No notes yet
        </h3>
        <p className="mt-1 max-w-sm text-sm text-slate-500">
          Write your first note above and it will show up here. Your thoughts
          are saved and synced to your account.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

export default NoteList;
