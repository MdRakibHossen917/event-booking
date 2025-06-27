import React from "react";
import { useNavigate } from "react-router";

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <h1 className="text-6xl md:text-8xl font-extrabold text-blue-600 mb-6">
        Coming Soon!
      </h1>
      <p className="text-xl md:text-2xl text-gray-700 max-w-xl text-center mb-8">
        We're working hard to bring you something amazing. Stay tuned for
        updates and thank you for your patience!
      </p>
      <div className="animate-pulse text-blue-600 font-semibold text-lg mb-10">
        🚀 Launching Shortly...
      </div>
      <button
        onClick={() => navigate(-1)}
        className="btn btn-outline btn-primary"
      >
        ← Back
      </button>
    </div>
  );
};

export default ComingSoon;
