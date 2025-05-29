export interface PaginatorInterface {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: [];
  next_page_url: string;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface SearchBarProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  handleSearch: () => void;
  searchTerm: string;
  handleClearSearch: () => void;
}