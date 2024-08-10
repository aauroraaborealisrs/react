import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import styles from "./index.css";
import { ThemeProvider } from "./components/ThemeContext";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function RootLayout() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>
          <ThemeProvider>
            <Outlet />
          </ThemeProvider>
        </Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
