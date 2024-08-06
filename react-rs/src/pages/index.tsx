import Link from 'next/link';
import Layout from '../components/Layout';
import { GetServerSideProps } from 'next';

type Character = {
  name: string;
  url: string;
};

type HomeProps = {
  characters: Character[];
  page: number;
};

const Home = ({ characters, page }: HomeProps) => {
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
      <div>
        <Link href={`/?page=${page - 1}`}><button disabled={page === 1}>Previous</button></Link>
        <Link href={`/?page=${page + 1}`}><button>Next</button></Link>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const page = query.page ? parseInt(query.page as string) : 1;

  const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  const data = await res.json();

  return {
    props: {
      characters: data.results,
      page,
    },
  };
};

export default Home;
