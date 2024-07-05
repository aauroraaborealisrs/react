import React from "react";
import "./App.css";
import SearchSection from "./SearchSection";
import CharacterCard from "./CharacterCard";
import { AppState } from "./interfaces";

class App extends React.Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    const savedSearchTerm = localStorage.getItem("searchTerm") || "";
    this.state = {
      searchTerm: savedSearchTerm,
      characters: [],
      error: null,
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchCharacters();
  }

  fetchCharacters = () => {
    this.setState({ loading: true });
    const { searchTerm } = this.state;
    const query = searchTerm.trim() ? `?search=${searchTerm.trim()}` : "";

    fetch(`https://swapi.dev/api/people/${query}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ characters: data.results || [], error: null });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  handleInputChange = (term: string) => {
    this.setState({ searchTerm: term });
  };

  handleSearch = () => {
    const { searchTerm } = this.state;
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm) {
      localStorage.setItem("searchTerm", trimmedSearchTerm);
      this.fetchCharacters();
    }
  };

  render() {
    const { searchTerm, characters, error, loading } = this.state;

    return (
      <div className="app">
        <SearchSection
          searchTerm={searchTerm}
          onSearchTermChange={this.handleInputChange}
          onSearch={this.handleSearch}
        />
        <div className="results-section">
          {loading ? (
            <div className="loader">Loading...</div>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            characters.map((character) => (
              <CharacterCard key={character.url} character={character} />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default App;
