import { NotepadText, Edit2, Trash2 } from 'lucide-react';
import { NotesListProps } from '../type/types';


const NotesList: React.FC<NotesListProps> = ({
  data,
  setNewNote,
  setEditingNoteId,
  setIsEditing,
  setShowAddModal,
  handleDeleteNote,
}) => {
  return (
    <div className="notes-list">
      {data.data.map((note) => (
        <div className="note-card" key={note.id} style={{ position: 'relative' }}>
          <div className="note-header">
            <div className="note-icon-container">
              <NotepadText size={50} />
            </div>
            <div className="note-title-container">
              <h3 className="note-title">{note.title}</h3>
            </div>
          </div>
          <p className="note-text">{note.text}</p>
          <p className="note-date">Creado el: {new Date(note.created_at).toLocaleDateString()}</p>

          <div
            className="note-buttons"
            style={{ position: 'absolute', bottom: 10, right: 10, display: 'flex', gap: '8px' }}
          >
            <button
              className="button-update"
              title="Actualizar nota"
              onClick={() => {
                setNewNote({ title: note.title, text: note.text });
                setEditingNoteId(note.id);
                setIsEditing(true);
                setShowAddModal(true);
              }}
            >
              <Edit2 size={18} />
            </button>

            <button
              className="button-delete"
              onClick={() => {
                if (window.confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
                  handleDeleteNote(note.id);
                }
              }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
