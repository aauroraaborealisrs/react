import Layout from '../../components/Layout';
import CharacterDetail from '../../components/CharacterDetail';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

type Character = {
  name: string;
  url: string;
};

type CharacterPageProps = {
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
  page: number;
  next: string | null;
  previous: string | null;
};

const CharacterPage = ({ character, characters, page, next, previous }: CharacterPageProps) => {
  return (
    <Layout>
      <div style={{ display: 'flex' }}>
        <div>
          <div className='column sidebar'>
          <ul>
            {characters.map((character, index) => (
              <li key={index} className='result-item'>
                <Link href={`/character/${character.url.split('/')[5]}`} className="active-link active">
                  {character.name}
                </Link>
              </li>
            ))}
          </ul>
          </div>
          <div className='pagination-cont'>
          <div className='pagination'>
            <Link href={`/?page=${page - 1}`}>
              <button disabled={!previous} className='pagination-btn'>Previous</button>
            </Link>
            <Link href={`/?page=${page + 1}`}>
              <button disabled={!next} className='pagination-btn'>Next</button>
            </Link>
          </div>
          </div>
        </div>
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
  const { query } = context;
  const page = query.page ? parseInt(query.page as string) : 1;

  const resCharacter = await fetch(`https://swapi.dev/api/people/${id}`);
  const character = await resCharacter.json();

  const resCharacters = await fetch(`https://swapi.dev/api/people/?page=${page}`);
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
