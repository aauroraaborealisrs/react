import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./components/error-page";
import Detailed from "./routes/detailed";
import Index from "./routes/index";
import ErrorBoundary from "./components/errorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "people/:contactId",
        element: <Detailed />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const container = document.getElementById("root");
if (container !== null) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <ErrorBoundary>
      <RouterProvider router={router} />
      </ErrorBoundary>
    </React.StrictMode>,
  );
} else {
  console.error('Element with id "root" not found');
}
