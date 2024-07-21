// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../store/store';
// import { unselectAllItems } from '../store/peopleSlice';
// import { saveAs } from 'file-saver';
// import { Character } from '../interfaces';

// const Flyout: React.FC = () => {
//   const dispatch = useDispatch();
//   const selectedItems = useSelector((state: RootState) => state.people.selectedItems);

//   const handleUnselectAll = () => {
//     dispatch(unselectAllItems());
//   };

//   const handleDownload = () => {
//     const csvContent = selectedItems.map((item: Character) => ({
//       name: item.name,
//       height: item.height,
//       mass: item.mass,
//       hair_color: item.hair_color,
//       skin_color: item.skin_color,
//       eye_color: item.eye_color,
//       birth_year: item.birth_year,
//       gender: item.gender,
//     }));

//     const csvString = [
//       ["name", "height", "mass", "hair_color", "skin_color", "eye_color", "birth_year", "gender"],
//       ...csvContent.map(item => [item.name, item.height, item.mass, item.hair_color, item.skin_color, item.eye_color, item.birth_year, item.gender])
//     ].map(e => e.join(",")).join("\n");

//     const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
//     saveAs(blob, `${selectedItems.length}_characters.csv`);
//   };

//   return (
//     <div className="flyout">
//       <p>{selectedItems.length} items are selected</p>
//       <button onClick={handleUnselectAll}>Unselect all</button>
//       <button onClick={handleDownload}>Download</button>
//     </div>
//   );
// };

// export default Flyout;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { unselectAllItems } from "../store/peopleSlice";
import { downloadCSV } from "../csvUtils";

const Flyout: React.FC = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.people.selectedItems,
  );

  const handleUnselectAll = () => {
    dispatch(unselectAllItems());
  };

  const handleDownload = () => {
    const fileName = `${selectedItems.length}_characters`;
    downloadCSV(selectedItems, fileName);
  };

  return (
    <div className="flyout">
      <p>{selectedItems.length} items are selected</p>
      <div>
        <button onClick={handleUnselectAll}>Unselect all</button>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
};

export default Flyout;
