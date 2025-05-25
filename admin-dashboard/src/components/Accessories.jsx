import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiFilter,
  FiArrowUp,
  FiArrowDown,
  FiSearch,
  FiPlus,
  FiGrid,
  FiList,
} from "react-icons/fi"; // added FiGrid and FiList
import { useNavigate } from "react-router-dom";
import PlantLoader from "./PlantLoader";
import { useContext } from "react";
import { PlantContext } from "../../context/plantsContext";
const Accessories = () => {
  const navigate = useNavigate();
  const {accessories,fetchAccessories}=useContext(PlantContext)
  console.log(accessories)

  const [filteredAccessories, setFilteredAccessories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    availability: "all",
    category: "all",
    size: "all",
    sortBy: "name",
    sortOrder: "asc",
  });

  const [viewMode, setViewMode] = useState("table"); // NEW: 'table' or 'grid'

  useEffect(() => {
    applyFilters();
  }, [filters, accessories]);

  // Action handlers (fill your logic here)
  const handleDelete = async () => {
    console.log(selectedIds)
    const url = "http://localhost:3000/accessory/deleteMultiple";
   
    try {
      const response = await axios.post(url,{
        ids:selectedIds
      })
  
      
      console.log(response.data.message); // e.g., "3 accessories deleted"
  
      // Optionally refresh the list
      fetchAccessories();
      setSelectedIds([]);
    } catch (error) {
      console.error("Error deleting accessories:", error.message);
    }
  };
  
  const handleChangeAvailability = async (status) => {
    try {
      const response = await axios.post("http://localhost:3000/accessory/updateAvailability", {
          ids: selectedIds,
          availability: status === "available", // true or false
        })
  
      if (response.data.success === false) {
        throw new Error("Failed to update availability");
      }
  
      console.log(`Accessories marked as ${status}:`, selectedIds);
  
      // Refresh the list (assuming you have this function)
      await fetchAccessories();
  
      // Clear the selection
      setSelectedIds([]);
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };
  

  const handleUpdate = () => {
    if (selectedIds.length === 1) {
      const accessoryToEdit = filteredAccessories.find(acc => acc._id === selectedIds[0]);
      navigate('/update-accessory', { state: { accessory: accessoryToEdit } });
    } else {
      alert("Please select exactly one accessory to update.");
    }
  };
  
  const applyFilters = () => {
    let result = [...accessories];

    if (filters.search) {
      result = result.filter(
        (accessory) =>
          accessory.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          accessory.commonName.some((name) =>
            name.toLowerCase().includes(filters.search.toLowerCase())
          )
      );
    }

    if (filters.availability !== "all") {
      result = result.filter((accessory) =>
        filters.availability === "available"
          ? accessory.isavailable
          : !accessory.isavailable
      );
    }

    if (filters.category !== "all") {
      result = result.filter(
        (accessory) => accessory.category === filters.category
      );
    }

    if (filters.size !== "all") {
      result = result.filter((accessory) => accessory.size === filters.size);
    }

    result.sort((a, b) => {
      let comparison = 0;
      switch (filters.sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "price":
          comparison = a.price - b.price;
          break;
        case "stock":
          comparison = a.stock - b.stock;
          break;
        default:
          comparison = 0;
      }
      return filters.sortOrder === "asc" ? comparison : -comparison;
    });

    setFilteredAccessories(result);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSortOrder = () => {
    setFilters((prev) => ({
      ...prev,
      sortOrder: prev.sortOrder === "asc" ? "desc" : "asc",
    }));
  };

  const categories = [...new Set(accessories.map((a) => a.category))];

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredAccessories.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredAccessories.map((a) => a._id));
    }
  };

  if (isLoading) return <PlantLoader />;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-green-900">Accessories</h2>
        <div className="flex items-center gap-4">
          {/* View toggle button */}
          <button
            onClick={() => setViewMode("table")}
            className={`p-2 rounded-lg ${
              viewMode === "table" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
            title="Table View"
          >
            <FiList />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg ${
              viewMode === "grid" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
            title="Grid View"
          >
            <FiGrid />
          </button>

          <button
            onClick={() => navigate("/add-accessory")}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
          >
            <FiPlus /> Add Accessory
          </button>
        </div>
      </div>

      {/* Filters (unchanged) */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search accessories..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <select
            name="availability"
            value={filters.availability}
            onChange={handleFilterChange}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Availability</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>

          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            name="size"
            value={filters.size}
            onChange={handleFilterChange}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Sizes</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>

          <div className="flex items-center gap-2">
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="stock">Sort by Stock</option>
            </select>
            <button
              onClick={toggleSortOrder}
              className="p-2 border rounded-lg hover:bg-gray-50"
            >
              {filters.sortOrder === "asc" ? <FiArrowUp /> : <FiArrowDown />}
            </button>
          </div>
        </div>
      </div>
      {/* Action Buttons (show only if something selected) */}
      {selectedIds.length > 0 && (
        <div className="mb-6 flex gap-4">
        <button
          onClick={handleDelete}
          className="bg-red-100 text-red-700 px-4 py-2 rounded-full shadow-md hover:bg-red-200 transition-colors duration-300 font-semibold"
          style={{ boxShadow: "0 2px 6px rgba(220, 38, 38, 0.25)" }}
        >
          Delete
        </button>
      
        <button
          onClick={() => handleChangeAvailability("available")}
          className="bg-green-100 text-green-800 px-4 py-2 rounded-full shadow-md hover:bg-green-200 transition-colors duration-300 font-semibold"
          style={{ boxShadow: "0 2px 6px rgba(21, 128, 61, 0.25)" }}
        >
          Mark Available
        </button>
      
        <button
          onClick={() => handleChangeAvailability("unavailable")}
          className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full shadow-md hover:bg-yellow-200 transition-colors duration-300 font-semibold"
          style={{ boxShadow: "0 2px 6px rgba(202, 138, 4, 0.25)" }}
        >
          Mark Unavailable
        </button>
      
        <button
          onClick={handleUpdate}
          className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full shadow-md hover:bg-blue-200 transition-colors duration-300 font-semibold"
          style={{ boxShadow: "0 2px 6px rgba(37, 99, 235, 0.25)" }}
        >
          Update
        </button>
      </div>
      
      )}

      {/* Conditional rendering for Table or Grid */}
      {viewMode === "table" ? (
        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-green-100 text-green-900">
              <tr>
                <th className="p-4">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length === filteredAccessories.length &&
                      filteredAccessories.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Common Names</th>
                <th className="p-4">Category</th>
                <th className="p-4">Size</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Availability</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccessories.map((accessory) => (
                <tr key={accessory._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(accessory._id)}
                      onChange={() => handleSelect(accessory._id)}
                    />
                  </td>
                  <td className="p-4">
                    <img
                      src={accessory.imageUrl[0]}
                      alt={accessory.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="p-4 font-semibold text-green-900">
                    {accessory.name}
                  </td>
                  <td className="p-4 text-gray-600">
                    {accessory.commonName.join(", ")}
                  </td>
                  <td className="p-4 capitalize">{accessory.category}</td>
                  <td className="p-4 capitalize">{accessory.size}</td>
                  <td className="p-4 text-green-700 font-semibold">
                    ${accessory.price}
                  </td>
                  <td className="p-4">{accessory.stock}</td>
                  <td className="p-4">
                    {accessory.isavailable ? (
                      <span className="text-green-600 font-medium">
                        Available
                      </span>
                    ) : (
                      <span className="text-red-500 font-medium">
                        Unavailable
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredAccessories.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No accessories found matching your criteria.
            </div>
          )}
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-300">
          {filteredAccessories.map((accessory) => (
            <div
              key={accessory._id}
              className="group relative bg-white rounded-3xl shadow-md border border-green-100 overflow-hidden hover:shadow-2xl hover:border-green-300 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 flex flex-col"
              style={{ minHeight: 380 }}
            >
              {/* Checkbox selection */}
              <input
                type="checkbox"
                checked={selectedIds.includes(accessory._id)}
                onChange={() => handleSelect(accessory._id)}
                className="absolute top-4 left-4 w-5 h-5 z-20 cursor-pointer rounded border-green-600 text-green-600 bg-white focus:ring-green-500"
              />

              <div className="relative overflow-hidden h-48 flex items-center justify-center bg-gradient-to-t from-green-50 to-green-100">
                <img
                  src={accessory.imageUrl[0]}
                  alt={accessory.name}
                  className="w-full h-48 object-cover object-center transition-transform duration-300 group-hover:scale-110"
                />
                {!accessory.isavailable && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs shadow">
                    Unavailable
                  </div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-green-900 mb-1 truncate">
                    {accessory.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2 truncate">
                    {accessory.commonName.join(", ")}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-green-600 font-bold text-lg">
                    ${accessory.price}
                  </span>
                  <span className="text-gray-400 text-xs">
                    Stock: {accessory.stock}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 bg-green-100 text-green-800 rounded-full capitalize">
                    {accessory.size}
                  </span>
                  <span className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full capitalize">
                    {accessory.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {filteredAccessories.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              No accessories found matching your criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Accessories;
