// import React, { ReactNode } from 'react';
// interface LayoutProps {
//     children: ReactNode;
//   }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   return (
//     <div className="content">
//         {children}
//     </div>
//   );
// };
 
// export default Layout;

import { ReactNode, useState } from 'react';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => { // Add type to event parameter
    e.preventDefault();
    router.push(`/search?query=${search}`);
  };

  return (
    <div>
      <header>
        <h1>Star Wars Characters</h1>
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
