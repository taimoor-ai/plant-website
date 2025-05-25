import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { FiSettings, FiCalendar } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import { PlantContext } from "../../context/plantsContext";

const statusStyles = {
  confirmed: "bg-yellow-100 text-yellow-600",
  pending: "bg-red-100 text-red-600",
  dispatch: "bg-blue-100 text-blue-600",
  dispatched: "bg-blue-100 text-blue-600",
  completed: "bg-purple-100 text-purple-600",
  delivered: "bg-green-100 text-green-600",
  cancelled: "bg-gray-100 text-gray-500",
};

const tabOrder = ["cancelled", "confirmed", "dispatch", "pending", "completed"];

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const { userProfile } = useContext(PlantContext);

  // Profile dropdown state
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef();

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/order/");
      setOrders(res.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const filteredOrders =
    selectedStatus === "all"
      ? orders
      : orders.filter(
          (order) =>
            order.status?.toLowerCase() === selectedStatus.toLowerCase()
        );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Order</h1>
        <div className="flex items-center gap-4 relative" ref={profileRef}>
          <FiSettings className="text-gray-500 text-xl cursor-pointer" />

          <div
            onClick={() => setProfileOpen(!profileOpen)}
            className="rounded-full p-1 transition duration-300 hover:shadow-[0_0_10px_2px_rgba(34,197,94,0.4)] cursor-pointer"
          >
            <img
              src={userProfile.profileImage}
              className="rounded-full w-10 h-10"
              alt="profile"
            />
          </div>

          {/* Profile dropdown */}
          {profileOpen && (
            <div className="absolute right-0 top-14 w-64 bg-white shadow-xl rounded-xl border border-gray-200 z-50">
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={userProfile.profileImage}
                    className="w-12 h-12 rounded-full"
                    alt="profile"
                  />
                  <div>
                    <h4 className="text-sm font-semibold">{userProfile.name}</h4>
                    <p className="text-xs text-gray-500">{userProfile.email}</p>
                  </div>
                </div>
                <hr className="my-3" />
                <Link
                  to="/profile"
                  className="block text-sm text-gray-700 hover:bg-gray-100 p-2 rounded"
                >
                  View Profile
                </Link>
                <Link
                  to="/settings"
                  className="block text-sm text-gray-700 hover:bg-gray-100 p-2 rounded"
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload();
                  }}
                  className="block w-full text-left text-sm text-red-500 hover:bg-red-100 p-2 rounded"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-6 font-medium text-gray-600 flex-wrap">
          <span
            className={`cursor-pointer pb-1 border-b-2 ${
              selectedStatus === "all"
                ? "border-black text-black"
                : "border-transparent"
            }`}
            onClick={() => setSelectedStatus("all")}
          >
            All Orders
          </span>
          {tabOrder.map((status) => (
            <span
              key={status}
              className={`cursor-pointer capitalize pb-1 border-b-2 ${
                selectedStatus === status
                  ? "border-black text-black"
                  : "border-transparent"
              }`}
              onClick={() => setSelectedStatus(status)}
            >
              {status}
            </span>
          ))}
        </div>
        <div className="flex gap-2 items-center text-sm text-gray-600">
          <FiCalendar />
          <span>{formatDate(oneMonthAgo)}</span>
          <span className="mx-1">to</span>
          <span>{formatDate(today)}</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl shadow-lg bg-white">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="px-6 py-4 text-left">Id</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Address</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Price</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, idx) => {
              const status = order.status?.toLowerCase();
              return (
                <tr
                  key={order._id}
                  className="border-b hover:bg-green-300 cursor-pointer"
                  onClick={() => navigate(`/orders/${order._id}`)}
                >
                  <td className="px-6 py-4 font-semibold text-gray-700">
                    #{order._id.slice(-6)}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={`https://i.pravatar.cc/150?img=${idx + 5}`}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{order.user?.name || "N/A"}</span>
                  </td>
                  <td className="px-6 py-4">{order.user?.address || "N/A"}</td>
                  <td className="px-6 py-4">{formatDate(order.createdAt)}</td>
                  <td className="px-6 py-4">${order.totalPrice.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusStyles[status] || "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // prevent row click
                      }}
                      className="text-gray-400 hover:text-black transition"
                    >
                      <FiSettings />
                    </button>
                  </td>
                </tr>
              );
            })}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="7" className="py-6 text-center text-gray-400">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
