import { Link, useLoaderData, useSubmit, Form } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useState } from "react";
import CharacterList from "../components/CharacterList";

type Character = {
  name: string;
  url: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") || "";
  const page = url.searchParams.get("page") || "1";

  const res = await fetch(`https://swapi.dev/api/people/?search=${query}&page=${page}`);
  if (!res.ok) {
    throw new Response("Failed to fetch characters", { status: 500 });
  }

  const data = await res.json();
  return json({ results: data.results, query, page: parseInt(page) });
};

export default function Index() {
  const { results, query, page } = useLoaderData<{
    results: Character[];
    query: string;
    page: number;
  }>();
  const [searchInput, setSearchInput] = useState(query);
  const submit = useSubmit();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("query", searchInput);
    submit(formData, { method: "get" });
  };

  return (
    <div>
      <Form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          name="query"
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="Search characters..."
          className="search-input"
        />
        <button type="submit" className="sub-b">
          Search
        </button>
      </Form>

      <CharacterList characters={results} page={page} query={searchInput} />

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
    </div>
  );
}
