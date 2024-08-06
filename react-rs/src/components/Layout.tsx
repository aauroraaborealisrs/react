import { ReactNode, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

type LayoutProps = {
  children: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'Star Wars Characters' }: LayoutProps) => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/search?query=${search}`);
  };

  return (
    <div>
      <header>
        <h1>{title}</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search characters..."
          />
          <button type="submit">Search</button>
        </form>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
