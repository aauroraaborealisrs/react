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
  const page = url.searchParams.get("page") || "1";
  const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  if (!res.ok) {
    throw new Response("Failed to fetch characters", { status: 500 });
  }
  const data = await res.json();
  return json({ results: data.results, page: parseInt(page) });
};

export default function Index() {
  const { results, page } = useLoaderData<{ results: Character[]; page: number }>();

  return (
    <div>
      <CharacterList characters={results} page={page} query={""} />

      <div className="pagination-cont">
        <div className="pagination">
          <Link to={`/?page=${page - 1}`}>
            <button disabled={page === 1} className="pagination-btn">
              Previous
            </button>
          </Link>
          <Link to={`/?page=${page + 1}`}>
            <button className="pagination-btn">Next</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
