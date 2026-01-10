import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { LuLogOut } from "react-icons/lu";
import logo from "../assets/log.png";
import { MdOutlineLogout } from "react-icons/md";
import Button from "./Button";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={`flex items-center font-semibold gap-1 ${isScrolled ? 'text-white dark:text-white' : 'text-white dark:text-gray-100'}`}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/createGroup"
          className={`flex items-center font-semibold gap-1 ${isScrolled ? 'text-white dark:text-white' : 'text-white dark:text-gray-100'}`}
        >
          CreateGroup
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/myGroup"
          className={`flex items-center font-semibold gap-1 ${isScrolled ? 'text-white dark:text-white' : 'text-white dark:text-gray-100'}`}
        >
          MyGroup
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/AllGroups"
          className={`flex items-center font-semibold gap-1 ${isScrolled ? 'text-white dark:text-white' : 'text-white dark:text-gray-100'}`}
        >
          AllGroups
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/aboutUs"
          className={`flex items-center font-semibold gap-1 ${isScrolled ? 'text-white dark:text-white' : 'text-white dark:text-gray-100'}`}
        >
          AboutUs
        </NavLink>
      </li>

      {/*  Dashboard Link */}
      <li>
        <NavLink
          to="/dashboard/home"
          className={`flex items-center font-semibold gap-1 ${isScrolled ? 'text-white dark:text-white' : 'text-white dark:text-gray-100'}`}
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );

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
    <div className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-[#27548A] dark:bg-[#1e3d6b]' : 'bg-[#101828] dark:bg-gray-900'}`}>
      <div className="w-11/12 mx-auto navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className={`btn btn-ghost lg:hidden ${isScrolled ? 'text-white dark:text-white' : 'text-white dark:text-gray-100'}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 sm:h-8 md:h-9 lg:h-10 w-auto"
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
        <Link to="/" className="normal-case text-xl">
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
          <button
            onClick={handleLogout}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
              isScrolled 
                ? 'bg-white text-[#27548A] hover:bg-gray-100 border border-white shadow-md hover:shadow-lg' 
                : 'bg-[#27548A] text-white hover:bg-[#1e3d6b] border border-[#27548A] hover:shadow-lg'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 ${isScrolled ? 'focus:ring-[#27548A]' : 'focus:ring-white'} active:scale-95`}
          >
            <MdOutlineLogout size={20} />
            <span>Logout</span>
          </button>
        ) : (
          <>
            <NavLink
              to="/auth/login"
              className={`btn-sm px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg ${isScrolled ? 'bg-white text-[#27548A] hover:bg-gray-100' : 'bg-[#27548A] text-white hover:bg-[#1e3d6b]'}`}
            >
              Login
            </NavLink>

            {/* Register button visible from md and up only */}
            <NavLink
              to="/auth/register"
              className={`btn-sm px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hidden md:inline-flex ${isScrolled ? 'bg-white text-[#27548A] hover:bg-gray-100' : 'bg-[#27548A] text-white hover:bg-[#1e3d6b]'}`}
            >
              Register
            </NavLink>
          </>
        )}
      </div>
      </div>
    </div>
  );
};

export default Navbar;
