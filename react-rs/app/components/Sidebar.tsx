// import { ReactNode, FormEvent, useState } from "react";
// import { useNavigate } from "@remix-run/react";
// import ThemeSelector from "../../src/context/ThemeSelector";
// import Flyout from "../../src/components/Flyout";

// type SidebarProps = {
//   children: ReactNode;
//   title?: string;
// };

// const Sidebar = ({ children }: SidebarProps) => {
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   const handleSearch = (e: FormEvent) => {
//     e.preventDefault();
//     if (search.trim()) {
//       navigate(`/search?query=${search}`);
//     }
//   };

//   return (
//     <div className="column sidebar">
//       <ThemeSelector />
//       <div className="search">
//         <form onSubmit={handleSearch} className="search-section">
//           <input
//             className="search-input"
//             type="text"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search characters..."
//           />
//           <button type="submit" className="sub-b">
//             Search
//           </button>
//         </form>
//       </div>
//       <main>{children}</main>
//       <Flyout />
//     </div>
//   );
// };

// export default Sidebar;

import { ReactNode, FormEvent, useState, useEffect } from "react";
import { useNavigate, useLocation } from "@remix-run/react";
import ThemeSelector from "../../src/context/ThemeSelector";
import Flyout from "../../src/components/Flyout";

type SidebarProps = {
  children: ReactNode;
  title?: string;
};

const Sidebar = ({ children }: SidebarProps) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/search?query=${search}`);
  };

  // Используем useEffect для обновления search при изменении URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query") || "";
    setSearch(query);
  }, [location.search]);

  return (
    <div className="column sidebar">
      <ThemeSelector />
      <div className="search">
        <form onSubmit={handleSearch} className="search-section">
          <input
            className="search-input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search characters..."
          />
          <button type="submit" className="sub-b">
            Search
          </button>
        </form>
      </div>
      <main>{children}</main>
      <Flyout />
    </div>
  );
};

export default Sidebar;
