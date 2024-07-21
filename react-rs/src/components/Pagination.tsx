import React from "react";
import { PaginationProps } from "../interfaces";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const showButtons = currentPage <= totalPages;
  const showNextButton = currentPage == totalPages;

  return (
    <div className="pagination-cont">
      <div className="pagination">
        {showButtons && (
          <>
            <button
              className="pagination-btn"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-btn"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={showNextButton}
            >
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Pagination;