import { ReactNode, FormEvent, useState } from "react";
import { useRouter } from "next/router";
import ThemeSelector from "../context/ThemeSelector";
import Flyout from "./Flyout";

type LayoutProps = {
  children: ReactNode;
  title?: string;
};

const Layout = ({ children }: LayoutProps) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/search?query=${search}`);
  };

  return (
    <div className="column sidebar">
      <ThemeSelector />

      <div>
        <form onSubmit={handleSearch} className="search-section">
          <input
            className="search-input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search characters..."
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <main>{children}</main>
      <Flyout />
    </div>
  );
};

export default Layout;
