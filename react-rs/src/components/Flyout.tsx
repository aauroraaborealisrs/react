import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { unselectAllItems } from "../store/peopleSlice";
import { createCSVBlob } from "../csvUtils";

const Flyout: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.people.selectedItems,
  );
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  const handleUnselectAll = () => {
    dispatch(unselectAllItems());
  };

  const handleDownload = () => {
    if (downloadLinkRef.current && selectedItems.length > 0) {
      const blob = createCSVBlob(selectedItems);
      const url = URL.createObjectURL(blob);
      downloadLinkRef.current.href = url;
      downloadLinkRef.current.download = `${selectedItems.length}_characters.csv`;
      downloadLinkRef.current.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flyout">
      <span>{selectedItems.length} items are selected</span>
      <button onClick={handleUnselectAll}>Unselect all</button>
      <button onClick={handleDownload}>Download</button>
      <a ref={downloadLinkRef} style={{ display: "none" }}>
        Download
      </a>
    </div>
  );
};

export default Flyout;
