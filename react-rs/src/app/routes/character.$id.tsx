// import React, { Suspense } from "react";
// import Sidebar from "../../components/Sidebar";
// import CharacterList from "../../components/CharacterList";
// import CharacterDetail from "../../components/CharacterDetail";
// import Loading from "../../components/Loading";

// import {
//   Link,
// } from "@remix-run/react";

// type CharacterPageProps = {
//   params: { id: string };
//   searchParams: { page: string; query: string };
// };

// async function fetchCharacter(id: string) {
//   const resCharacter = await fetch(`https://swapi.dev/api/people/${id}`);
//   return resCharacter.json();
// }

// async function fetchCharacters(query: string, page: number) {
//   const resCharacters = await fetch(
//     `https://swapi.dev/api/people/?search=${query}&page=${page}`,
//   );
//   return resCharacters.json();
// }

// export default async function CharacterPage({
//   params,
//   searchParams,
// }: CharacterPageProps) {
//   const { id } = params;
//   const query = searchParams.query || "";
//   const page = searchParams.page ? parseInt(searchParams.page) : 1;

//   if (!id) {
//     return <div>Character ID is missing</div>;
//   }

//   const character = await fetchCharacter(id);
//   const dataCharacters = await fetchCharacters(query, page);
//   const { results: characters, next, previous } = dataCharacters;

//   return (
//     <>
//       <Sidebar>
//         <div style={{ display: "flex" }} className="char-page">
//           <div>
//             <CharacterList characters={characters} page={page} query={query} />
//             <div className="pagination-cont">
//               <div className="pagination">
//                 <Link to={`/search?query=${query}&page=${page - 1}`}>
//                   <button disabled={!previous} className="pagination-btn">
//                     Previous
//                   </button>
//                 </Link>
//                 <Link to={`/search?query=${query}&page=${page + 1}`}>
//                   <button disabled={!next} className="pagination-btn">
//                     Next
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Sidebar>

//       <Suspense fallback={<Loading />}>
//         <div className="details-section">
//           <Link
//             to={`/search?query=${query}&page=${page}`}
//             className="close-btn-a"
//           >
//             <button>Close</button>
//           </Link>
//           <CharacterDetail character={character} />
//         </div>
//       </Suspense>
//     </>
//   );
// }


// app/routes/character.$id.tsx
import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import CharacterDetail from "../../components/CharacterDetail";
import CharacterList from "../../components/CharacterList";

type Character = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  url: string;
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const id = params.id;
  const url = new URL(request.url);
  const query = url.searchParams.get("query") || "";
  const page = url.searchParams.get("page") || "1";

  const resCharacter = await fetch(`https://swapi.dev/api/people/${id}`);
  if (!resCharacter.ok) {
    throw new Response("Character not found", { status: 404 });
  }
  const character = await resCharacter.json();

  const resCharacters = await fetch(`https://swapi.dev/api/people/?search=${query}&page=${page}`);
  const dataCharacters = await resCharacters.json();

  return json({
    character,
    characters: dataCharacters.results,
    page: parseInt(page),
    next: dataCharacters.next,
    previous: dataCharacters.previous,
    query,
  });
};

export default function CharacterPage() {
  const { character, characters, page, next, previous, query } = useLoaderData<{
    character: Character;
    characters: Character[];
    page: number;
    next: string | null;
    previous: string | null;
    query: string;
  }>();

  return (
    <div>
      <CharacterList characters={characters} page={page} query={query} />

      <div className="pagination-cont">
        <div className="pagination">
          <Link to={`/search?query=${query}&page=${page - 1}`} >
            <button disabled={!previous} className="pagination-btn">
              Previous
            </button>
          </Link>
          <Link to={`/search?query=${query}&page=${page + 1}`} >
            <button disabled={!next} className="pagination-btn">
              Next
            </button>
          </Link>
        </div>
      </div>

      <div className="details-section">
        <Link to={`/search?query=${query}&page=${page}`} className="close-btn-a">
          <button>Close</button>
        </Link>
        <CharacterDetail character={character} />
      </div>
    </div>
  );
}
