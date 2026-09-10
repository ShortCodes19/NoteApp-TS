import type { NoteType } from "../types/NoteType";
import NoteCard from "./NoteCard";

interface NoteListProps {
  notes: NoteType[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const NoteList = ({ notes, onDelete, onEdit }: NoteListProps) => {
  if (notes.length === 0) {
    return <p>No notes yet!</p>;
  }
  return (
    <ul>
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
