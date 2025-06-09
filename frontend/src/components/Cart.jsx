
import { useEffect } from "react"
import { useCart } from "../context/Cartcontext"
import { X, ShoppingCart, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Cart = () => {
  const { cart, isOpen, closeCart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
  const navigate=useNavigate();
  // Prevent scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeCart()
    }
  }

  // Format price
  const formatPrice = (price) => {
    return `pkr${price.toFixed(2)}`
  }


  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-50 flex justify-end" onClick={handleBackdropClick}>

      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-xl transform transition-transform animate-in slide-in-from-right duration-300">
        {/* Cart Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Your Cart
            <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              {cart.length} {cart.length === 1 ? "item" : "items"}
            </span>
          </h2>
          <button onClick={closeCart} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">Looks like you haven't added any plants to your cart yet.</p>
              <button
                onClick={closeCart}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item._id} className="flex border-b pb-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.imageUrl[0] || "/placeholder.svg?height=80&width=80"}
                      alt={item.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {item.variant && <p className="text-xs text-gray-500 mt-1">Size: {item.variant}</p>}

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 py-1 text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="font-medium text-gray-800">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="border-t p-4 space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-800">{formatPrice(getCartTotal())}</span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium text-gray-800">Calculated at checkout</span>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center text-lg">
              <span className="font-medium text-gray-800">Total</span>
              <span className="font-bold text-gray-900">{formatPrice(getCartTotal())}</span>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={clearCart}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Clear Cart
              </button>
              <button className="px-4 py-2 bg-[rgb(121,163,7)] text-white rounded-md hover:bg-green-700 transition-colors" onClick={()=>{
                closeCart()
                navigate("/checkout")
              }}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
