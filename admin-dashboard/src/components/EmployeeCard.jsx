import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiTrash2, FiEdit2, FiMoreHorizontal } from "react-icons/fi";

export default function EmployeeCard({
  employee,
  onEdit,
  onDeactivate,
  onRemove,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const roleColors = {
    admin: "bg-purple-100 text-purple-700",
    employee: "bg-green-100 text-green-700",
    manager: "bg-blue-100 text-blue-700",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="relative bg-white rounded-2xl shadow-lg p-5 border border-gray-100 hover:shadow-xl transition-all group overflow-hidden"
    >
      {/* Green hover pizza background */}
      <div className="absolute top-0 right-0 w-12 h-12 group-hover:w-48 group-hover:h-48 transition-all duration-300 bg-green-200 rounded-bl-full z-0" />

      {/* Three dots button and dropdown */}
      <div className="absolute top-0 right-0 z-50">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className=" cursor-pointer absolute top-2 right-2 text-gray-600  hover:text-green-800 z-20"
        >
          <FiMoreHorizontal size={24}  />
        </button>

        {menuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-40 z-30 bg-white shadow-xl border border-gray-200 rounded-lg"
          >
            <button
              onClick={() => {
                onEdit(employee._id);
                setMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-sm hover:bg-gray-100 text-left"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => {
                onDeactivate(employee._id);
                setMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-sm hover:bg-gray-100 text-left"
            >
              {employee.status === "active" ? "❌ Deactivate" : "✅ Activate"}
            </button>
            <button
              onClick={() => {
                onRemove(employee._id);
                setMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-sm hover:bg-red-100 text-left text-red-600"
            >
              🗑 Remove
            </button>
          </motion.div>
        )}
      </div>

      {/* Card content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <img
          src={employee.profileImage}
          alt={employee.name}
          className="w-20 h-20 rounded-full object-cover border-2 border-green-500 mb-3"
        />

        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-1">
          {employee.name}
          {employee.role === "admin" && (
            <span className="text-purple-500 text-sm" title="Admin">
              👑
            </span>
          )}
        </h3>

        <p className="text-sm text-gray-500 mb-2">{employee.email}</p>

        <div className="flex gap-2 mb-2">
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${
              roleColors[employee.role] || "bg-gray-100 text-gray-600"
            }`}
          >
            {employee.role}
          </span>
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${
              employee.status === "active"
                ? "bg-blue-100 text-blue-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {employee.status}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
