import React from "react";
import { SearchSectionProps } from "../interfaces";

class SearchSection extends React.Component<SearchSectionProps> {
  render() {
    const { searchTerm, onSearchTermChange, onSearch } = this.props;
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
  }
}

export default SearchSection;
