import Link from 'next/link';
import Layout from '../components/Layout';
import { GetServerSideProps } from 'next';

type Character = {
  name: string;
  url: string;
};

type SearchProps = {
  characters: Character[];
};

const Search = ({ characters }: SearchProps) => {
  return (
    <Layout>
      <ul>
        {characters.map((character, index) => (
          <li key={index}>
            <Link href={`/character/${character.url.split('/')[5]}`}>
              {character.name}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const searchQuery = query.query || '';

  const res = await fetch(`https://swapi.dev/api/people/?search=${searchQuery}`);
  const data = await res.json();

  return {
    props: {
      characters: data.results || [],
    },
  };
};

export default Search;
