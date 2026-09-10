import type { NoteType } from "../types/NoteType";

interface NoteCardProps {
  note: NoteType;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const NoteCard = ({ note, onDelete, onEdit }: NoteCardProps) => {
  return (
    <li>
      <h4>{note.title}</h4>
      <p>{note.content}</p>
      <button onClick={() => onDelete(note._id)}>Delete</button>
      <button onClick={() => onEdit(note._id)}>Edit</button>
    </li>
  );
};

export default NoteCard;
