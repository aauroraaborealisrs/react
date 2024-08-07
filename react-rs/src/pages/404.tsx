import Link from "next/link";
import React from "react";

export default function ErrorPage() {
  return (
    <div id="error-page">
      <h1>Oops! 404</h1>
      <p>Smth went wrong</p>
      <Link href="/" className="gray-hov">
      <button>Back to Search</button>
      </Link>
    </div>
  );
}