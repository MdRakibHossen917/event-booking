import React, { useContext } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { LuLogOut } from "react-icons/lu";
import logo from "../assets/log.png";
import { MdOutlineLogout } from "react-icons/md";
import Button from "./Button";

const links = (
  <>
    <li>
      <NavLink
        to="/"
        className="flex items-center font-semibold text-gray-900 gap-1"
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/createGroup"
        className="flex items-center text-gray-900 font-semibold gap-1"
      >
        CreateGroup
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/myGroup"
        className="flex items-center text-gray-900 font-semibold gap-1"
      >
        MyGroup
      </NavLink>
    </li>

    <li>
      <NavLink
        to="/AllGroups"
        className="flex items-center text-gray-900 font-semibold gap-1"
      >
        AllGroups
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/aboutUs"
        className="flex items-center text-gray-900 font-semibold gap-1"
      >
        AboutUs
      </NavLink>
    </li>

    {/*  Dashboard Link */}
    <li>
      <NavLink
        to="/dashboard/home"
        className="flex items-center font-semibold gap-1 text-gray-900"
      >
        Dashboard
      </NavLink>
    </li>
  </>
);

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You have successfully logged out",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/auth/login");
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Logout Failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="navbar fixed top-0 left-0 w-full z-50 bg-[#27548A] shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end flex items-center gap-2">
        {/*theme controller */}
        <div className="mr-1 lg:mr-3">
          <input
            type="checkbox"
            value="dark"
            className="toggle theme-controller"
          />
        </div>
        {user ? (
          <Button

            onClick={handleLogout}
            className="btn btn-sm  text-gray-900 rounded-xl    hover:bg-blue-600 flex items-center gap-1"
          >
            <span className="  text-white p-1 rounded-full">
              <MdOutlineLogout size={25} className="text-lg" />
            </span>
            Logout
          </Button>
        ) : (
          <>
            <NavLink
              to="/auth/login"
              className="btn btn-outline text-gray-900 btn-sm"
            >
              Login
            </NavLink>
            <NavLink
              to="/auth/register"
              className="btn btn-outline text-gray-900 btn-sm"
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
