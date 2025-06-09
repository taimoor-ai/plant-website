import { useState, useEffect } from "react"
import {
  Heart,
  Ruler,
  Truck,
  Mail,
  Facebook,
  Twitter,
  MessageCircle,
  Star,
  Plus,
  Minus,
  ShoppingCart,
  Eye,
  BarChart3,
} from "lucide-react"
import { useParams } from "react-router-dom"
import { useCart } from "../context/Cartcontext"

// Reusable Button component (supports size, variant, disabled, className)
function Button({ children, size = "md", variant = "default", disabled, className = "", ...props }) {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
  const sizeClasses = {
    sm: "px-2.5 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  }
  const variantClasses = {
    default: "bg-green-600 text-white hover:bg-green-700 disabled:bg-green-300",
    outline: "border border-gray-300 hover:border-green-600 text-gray-700 hover:text-green-600 disabled:border-gray-200 disabled:text-gray-400",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  }

  const appliedClasses = [
    baseClasses,
    sizeClasses[size] || sizeClasses.md,
    variantClasses[variant] || variantClasses.default,
    disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
    className,
  ].join(" ")

  return (
    <button disabled={disabled} className={appliedClasses} {...props}>
      {children}
    </button>
  )
}

// Simple Badge component
function Badge({ children, variant = "default", className = "" }) {
  const baseClasses = "inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold"
  const variantClasses = {
    default: "bg-gray-200 text-gray-800",
    destructive: "bg-red-600 text-white",
    green: "bg-green-600 text-white",
  }

  const appliedClasses = [baseClasses, variantClasses[variant] || variantClasses.default, className].join(" ")
  return <span className={appliedClasses}>{children}</span>
}

const paymentMethods = [
  { name: "PayPal", icon: "💳" },
  { name: "American Express", icon: "💳" },
  { name: "Apple Pay", icon: "🍎" },
  { name: "Visa", icon: "💳" },
  { name: "Shop Pay", icon: "🛍️" },
  { name: "Mastercard", icon: "💳" },
  { name: "Google Pay", icon: "🔵" },
]

export default function ProductDetails() {
  const { id ,type} = useParams()
  const {addToCart}=useCart();
  const [productData, setProductData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState("description")

  useEffect(() => {
    async function fetchProduct() {
        console.log(type)
      setLoading(true)
      setError(null)
      try {
        console.log(id)
        let res;
        if(type==="plant"){
             res = await fetch(`http://localhost:3000/product/plants/${id}`)
        }else{
            res = await fetch(`http://localhost:3000/accessory/get/${id}`)
        }
        if (!res.ok) throw new Error("Failed to fetch product details.")
        const data = await res.json()
        setProductData(data)
        // set initial variant if available
        const availableVariant = data.variants?.find(v => v.available)
        setSelectedVariant(availableVariant ? availableVariant.id : null)
        setSelectedImage(0)
        setQuantity(1)
      } catch (err) {
        setError(err.message || "Unknown error")
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1)
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto my-30 px-4 py-8 text-center text-gray-700">
        Loading product details...
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto my-30 px-4 py-8 text-center text-red-600">
        Error loading product: {error}
      </div>
    )
  }

  if (!productData) {
    return (
      <div className="max-w-7xl mx-auto my-30 px-4 py-8 text-center text-gray-700">
        No product found.
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto my-30 px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden group">
            {productData.isavailable && (
              <Badge className="absolute top-4 left-4 bg-green-600 hover:bg-green-700 z-10" variant="green">
                Soldout
              </Badge>
            )}
            <div className="aspect-square flex items-center justify-center p-8">
              <img
                src={productData.imageUrl?.[selectedImage] || "/placeholder.svg"}
                alt={productData.name}
                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Image Overlay Actions */}
            {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                <Button size="sm" variant="secondary" className="rounded-full p-2">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div> */}
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-2 overflow-x-auto">
            {productData.imageUrl?.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? "border-green-600" : "border-transparent hover:border-gray-300"
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${productData.name} ${index + 1}`}
                  className="w-full h-full object-contain p-2"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="space-y-6">
          {/* Product Title & Rating */}
          <div>
            {/* <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(productData.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">({productData.reviewCount} reviews)</span>
            </div> */}
            <h1 className="text-3xl  text-gray-900 mb-2">{productData.name}</h1>
            {/* <p className="text-sm text-gray-600">
              SKU: {productData.sku} | Category: {productData.category}
            </p> */}
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold  text-[rgb(121,163,7)]">${productData.price.toFixed(2)}</span>
            {productData.originalPrice && (
              <span className="text-xl text-gray-400 line-through">${productData.originalPrice.toFixed(2)}</span>
            )}
            {productData.originalPrice && (
              <Badge variant="destructive" className="text-xs">
                Save ${(productData.originalPrice - productData.price).toFixed(2)}
              </Badge>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">{productData.description}</p>

          {/* Product Options */}
          <div className="space-y-4">
            {/* Size Variants */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
              <div className="flex gap-2">
                {productData.variants?.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => variant.available && setSelectedVariant(variant.id)}
                    disabled={!variant.available}
                    className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                      selectedVariant === variant.id
                        ? "border-green-600 bg-green-50 text-green-600"
                        : variant.available
                        ? "border-gray-300 hover:border-gray-400"
                        : "border-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange("decrease")}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("increase")}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div className="flex flex-wrap gap-4 text-sm">
            <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
              <Ruler className="w-4 h-4" />
              Size Guide
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
              <Truck className="w-4 h-4" />
              Shipping
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
              <Mail className="w-4 h-4" />
              Ask About This product
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              size="lg"
              disabled={!productData.isavailable}
              className="flex-1 bg-[rgb(121,163,7)]"
              // keep green background only if enabled, handled inside Button
            >
              {productData.isavailable ? (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" onClick={()=>{
                    addToCart(productData,quantity)
                  }} />
                  Add to Cart
                </>
              ) : (
                "Soldout"
              )}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`${isWishlisted ? "bg-red-50 border-red-200 text-red-600" : ""}`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
            </Button>
            <Button size="lg" variant="outline">
              <BarChart3 className="w-4 h-4" />
            </Button>
          </div>

          {/* Payment Methods */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Guaranteed safe checkout</p>
            <div className="flex flex-wrap gap-2">
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center w-12 h-8 bg-gray-100 rounded border text-xs"
                  title={method.name}
                >
                  {method.icon}
                </div>
              ))}
            </div>
          </div>

          {/* Social Share */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Share:</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="rounded-full w-10 h-10 p-0">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="rounded-full w-10 h-10 p-0">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="rounded-full w-10 h-10 p-0">
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="flex gap-8">
            {["description", "specifications", "reviews", "shipping"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="py-8">
          {activeTab === "description" && (
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed">
                {productData.description}
              </p>
            </div>
          )}

          {activeTab === "specifications" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Product Details</h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Material</dt>
                    <dd className="font-medium text-gray-900">{productData.material || "N/A"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Weight</dt>
                    <dd className="font-medium text-gray-900">{productData.weight || "N/A"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Dimensions</dt>
                    <dd className="font-medium text-gray-900">{productData.dimensions || "N/A"}</dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Care Instructions</h3>
                <p className="text-gray-600">{productData.careInstructions || "No special care needed."}</p>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              {productData.reviews && productData.reviews.length > 0 ? (
                <ul className="space-y-6">
                  {productData.reviews.map((review, i) => (
                    <li key={i} className="border-b border-gray-200 pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <strong>{review.author}</strong>
                        <div className="flex items-center text-yellow-400">
                          {[...Array(5)].map((_, starIdx) => (
                            <Star
                              key={starIdx}
                              className={`w-4 h-4 ${
                                starIdx < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No reviews yet.</p>
              )}
            </div>
          )}

          {activeTab === "shipping" && (
            <div>
              <p className="text-gray-600">
                Shipping details and policies. Typically ships within 1-3 business days. Free shipping on orders over $50.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
