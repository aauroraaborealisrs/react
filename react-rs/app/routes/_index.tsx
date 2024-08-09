import { Link, useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";
import Sidebar from "../components/Sidebar";
import CharacterList from "../components/CharacterList";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") || "";
  const page = parseInt(url.searchParams.get("page") || "1", 10);

  let apiUrl = `https://swapi.dev/api/people/?page=${page}`;
  if (query) {
    apiUrl = `https://swapi.dev/api/people/?search=${query}&page=${page}`;
  }

  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Response("Failed to fetch characters", { status: 500 });
  }

  const data = await res.json();
  return json({ data, query, page });
};

export default function Home() {
  const { data, query, page } = useLoaderData<typeof loader>();

  return (
    <Sidebar>
      <CharacterList characters={data.results} page={page} query={query} />

      <div className="pagination-cont">
        <div className="pagination">
          <Link to={`/?query=${query}&page=${page - 1}`}>
            <button disabled={page === 1} className="pagination-btn">
              Previous
            </button>
          </Link>
          <Link to={`/?query=${query}&page=${page + 1}`}>
            <button className="pagination-btn">Next</button>
          </Link>
        </div>
      </div>
    </Sidebar>
  );
}
