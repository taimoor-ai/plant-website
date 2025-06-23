import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiFilter, FiArrowUp, FiArrowDown, FiSearch } from "react-icons/fi";
import PlantLoader from "./PlantLoader";
import ConfirmDialog from "./ConfirmDialog";
import { PlantContext } from "../../context/plantsContext";
import { useContext } from "react";
const PlantList = () => {
  const { plants, isLoading2, deletePlant, fetchPlants } =
    useContext(PlantContext);
  console.log(plants);
  if (isLoading2) {
    return <p>Loading plants...</p>;
  }
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlants, setSelectedPlants] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'table'
  const [filters, setFilters] = useState({
    search: "",
    availability: "all",
    category: "all",
    size: "all",
    sortBy: "name",
    sortOrder: "asc",
  });
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
    try {
      console.log("Selected plants for bulk action:", selectedPlants);
      if (selectedPlants.length === 0) {
        alert("Please select at least one plant.");
        return;
      }
      // if (action === "delete") {
      //   const res=await axios.post("http://localhost:3000/product/plants/deleteBulk", {
      //     ids: selectedPlants,
      //   });
      //   console.log(res)
      // } else {

      const res = await axios.post(
        "http://localhost:3000/product/plants/setAvailability",
        {
          ids: selectedPlants,
          isavailable: action === "available",
        }
      );
      //    console.log(res)
      // }

      fetchPlants(); // Refresh after action
      setSelectedPlants([]);
    } catch (err) {
      console.error("Bulk action failed:", err);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [filters, plants]);

  // // const fetchPlants = async () => {
  // //   try {
  // //     const response = await axios.get("http://localhost:3000/product/plants");
  // //     setPlants(response.data);
  // //     setFilteredPlants(response.data);
  // //     setIsLoading(false);
  // //   } catch (error) {
  // //     console.error("Error fetching plants:", error);
  // //     setIsLoading(false);
  // //   }
  // // };

  const applyFilters = () => {
    let result = [...plants];

    if (filters.search) {
      result = result.filter(
        (plant) =>
          plant.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          plant.commonName.some((name) =>
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleSortOrder = () => {
    setFilters((prev) => ({
      ...prev,
      sortOrder: prev.sortOrder === "asc" ? "desc" : "asc",
    }));
  };

  const categories = [...new Set(plants.map((plant) => plant.category))];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search plants..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          {/* Availability Filter */}
          <select
            name="availability"
            value={filters.availability}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">All Availability</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>

          {/* Category Filter */}
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Size Filter */}
          <select
            name="size"
            value={filters.size}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">All Sizes</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>

          {/* Sort By */}
          <div className="flex items-center gap-2">
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="stock">Sort by Stock</option>
            </select>
            <button
              onClick={toggleSortOrder}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {filters.sortOrder === "asc" ? <FiArrowUp /> : <FiArrowDown />}
            </button>
          </div>

          {/* View Mode Toggle */}
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm"
          >
            {viewMode === "grid"
              ? "Switch to Table View"
              : "Switch to Grid View"}
          </button>
        </div>
      </div>
      {selectedPlants.length > 0 && (
        <div className="mb-4 flex gap-4 flex-wrap">
          <span className="text-gray-600">
            {selectedPlants.length} selected
          </span>
          <button
            onClick={() => performBulkAction("available")}
            className="px-4 py-2 bg-green-100 text-green-800 rounded-full shadow-md hover:bg-green-200 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 font-semibold flex items-center gap-2"
            style={{ boxShadow: "0 2px 6px rgba(21, 128, 61, 0.25)" }}
          >
            <span>🌿</span> Mark Available
          </button>

          <button
            onClick={() => performBulkAction("unavailable")}
            className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full shadow-md hover:bg-yellow-200 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 font-semibold flex items-center gap-2"
            style={{ boxShadow: "0 2px 6px rgba(202, 138, 4, 0.25)" }}
          >
            <span>🍃</span> Mark Unavailable
          </button>

          <button
            onClick={() => setConfirmOpen(true)}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-full shadow-md hover:bg-red-200 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 font-semibold flex items-center gap-2"
            style={{ boxShadow: "0 2px 6px rgba(220, 38, 38, 0.25)" }}
          >
            <span>🍂</span> Delete Selected
          </button>
        </div>
      )}

      {/* Plants Display Section */}
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
              {/* Checkbox */}
              <div className="absolute top-3 left-3 z-10 bg-white bg-opacity-70 p-1 rounded">
                <input
                  type="checkbox"
                  checked={selectedPlants.includes(plant._id)}
                  onChange={() => toggleSelectOne(plant._id)}
                  className="h-4 w-4"
                />
              </div>

              {/* Image */}
              <div className="relative overflow-hidden h-48 flex items-center justify-center bg-gradient-to-t from-green-50 to-green-100">
                <img
                  src={plant.imageUrl[0]}
                  alt={plant.name}
                  className="w-full h-48 object-cover object-center transition-transform duration-300 group-hover:scale-110"
                />
                {!plant.isavailable && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs shadow">
                    Unavailable
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-green-900 mb-1 truncate">
                    {plant.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2 truncate">
                    {plant.commonName.join(", ")}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-green-600 font-bold text-lg">
                    ${plant.price}
                  </span>
                  <span className="text-gray-400 text-xs">
                    Stock: {plant.stock}
                  </span>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Common Names
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Availability
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPlants.map((plant) => (
                <tr
                  key={plant._id}
                  className={
                    selectedPlants.includes(plant._id) ? "bg-green-50" : ""
                  }
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedPlants.includes(plant._id)}
                      onChange={() => toggleSelectOne(plant._id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={plant.imageUrl[0]}
                      alt={plant.name}
                      className="h-12 w-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 text-green-900 font-semibold">
                    {plant.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {plant.commonName.join(", ")}
                  </td>
                  <td className="px-6 py-4 capitalize">{plant.category}</td>
                  <td className="px-6 py-4 capitalize">{plant.size}</td>
                  <td className="px-6 py-4 text-green-600 font-bold">
                    ${plant.price}
                  </td>
                  <td className="px-6 py-4">{plant.stock}</td>
                  <td className="px-6 py-4">
                    {plant.isavailable ? (
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
        </div>
      )}
      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => deletePlant(selectedPlants)}
        title="Delete Selected Plants"
        message="Are you sure you want to delete the selected plants? This action cannot be undone."
      />

      {/* No Results Message */}
      {filteredPlants.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No plants found matching your criteria Or No plants are available
          </p>
        </div>
      )}
    </div>
  );
};

export default PlantList;
