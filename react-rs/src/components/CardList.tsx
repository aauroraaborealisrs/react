import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Character } from '../interfaces';
import { RootState } from '../store/store';
import { selectItem, unselectItem } from '../store/peopleSlice';

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
  const selectedItems = useSelector((state: RootState) => state.people.selectedItems);

  const handleCheckboxChange = (name: string, isChecked: boolean) => {
    if (isChecked) {
      dispatch(selectItem(name));
    } else {
      dispatch(unselectItem(name));
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
                  className="checkbox"
                  type="checkbox"
                  checked={selectedItems.includes(person.name)}
                  onChange={(e) => handleCheckboxChange(person.name, e.target.checked)}
                />
                <NavLink
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
