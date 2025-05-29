import { NoteModalProps } from "../type/types";

const NoteModal: React.FC<NoteModalProps> = ({
  show,
  onClose,
  newNote,
  setNewNote,
  isEditing,
  onSave,
}) => {
  if (!show) return null;

  const handleOverlayClick = () => onClose();
  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={stopPropagation}>
        <div className="modal-header">
          <h2>{isEditing ? 'Editar Nota' : 'Agregar Nueva Nota'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="note-title">Título:</label>
            <input
              id="note-title"
              type="text"
              placeholder="Título de la nota..."
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="note-text">Contenido:</label>
            <textarea
              id="note-text"
              placeholder="Escribe el contenido de tu nota..."
              value={newNote.text}
              onChange={(e) => setNewNote({ ...newNote, text: e.target.value })}
              rows={6}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="button-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="button-save" onClick={onSave}>
            {isEditing ? 'Actualizar Nota' : 'Guardar Nota'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;