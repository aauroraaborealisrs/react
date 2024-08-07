import React from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { unselectAll } from "../store/store";
import { createCSVBlob, Character } from "../utils/csvutils.ts";

const Flyout: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedCharacters = useAppSelector(
    (state) => state.characters.selectedCharacters,
  );

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  const handleDownload = () => {
    const blob = createCSVBlob(selectedCharacters as Character[]);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedCharacters.length}_characters.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (selectedCharacters.length === 0) return null;

  return (
    <div className="flyout">
      <span>{selectedCharacters.length} items are selected</span>
      <button onClick={handleUnselectAll}>Unselect all</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Flyout;
