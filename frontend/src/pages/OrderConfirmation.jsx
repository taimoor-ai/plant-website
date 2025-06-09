"use client"
import { useEffect, useState } from "react"
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
  onPlaceOrder,
  shippingInfo,
  paymentInfo,
}) {
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")
  const [showCelebration, setShowCelebration] = useState(false)
  const [showOrderInfo, setShowOrderInfo] = useState(false)
  const [orderError, setOrderError] = useState(null)

  useEffect(() => {
    const placeOrder = async () => {
      const generatedOrderNumber = "PLNT-" + Math.floor(100000 + Math.random() * 900000)
      setOrderNumber(generatedOrderNumber)

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

        // If backend confirms success
        if (data.success) {
          setOrderPlaced(true)
          setShowCelebration(true)
          setShowOrderInfo(true)

          setTimeout(() => {
            setShowCelebration(false)
          }, 3000)
        } else {
          throw new Error("Order was not confirmed by server")
        }
      } catch (error) {
        console.error("Error placing order:", error.message)
        setOrderError("❌ Failed to place your order. Please try again later.")
      }
    }

    setTimeout(() => {
      placeOrder()
    }, 1500)
  }, [])

  const confettiColors = [
    "bg-pink-400",
    "bg-yellow-400",
    "bg-green-400",
    "bg-blue-400",
    "bg-purple-400",
    "bg-red-400",
    "bg-orange-400",
    "bg-indigo-400",
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
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={`confetti-${i}`}
                  className={`absolute w-3 h-3 ${confettiColors[i % confettiColors.length]} rounded-sm`}
                  initial={{ x: Math.random() * window.innerWidth, y: -20, rotate: 0, opacity: 1 }}
                  animate={{ y: window.innerHeight + 100, rotate: 360, opacity: [1, 1, 0] }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    ease: "linear",
                    delay: Math.random() * 0.5,
                  }}
                />
              ))}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`heart-${i}`}
                  className="absolute text-pink-400"
                  initial={{ x: Math.random() * 400 + 100, y: -20, scale: 0 }}
                  animate={{ y: 600, scale: [0, 1, 0.8, 0], rotate: [0, 180, 360] }}
                  transition={{ duration: 4, ease: "easeOut", delay: Math.random() * 1 }}
                >
                  <Heart size={20} fill="currentColor" />
                </motion.div>
              ))}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`star-${i}`}
                  className="absolute text-yellow-400"
                  initial={{ x: Math.random() * 500 + 50, y: Math.random() * 200 + 50, scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1, 1.5, 0], opacity: [0, 1, 1, 0], rotate: [0, 180] }}
                  transition={{
                    duration: 2,
                    ease: "easeOut",
                    delay: Math.random() * 2,
                    repeat: 1,
                  }}
                >
                  <Star size={16} fill="currentColor" />
                </motion.div>
              ))}
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  className="absolute w-2 h-2 bg-white rounded-full shadow-lg"
                  style={{ boxShadow: "0 0 6px #fbbf24, 0 0 12px #fbbf24" }}
                  initial={{
                    x: Math.random() * 600,
                    y: Math.random() * 400,
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    y: [null, Math.random() * 100 - 50],
                    x: [null, Math.random() * 100 - 50],
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "easeOut",
                    delay: Math.random() * 2,
                    repeat: 1,
                  }}
                />
              ))}
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={`glitter-${i}`}
                  className="absolute w-1 h-1 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full"
                  initial={{ x: Math.random() * 600, y: Math.random() * 400, scale: 0 }}
                  animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: Math.random() * 3,
                    repeat: 2,
                    repeatDelay: 0.5,
                  }}
                />
              ))}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`ribbon-${i}`}
                  className="absolute w-16 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
                  initial={{ x: Math.random() * 400 + 100, y: -20, rotate: 0 }}
                  animate={{
                    y: 600,
                    rotate: 720,
                    x: [null, Math.random() * 200 - 100],
                  }}
                  transition={{
                    duration: 4,
                    ease: "easeOut",
                    delay: Math.random() * 1,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showOrderInfo ? (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <motion.div
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
              >
                <Check className="text-green-600" size={48} />
              </motion.div>

              <h1 className="text-4xl font-bold text-center text-gray-900 mb-3">Order Confirmed!</h1>
              <p className="text-center text-lg text-gray-600 mb-6">
                Thank you for choosing <span className="font-bold">PLANTIFY</span> 🌿<br />
                Your plants are on their way!
              </p>

              <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-6 text-center">
                <p className="text-sm text-green-700 font-medium">Order Number</p>
                <p className="text-2xl font-bold text-green-800">{orderNumber}</p>
              </div>

              <div className="mb-4 text-sm text-gray-700">
                <div className="mb-2 font-semibold flex items-center gap-2">
                  <User size={16} />
                  {shippingInfo.fullName}
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <MapPin size={16} />
                  {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.country}
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <Truck size={16} />
                  Shipping Method: {shippingInfo.shippingMethod}
                </div>
                <div className="mb-4 flex items-center gap-2">
                  <CreditCard size={16} />
                  Payment: {paymentInfo.paymentMethod}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl mb-6">
                <h3 className="font-bold text-gray-800 mb-3">Order Summary</h3>
                {cartItems.map((item, index) => (
                  <div key={item.id} className="flex justify-between text-sm mb-2">
                    <span>{item.name} × {item.quantity}</span>
                    <span className="font-medium">PKR {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <hr className="my-3" />
                <div className="text-sm space-y-1">
                  <div className="flex justify-between"><span>Subtotal</span><span>PKR {subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Shipping</span><span>PKR {shipping.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Tax</span><span>PKR {tax.toFixed(2)}</span></div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-700">
                      <span>Discount</span><span>-PKR {discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span><span className="text-green-700">PKR {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link to="/shop" className="block w-full py-3 text-center bg-green-700 text-white rounded-xl font-bold hover:bg-green-800 transition">
                  Continue Shopping
                </Link>
                <Link to="/orders" className="block w-full py-3 text-center border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50">
                  Track Your Order
                </Link>
              </div>
            </motion.div>
          ) : orderError ? (
            <div className="text-center text-red-600 text-lg">{orderError}</div>
          ) : (
            <div className="text-center text-lg text-gray-600">Placing your order...</div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
