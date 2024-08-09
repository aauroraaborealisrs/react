import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import CharacterList from "../components/CharacterList";

type Character = {
  name: string;
  url: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") || "";
  const page = url.searchParams.get("page") || "1";

  if (!query) {
    return json({ results: [], query, page: parseInt(page) });
  }

  const res = await fetch(`https://swapi.dev/api/people/?search=${query}&page=${page}`);
  if (!res.ok) {
    throw new Response("Failed to fetch characters", { status: 500 });
  }

  const data = await res.json();
  return json({ results: data.results, query, page: parseInt(page) });
};

export default function SearchPage() {
  const { results, query, page } = useLoaderData<{
    results: Character[];
    query: string;
    page: number;
  }>();

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      <CharacterList characters={results} page={page} query={query} />

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
  );
}