export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

export interface AppState {
  searchTerm: string;
  characters: Character[];
  error: string | null;
  loading: boolean;
}

export interface SearchSectionProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onSearch: () => void;
}

export interface ComponentProps {}

export interface ComponentState {
  hasErrorOccurred: boolean;
}

export interface Props {
  children: React.ReactNode;
}

export interface State {
  hasError: boolean;
}

export interface CharacterCardProps {
  character: Character;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
