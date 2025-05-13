import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiFilter, FiArrowUp, FiArrowDown, FiSearch } from 'react-icons/fi';
import PlantLoader from './PlantLoader';

const PlantList = () => {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    availability: 'all',
    category: 'all',
    size: 'all',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  useEffect(() => {
    fetchPlants();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, plants]);

  const fetchPlants = async () => {
    try {
      const response = await axios.get('http://localhost:3000/product/plants');
      setPlants(response.data);
      setFilteredPlants(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching plants:', error);
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...plants];

    // Apply search filter
    if (filters.search) {
      result = result.filter(plant => 
        plant.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        plant.commonName.some(name => name.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }

    // Apply availability filter
    if (filters.availability !== 'all') {
      result = result.filter(plant => 
        filters.availability === 'available' ? plant.isavailable : !plant.isavailable
      );
    }

    // Apply category filter
    if (filters.category !== 'all') {
      result = result.filter(plant => plant.category === filters.category);
    }

    // Apply size filter
    if (filters.size !== 'all') {
      result = result.filter(plant => plant.size === filters.size);
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      switch (filters.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'stock':
          comparison = a.stock - b.stock;
          break;
        default:
          comparison = 0;
      }
      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredPlants(result);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleSortOrder = () => {
    setFilters(prev => ({
      ...prev,
      sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  const categories = [...new Set(plants.map(plant => plant.category))];

  if (isLoading) {
    return <PlantLoader />;
  }

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
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
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
              {filters.sortOrder === 'asc' ? <FiArrowUp /> : <FiArrowDown />}
            </button>
          </div>
        </div>
      </div>

      {/* Plants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-300">
        {filteredPlants.map(plant => (
          <div
            key={plant._id}
            className="group bg-white rounded-3xl shadow-md border border-green-100 overflow-hidden hover:shadow-2xl hover:border-green-300 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 flex flex-col"
            style={{ minHeight: 380 }}
          >
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
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-green-900 mb-1 truncate">{plant.name}</h3>
                <p className="text-sm text-gray-500 mb-2 truncate">{plant.commonName.join(', ')}</p>
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

      {/* No Results Message */}
      {filteredPlants.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No plants found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default PlantList; 