import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import SearchSection from "./components/SearchSection";
import Pagination from "./components/Pagination";
import useSearchTerm from "./hooks/useSearchTerm";
import { Character } from "./interfaces";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ProfilePage from "./components/ProfilePage";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useSearchTerm("searchTerm");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const detailsFromUrl = searchParams.get("details");

  useEffect(() => {
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl]);

  const fetchCharacters = useCallback(() => {
    setLoading(true);
    const query = searchTerm.trim() ? `?search=${searchTerm.trim()}&page=${currentPage}` : `?page=${currentPage}`;

    fetch(`https://swapi.dev/api/people/${query}`)
      .then((response) => {
        if (!response.ok) {
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
    navigate(`/?page=1`);
  };

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm) {
      setCurrentPage(1);
      navigate(`/?page=1`);
      fetchCharacters();
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      navigate(`/?page=${page}`);
    }
  };

  const handleCloseDetails = () => {
    navigate(`/?page=${currentPage}`);
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
          <div className="results-cont">
            <div className="results-names">
              {characters.map((character) => (
                <NavLink
                  key={character.name}
                  to={`/?page=${currentPage}&details=${character.name}`}
                  className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
                >
                  {character.name}
                </NavLink>
              ))}
            </div>
            {detailsFromUrl && (
              <div className="details-section">
                <button className="close-btn" onClick={handleCloseDetails}>Close</button>
                <ProfilePage name={detailsFromUrl} />
              </div>
            )}
          </div>
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
