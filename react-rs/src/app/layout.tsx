"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "../context/ThemeContext";
import { store } from "../store/store";
import "../index.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider>{children}</ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
