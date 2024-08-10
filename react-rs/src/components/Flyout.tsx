import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { unselectAll } from "../store/store";
import { createCSVBlob, Character } from "../utils/csvutilsnew.ts";

const Flyout: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedCharacters = useAppSelector(
    (state) => state.characters.selectedCharacters,
  );

  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  const handleDownload = () => {
    if (downloadLinkRef.current && selectedCharacters.length > 0) {
      const blob = createCSVBlob(selectedCharacters as Character[]);
      const url = URL.createObjectURL(blob);
      downloadLinkRef.current.href = url;
      downloadLinkRef.current.download = `${selectedCharacters.length}_characters.csv`;
      downloadLinkRef.current.click();
      URL.revokeObjectURL(url);
    }
  };

  if (selectedCharacters.length === 0) return null;

  return (
    <div className="flyout">
      <span>{selectedCharacters.length} items are selected</span>
      <button onClick={handleUnselectAll}>Unselect all</button>
      <button onClick={handleDownload}>Download</button>
      <a ref={downloadLinkRef} data-testid="download-link" style={{ display: "none" }}>
        Download
      </a>
    </div>
  );
};

export default Flyout;
