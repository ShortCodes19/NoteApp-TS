import type { NoteType } from "../types/NoteType";

interface NoteCardProps {
  note: NoteType;
  onDelete: (id: string) => void;
}

const NoteCard = ({ note, onDelete }: NoteCardProps) => {
  return (
    <li>
      <h4>{note.title}</h4>
      <strong>
        <small>{note.content}</small>
      </strong>
      <button onClick={() => onDelete(note._id)}>Delete</button>
    </li>
  );
};

export default NoteCard;
