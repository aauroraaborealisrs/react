import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./components/error-page";
import Index from "./routes/index";
import ErrorBoundary from "./components/errorBoundary";
import { store } from "./store/store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const container = document.getElementById("root");
if (container !== null) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <Provider store={store}>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </Provider>
      ,
    </React.StrictMode>,
  );
} else {
  console.error('Element with id "root" not found');
}
