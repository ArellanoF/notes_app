import { PaginationControlsProps } from '../type/types';

const PaginationControls = ({
  currentPage,
  lastPage,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: PaginationControlsProps) => (
  <div className="pagination-controls">
    <button className="button-pagination" onClick={onPrev} disabled={!hasPrev}>
      Anterior
    </button>
    <span>
      Página {currentPage} de {lastPage}
    </span>
    <button className="button-pagination" onClick={onNext} disabled={!hasNext}>
      Siguiente
    </button>
  </div>
);

export default PaginationControls;
