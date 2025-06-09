"use client"

import { useState } from "react"
import { Grid, List, ChevronDown, Plus } from "lucide-react"

export default function Shop() {
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("alphabetically")
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [expandedSections, setExpandedSections] = useState({
    bedBath: false,
    vegetable: false,
  })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const toggleColor = (color) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const toggleSize = (size) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
  }

  const products = [
    {
      id: 1,
      name: "Duis Pulvinar Cook",
      price: 79.0,
      originalPrice: null,
      image: "/placeholder.svg?height=200&width=200",
      badge: "Soldout",
      badgeType: "soldout",
    },
    {
      id: 2,
      name: "Fringilla Augue",
      price: 39.0,
      originalPrice: 60.0,
      image: "/placeholder.svg?height=200&width=200",
      badge: "-35%",
      badgeType: "discount",
      countdown: { days: 0, hours: 0, minutes: 0, seconds: 0 },
    },
    {
      id: 3,
      name: "Hendrerit Est",
      price: 79.0,
      originalPrice: null,
      image: "/placeholder.svg?height=200&width=200",
      badge: "Soldout",
      badgeType: "soldout",
    },
    {
      id: 4,
      name: "Massa Massa",
      price: 40.0,
      originalPrice: 85.0,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 5,
      name: "Product Dummy Title",
      price: 55.0,
      originalPrice: 75.0,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 6,
      name: "Product Dummy Title",
      price: 19.0,
      originalPrice: 29.0,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 7,
      name: "Product Title Here",
      price: 50.0,
      originalPrice: null,
      image: "/placeholder.svg?height=200&width=200",
      badge: "-18%",
      badgeType: "discount",
    },
    {
      id: 8,
      name: "Product Title Here",
      price: 40.0,
      originalPrice: 85.0,
      image: "/placeholder.svg?height=200&width=200",
      badge: "-18%",
      badgeType: "discount",
    },
    {
      id: 9,
      name: "Product Title Here",
      price: 19.0,
      originalPrice: 21.0,
      image: "/placeholder.svg?height=200&width=200",
      badge: "-10%",
      badgeType: "discount",
    },
  ]

  const topRatedProducts = [
    {
      id: 1,
      name: "Product Dummy Title",
      price: 19.0,
      originalPrice: 29.0,
      image: "/placeholder.svg?height=60&width=60",
    },
    { id: 2, name: "Product Title Here", price: 50.0, image: "/placeholder.svg?height=60&width=60" },
    {
      id: 3,
      name: "Product Dummy Title",
      price: 55.0,
      originalPrice: 75.0,
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const colors = [
    { name: "red", color: "bg-red-500" },
    { name: "green", color: "bg-green-500" },
    { name: "blue", color: "bg-blue-500" },
    { name: "yellow", color: "bg-yellow-400" },
    { name: "white", color: "bg-white border-2 border-gray-300" },
    { name: "gold", color: "bg-yellow-600" },
  ]

  const sizes = ["S", "M", "L", "XL", "XXL"]
  const tags = ["blue", "gold", "gray", "green", "l", "m", "red", "s"]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with botanical background */}
      <div
        className="h-80 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/images/shop-header-bg.png')" }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar */}
          <div className="w-80 flex-shrink-0">
            {/* Custom Category */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">CUSTOM CATEGORY</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Bed & Bath</span>
                  <button onClick={() => toggleSection("bedBath")}>
                    <Plus size={16} className="text-gray-400" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Vegetable</span>
                  <button onClick={() => toggleSection("vegetable")}>
                    <Plus size={16} className="text-gray-400" />
                  </button>
                </div>
                <div className="text-gray-700">Brassica rapa</div>
                <div className="text-gray-700">Freeze drying</div>
                <div className="text-gray-700">Instant coffee</div>
                <div className="text-gray-700">Bouillon cube</div>
                <div className="text-gray-700">Yeast bread</div>
                <div className="text-gray-700">Sweet bun</div>
                <div className="text-gray-700">Cornbread</div>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">CATEGORIES</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Featured Products</span>
                  <span className="text-gray-500">(4)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Outdoor Plant Pots</span>
                  <span className="text-gray-500">(8)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Plant families</span>
                  <span className="text-gray-500">(10)</span>
                </div>
              </div>
            </div>

            {/* Color Filter */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">COLOR</h3>
              <div className="grid grid-cols-3 gap-3">
                {colors.map((color) => (
                  <div key={color.name} className="flex items-center gap-2">
                    <button
                      onClick={() => toggleColor(color.name)}
                      className={`w-6 h-6 rounded ${color.color} ${
                        selectedColors.includes(color.name) ? "ring-2 ring-green-500" : ""
                      }`}
                    />
                    <span className="text-sm text-gray-700">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">SIZE</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                      selectedSizes.includes(size)
                        ? "bg-green-800 text-white border-green-800"
                        : "bg-white text-gray-700 border-gray-300 hover:border-green-500"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Top Rated Products */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">TOP RATED PRODUCTS</h3>
              <div className="space-y-4">
                {topRatedProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                      <div className="flex items-center gap-2">
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="text-sm font-bold text-green-600">${product.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">TAGS</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                {/* View Toggle */}
                <div className="flex items-center bg-white rounded-lg p-1 shadow-sm">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${
                      viewMode === "grid" ? "bg-green-800 text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode("grid-large")}
                    className={`p-2 rounded ${
                      viewMode === "grid-large" ? "bg-green-800 text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <div className="grid grid-cols-2 gap-1 w-5 h-5">
                      <div className="bg-current w-2 h-2 rounded-sm"></div>
                      <div className="bg-current w-2 h-2 rounded-sm"></div>
                      <div className="bg-current w-2 h-2 rounded-sm"></div>
                      <div className="bg-current w-2 h-2 rounded-sm"></div>
                    </div>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${
                      viewMode === "list" ? "bg-green-800 text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 font-medium">Sort By:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="alphabetically">Alphabetically, A-Z</option>
                      <option value="price-low">Price, Low to High</option>
                      <option value="price-high">Price, High to Low</option>
                      <option value="newest">Newest First</option>
                    </select>
                    <ChevronDown
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                  </div>
                </div>

                {/* Results Counter */}
                <span className="text-gray-600">Showing 1 - 9 of 10 results</span>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover bg-gray-100"
                    />
                    {product.badge && (
                      <div
                        className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-medium ${
                          product.badgeType === "soldout" ? "bg-green-600 text-white" : "bg-gray-800 text-white"
                        }`}
                      >
                        {product.badge}
                      </div>
                    )}
                    {product.countdown && (
                      <div className="absolute top-3 right-3 bg-white rounded-lg p-2 text-center shadow-sm">
                        <div className="text-2xl font-bold text-gray-900">00</div>
                        <div className="text-xs text-gray-500">Days</div>
                        <div className="text-2xl font-bold text-gray-900">00</div>
                        <div className="text-xs text-gray-500">Hour</div>
                        <div className="text-2xl font-bold text-gray-900">00</div>
                        <div className="text-xs text-gray-500">Min</div>
                        <div className="text-2xl font-bold text-gray-900">00</div>
                        <div className="text-xs text-gray-500">Sec</div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-green-600">${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">Prev</button>
              <button className="px-4 py-2 bg-green-800 text-white rounded-lg font-medium">1</button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">2</button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
