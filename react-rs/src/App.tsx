import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import SearchSection from "./components/SearchSection";
import CharacterCard from "./components/CharacterCard";
import Pagination from "./components/Pagination";
import useSearchTerm from "./hooks/useSearchTerm";
import { Character } from "./interfaces";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useSearchTerm("searchTerm");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchCharacters = useCallback(() => {
    setLoading(true);
    const query = searchTerm.trim() ? `?search=${searchTerm.trim()}&page=${currentPage}` : `?page=${currentPage}`;

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
        setTotalPages(Math.ceil(data.count / 10));
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTerm, currentPage]);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  const handleInputChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm) {
      setCurrentPage(1); 
      fetchCharacters();
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
