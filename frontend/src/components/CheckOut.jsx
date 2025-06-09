

import { useState } from "react"
import {
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
  Check,
  Leaf,
  Plus,
  Minus,
  X,
  Lock,
  Star,
 
} from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "../context/Cartcontext"
import OrderConfirmation from "../pages/OrderConfirmation"
import CartReview from "../pages/CartReview"
import ShippingForm from "../pages/ShippingForm"
import PaymentForm from "../pages/PaymentForm"
import OrderSummary from "../pages/OrderSummary"
export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const {cart:cartItems, setCart:setCartItems,removeFromCart,updateQuantity} = useCart();

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    shippingMethod: "standard",
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    paymentMethod: "card",
    saveCard: false,
  })

  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")


  const removeItem = (id) => {
    removeFromCart(id)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = shippingInfo.shippingMethod === "express" ? 25.0 : 15.0
  const tax = subtotal * 0.08
  const discount = 20.0 // Sample discount
  const total = subtotal + shipping + tax - discount

  const handlePlaceOrder = () => {
    const orderNum = "PLT" + Math.random().toString(36).substr(2, 9).toUpperCase()
    setOrderNumber(orderNum)
    setOrderPlaced(true)
    setCurrentStep(4)
  }

  if (orderPlaced) {
    return <OrderConfirmation orderNumber={orderNumber} cartItems={cartItems} total={total} 
    subtotal={subtotal}
    shipping={shipping}
    tax={tax}
    discount={discount}
    currentStep={currentStep}
    setCurrentStep={setCurrentStep}
    onPlaceOrder={handlePlaceOrder}
    shippingInfo={shippingInfo}
    paymentInfo={paymentInfo} />
  }

  return (
    <div className="min-h-screen mt-32 bg-gray-50">
      {/* Professional Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/shop" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-medium">Back to Shop</span>
            </Link>

            

            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Lock size={16} />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center justify-center">
            <ol className="flex items-center space-x-8">
              {[
                { number: 1, title: "Cart", subtitle: "Review items" },
                { number: 2, title: "Shipping", subtitle: "Delivery details" },
                { number: 3, title: "Payment", subtitle: "Secure payment" },
                { number: 4, title: "Complete", subtitle: "Order confirmation" },
              ].map((step, index) => (
                <li key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                        currentStep >= step.number
                          ? "bg-green-700 border-green-700 text-white"
                          : "border-gray-300 text-gray-500"
                      }`}
                    >
                      {currentStep > step.number ? (
                        <Check size={16} />
                      ) : (
                        <span className="text-sm font-semibold">{step.number}</span>
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <div
                        className={`text-sm font-medium ${currentStep >= step.number ? "text-green-700" : "text-gray-500"}`}
                      >
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-400">{step.subtitle}</div>
                    </div>
                  </div>
                  {index < 3 && (
                    <div className={`w-16 h-0.5 mx-4 ${currentStep > step.number ? "bg-green-700" : "bg-gray-300"}`} />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-7">
            {currentStep === 1 && (
              <CartReview cartItems={cartItems} updateQuantity={updateQuantity} removeItem={removeItem} />
            )}
            {currentStep === 2 && <ShippingForm shippingInfo={shippingInfo} setShippingInfo={setShippingInfo} />}
            {currentStep === 3 && <PaymentForm paymentInfo={paymentInfo} setPaymentInfo={setPaymentInfo} />}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5">
            <OrderSummary
              cartItems={cartItems}
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              discount={discount}
              total={total}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              onPlaceOrder={handlePlaceOrder}
              shippingInfo={shippingInfo}
              paymentInfo={paymentInfo}
            />
          </div>
        </div>
      </div>
    </div>
  )
}




// Professional Payment Form Component


// Professional Order Summary Component
