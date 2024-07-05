import React from "react";
import "./App.css";
import SearchSection from "./SearchSection";
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
          throw new Error("Шот пошло не так");
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
              <div key={character.url} className="character">
                <h3>{character.name}</h3>
                <p>Height: {character.height}</p>
                <p>Mass: {character.mass}</p>
                <p>Gender: {character.gender}</p>
                <p>Birth Year: {character.birth_year}</p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default App;
