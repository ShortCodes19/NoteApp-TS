import type { NoteType } from "../types/NoteType";

interface NoteCardProps {
  note: NoteType;
}

const NoteCard = ({ note }: NoteCardProps) => {
  return (
    <li>
      <h4>{note.title}</h4>
      <strong>
        <small>{note.content}</small>
      </strong>
    </li>
  );
};

export default NoteCard;
