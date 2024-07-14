import React from "react";
import { NavLink } from "react-router-dom";
import { Character } from "../interfaces";

interface CardListProps {
  people: Character[];
  searchQuery: string;
  currentPage: number;
}

const CardList: React.FC<CardListProps> = ({
  people,
  searchQuery,
  currentPage,
}) => {
  return (
    <div className="results-section">
      {people.length === 0 ? (
        <p className="white">No one was found</p>
      ) : (
        <div className="results-cont">
          <div className="results-names">
            {people.map((person) => (
              <NavLink
                key={person.name}
                to={`/?search=${searchQuery}&page=${currentPage}&details=${encodeURIComponent(person.name)}`}
                className="active-link"
              >
                {person.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardList;
