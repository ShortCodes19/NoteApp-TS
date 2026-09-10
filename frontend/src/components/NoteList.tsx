import type { NoteType } from "../types/NoteType";
import NoteCard from "./NoteCard";

interface NoteListProps {
  notes: NoteType[];
  onDelete: (id: string) => void;
}

const NoteList = ({ notes, onDelete }: NoteListProps) => {
  return (
    <ul>
      {notes.length === 0 ? (
        <p>No notes yet</p>
      ) : (
        notes.map((note) => (
          <NoteCard key={note._id} note={note} onDelete={onDelete} />
        ))
      )}
    </ul>
  );
};

export default NoteList;
