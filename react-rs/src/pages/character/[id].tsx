import React from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Layout from "../../components/Layout";
import CharacterDetail from "../../components/CharacterDetail";
import CharacterList from "../../components/CharacterList";

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
};

const CharacterPage = ({
  character,
  characters,
  page,
  next,
  previous,
}: CharacterPageProps) => {
  return (
    <Layout>
      <div style={{ display: "flex" }}>
        <div>
          <CharacterList characters={characters} page={page} />
          <div className="pagination-cont">
            <div className="pagination">
              <Link href={`/?page=${page - 1}`} passHref>
                <button disabled={!previous} className="pagination-btn">
                  Previous
                </button>
              </Link>
              <Link href={`/?page=${page + 1}`} passHref>
                <button disabled={!next} className="pagination-btn">
                  Next
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div style={{ width: "70%" }}>
          <CharacterDetail character={character} />
          <Link href={`/?page=${page}`} passHref>
            <button className="close-btn">Close</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  const page = context.query.page ? parseInt(context.query.page as string) : 1;

  if (!id) {
    throw new Error("ID parameter is missing");
  }

  const resCharacter = await fetch(`https://swapi.dev/api/people/${id}`);
  const character = await resCharacter.json();

  const resCharacters = await fetch(
    `https://swapi.dev/api/people/?page=${page}`,
  );
  const dataCharacters = await resCharacters.json();

  return {
    props: {
      character,
      characters: dataCharacters.results,
      page,
      next: dataCharacters.next,
      previous: dataCharacters.previous,
    },
  };
};

export default CharacterPage;
