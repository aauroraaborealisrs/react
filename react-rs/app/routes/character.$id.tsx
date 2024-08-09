import { Link, useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node"; // Импортируем тип для loader функции
import Sidebar from "../components/Sidebar";
import CharacterList from "../components/CharacterList";
import CharacterDetail from "../components/CharacterDetail";

export const loader: LoaderFunction = async ({ params, request }) => {
  const id = params.id;
  const url = new URL(request.url);
  const query = url.searchParams.get("query") || "";
  const page = parseInt(url.searchParams.get("page") || "1", 10);

  if (!id) {
    throw new Response("Character ID is missing", { status: 400 });
  }

  const [characterRes, charactersRes] = await Promise.all([
    fetch(`https://swapi.dev/api/people/${id}`),
    fetch(`https://swapi.dev/api/people/?search=${query}&page=${page}`)
  ]);

  const character = await characterRes.json();
  const dataCharacters = await charactersRes.json();

  return json({ character, dataCharacters, query, page });
};

export default function CharacterPage() {
  const { character, dataCharacters, query, page } = useLoaderData<typeof loader>();
  const { results: characters, next, previous } = dataCharacters;

  return (
    <>
      <Sidebar>
        <div style={{ display: "flex" }} className="char-page">
          <div>
            <CharacterList characters={characters} page={page} query={query} />
            <div className="pagination-cont">
              <div className="pagination">
                <Link to={`/search?query=${query}&page=${page - 1}`}>
                  <button disabled={!previous} className="pagination-btn">
                    Previous
                  </button>
                </Link>
                <Link to={`/search?query=${query}&page=${page + 1}`}>
                  <button disabled={!next} className="pagination-btn">
                    Next
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Sidebar>

      <div className="details-section">
        <Link to={`/search?query=${query}&page=${page}`} className="close-btn-a">
          <button>Close</button>
        </Link>
        <CharacterDetail character={character} />
      </div>
    </>
  );
}
