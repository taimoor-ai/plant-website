

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
  ChevronRight,
} from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "../context/Cartcontext"

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
    return <OrderConfirmation orderNumber={orderNumber} cartItems={cartItems} total={total} />
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

// Professional Cart Review Component
function CartReview({ cartItems, updateQuantity, removeItem }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <p className="mt-2 text-gray-600">Review your selected plants before checkout</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <div className="text-6xl mb-6">🌱</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-600 mb-8">Discover our beautiful collection of plants</p>
          <Link
            href="/shop"
            className="inline-flex items-center px-6 py-3 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 transition-colors"
          >
            Browse Plants
            <ChevronRight size={16} className="ml-2" />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-6">
                <div className="relative">
                  <img
                    src={item.imageUrl[0] || "/placeholder.svg"}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-xl bg-gray-100"
                  />
                  {item.originalPrice && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      SALE
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                      <div className="mt-1 flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm text-gray-600">{item.rating}</span>
                          <span className="ml-1 text-sm text-gray-400">({item.reviews} reviews)</span>
                        </div>
                      </div>
                      <div className="mt-2 space-y-1">
                        <div className="text-sm text-gray-600">
                          Size: <span className="font-medium">{item.size}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Pot: <span className="font-medium">{item.pot}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item._id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-700">Quantity:</span>
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        {item.originalPrice && (
                          <span className="text-lg text-gray-400 line-through">pkr{item.originalPrice.toFixed(2)}</span>
                        )}
                        <span className="text-2xl font-bold text-green-700">pkr{item.price.toFixed(2)}</span>
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-sm text-gray-500 mt-1">
                          pkr{(item.price * item.quantity).toFixed(2)} total
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Professional Shipping Form Component
function ShippingForm({ shippingInfo, setShippingInfo }) {
  const handleInputChange = (field, value) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Shipping Information</h1>
        <p className="mt-2 text-gray-600">Where should we deliver your plants?</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <form className="space-y-6">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  value={shippingInfo.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  value={shippingInfo.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={shippingInfo.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={shippingInfo.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                <input
                  type="text"
                  value={shippingInfo.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="123 Main Street"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apartment, suite, etc. (optional)
                </label>
                <input
                  type="text"
                  value={shippingInfo.apartment}
                  onChange={(e) => handleInputChange("apartment", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Apt 4B"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <input
                    type="text"
                    value={shippingInfo.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="New York"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                  <select
                    value={shippingInfo.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select State</option>
                    <option value="NY">New York</option>
                    <option value="CA">California</option>
                    <option value="TX">Texas</option>
                    <option value="FL">Florida</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                  <input
                    type="text"
                    value={shippingInfo.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="10001"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Method */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Method</h3>
            <div className="space-y-4">
              <label className="flex items-center p-4 border-2 border-green-200 bg-green-50 rounded-xl cursor-pointer">
                <input
                  type="radio"
                  name="shippingMethod"
                  value="standard"
                  checked={shippingInfo.shippingMethod === "standard"}
                  onChange={(e) => handleInputChange("shippingMethod", e.target.value)}
                  className="text-green-600 focus:ring-green-500"
                />
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">Standard Shipping</div>
                      <div className="text-sm text-gray-600">5-7 business days • Free plant care guide included</div>
                    </div>
                    <div className="text-lg font-bold text-green-700">$15.00</div>
                  </div>
                </div>
              </label>

              <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 transition-colors">
                <input
                  type="radio"
                  name="shippingMethod"
                  value="express"
                  checked={shippingInfo.shippingMethod === "express"}
                  onChange={(e) => handleInputChange("shippingMethod", e.target.value)}
                  className="text-green-600 focus:ring-green-500"
                />
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">Express Shipping</div>
                      <div className="text-sm text-gray-600">2-3 business days • Priority handling</div>
                    </div>
                    <div className="text-lg font-bold text-gray-900">$25.00</div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

// Professional Payment Form Component
function PaymentForm({ paymentInfo, setPaymentInfo }) {
  const handleInputChange = (field, value) => {
    setPaymentInfo((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Payment Information</h1>
        <p className="mt-2 text-gray-600">Secure payment processing with 256-bit SSL encryption</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        {/* Payment Method Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Method</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-center p-4 border-2 border-green-200 bg-green-50 rounded-xl cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentInfo.paymentMethod === "card"}
                onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                className="text-green-600 focus:ring-green-500"
              />
              <div className="ml-3 flex items-center space-x-3">
                <CreditCard size={24} className="text-green-700" />
                <span className="font-semibold text-gray-900">Credit Card</span>
              </div>
            </label>

            <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentInfo.paymentMethod === "paypal"}
                onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                className="text-green-600 focus:ring-green-500"
              />
              <div className="ml-3 flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
                <span className="font-semibold text-gray-900">PayPal</span>
              </div>
            </label>

            <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value="apple"
                checked={paymentInfo.paymentMethod === "apple"}
                onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                className="text-green-600 focus:ring-green-500"
              />
              <div className="ml-3 flex items-center space-x-3">
                <div className="w-6 h-6 bg-black rounded"></div>
                <span className="font-semibold text-gray-900">Apple Pay</span>
              </div>
            </label>
          </div>
        </div>

        {/* Credit Card Form */}
        {paymentInfo.paymentMethod === "card" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
              <div className="relative">
                <input
                  type="text"
                  value={paymentInfo.cardNumber}
                  onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <CreditCard size={20} className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                <input
                  type="text"
                  value={paymentInfo.expiryDate}
                  onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                <input
                  type="text"
                  value={paymentInfo.cvv}
                  onChange={(e) => handleInputChange("cvv", e.target.value)}
                  placeholder="123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name *</label>
              <input
                type="text"
                value={paymentInfo.cardName}
                onChange={(e) => handleInputChange("cardName", e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="saveCard"
                checked={paymentInfo.saveCard}
                onChange={(e) => handleInputChange("saveCard", e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="saveCard" className="ml-2 text-sm text-gray-700">
                Save this card for future purchases
              </label>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex items-start space-x-3">
            <Shield className="text-green-600 mt-0.5" size={20} />
            <div>
              <div className="font-semibold text-gray-900">Your payment is secure</div>
              <div className="text-sm text-gray-600 mt-1">
                We use industry-standard encryption to protect your payment information. Your card details are never
                stored on our servers.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Professional Order Summary Component
function OrderSummary({
  cartItems,
  subtotal,
  shipping,
  tax,
  discount,
  total,
  currentStep,
  setCurrentStep,
  onPlaceOrder,
  shippingInfo,
  paymentInfo,
}) {
  const canProceed = () => {
    if (currentStep === 1) return cartItems.length > 0
    if (currentStep === 2) {
      return shippingInfo.firstName && shippingInfo.lastName && shippingInfo.email && shippingInfo.address
    }
    if (currentStep === 3) {
      if (paymentInfo.paymentMethod === "card") {
        return paymentInfo.cardNumber && paymentInfo.expiryDate && paymentInfo.cvv && paymentInfo.cardName
      }
      return true
    }
    return false
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      onPlaceOrder()
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 sticky top-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

      {/* Cart Items Preview */}
      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={item.imageUrl[0] || "/placeholder.svg"}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg bg-gray-100"
              />
              <div className="absolute -top-2 -right-2 bg-green-700 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {item.quantity}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 truncate">{item.name}</div>
              <div className="text-sm text-gray-600">
                {item.size} • {item.pot}
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-gray-900">pkr{(item.price * item.quantity).toFixed(2)}</div>
              {item.originalPrice && (
                <div className="text-sm text-gray-400 line-through">
                  pkr{(item.originalPrice * item.quantity).toFixed(2)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-3 border-t border-gray-200 pt-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium">pkr{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="font-medium">{shipping.toFixed(2)} pkr</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span className="font-medium">{tax.toFixed(2)} pkr</span>
        </div>
        <div className="flex justify-between text-green-600">
          <span>Discount</span>
          <span className="font-medium">-{discount.toFixed(2)} pkr</span>
        </div>
        <div className="flex justify-between text-xl font-bold text-gray-900 border-t border-gray-200 pt-3">
          <span>Total</span>
          <span className="text-green-700">{total.toFixed(2)} pkr</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 space-y-4">
        {currentStep > 1 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="w-full py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className="w-full py-4 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg"
        >
          {currentStep === 3 ? "Complete Order" : "Continue"}
        </button>
      </div>

      {/* Trust Badges */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="flex flex-col items-center space-y-2">
            <Shield className="text-green-600" size={24} />
            <span className="text-xs text-gray-600 font-medium">Secure Payment</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Truck className="text-green-600" size={24} />
            <span className="text-xs text-gray-600 font-medium">Fast Delivery</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Professional Order Confirmation Component
function OrderConfirmation({ orderNumber, cartItems, total }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="text-green-600" size={48} />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-8">Thank you for choosing PLANTO. Your plants are on their way!</p>

          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 mb-8">
            <div className="text-sm font-medium text-green-800 mb-2">Order Number</div>
            <div className="text-3xl font-bold text-green-700">{orderNumber}</div>
          </div>

          <div className="text-left bg-gray-50 rounded-2xl p-6 mb-8">
            <h3 className="font-bold text-gray-900 mb-4 text-center">Order Summary</h3>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium">pkr{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-green-700">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Link
              href="/shop"
              className="block w-full py-4 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 transition-colors text-lg"
            >
              Continue Shopping
            </Link>
            <Link
              href="/orders"
              className="block w-full py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Track Your Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
