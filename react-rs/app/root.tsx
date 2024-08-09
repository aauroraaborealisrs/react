// import {
//   Links,
//   LiveReload,
//   Meta,
//   Outlet,
//   Scripts,
//   ScrollRestoration,
// } from "@remix-run/react";
// import type { LinksFunction } from "@remix-run/node";
// import styles from "../src/index.css";
// import Index from "./routes/_index";
// import { Provider } from "react-redux";
// import { ThemeProvider } from "../src/context/ThemeContext";
// import { store } from "../src/store/store";
// import Sidebar from "../src/components/Sidebar";

// export const links: LinksFunction = () => {
//   return [{ rel: "stylesheet", href: styles }];
// };

// export default function App() {
//   return (
//     <html lang="en">
//       <head>
//         <Meta />
//         <Links />
//       </head>
//       <body>
//         {/* <Outlet /> */}
//         <Provider store={store}>
//           <ThemeProvider>
//           <Sidebar>
//           <Outlet />
//           </Sidebar>
//           </ThemeProvider>
//         </Provider>
//         <ScrollRestoration />
//         <Scripts />
//         <LiveReload />
//       </body>
//     </html>
//   );
// }


import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";
import styles from "../src/index.css";
import Sidebar from "../src/components/Sidebar";
import CharacterList from "../src/components/CharacterList";
import { Provider } from "react-redux";
import { store } from "../src/store/store";
import { ThemeProvider } from "../src/context/ThemeContext";

type Character = {
  name: string;
  url: string;
};

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") || "";
  const page = url.searchParams.get("page") || "1";
  const res = await fetch(`https://swapi.dev/api/people/?search=${query}&page=${page}`);
  if (!res.ok) {
    throw new Response("Failed to fetch characters", { status: 500 });
  }
  const data = await res.json();
  return json({ results: data.results, query, page: parseInt(page) });
};

export default function App() {
  const { results, query, page } = useLoaderData<{ results: Character[]; query: string; page: number }>();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
      <Provider store={store}>
      <ThemeProvider>
        <Sidebar>
          <CharacterList characters={results} page={page} query={query} />
          
          <div className="pagination-cont">
            <div className="pagination">
              <Link to={`/?query=${query}&page=${page - 1}`}>
                <button disabled={page === 1} className="pagination-btn">
                  Previous
                </button>
              </Link>
              <Link to={`/?query=${query}&page=${page + 1}`}>
                <button className="pagination-btn">Next</button>
              </Link>
            </div>
          </div>
        </Sidebar>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        </ThemeProvider>
         </Provider>
      </body>
    </html>
  );
}
