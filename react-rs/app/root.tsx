// // export default function Root(){
// //     return <><h1> wtf</h1></>
// // }

// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useSearchParams } from "react-router-dom";
// import { AppDispatch, RootState } from "../src/store/store";
// import { useGetPeopleQuery } from "../src/services/api";
// import { setCurrentPage, setPeople, setSearchTerm, setStoredSearchTerm, setTotalPages } from "../src/store/peopleSlice";
// import ThemeSelector from "../src/components/ThemeSelector";
// import SearchSection from "../src/components/SearchSection";
// import CardList from "../src/components/CardList";
// import Pagination from "../src/components/Pagination";
// import ProfilePage from "../src/components/ProfilePage";
// import Flyout from "../src/components/Flyout";


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
//   const [searchParams, setSearchParams] = useSearchParams();
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


// import * as React from "react";
// import * as ReactDOM from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "../src/index.css";
// import { Provider } from "react-redux";
// import { ThemeProvider } from "../src/ThemeContext";
// import store from "../src/store/store";
// import ErrorBoundary from "../src/components/errorBoundary";
// import Root from "../src/routes/root";
// import ErrorPage from "../src/components/error-page";


// const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Root />,
//       errorElement: <ErrorPage />,
//       children: [
//         {
//           errorElement: <ErrorPage />,
//         },
//       ],
//     },
//   ]);
  
//   const container = document.getElementById("root");
//   if (container !== null) {
//     ReactDOM.createRoot(container).render(
//       <React.StrictMode>
//         <ThemeProvider>
//           <Provider store={store}>
//             <ErrorBoundary>
//               <RouterProvider router={router} />
//             </ErrorBoundary>
//           </Provider>
//         </ThemeProvider>
//       </React.StrictMode>,
//     );
//   } else {
//     console.error('Element with id "root" not found');
//   }
  

import {
    Links,
    Meta
  } from "@remix-run/react";
  
  export default function Root() {
    return (
      <html lang="en">
        <head>
          <Links />
          <Meta />
        </head>
        <body>
          test
        </body>
      </html>
    );
  }
  