import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { Menu, X } from "lucide-react";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { path: "/dashboard/home", label: "🏠 Dashboard Home" },
    { path: "/dashboard/myCreatedGroups", label: "✏️ My Created Groups" },
    { path: "/dashboard/joined-groups", label: "🤝 Joined Groups" },
    { path: "/", label: "🔙 Back to Home" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Mobile Toggle Button */}
      <div className="md:hidden bg-white shadow px-4 py-3 flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#27548A]">Dashboard</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`w-full md:w-64 bg-white shadow-md border-r transition-transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } fixed md:static z-50 h-full md:h-auto`}
      >
        <div className="p-6 space-y-3">
          <h2 className="text-2xl font-bold text-[#27548A] mb-4 hidden md:block">
            📊 Dashboard
          </h2>

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 mt-16 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
