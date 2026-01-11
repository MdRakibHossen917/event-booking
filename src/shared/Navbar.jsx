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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { to: "/createGroup", label: "CreateGroup" },
    { to: "/myGroup", label: "MyGroup" },
    { to: "/allGroups", label: "AllGroups" },
    { to: "/aboutUs", label: "AboutUs" },
    { to: "/articles", label: "Articles" },
    { to: "/dashboard/home", label: "Dashboard" },
  ];

  const links = (
    <>
      {navLinks.map((link) => (
        <li key={link.to}>
          <NavLink
            to={link.to}
            className={`flex items-center font-semibold gap-1 ${isScrolled ? 'text-white dark:text-white' : 'text-white dark:text-gray-100'}`}
          >
            {link.label}
          </NavLink>
        </li>
      ))}
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
        <div className="relative lg:hidden">
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 rounded-xl transition-all duration-300 ${isScrolled ? 'text-white dark:text-white hover:bg-white/10' : 'text-white dark:text-gray-100 hover:bg-white/10'}`}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 sm:h-8 md:h-9 lg:h-10 w-auto transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Premium Glassmorphism Dropdown */}
          <div
            className={`absolute top-full left-0 mt-3 w-72 rounded-3xl overflow-hidden transition-all duration-500 ease-out z-50 ${
              isMobileMenuOpen
                ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
            }`}
          >
            {/* Glassmorphism Container */}
            <div className="backdrop-blur-2xl bg-white/80 dark:bg-gray-900/80 border border-white/30 dark:border-gray-700/30 shadow-2xl">
              {/* Inner Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
              
              {/* Menu Content */}
              <div className="relative p-4 space-y-2">
                {/* Navigation Links - Pill Style */}
                <ul className="space-y-2">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.to || (link.to !== '/' && pathname.startsWith(link.to));
                    
                    return (
                      <li key={link.to}>
                        <NavLink
                          to={link.to}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block px-5 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 min-h-[48px] flex items-center justify-between touch-manipulation ${
                            isActive
                              ? 'bg-gradient-to-r from-[#27548A] via-[#1e3d6b] to-[#27548A] text-white shadow-lg shadow-[#27548A]/40 scale-[1.02]'
                              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100/60 dark:hover:bg-gray-800/60 hover:scale-[1.01] active:scale-[0.98]'
                          }`}
                        >
                          <span>{link.label}</span>
                          {isActive && (
                            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent my-3" />

                {/* CTA-Style Auth Buttons */}
                <div className="space-y-2">
                  {user ? (
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full px-5 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px] touch-manipulation"
                    >
                      <MdOutlineLogout size={18} />
                      <span>Logout</span>
                    </button>
                  ) : (
                    <>
                      <NavLink
                        to="/auth/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full px-5 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-[#27548A] via-[#1e3d6b] to-[#27548A] text-white shadow-lg shadow-[#27548A]/40 hover:shadow-xl hover:shadow-[#27548A]/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-center min-h-[48px] touch-manipulation"
                      >
                        Login
                      </NavLink>
                      <NavLink
                        to="/auth/register"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full px-5 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 text-white shadow-lg shadow-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-center min-h-[48px] touch-manipulation"
                      >
                        Register
                      </NavLink>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Backdrop Overlay */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
          )}
        </div>
        <Link to="/" className="normal-case text-xl">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end flex items-center gap-2">
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
