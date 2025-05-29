import noteInterface from "../interfaces/note";
import { PaginatorInterface } from "../interfaces/interface";

export type DataType = {
  data: any[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
};

export type NoteType = {
  data: noteInterface[];
  paginator: PaginatorInterface;
};

type NoteList = {
  id: string | number;
  title: string;
  text: string;
  created_at: string;
};

export type NotesListProps = {
  data: { data: NoteList[] };
  setNewNote: (note: { title: string; text: string }) => void;
  setEditingNoteId: (id: string | number) => void;
  setIsEditing: (isEditing: boolean) => void;
  setShowAddModal: (show: boolean) => void;
  handleDeleteNote: (id: string | number) => void;
};

export type PaginationControlsProps = {
  currentPage: number;
  lastPage: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
};

type Note = {
  title: string;
  text: string;
};

export type NoteModalProps = {
  show: boolean;
  onClose: () => void;
  newNote: Note;
  setNewNote: (note: Note) => void;
  isEditing: boolean;
  onSave: () => void;
};