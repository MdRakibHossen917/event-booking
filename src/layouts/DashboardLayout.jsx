import { useState, useContext } from "react";
import { NavLink, Outlet, Link } from "react-router";
import { Menu, X, LayoutDashboard, Calendar, LogOut, Home, User, FileText, BookOpen } from "lucide-react";
import { AuthContext } from "../Provider/AuthProvider";
import Button from "../shared/Button";
import logo from "../assets/log.png";
import ScrollToTop from "../components/ScrollToTop";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const navItems = [
    { path: "/dashboard/home", label: "Dashboard Home", icon: LayoutDashboard },
    { path: "/dashboard/myEvents", label: "My Events", icon: Calendar },
    { path: "/dashboard/my-articles", label: "My Articles", icon: BookOpen },
    { path: "/dashboard/profile", label: "Profile", icon: User },
    { path: "/", label: "Back to Home", icon: Home },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
      <ScrollToTop />
      {/* Mobile Toggle Button */}
      <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 flex justify-between items-center sticky top-0 z-40">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`w-full md:w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } fixed md:static z-50 h-full md:h-screen md:sticky md:top-0`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
              <img src={logo} alt="Logo" className="h-12 w-auto" />
            </Link>
          </div>

          {/* User Info */}
          {user && (
            <div className="p-4 mx-4 mt-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
              <div className="flex items-center gap-3">
                <img
                  src={user?.photoURL || "https://via.placeholder.com/40"}
                  alt={user?.displayName || "User"}
                  className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{user?.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#27548A] text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#27548A] dark:hover:text-blue-400"
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              <p>HobbyHub Dashboard</p>
              <p className="mt-1">v1.0.0</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen bg-transparent">
        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
