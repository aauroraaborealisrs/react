import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import CharacterDetail from "../../components/CharacterDetail";
import CharacterList from "../../components/CharacterList";
import Link from "next/link";

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

type CharacterPageProps = {
  character: Character;
  characters: Character[];
  page: number;
  next: string | null;
  previous: string | null;
  query: string;
};

const CharacterPage = ({
  character,
  characters,
  page,
  next,
  previous,
  query,
}: CharacterPageProps) => {
  console.log(
    `Character details for ${character.name}, page: ${page}, query: ${query}`,
  );

  return (
    <>
      <Layout>
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
      </Layout>

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
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  const page = context.query.page ? parseInt(context.query.page as string) : 1;
  const query = context.query.query || "";

  if (!id) {
    throw new Error("ID parameter is missing");
  }

  console.log(`Fetching character ${id}, page: ${page}, query: ${query}`);

  const resCharacter = await fetch(`https://swapi.dev/api/people/${id}`);
  const character = await resCharacter.json();

  const resCharacters = await fetch(
    `https://swapi.dev/api/people/?search=${query}&page=${page}`,
  );
  const dataCharacters = await resCharacters.json();

  return {
    props: {
      character,
      characters: dataCharacters.results,
      page,
      next: dataCharacters.next,
      previous: dataCharacters.previous,
      query,
    },
  };
};

export default CharacterPage;
