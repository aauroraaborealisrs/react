import Link from "next/link";
import CharacterList from "../../components/CharacterList";
import Sidebar from "../../components/Sidebar";

type Character = {
  name: string;
  url: string;
};

export type SearchProps = {
  characters: Character[];
  query: string;
  page: number;
  next: string | null;
  previous: string | null;
};

async function fetchCharacters(searchQuery: string, page: number) {
  const res = await fetch(
    `https://swapi.dev/api/people/?search=${searchQuery}&page=${page}`,
  );
  const data = await res.json();
  return data;
}

export default async function Search({
  searchParams,
}: {
  searchParams: { query: string; page: string };
}) {
  const query = searchParams.query || "";
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const data = await fetchCharacters(query, page);

  const { results: characters, next, previous } = data;

  return (
    <Sidebar>
      <CharacterList characters={characters} page={page} query={query} />

      <div className="pagination-cont">
        <div className="pagination">
          <Link href={`/search?query=${query}&page=${page - 1}`}>
            <button disabled={!previous} className="pagination-btn">
              Previous
            </button>
          </Link>
          <Link href={`/search?query=${query}&page=${page + 1}`}>
            <button disabled={!next} className="pagination-btn">
              Next
            </button>
          </Link>
        </div>
      </div>
    </Sidebar>
  );
}
