import React from "react";
import { NavLink } from "react-router-dom";
import { Character } from "../interfaces";

interface CardProps {
  person: Character;
  searchQuery: string;
  currentPage: number;
}

const Card: React.FC<CardProps> = ({ person, searchQuery, currentPage }) => {
  const handleClick = async () => {
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${person.name}`,
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <NavLink
      key={person.name}
      to={`/?search=${searchQuery}&page=${currentPage}&details=${encodeURIComponent(person.name)}`}
      className="active-link"
      onClick={handleClick}
    >
      {person.name}
    </NavLink>
  );
};

export default Card;
