import { useEffect, useState } from "react"
import {
  ShoppingCart,
  PackageCheck,
  Heart,
  Eye,
  Mail,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import QuickViewModal from "../pages/Quick-viewModel"
import { useCart } from "../context/Cartcontext"
import Lottie from "lottie-react"
import loader from "../assets/Animations/loading.json"

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [email, setEmail] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null)

  const navigate = useNavigate()
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/product/featuredProducts`
        )
        if (!res.ok) throw new Error("Failed to fetch products")
        const data = await res.json()
        setFeaturedProducts(data.products)
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Unable to load featured products.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleQuickView = (product) => {
    setSelectedProduct(product)
    setIsQuickViewOpen(true)
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    console.log("Subscribing email:", email)
    setEmail("")
  }

  return (
    <>
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-6">
          Featured Products
        </h2>
        <div className="w-20 h-0.5 bg-green-600 mx-auto mb-10"></div>

        {/* 🔄 LOADER */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Lottie
              animationData={loader}
              loop
              autoplay
              className="w-32 h-32"
            />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : featuredProducts.length === 0 ? (
          <p className="text-center text-gray-600">
            No featured products available.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-gray-100 rounded-lg overflow-hidden relative group transition-all duration-300 hover:shadow-lg"
              >
                {/* Discount Badge */}
                {product.discount && (
                  <span className="absolute top-4 left-4 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded z-10">
                    -{product.discount}%
                  </span>
                )}

                {/* Countdown */}
                {product.countdown && (
                  <div className="absolute top-4 right-4 bg-white shadow-md rounded-lg text-xs text-center p-3 z-10">
                    <div className="grid grid-cols-2 gap-2 text-gray-700">
                      {["Days", "Hour", "Min", "Sec"].map((label, idx) => (
                        <div key={idx}>
                          <div className="font-bold">00</div>
                          <div className="text-[10px]">{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Image */}
                <div className="relative h-64 flex items-center justify-center p-6">
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/productDetails/${product._id}/${
                          product.light ? "plant" : "accessory"
                        }`
                      )
                    }
                  >
                    <img
                      src={product.imageUrl?.[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {[
                      {
                        icon: ShoppingCart,
                        label: "Add to Cart",
                        action: () => addToCart(product, 1),
                      },
                      {
                        icon: PackageCheck,
                        label: "CheckOut",
                      },
                      { icon: Heart, label: "Add to Wishlist" },
                      {
                        icon: Eye,
                        label: "Quick View",
                        action: () => handleQuickView(product),
                      },
                    ].map(({ icon: Icon, label, action }, index) => (
                      <div key={index} className="relative group/tooltip">
                        <button
                          onClick={action}
                          className="bg-white cursor-pointer hover:bg-[rgb(121,163,7)] hover:text-white text-gray-700 p-2 rounded-full shadow-md transition-colors"
                        >
                          <Icon className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 bg-white text-center">
                  <h3 className="text-sm font-medium text-gray-800 mb-2 hover:text-green-600 cursor-pointer transition">
                    {product.name}
                  </h3>
                  <div>
                    <span className="text-[rgb(121,163,7)] font-bold text-lg">
                      pkr{product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through ml-2 text-sm">
                        pkr{product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick View Modal */}
        {selectedProduct && (
          <QuickViewModal
            isOpen={isQuickViewOpen}
            onClose={() => setIsQuickViewOpen(false)}
            product={selectedProduct}
          />
        )}
      </section>

      {/* Newsletter */}
      <section className="py-16 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl mb-6">
              Get <span className="text-[rgb(121,163,7)]">20% Off</span> Your Next
              Order
            </h2>
            <div className="w-24 h-0.5 bg-gray-300 mx-auto"></div>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto"
          >
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full pl-12 pr-4 py-3 border-b-2 border-gray-300 focus:border-green-600 outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-gray-800 hover:bg-gray-900 text-white font-medium transition-colors"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default FeaturedProducts
