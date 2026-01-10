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
        className="px-6 py-3 bg-[#27548A] text-white rounded-lg font-semibold hover:bg-[#1e3d6b] transition-all duration-200 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#27548A] focus:ring-offset-2"
      >
        ← Back
      </button>
    </div>
  );
};

export default ComingSoon;
