import React from "react";
import Link from "next/link";
import Sidebar from "../../../components/Sidebar";
import CharacterList from "../../../components/CharacterList";
import CharacterDetail from "../../../components/CharacterDetail";


type CharacterPageProps = {
  params: { id: string };
  searchParams: { page: string; query: string };
};

async function fetchCharacter(id: string) {
  const resCharacter = await fetch(`https://swapi.dev/api/people/${id}`);
  return resCharacter.json();
}

async function fetchCharacters(query: string, page: number) {
  const resCharacters = await fetch(
    `https://swapi.dev/api/people/?search=${query}&page=${page}`,
  );
  return resCharacters.json();
}

export default async function CharacterPage({
  params,
  searchParams,
}: CharacterPageProps) {
  const { id } = params;
  const query = searchParams.query || "";
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  if (!id) {
    return <div>Character ID is missing</div>;
  }

  const character = await fetchCharacter(id);
  const dataCharacters = await fetchCharacters(query, page);
  const { results: characters, next, previous } = dataCharacters;

  return (
    <>
      <Sidebar>
        <div style={{ display: "flex" }} className="char-page">
          <div>
            <CharacterList characters={characters} page={page} query={query} />
            <div className="pagination-cont">
              <div className="pagination">
                <Link href={`/search?query=${query}&page=${page - 1}`} passHref>
                  <button disabled={!previous} className="pagination-btn">
                    Previous
                  </button>
                </Link>
                <Link href={`/search?query=${query}&page=${page + 1}`} passHref>
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
        <Link
          href={`/search?query=${query}&page=${page}`}
          passHref
          className="close-btn-a"
        >
          <button>Close</button>
        </Link>
        <CharacterDetail character={character} />
      </div>
    </>
  );
}
