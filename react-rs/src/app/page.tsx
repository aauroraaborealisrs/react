import Link from "next/link";
import Sidebar from "../components/Sidebar";
import CharacterList from "../components/CharacterList";

const fetchCharacters = async (page: number) => {
  const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  if (!res.ok) {
    throw new Error("Failed to fetch characters");
  }
  const data = await res.json();
  return data;
};

const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const data = await fetchCharacters(page);

  return (
    <Sidebar>
      <CharacterList characters={data.results} page={page} query={""} />

      <div className="pagination-cont">
        <div className="pagination">
          <Link href={`/?page=${page - 1}`}>
            <button disabled={page === 1} className="pagination-btn">
              Previous
            </button>
          </Link>
          <Link href={`/?page=${page + 1}`}>
            <button className="pagination-btn">Next</button>
          </Link>
        </div>
      </div>
    </Sidebar>
  );
};

export default Home;
