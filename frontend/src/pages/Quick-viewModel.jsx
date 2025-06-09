
import { useState, useEffect } from "react"
import { X, Plus, Minus } from "lucide-react"
import { useCart } from "../context/Cartcontext"
export default function QuickViewModal({ isOpen, onClose, product }){
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  console.log(product)
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1)
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product?.name} to cart`)
    addToCart(product,quantity)
    onClose()
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen || !product) return null

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl overflow-hidden max-w-5xl w-full max-h-[80vh] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-5 h-full">
          {/* Left Column - Product Image (2/5 width) */}
          <div className="col-span-2 bg-gray-100 relative flex items-center justify-center p-8">
            {/* Soldout Badge */}
            {product.status === "soldout" && (
              <span className="absolute top-6 left-6 bg-green-600 text-white text-sm font-medium px-4 py-2 rounded">
                Soldout
              </span>
            )}

            {/* Product Image */}
            <div className="flex items-center justify-center h-full">
              <img
                src={product.imageUrl[0] || "/placeholder.svg?height=400&width=400"}
                alt={product.name}
                className="max-h-80 max-w-full object-contain"
              />
            </div>
          </div>

          {/* Right Column - Product Details (3/5 width) */}
          <div className="col-span-3 p-8 flex flex-col">
            {/* Product Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4 tracking-wide">{product.name.toUpperCase()}</h2>

            {/* Price */}
            <div className="mb-6">
              <span className="text-xl text-gray-600">${product.price.toFixed(2)}</span>
            </div>

            {/* Product Description */}
            <div className="text-gray-600 leading-relaxed mb-8 flex-1">
              <p>{product.description}</p>
            </div>

            {/* Quantity and Add to Cart Section */}
            <div className="space-y-6">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>

                <div className="w-16 h-10 border-b-2 border-gray-300 flex items-center justify-center">
                  <span className="text-lg font-medium">{quantity.toString().padStart(2, "0")}</span>
                </div>

                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={()=>{handleAddToCart()}}
                disabled={product.isavailable === false}
                className={`w-full rounded-2xl py-4 px-6 text-white font-bold text-lg transition-colors ${
                  product.status === "soldout" ? "bg-gray-400 cursor-not-allowed" : "bg-[rgb(121,163,7)] hover:bg-[rgb(115,200,2)]"
                }`}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

