import Layout from '../../components/Layout';
import CharacterDetail from '../../components/CharacterDetail';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

type Character = {
  name: string;
  url: string;
};

type CharacterProps = {
  character: {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
  };
  characters: Character[];
};

const CharacterPage = ({ character, characters }: CharacterProps) => {
  return (
    <Layout>
      <div style={{ display: 'flex' }}>
        <ul style={{ width: '30%' }}>
          {characters.map((character, index) => (
            <li key={index}>
              <Link href={`/character/${character.url.split('/')[5]}`}>
                {character.name}
              </Link>
            </li>
          ))}
        </ul>
        <div style={{ width: '70%' }}>
          <CharacterDetail character={character} />
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;

  if (!id) {
    throw new Error("ID parameter is missing");
  }

  const resCharacter = await fetch(`https://swapi.dev/api/people/${id}`);
  const character = await resCharacter.json();

  const resCharacters = await fetch('https://swapi.dev/api/people/');
  const dataCharacters = await resCharacters.json();

  return {
    props: {
      character,
      characters: dataCharacters.results,
    },
  };
};

export default CharacterPage;
