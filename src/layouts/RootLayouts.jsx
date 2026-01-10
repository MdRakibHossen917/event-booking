import React from "react";
import Navbar from "../shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../Footer/Footer";

 

const RootLayouts = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="mt-16">
        <Navbar />
      </div>
      <div className="min-h-[calc(100vh-72px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayouts;
