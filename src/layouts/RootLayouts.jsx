import React from "react";
import Navbar from "../shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../Footer/Footer";

 

const RootLayouts = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="">
        <Navbar />
      </div>
      <div className="flex-grow mt-17">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayouts;
