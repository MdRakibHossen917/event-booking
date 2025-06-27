import React from "react";
import { useNavigate } from "react-router";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-7xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-800">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow"
      >
        ⬅️ Go Back
      </button>
    </div>
  );
};

export default Error;
