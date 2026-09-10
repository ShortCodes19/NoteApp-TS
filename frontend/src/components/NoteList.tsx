import type { NoteType } from "../types/NoteType";
import NoteCard from "./NoteCard";

interface NoteListProps {
  notes: NoteType[];
}

const NoteList = ({ notes }: NoteListProps) => {
  return (
    <ul>
      {notes.length === 0 ? (
        <p>No notes yet</p>
      ) : (
        notes.map((note) => <NoteCard key={note._id} note={note} />)
      )}
    </ul>
  );
};

export default NoteList;
