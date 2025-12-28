import { useState } from "react"
import { MapPin, CreditCard, Truck } from "lucide-react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import Lottie from "lottie-react"
import success from "../assets/Animations/success.json"
import { useCart } from "../context/Cartcontext"
export default function OrderConfirmation({
  cartItems = [],
  subtotal = 0,
  shipping = 0,
  tax = 0,
  discount = 0,
  total = 0,
  shippingInfo = {},
  paymentInfo = {},
}) {
  const [orderNumber, setOrderNumber] = useState("")
  const [showOrderInfo, setShowOrderInfo] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [orderError, setOrderError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { clearCart } = useCart();
  const handleConfirmOrder = async () => {
    const generatedOrderNumber =
      "PLNT-" + Math.floor(100000 + Math.random() * 900000)

    setOrderNumber(generatedOrderNumber)
    setLoading(true)
    setOrderError(null)

    try {
      const response = await fetch("http://localhost:3000/order/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber: generatedOrderNumber,
          items: cartItems,
          subtotal,
          shipping,
          tax,
          discount,
          total,
          shippingInfo,
          paymentInfo,
        }),
      })

      if (!response.ok) throw new Error("Failed to place order")

      const data = await response.json()

      if (data.success) {
        setShowOrderInfo(true) // show animation screen
        clearCart(); // clear cart after order is placed
      } else {
        throw new Error("Order not confirmed")
      }
    } catch (error) {
      setOrderError("❌ Failed to place your order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <motion.div
        className="max-w-2xl mt-32 w-full bg-white rounded-3xl shadow-xl p-8 relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <AnimatePresence mode="wait">
          {/* ✅ SUCCESS FLOW */}
          {showOrderInfo ? (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              {/* 🎉 LOTTIE ANIMATION */}
              {!showDetails && (
                <div className="flex justify-center">
                  <Lottie
                    animationData={success}
                    loop={false}
                    autoplay
                    className="w-44 h-44"
                    onComplete={() => setShowDetails(true)}
                  />
                </div>
              )}

              {/* 📦 ORDER DETAILS (fade in after animation) */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-2">
                      Order Confirmed!
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Thank you for your purchase 🌱
                    </p>

                    <div className="bg-green-50 rounded-xl p-4 mb-6">
                      <p className="text-sm text-gray-600">Order Number</p>
                      <p className="text-lg font-semibold text-green-700">
                        {orderNumber}
                      </p>
                    </div>

                    {/* 📦 Items */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-4 text-left">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Truck className="w-5 h-5 text-green-600" />
                        Items
                      </h3>
                      {cartItems.map((item) => (
                        <div
                          key={item._id}
                          className="flex justify-between text-sm mb-1"
                        >
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span>${item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    {/* 📍 Shipping */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-4 text-left">
                      <h3 className="font-semibold flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-green-600" />
                        Shipping Address
                      </h3>
                      <p className="text-sm text-gray-700">
                        {shippingInfo?.name}
                        <br />
                        {shippingInfo?.address}
                        <br />
                        {shippingInfo?.city}, {shippingInfo?.country}
                      </p>
                    </div>

                    {/* 💳 Payment */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-4 text-left">
                      <h3 className="font-semibold flex items-center gap-2 mb-2">
                        <CreditCard className="w-5 h-5 text-green-600" />
                        Payment Method
                      </h3>
                      <p className="text-sm text-gray-700">
                        {paymentInfo?.paymentMethod} ••••{" "}
                        {paymentInfo?.last4}
                      </p>
                    </div>

                    {/* 💰 Summary */}
                    <div className="border rounded-xl p-4 mb-6">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Subtotal</span>
                        <span>${subtotal}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Shipping</span>
                        <span>${shipping}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Tax</span>
                        <span>${tax}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Discount</span>
                          <span>- ${discount}</span>
                        </div>
                      )}
                      <hr className="my-2" />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>${total}</span>
                      </div>
                    </div>

                    <Link
                      to="/"
                      className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl"
                    >
                      Continue Shopping 🌿
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : orderError ? (
            <div className="text-center text-red-600 font-semibold">
              {orderError}
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">
                Ready to place your order?
              </h2>
              <button
                onClick={handleConfirmOrder}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition disabled:opacity-50"
              >
                {loading ? "Placing Order..." : "Confirm Order"}
              </button>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
