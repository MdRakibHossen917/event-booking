import React from "react";
 

import { Outlet } from "react-router";
import Navbar from "../shared/Navbar";

const AuthLayout = () => {
  return (
    <div>
      {/* Logo */}
       
      <Navbar></Navbar>
      <div className="flex-grow mt-18 ">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
