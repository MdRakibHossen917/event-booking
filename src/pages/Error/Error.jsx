import React from "react";
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from "react-router";
import Button from "../../shared/Button";

const Error = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>HobbyHub | Page Not Found</title>
      </Helmet>
      <section className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 px-4 py-12">
        <div className="w-11/12 mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-9xl font-black text-[#27548A] dark:text-blue-400 mb-4 animate-pulse">
                404
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-[#27548A] to-blue-300 dark:from-blue-400 dark:to-blue-600 mx-auto mb-6"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. 
              Don't worry, let's get you back on track!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => navigate("/")}
                className="px-8 py-3 text-lg"
              >
                🏠 Go to Home
              </Button>
              <button
                onClick={() => navigate(-1)}
                className="px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 bg-transparent text-[#27548A] dark:text-blue-400 border-2 border-[#27548A] dark:border-blue-400 hover:bg-[#27548A] dark:hover:bg-blue-500 hover:text-white dark:hover:text-white hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#27548A] focus:ring-offset-2"
              >
                ⬅️ Go Back
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Error;
