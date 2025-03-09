import React from "react";
import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    <div className="flex flex-col items-center justify-center py-5 bg-gray-100 text-center">
      <h1 className="text-8xl font-extrabold text-red-500">404</h1>
      <h2 className="text-3xl font-semibold mt-2 text-gray-800">Oops! Page Not Found</h2>
      <p className="text-lg text-gray-600 mt-2">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="mt-4 px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}
