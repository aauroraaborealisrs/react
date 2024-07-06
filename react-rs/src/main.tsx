import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ErrorBoundary from "./components/errorBoundary.tsx";
import MyComponent from "./components/MyComponent.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <MyComponent />
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
