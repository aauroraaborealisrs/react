import React from "react";
import { SearchSectionProps } from "../interfaces";

const SearchSection: React.FC<SearchSectionProps> = ({
  searchTerm,
  onSearchTermChange,
  onSearch,
}) => {
  return (
    <div className="search-section">
      <input
        className="search-input"
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default SearchSection;
