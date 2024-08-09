// import CharacterList from "../../components/CharacterList";
// import Sidebar from "../../components/Sidebar";

// import {
//     Link,
//   } from "@remix-run/react";

// type Character = {
//   name: string;
//   url: string;
// };

// export type SearchProps = {
//   characters: Character[];
//   query: string;
//   page: number;
//   next: string | null;
//   previous: string | null;
// };

// async function fetchCharacters(searchQuery: string, page: number) {
//   const res = await fetch(
//     `https://swapi.dev/api/people/?search=${searchQuery}&page=${page}`,
//   );
//   const data = await res.json();
//   return data;
// }

// export default async function Search({
//   searchParams,
// }: {
//   searchParams: { query: string; page: string };
// }) {
//   const query = searchParams.query || "";
//   const page = searchParams.page ? parseInt(searchParams.page) : 1;

//   const data = await fetchCharacters(query, page);

//   const { results: characters, next, previous } = data;

//   return (
//     <Sidebar>
//       <CharacterList characters={characters} page={page} query={query} />

//       <div className="pagination-cont">
//         <div className="pagination">
//           <Link to={`/search?query=${query}&page=${page - 1}`}>
//             <button disabled={!previous} className="pagination-btn">
//               Previous
//             </button>
//           </Link>
//           <Link to={`/search?query=${query}&page=${page + 1}`}>
//             <button disabled={!next} className="pagination-btn">
//               Next
//             </button>
//           </Link>
//         </div>
//       </div>
//     </Sidebar>
//   );
// }


// app/routes/search.tsx
import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import CharacterList from "../../components/CharacterList";

type Character = {
  name: string;
  url: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("query") || "";
  const page = url.searchParams.get("page") || "1";
  const res = await fetch(`https://swapi.dev/api/people/?search=${searchQuery}&page=${page}`);
  if (!res.ok) {
    throw new Response("Failed to fetch characters", { status: 500 });
  }
  const data = await res.json();
  return json({
    results: data.results,
    query: searchQuery,
    page: parseInt(page),
    next: data.next,
    previous: data.previous,
  });
};

export default function Search() {
  const { results, query, page, next, previous } = useLoaderData<{
    results: Character[];
    query: string;
    page: number;
    next: string | null;
    previous: string | null;
  }>();

  return (
    <div>
      <CharacterList characters={results} page={page} query={query} />

      <div className="pagination-cont">
        <div className="pagination">
          <Link to={`/search?query=${query}&page=${page - 1}`}>
            <button disabled={!previous} className="pagination-btn">
              Previous
            </button>
          </Link>
          <Link to={`/search?query=${query}&page=${page + 1}`}>
            <button disabled={!next} className="pagination-btn">
              Next</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
