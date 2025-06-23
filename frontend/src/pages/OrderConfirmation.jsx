"use client"
import { useState } from "react"
import { Check, MapPin, CreditCard, Truck, User, Heart, Star } from "lucide-react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

export default function OrderConfirmation({
  cartItems,
  subtotal,
  shipping,
  tax,
  discount,
  total,
  shippingInfo,
  paymentInfo,
}) {
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")
  const [showCelebration, setShowCelebration] = useState(false)
  const [showOrderInfo, setShowOrderInfo] = useState(false)
  const [orderError, setOrderError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleConfirmOrder = async () => {
    const generatedOrderNumber = "PLNT-" + Math.floor(100000 + Math.random() * 900000)
    setOrderNumber(generatedOrderNumber)
    setLoading(true)
    setOrderError(null)

    try {
      const response = await fetch("http://localhost:3000/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
        setOrderPlaced(true)
        setShowCelebration(true)
        setShowOrderInfo(true)
        setTimeout(() => setShowCelebration(false), 3000)
      } else {
        throw new Error("Order was not confirmed by server")
      }
    } catch (error) {
      console.error("Error placing order:", error.message)
      setOrderError("❌ Failed to place your order. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const confettiColors = [
    "bg-pink-400", "bg-yellow-400", "bg-green-400", "bg-blue-400",
    "bg-purple-400", "bg-red-400", "bg-orange-400", "bg-indigo-400"
  ]

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <motion.div
        className="max-w-2xl w-full mt-30 bg-white rounded-3xl shadow-xl p-10 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-50"
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Confetti and animations here (same as your original) */}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showOrderInfo ? (
            // ✅ Order success info (same as your original)
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              {/* Order confirmed info UI */}
            </motion.div>
          ) : orderError ? (
            <div className="text-center text-red-600 text-lg">{orderError}</div>
          ) : (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Ready to place your order?</h2>
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition"
                onClick={handleConfirmOrder}
                disabled={loading}
              >
                {loading ? "Placing..." : "Confirm Order"}
              </button>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
