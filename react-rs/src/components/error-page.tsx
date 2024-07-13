import React from "react";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="white">
      <h1>Oops! 404</h1>
      <p>Smth went wrong</p>
      <Link to="/" className="gray-hov">
      Back to Search
      </Link>
    </div>
  );
}
