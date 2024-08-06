import Layout from '../../components/Layout';
import { GetServerSideProps } from 'next';

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
};

const Character = ({ character }: CharacterProps) => {
  if (!character) return <div>Loading...</div>;

  return (
    <Layout>
      <h1>{character.name}</h1>
      <p>Height: {character.height}</p>
      <p>Mass: {character.mass}</p>
      <p>Hair Color: {character.hair_color}</p>
      <p>Skin Color: {character.skin_color}</p>
      <p>Eye Color: {character.eye_color}</p>
      <p>Birth Year: {character.birth_year}</p>
      <p>Gender: {character.gender}</p>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params) {
    throw new Error('Expected params to be defined');
  }
  
  const { id } = context.params;

  const res = await fetch(`https://swapi.dev/api/people/${id}`);
  const character = await res.json();

  return {
    props: {
      character,
    },
  };
};

export default Character;
