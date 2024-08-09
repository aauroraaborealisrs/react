import { ReactNode, useEffect, useState } from "react";
import { Form, useSearchParams } from "@remix-run/react";
import Flyout from "./Flyout";
import ThemeSelector from "./ThemeSelector";

type SidebarProps = {
  children: ReactNode;
  title?: string;
};

const Sidebar = ({ children }: SidebarProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const query = searchParams.get("query") || "";
    setSearch(query);
  }, [searchParams]);

  return (
    <div className="column sidebar">
      <ThemeSelector />
      <div className="search">
        <Form method="get" className="search-section">
          <input
            className="search-input"
            type="text"
            name="query"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search characters..."
          />
          <button type="submit" className="sub-b">
            Search
          </button>
        </Form>
      </div>
      <main>{children}</main>
      <Flyout />
    </div>
  );
};

export default Sidebar;
