
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
  } from "@remix-run/react";
  import type { LinksFunction } from "@remix-run/node";
  import styles from "../index.css";
  
  export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: styles }];
  };
  
  export default function App() {
    return (
      <html lang="en">
        <head>
          <Meta />
          <Links />
        </head>
        <body>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
  