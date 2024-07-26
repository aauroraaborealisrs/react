import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Character } from "../interfaces";
import { RootState } from "../store/store";
import { selectItem, unselectItem } from "../store/peopleSlice";

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
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.people.selectedItems,
  );

  const handleCheckboxChange = (person: Character, isChecked: boolean) => {
    if (isChecked) {
      dispatch(selectItem(person));
    } else {
      dispatch(unselectItem(person.name));
    }
  };

  return (
    <div className="results-section">
      {people.length === 0 ? (
        <p className="white">No one was found</p>
      ) : (
        <div className="results-cont">
          <div className="results-names">
            {people.map((person) => (
              <div key={person.name} className="result-item">
                <input
                  data-testid={`checkbox-${person.name}`}
                  className="checkbox"
                  type="checkbox"
                  checked={selectedItems.some(
                    (item) => item.name === person.name,
                  )}
                  onChange={(e) =>
                    handleCheckboxChange(person, e.target.checked)
                  }
                />
                <NavLink
                  data-testid={`link-${person.name}`}
                  to={`/?search=${searchQuery}&page=${currentPage}&details=${encodeURIComponent(person.name)}`}
                  className="active-link"
                >
                  {person.name}
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardList;
