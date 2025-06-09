import React, { useEffect, useState } from "react";
import EmployeeCard from "./EmployeeCard";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
    profileImage: "https://cdn-icons-png.flaticon.com/512/147/147142.png",
    status: "active",
  });

  useEffect(() => {
    axios.get("http://localhost:3000/staff").then((res) => {
      setEmployees(res.data);
      setLoading(false);
    });
  }, []);

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove this employee?")) {
      axios.delete(`http://localhost:3000/staff/${id}`).then(() => {
        setEmployees((prev) => prev.filter((emp) => emp._id !== id));
      });
    }
  };

  const handleAddEmployee = () => {
    setAdding(true);
    axios
      .post("http://localhost:3000/staff/register", { ...newEmployee })
      .then((res) => {
        setEmployees([...employees, res.data.staff]);
        setShowAddForm(false);
        setNewEmployee({
          name: "",
          email: "",
          password: "",
          role: "employee",
          profileImage: "https://cdn-icons-png.flaticon.com/512/147/147142.png",
          status: "active",
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setAdding(false);
      });
  };


// Toggle staff status by ID
const toggleStaffStatus = async (id) => {
  try {
    const response = await axios.post(`http://localhost:3000/staff/${id}`);
    const updatedEmployee = response.data.staff;
    setEmployees((prev) => prev.map((emp) => 
      emp._id === id ? updatedEmployee : emp
    ));
  } catch (error) {
    console.error("Error toggling staff status:", error);
    throw error; // so you can catch and show message in the component
  }
};


  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-green-800">Manage Employees</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg shadow-sm transition"
        >
          {showAddForm ? "Cancel" : "Add Employee"}
        </button>
      </div>

      {showAddForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddEmployee();
          }}
          className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="mb-2 font-semibold text-gray-700"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                autoComplete="off"
                placeholder="John Doe"
                value={newEmployee.name}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, name: e.target.value })
                }
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="mb-2 font-semibold text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                autoComplete="off"
                placeholder="john@example.com"
                value={newEmployee.email}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, email: e.target.value })
                }
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="mb-2 font-semibold text-gray-700"
              >
                Initial Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                required
                autoComplete="new-password"
                placeholder="Create a secure password"
                value={newEmployee.password}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, password: e.target.value })
                }
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>

            {/* Role */}
            <div className="flex flex-col">
              <label
                htmlFor="role"
                className="mb-2 font-semibold text-gray-700"
              >
                Role
              </label>
              <select
                id="role"
                value={newEmployee.role}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, role: e.target.value })
                }
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={adding}
            className={`mt-8 w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition duration-300 ${
              adding ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {adding && (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {adding ? "Saving..." : "Save Employee"}
          </motion.button>
        </form>
      )}

      {loading ? (
        <div className="text-center py-20">
          <div className="w-12 h-12 border-4 border-green-400 border-dashed rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-green-700 font-medium">
            Loading employees...
          </p>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 my-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {employees.map((emp) => (
              <EmployeeCard
                key={emp._id}
                employee={emp}
                onEdit={(id) => console.log("Edit", id)}
                onDeactivate={toggleStaffStatus}
                onRemove={handleRemove}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
