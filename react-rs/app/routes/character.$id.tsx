import { useLoaderData, Link } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";
import Sidebar from "../components/Sidebar";
import CharacterDetail from "../components/CharacterDetail";
import CharacterList from "../components/CharacterList";

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
  
  if (!id) {
    throw new Response("Character ID not found", { status: 404 });
  }

  const resCharacter = await fetch(`https://swapi.dev/api/people/${id}`);
  const character = await resCharacter.json();

  const resCharacters = await fetch(`https://swapi.dev/api/people/?search=${query}&page=${page}`);
  const dataCharacters = await resCharacters.json();

  return json({ character, characters: dataCharacters.results, page: parseInt(page), query });
};

export default function CharacterPage() {
  const { character, characters, page, query } = useLoaderData<{
    character: Character;
    characters: Character[];
    page: number;
    query: string;
  }>();

  return (
    <Sidebar>
      <div className="char-page">
        <div className="details-section">
          <Link to={`/search?query=${query}&page=${page}`} className="close-btn-a">
            <button>Close</button>
          </Link>
          <CharacterDetail character={character} />
        </div>
        <CharacterList characters={characters} page={page} query={query} />
        <div className="pagination-cont">
          <div className="pagination">
            <Link to={`/search?query=${query}&page=${page - 1}`}>
              <button disabled={page === 1} className="pagination-btn">
                Previous
              </button>
            </Link>
            <Link to={`/search?query=${query}&page=${page + 1}`}>
              <button className="pagination-btn">Next</button>
            </Link>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
