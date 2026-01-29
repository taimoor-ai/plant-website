import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FiFilter, FiArrowUp, FiArrowDown, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PlantLoader from "./PlantLoader"; // Lottie loader component
import ConfirmDialog from "./ConfirmDialog";
import { PlantContext } from "../../context/plantsContext";

const PlantList = () => {
  const navigate = useNavigate();
  const { plants, isLoading2, deletePlant, fetchPlants } = useContext(PlantContext);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [selectedPlants, setSelectedPlants] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  const [filters, setFilters] = useState({
    search: "",
    availability: "all",
    category: "all",
    size: "all",
    sortBy: "name",
    sortOrder: "asc",
  });

  // Ensure plants are loaded on reload
  useEffect(() => {
    if (!plants || plants.length === 0) {
      fetchPlants();
    }
  }, []);
    const applyFilters = () => {
    if (!plants) return;

    let result = [...plants];

    if (filters.search) {
      result = result.filter(
        (plant) =>
          plant?.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
          plant?.commonName?.some((name) =>
            name.toLowerCase().includes(filters.search.toLowerCase())
          )
      );
    }

    if (filters.availability !== "all") {
      result = result.filter((plant) =>
        filters.availability === "available"
          ? plant.isavailable
          : !plant.isavailable
      );
    }

    if (filters.category !== "all") {
      result = result.filter((plant) => plant.category === filters.category);
    }

    if (filters.size !== "all") {
      result = result.filter((plant) => plant.size === filters.size);
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

    setFilteredPlants(result);
  };
  // Apply filters whenever plants or filter settings change
  useEffect(() => {
    applyFilters();
  }, [filters, plants]);

  // Loader while fetching
  if (isLoading2 || !plants) {
    return  <div className="container mx-auto px-4 py-8">
      <PlantLoader />
    </div>;
  }

  const toggleSelectAll = () => {
    if (selectedPlants.length === filteredPlants.length) {
      setSelectedPlants([]);
    } else {
      setSelectedPlants(filteredPlants.map((plant) => plant._id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedPlants((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const performBulkAction = async (action) => {
    if (selectedPlants.length === 0) {
      alert("Please select at least one plant.");
      return;
    }
    try {
      await axios.post("http://localhost:3000/product/plants/setAvailability", {
        ids: selectedPlants,
        isavailable: action === "available",
      });
      fetchPlants();
      setSelectedPlants([]);
    } catch (err) {
      console.error("Bulk action failed:", err);
    }
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

  const categories = plants?.length ? [...new Set(plants.map((plant) => plant.category))] : [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters & Add Plant */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center flex-1">
            {/* Search */}
            <div className="relative min-w-[220px]">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search plants..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Availability */}
            <select
              name="availability"
              value={filters.availability}
              onChange={handleFilterChange}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">All Availability</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>

            {/* Category */}
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="stock">Sort by Stock</option>
            </select>

            <button onClick={toggleSortOrder} className="p-2 border rounded-lg">
              {filters.sortOrder === "asc" ? <FiArrowUp /> : <FiArrowDown />}
            </button>
          </div>

          {/* Add Plant Button */}
          <button
            onClick={() => navigate("/add-plant")}
            className="px-6 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition font-semibold"
          >
            + Add Plant
          </button>
        </div>
      </div>

      {/* Bulk actions */}
      {selectedPlants.length > 0 && (
        <div className="mb-4 flex gap-4 flex-wrap">
          <span className="text-gray-600">{selectedPlants.length} selected</span>
          <button
            onClick={() => performBulkAction("available")}
            className="px-4 py-2 bg-green-100 text-green-800 rounded-full shadow-md hover:bg-green-200 font-semibold flex items-center gap-2"
          >
            🌿 Mark Available
          </button>
          <button
            onClick={() => performBulkAction("unavailable")}
            className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full shadow-md hover:bg-yellow-200 font-semibold flex items-center gap-2"
          >
            🍃 Mark Unavailable
          </button>
          <button
            onClick={() => setConfirmOpen(true)}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-full shadow-md hover:bg-red-200 font-semibold flex items-center gap-2"
          >
            🍂 Delete Selected
          </button>
        </div>
      )}

      {/* Plants Grid/Table */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-300">
          {filteredPlants.map((plant) => (
            <div
              key={plant._id}
              className={`group relative bg-white rounded-3xl shadow-md border ${
                selectedPlants.includes(plant._id)
                  ? "border-green-400 shadow-lg"
                  : "border-green-100"
              } overflow-hidden hover:shadow-2xl hover:border-green-300 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 flex flex-col`}
              style={{ minHeight: 380 }}
            >
              <div className="absolute top-3 left-3 z-10 bg-white bg-opacity-70 p-1 rounded">
                <input
                  type="checkbox"
                  checked={selectedPlants.includes(plant._id)}
                  onChange={() => toggleSelectOne(plant._id)}
                  className="h-4 w-4"
                />
              </div>
              <div className="relative overflow-hidden h-48 flex items-center justify-center bg-gradient-to-t from-green-50 to-green-100">
                <img
                  src={plant?.imageUrl?.[0] || "/placeholder.png"}
                  alt={plant?.name || "Plant"}
                  className="w-full h-48 object-cover object-center transition-transform duration-300 group-hover:scale-110"
                />
                {!plant.isavailable && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs shadow">
                    Unavailable
                  </div>
                )}
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-green-900 mb-1 truncate">
                    {plant.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2 truncate">
                    {plant?.commonName?.join(", ") || "N/A"}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-green-600 font-bold text-lg">${plant.price}</span>
                  <span className="text-gray-400 text-xs">Stock: {plant.stock}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 bg-green-100 text-green-800 rounded-full capitalize">
                    {plant.size}
                  </span>
                  <span className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full capitalize">
                    {plant.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3">
                  <input
                    type="checkbox"
                    checked={selectedPlants.length === filteredPlants.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Common Names</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Size</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3">Availability</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPlants.map((plant) => (
                <tr key={plant._id} className={selectedPlants.includes(plant._id) ? "bg-green-50" : ""}>
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedPlants.includes(plant._id)}
                      onChange={() => toggleSelectOne(plant._id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={plant?.imageUrl?.[0] || "/placeholder.png"}
                      alt={plant?.name || "Plant"}
                      className="h-12 w-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 text-green-900 font-semibold">{plant.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{plant?.commonName?.join(", ") || "N/A"}</td>
                  <td className="px-6 py-4 capitalize">{plant.category}</td>
                  <td className="px-6 py-4 capitalize">{plant.size}</td>
                  <td className="px-6 py-4 text-green-600 font-bold">${plant.price}</td>
                  <td className="px-6 py-4">{plant.stock}</td>
                  <td className="px-6 py-4">
                    {plant.isavailable ? (
                      <span className="text-green-600 font-medium">Available</span>
                    ) : (
                      <span className="text-red-500 font-medium">Unavailable</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => deletePlant(selectedPlants)}
        title="Delete Selected Plants"
        message="Are you sure you want to delete the selected plants?"
      />

      {/* No Results */}
      {filteredPlants.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No plants found matching your criteria or no plants are available.
          </p>
        </div>
      )}
    </div>
  );
};

export default PlantList;
