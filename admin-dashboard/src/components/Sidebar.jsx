import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaChartBar,
  FaFileAlt,
  FaStore,
  FaUser,
  FaCog,
} from "react-icons/fa";
import {
  FiFeather,
  FiChevronLeft,
  FiChevronRight,
  FiPackage,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const allNavItems = [
  { name: "Dashboard", icon: <FaHome />, path: "/", roles: ["admin"] },
  {
    name: "Store",
    icon: <FaStore />,
    roles: ["admin", "employee"],
    children: [
      {
        name: "Plants",
        icon: <FiFeather />,
        path: "/plants",
        roles: ["admin", "employee"],
      },
      {
        name: "Accessories",
        icon: <FiPackage />,
        path: "/accessories",
        roles: ["admin", "employee"],
      },
    ],
  },
  {
    name: "Orders",
    icon: <FaChartBar />,
    path: "/orders",
    roles: ["admin", "employee"],
  },
  {
    name: "Reports",
    icon: <FaFileAlt />,
    path: "/reports",
    roles: ["admin", "employee"],
  },
  {
    name: "Profile",
    icon: <FaUser />,
    path: "/profile",
    roles: ["admin", "employee"],
  },
  {
    name: "Settings",
    icon: <FaCog />,
    path: "/settings",
    roles: ["admin", "employee"],
  },
  {
    name: "Employees",
    icon: <FaUser />,
    path: "/employees",
    roles: ["admin"],
  },
];

const Sidebar = ({ userRole }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openGroups, setOpenGroups] = useState({});

  useEffect(() => {
    const autoOpenGroups = {};
    allNavItems.forEach((item) => {
      if (item.children) {
        const match = item.children.find((child) => child.path === location.pathname);
        if (match) autoOpenGroups[item.name] = true;
      }
    });
    setOpenGroups(autoOpenGroups);
  }, [location.pathname]);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleGroup = (name) =>
    setOpenGroups((prev) => ({ ...prev, [name]: !prev[name] }));

  const navItems = allNavItems.filter((item) =>
    item.children || item.roles.includes(userRole)
  );

  return (
    <aside
      className={`bg-green-100 h-screen flex flex-col rounded-r-3xl pt-4 shadow-md transition-all duration-300 relative ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex-1 plant-scrollbar2 overflow-y-auto pl-3 pr-0">
        {/* Logo */}
        <div className="flex items-center mb-10">
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-3">
            <FiFeather size={28} color="#A7E9AF" />
          </div>
          {!isCollapsed && (
            <span className="text-2xl font-bold text-green-900">
              Plantify<span className="text-green-600">.</span>
            </span>
          )}
        </div>

        <nav>
          <ul>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              if (item.children) {
                const isGroupActive = item.children.some(
                  (child) => child.path === location.pathname
                );
                const isOpen = openGroups[item.name];

                return (
                  <li key={item.name} className="mb-2">
                    <button
                      onClick={() => toggleGroup(item.name)}
                      className={`flex items-center font-medium text-lg   hover:bg-green-200 cursor-pointer gap-3 transition ${
                        isCollapsed ? "justify-center w-10 h-10 rounded-3xl py-4" : "px-4 py-3 w-full"
                      } ${
                        isGroupActive
                          ? "bg-white text-green-700 shadow rounded-tl-3xl rounded-bl-3xl"
                          : "text-green-900 hover:bg-green-100 rounded-tl-3xl rounded-bl-3xl"
                      }`}
                      title={isCollapsed ? item.name : ""}
                    >
                      <span className="text-xl flex items-center justify-center w-full">
                        {item.icon}
                      </span>
                      {!isCollapsed && item.name}
                    </button>

                    <AnimatePresence initial={false}>
                      {!isCollapsed && isOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="ml-6 overflow-hidden"
                        >
                          {item.children
                            .filter((child) => child.roles.includes(userRole))
                            .map((child) => (
                              <li key={child.name} className="mb-2">
                                <Link
                                  to={child.path}
                                  className={`flex my-3 items-center gap-3 text-green-900 text-base font-medium px-3 py-2 rounded hover:bg-green-200 ${
                                    location.pathname === child.path
                                      ? "bg-white text-green-700 shadow"
                                      : ""
                                  }`}
                                >
                                  <span className="text-lg">{child.icon}</span>
                                  {child.name}
                                </Link>
                              </li>
                            ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              return (
                <li key={item.name} className="mb-2">
                  <Link
                    to={item.path}
                    className={`flex items-center transition font-medium hover:bg-green-200 text-lg gap-3 ${
                      isCollapsed ? "justify-center w-10 h-10 rounded-3xl py-4" : "px-4 py-3 w-full"
                    } ${
                      isActive
                        ? "bg-white rounded-tl-3xl rounded-bl-3xl text-green-700 shadow"
                        : "text-green-900 hover:bg-green-100 rounded-tl-3xl rounded-bl-3xl"
                    }`}
                    style={
                      isCollapsed
                        ? { width: "48px", height: "48px" }
                        : { width: "100%" }
                    }
                    title={isCollapsed ? item.name : ""}
                  >
                    <span className="text-xl flex items-center justify-center w-full">
                      {item.icon}
                    </span>
                    {!isCollapsed && item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-8 bg-white rounded-full p-1 shadow-md hover:bg-gray-50 transition-colors"
      >
        {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
      </button>

      {!isCollapsed && (
        <div className="p-4 flex justify-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <FiFeather size={24} color="#4CAF50" />
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
