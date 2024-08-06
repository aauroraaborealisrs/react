// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useRouter } from "next/router";
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
// import { useTheme } from "../useTheme";

// const Home: React.FC = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const {
//     searchTerm,
//     people,
//     totalPages,
//     currentPage,
//     storedSearchTerm,
//     selectedItems,
//   } = useSelector((state: RootState) => state.people);
//   const router = useRouter();
//   const pageFromUrl = parseInt((router.query.page as string) || "1", 10);
//   const detailsFromUrl = router.query.details as string;
//   const searchQuery = (router.query.search as string) || "";

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
//       router.push({ query: { search: trimmedSearchTerm, page: "1" } });
//       dispatch(setStoredSearchTerm(trimmedSearchTerm));
//     } else {
//       router.push({ query: { page: "1" } });
//       dispatch(setStoredSearchTerm(""));
//     }
//     dispatch(setCurrentPage(1));
//   };

//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       dispatch(setCurrentPage(page));
//       router.push({
//         query: { search: searchTerm.trim(), page: page.toString() },
//       });
//     }
//   };

//   const handleCloseDetails = () => {
//     router.push({
//       query: { search: searchQuery, page: currentPage.toString() },
//     });
//   };

//   useEffect(() => {
//     dispatch(setSearchTerm(storedSearchTerm));
//   }, [storedSearchTerm, dispatch]);

//   const { theme } = useTheme();

//   return (
//     <div className={`app theme-${theme}`}>
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

// export default Home;

// // pages/index.tsx
// import { GetServerSideProps } from 'next';
// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useRouter } from 'next/router';
// import { RootState, AppDispatch } from '../store/store';
// import SearchSection from '../components/SearchSection';
// import CardList from '../components/CardList';
// import Pagination from '../components/Pagination';
// import Flyout from '../components/Flyout';
// import { setSearchTerm, setStoredSearchTerm, setCurrentPage, setPeople, setTotalPages } from '../store/peopleSlice';
// import { useGetPeopleQuery } from '../services/api';
// import { useTheme } from '../useTheme';
// import ThemeSelector from '../components/ThemeSelector';
// import ProfilePage from '../components/ProfilePage';

// const Home: React.FC = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const { searchTerm, people, totalPages, currentPage, storedSearchTerm, selectedItems } = useSelector((state: RootState) => state.people);
//   const router = useRouter();
//   const pageFromUrl = parseInt(router.query.page as string || '1', 10);
//   const detailsFromUrl = router.query.details as string;
//   const searchQuery = router.query.search as string || '';

//   const { data, isLoading, isError, error } = useGetPeopleQuery({ searchQuery, page: currentPage });

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
//       router.push({ query: { search: trimmedSearchTerm, page: '1' } });
//       dispatch(setStoredSearchTerm(trimmedSearchTerm));
//     } else {
//       router.push({ query: { page: '1' } });
//       dispatch(setStoredSearchTerm(''));
//     }
//     dispatch(setCurrentPage(1));
//   };

//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       dispatch(setCurrentPage(page));
//       router.push({ query: { search: searchTerm.trim(), page: page.toString() } });
//     }
//   };

//   const handleCloseDetails = () => {
//     router.push({ query: { search: searchQuery, page: currentPage.toString() } });
//   };

//   useEffect(() => {
//     dispatch(setSearchTerm(storedSearchTerm));
//   }, [storedSearchTerm, dispatch]);

//   const { theme, toggleTheme } = useTheme();

//   return (
//     <div className={`app theme-${theme}`}>
//       <ThemeSelector />
//       <button onClick={toggleTheme}>Toggle Theme</button>
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

// export default Home;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const searchQuery = context.query.search as string || '';
//   const currentPage = parseInt(context.query.page as string || '1', 10);

//   const response = await fetch(`https://swapi.dev/api/people/?search=${searchQuery}&page=${currentPage}`);
//   const data = await response.json();

//   return {
//     props: {
//       initialData: data,
//       initialPage: currentPage,
//       initialSearchQuery: searchQuery,
//     },
//   };
// };


// pages/index.tsx
import { GetServerSideProps } from 'next';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState, AppDispatch } from '../store/store';
import SearchSection from '../components/SearchSection';
import CardList from '../components/CardList';
import Pagination from '../components/Pagination';
import Flyout from '../components/Flyout';
import { setSearchTerm, setCurrentPage, setPeople, setTotalPages } from '../store/peopleSlice';
import ThemeSelector from '../components/ThemeSelector';

interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

interface InitialData {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: Person[];
}

interface HomeProps {
  initialData: InitialData;
  initialPage: number;
  initialSearchQuery: string;
}

const Home: React.FC<HomeProps> = ({ initialData, initialPage, initialSearchQuery }) => {
  const dispatch: AppDispatch = useDispatch();
  const { searchTerm, people, totalPages, currentPage, storedSearchTerm, selectedItems } = useSelector((state: RootState) => state.people);
  const router = useRouter();

  useEffect(() => {
    console.log('Initial Data:', initialData);
    dispatch(setPeople(initialData.results));
    dispatch(setTotalPages(Math.ceil(initialData.count / 10)));
    dispatch(setCurrentPage(initialPage));
    dispatch(setSearchTerm(initialSearchQuery));
  }, [dispatch, initialData, initialPage, initialSearchQuery]);

  const handleSearch = () => {
    router.push(`/?search=${searchTerm}&page=1`);
  };

  const handlePageChange = (newPage: number) => {
    router.push(`/?search=${storedSearchTerm}&page=${newPage}`);
  };

  return (
    <div>
      <ThemeSelector />
      <SearchSection
        searchTerm={searchTerm}
        onSearchTermChange={(term) => dispatch(setSearchTerm(term))}
        onSearch={handleSearch}
      />
      {currentPage > 0 && (
        <>
          <CardList
            people={people}
            searchQuery={storedSearchTerm}
            currentPage={currentPage}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
      {/* <Flyout selectedItems={selectedItems} /> */}
      {selectedItems.length > 0 && <Flyout />}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const searchQuery = context.query.search || '';
  const page = context.query.page ? parseInt(context.query.page as string, 10) : 1;

  const response = await fetch(`https://swapi.dev/api/people/?search=${searchQuery}&page=${page}`);
  const data = await response.json();

  return {
    props: {
      initialData: data,
      initialPage: page,
      initialSearchQuery: searchQuery,
    },
  };
};

export default Home;
