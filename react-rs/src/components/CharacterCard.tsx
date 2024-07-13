import React from "react";
import { CharacterCardProps } from "../interfaces";

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div className="character">
      <h3>{character.name}</h3>
      <p>Height: {character.height}</p>
      <p>Mass: {character.mass}</p>
      <p>Gender: {character.gender}</p>
      <p>Birth Year: {character.birth_year}</p>
    </div>
  );
};

export default CharacterCard;
