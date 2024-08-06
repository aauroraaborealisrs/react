import Link from 'next/link';
import Layout from '../components/Layout';
import { GetServerSideProps } from 'next';

type Character = {
  name: string;
  url: string;
};

type SearchProps = {
  characters: Character[];
  query: string;
  page: number;
  next: string | null;
  previous: string | null;
};

const Search = ({ characters, query, page, next, previous }: SearchProps) => {
  return (
    <Layout>
      <ul>
        {characters.map((character, index) => (
          <li key={index} className='result-item'>
            <Link href={`/character/${character.url.split('/')[5]}`} className="active-link active">
              {character.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className='pagination-cont'>
      <div className='pagination'>
        <Link href={`/search?query=${query}&page=${page - 1}`}>
          <button disabled={!previous} className='pagination-btn'>Previous</button>
        </Link>
        <Link href={`/search?query=${query}&page=${page + 1}`}>
          <button disabled={!next} className='pagination-btn'>Next</button>
        </Link>
      </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const searchQuery = query.query || '';
  const page = query.page ? parseInt(query.page as string) : 1;

  const res = await fetch(`https://swapi.dev/api/people/?search=${searchQuery}&page=${page}`);
  const data = await res.json();

  return {
    props: {
      characters: data.results || [],
      query: searchQuery,
      page,
      next: data.next,
      previous: data.previous,
    },
  };
};

export default Search;
