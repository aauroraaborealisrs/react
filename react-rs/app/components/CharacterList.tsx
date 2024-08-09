import React from "react";
import { Link } from "@remix-run/react";
import { toggleCharacterSelection, useAppDispatch, useAppSelector } from "../store/store";

type Character = {
  name: string;
  url: string;
};

type CharacterListProps = {
  characters: Character[];
  page: number;
  query: string;
};

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  page,
  query,
}) => {
  const dispatch = useAppDispatch();
  const selectedCharacters = useAppSelector(
    (state) => state.characters.selectedCharacters,
  );

  const handleCheckboxChange = (character: Character) => {
    dispatch(toggleCharacterSelection(character));
  };

  const isSelected = (character: Character) =>
    selectedCharacters.some((c) => c.url === character.url);

  return (
    <ul>
      {characters.map((character) => (
        <li key={character.url}>
          <label className="result-item">
            <input
              type="checkbox"
              className="checkbox"
              checked={isSelected(character)}
              onChange={() => handleCheckboxChange(character)}
            />
            <Link
              className="active-link active"
              to={`/character/${character.url.split("/")[5]}?query=${query}&page=${page}`}
            >
              {character.name}
            </Link>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default CharacterList;