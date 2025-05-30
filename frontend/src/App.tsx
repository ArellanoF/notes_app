import { useState, useEffect } from 'react';
import { getAllNotes, deleteNote, createNote, updateNote } from './api/note.service';
import './style/NotesMainScreen.scss';
import { DataType } from './type/types';
import { Plus } from 'lucide-react';
import LoadingSpinner from './components/LoadingSpinner';
import NotesList from './components/NotesList';
import PaginationControls from './components/PaginationControls';
import NoteModal from './components/NoteModal';
import SearchBar from './components/SearchBar';
import logoSrc from './assets/logo.png';

const getErrorMessage = (error: any): string => {
  return error.response?.data?.message || 
         error.message || 
         'Ha ocurrido un error inesperado';
};

const getSuccessMessage = (response: any, defaultMessage: string): string => {
  return response.data?.message || defaultMessage;
};

const NotesMainScreen = () => {
  const [data, setData] = useState<DataType>({
    data: [],
    current_page: 1,
    last_page: 1,
    per_page: 6,
    total: 0,
    from: 0,
    to: 0,
    links: { first: null, last: null, prev: null, next: null },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newNote, setNewNote] = useState({ title: '', text: '' });
  const perPage = 6;

  useEffect(() => {
    loadNotes(page, searchTerm);
  }, [page, searchTerm]);

  const loadNotes = (page: number, search: string = '') => {
    setLoading(true);
    setErrorMessage('');
    setStatusCode(null);
    
    getAllNotes(page, perPage, search)
      .then(({ data }) => {
        setData(data);
        setLoading(false);
      })
      .catch((e: any) => {
        const errorMsg = getErrorMessage(e);
        setStatusCode(e.response?.status || e.status || 500);
        setErrorMessage(errorMsg);
        setLoading(false);
        console.error('Error al cargar notas:', errorMsg);
      });
  };

  const handleSearch = () => {
    setSearchTerm(searchInput);
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearchTerm('');
    setPage(1);
  };

  const handleAddNote = () => {
    if (!newNote.title.trim() || !newNote.text.trim()) {
      alert('Por favor, completa todos los campos');
      return;
    }
    setShowAddModal(false);
    setLoading(true);
    setErrorMessage('');
    
    createNote(newNote)
      .then((response) => {
        const message = getSuccessMessage(response, 'Nota creada exitosamente');
        setNewNote({ title: '', text: '' });
        loadNotes(1, searchTerm);
        setPage(1);
        alert(message);
        setLoading(false);
      })
      .catch((e: any) => {
        const errorMsg = getErrorMessage(e);
        setStatusCode(e.response?.status || 500);
        setErrorMessage(errorMsg);
        setLoading(false);
        console.error('Error al crear nota:', errorMsg);
        alert(`Error al crear nota: ${errorMsg}`);
      });
  };

  const handleUpdateNote = () => {
    if (!newNote.title.trim() || !newNote.text.trim()) {
      alert('Por favor, completa todos los campos');
      return;
    }
    if (editingNoteId === null) return;
    
    setShowAddModal(false);
    setLoading(true);
    setErrorMessage('');
    
    updateNote(editingNoteId, newNote)
      .then((response) => {
        const message = getSuccessMessage(response, 'Nota actualizada exitosamente');
        setNewNote({ title: '', text: '' });
        setIsEditing(false);
        setEditingNoteId(null);
        loadNotes(1, searchTerm);
        setPage(1);
        alert(message);
        setLoading(false);
      })
      .catch((e: any) => {
        const errorMsg = getErrorMessage(e);
        setStatusCode(e.response?.status || 500);
        setErrorMessage(errorMsg);
        setLoading(false);
        console.error('Error al actualizar nota:', errorMsg);
        alert(`Error al actualizar nota: ${errorMsg}`);
      });
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setNewNote({ title: '', text: '' });
    setIsEditing(false);
    setEditingNoteId(null);
  };

  const handleDeleteNote = (id: number) => {
    setLoading(true);
    setErrorMessage('');
    
    deleteNote(id)
      .then(() => {
        setData((prevData) => ({
          ...prevData,
          data: prevData.data.filter((note) => note.id !== id),
          total: prevData.total - 1,
        }));
        setLoading(false);
      })
      .catch((e: any) => {
        const errorMsg = getErrorMessage(e);
        setStatusCode(e.response?.status || 500);
        setErrorMessage(errorMsg);
        setLoading(false);
        console.error('Error al eliminar nota:', errorMsg);
        alert(`Error al eliminar nota: ${errorMsg}`);
      });
  };

  const goToPrevPage = () => {
    if (data.links.prev && page > 1) {
      setPage(page - 1);
    }
  };

  const goToNextPage = () => {
    if (data.links.next && page < data.last_page) {
      setPage(page + 1);
    }
  };

  return (
    <div className="notes-main-screen">
      <div className="fixed-header">
        <div className="add-note-container">
          <button className="button-add" onClick={() => setShowAddModal(true)}>
            <Plus size={20} />
          </button>
        </div>
        <div className="searchLogo-container">
        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          handleSearch={handleSearch}
          searchTerm={searchTerm}
          handleClearSearch={handleClearSearch}
        />
        <div className="logo-container">
          <a href="https://www.doonamis.com/" target='_blank'><img src={logoSrc} alt="Logo" className="logo" /></a>
        </div>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <NotesList
            data={data}
            setNewNote={setNewNote}
            setEditingNoteId={(id: string | number) => setEditingNoteId(Number(id))}
            setIsEditing={setIsEditing}
            setShowAddModal={setShowAddModal}
            handleDeleteNote={(id: string | number) => handleDeleteNote(Number(id))}
          />
         {data.last_page > 1 && (
            <PaginationControls
              currentPage={data.current_page}
              lastPage={data.last_page}
              hasPrev={!!data.links.prev}
              hasNext={!!data.links.next}
              onPrev={goToPrevPage}
              onNext={goToNextPage}
            />
          )}
        </>
      )}

      {statusCode && (
        <div className="error">
          <p>Error cargando notas. Código: {statusCode}</p>
          {errorMessage && <p>Mensaje: {errorMessage}</p>}
        </div>
      )}

      <NoteModal
        show={showAddModal}
        onClose={handleCloseModal}
        newNote={newNote}
        setNewNote={setNewNote}
        isEditing={isEditing}
        onSave={isEditing ? handleUpdateNote : handleAddNote}
      />
    </div>
  );
};

export default NotesMainScreen;