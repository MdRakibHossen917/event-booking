import React from "react";
 

import { Outlet } from "react-router";
import Navbar from "../shared/Navbar";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#101828' }}>
      <Navbar></Navbar>
      <div className="flex-grow flex items-center justify-center mt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
