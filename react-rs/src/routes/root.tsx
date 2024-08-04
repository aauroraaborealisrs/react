// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// // import { useSearchParams } from "react-router-dom";
// import { RootState, AppDispatch } from "../store/store";
// import SearchSection from "../components/SearchSection";
// import CardList from "../components/CardList";
// import Pagination from "../components/Pagination";
// import Flyout from "../components/Flyout";
// import ProfilePage from "../components/ProfilePage";
// import {
//   setSearchTerm,
//   setStoredSearchTerm,
//   setCurrentPage,
//   setPeople,
//   setTotalPages,
// } from "../store/peopleSlice";
// import { useGetPeopleQuery } from "../services/api";
// import ThemeSelector from "../components/ThemeSelector";

// const Root: React.FC = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const {
//     searchTerm,
//     people,
//     totalPages,
//     currentPage,
//     storedSearchTerm,
//     selectedItems,
//   } = useSelector((state: RootState) => state.people);
//   // const [searchParams, setSearchParams] = useSearchParams();
//   const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
//   const detailsFromUrl = searchParams.get("details");
//   const searchQuery = searchParams.get("search") || "";

//   const { data, isLoading, isError, error } = useGetPeopleQuery({
//     searchQuery,
//     page: currentPage,
//   });

//   useEffect(() => {
//     dispatch(setCurrentPage(pageFromUrl));
//   }, [pageFromUrl, dispatch]);

//   useEffect(() => {
//     if (isError) {
//       console.error(error);
//     } else if (data) {
//       dispatch(setPeople(data.results));
//       dispatch(setTotalPages(Math.ceil(data.count / 10)));
//     }
//   }, [data, isError, error, dispatch]);

//   const handleInputChange = (term: string) => {
//     dispatch(setSearchTerm(term));
//   };

//   const handleSearch = () => {
//     const trimmedSearchTerm = searchTerm.trim();
//     if (trimmedSearchTerm) {
//       setSearchParams({ search: trimmedSearchTerm, page: "1" });
//       dispatch(setStoredSearchTerm(trimmedSearchTerm));
//     } else {
//       setSearchParams({ page: "1" });
//       dispatch(setStoredSearchTerm(""));
//     }
//     dispatch(setCurrentPage(1));
//   };

//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       dispatch(setCurrentPage(page));
//       setSearchParams({ search: searchTerm.trim(), page: page.toString() });
//     }
//   };

//   const handleCloseDetails = () => {
//     setSearchParams({ search: searchQuery, page: currentPage.toString() });
//   };

//   useEffect(() => {
//     dispatch(setSearchTerm(storedSearchTerm));
//   }, [storedSearchTerm, dispatch]);

//   return (
//     <div className="app">
//       <ThemeSelector />
//       <div className="column sidebar">
//         <SearchSection
//           searchTerm={searchTerm}
//           onSearchTermChange={handleInputChange}
//           onSearch={handleSearch}
//         />
//         {isLoading ? (
//           <>
//             <div className="loader-text">Loading...</div>
//             <div className="loader"></div>
//           </>
//         ) : isError ? (
//           <p className="error">{error.toString()}</p>
//         ) : (
//           <CardList
//             people={people}
//             searchQuery={searchQuery}
//             currentPage={currentPage}
//           />
//         )}
//       </div>
//       <div className="hide-div" onClick={handleCloseDetails}></div>
//       {detailsFromUrl && (
//         <div className="details-section">
//           <button className="close-btn" onClick={handleCloseDetails}>
//             Close
//           </button>
//           <ProfilePage name={detailsFromUrl} />
//         </div>
//       )}
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={handlePageChange}
//       />
//       {selectedItems.length > 0 && <Flyout />}
//     </div>
//   );
// };

// export default Root;
