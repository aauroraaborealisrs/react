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
          <li key={index} className='result-item'>
            <Link href={`/character/${character.url.split('/')[5]}`} className="active-link active">
              {character.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className='pagination-cont'>
      <div className='pagination'>
        <Link href={`/?page=${page - 1}`}><button disabled={page === 1} className='pagination-btn'>Previous</button></Link>
        <Link href={`/?page=${page + 1}`}><button className='pagination-btn'>Next</button></Link>
      </div>
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
