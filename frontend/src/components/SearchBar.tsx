import React from 'react';
import { Search, CircleX  } from 'lucide-react';
import { SearchBarProps } from '../interfaces/interface';

const SearchBar: React.FC<SearchBarProps> = ({
  searchInput,
  setSearchInput,
  handleSearch,
  searchTerm,
  handleClearSearch,
}) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar notas..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <button className="button-search" onClick={handleSearch}>
        <Search size={24} />
      </button>
      {searchTerm && (
        <button className="button-clear" onClick={handleClearSearch}>
          <CircleX  size={24} />
        </button>
      )}
    </div>
  );
};

export default React.memo(SearchBar);