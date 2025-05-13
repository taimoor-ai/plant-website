import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChartBar, FaFileAlt, FaStore, FaUser, FaCog } from 'react-icons/fa';
import { FiFeather, FiChevronLeft, FiChevronRight, FiPackage } from 'react-icons/fi';

const navItems = [
  { name: 'Dashboard', icon: <FaHome />, path: '/' },
  { name: 'Plants', icon: <FiFeather />, path: '/plants' },
  { name: 'Accessories', icon: <FiPackage />, path: '/accessories' },
  { name: 'Analytics', icon: <FaChartBar />, path: '/analytics' },
  { name: 'Reports', icon: <FaFileAlt />, path: '/reports' },
  { name: 'Store', icon: <FaStore />, path: '/store' },
  { name: 'Profile', icon: <FaUser />, path: '/profile' },
  { name: 'Settings', icon: <FaCog />, path: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`bg-[#EAF6EF] min-h-screen flex flex-col justify-between rounded-r-3xl shadow-md p-6 transition-all duration-300 relative ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div>
        {/* Logo and App Name */}
        <div className="flex items-center mb-10">
          {/* Beautiful Leaf Icon */}
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-3">
            <FiFeather size={28} color="#A7E9AF" />
          </div>
          {!isCollapsed && (
            <span className="text-2xl font-bold text-green-900">Plantify<span className="text-green-600">.</span></span>
          )}
        </div>
        {/* Navigation */}
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.name} className="mb-2">
                <Link
                  to={item.path}
                  className={`flex items-center transition font-medium text-lg gap-3
                    ${isCollapsed ? 'justify-center' : ''}
                    ${isCollapsed ? 'py-4' : 'px-4 py-3'}
                    ${location.pathname === item.path
                      ? isCollapsed
                        ? 'bg-white text-green-700 shadow rounded-full w-12 h-12 mx-auto'
                        : 'bg-white text-green-700 shadow rounded-xl'
                      : 'text-green-900 hover:bg-green-100 rounded-xl'}
                  `}
                  style={isCollapsed ? { width: '48px', height: '48px' } : {}}
                  title={isCollapsed ? item.name : ''}
                >
                  <span className="text-xl flex items-center justify-center w-full">{item.icon}</span>
                  {!isCollapsed && item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-8 bg-white rounded-full p-1 shadow-md hover:bg-gray-50 transition-colors"
      >
        {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
      </button>

      {/* Plant Illustration at the bottom */}
      <div className="flex justify-center mt-8">
        {!isCollapsed && (
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <FiFeather size={24} color="#4CAF50" />
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar; 