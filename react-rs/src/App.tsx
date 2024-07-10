import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import SearchSection from "./components/SearchSection";
import CharacterCard from "./components/CharacterCard";
import useSearchTerm from "./useSearchTerm";
import { ComponentProps, Character } from "./interfaces";

const App: React.FC<ComponentProps> = () => {
  const [searchTerm, setSearchTerm] = useSearchTerm("searchTerm");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCharacters = useCallback(() => {
    setLoading(true);
    const query = searchTerm.trim() ? `?search=${searchTerm.trim()}` : "";

    fetch(`https://swapi.dev/api/people/${query}`)
      .then((response) => {
        if (!response.ok) {
          console.error("Network response was not ok");
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCharacters(data.results || []);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTerm]);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  const handleInputChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm) {
      setSearchTerm(trimmedSearchTerm);
      fetchCharacters();
    }
  };

  return (
    <div className="app">
      <SearchSection
        searchTerm={searchTerm}
        onSearchTermChange={handleInputChange}
        onSearch={handleSearch}
      />
      <div className="results-section">
        {loading ? (
          <>
            <div className="loader-text">Loading...</div>
            <div className="loader"></div>
          </>
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
};

export default App;
