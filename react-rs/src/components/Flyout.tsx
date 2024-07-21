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
