import { Link, useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node"; 
import Sidebar from "../components/Sidebar";
import CharacterList from "../components/CharacterList";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") || "";
  const page = parseInt(url.searchParams.get("page") || "1", 10);

  const res = await fetch(`https://swapi.dev/api/people/?search=${query}&page=${page}`);
  const data = await res.json();

  return json({ data, query, page });
};

export default function Search() {
  const { data, query, page } = useLoaderData<typeof loader>();

  const { results: characters, next, previous } = data;

  return (
    <Sidebar>
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
    </Sidebar>
  );
}
