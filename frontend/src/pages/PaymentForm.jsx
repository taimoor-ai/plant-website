"use client"
import { CreditCard, Shield, Truck } from "lucide-react"

export default function PaymentForm({ paymentInfo, setPaymentInfo }) {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <label
              className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                paymentInfo.paymentMethod === "card"
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
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

            <label
              className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                paymentInfo.paymentMethod === "paypal"
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
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

            <label
              className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                paymentInfo.paymentMethod === "apple"
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
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

            <label
              className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                paymentInfo.paymentMethod === "cod"
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentInfo.paymentMethod === "cod"}
                onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                className="text-green-600 focus:ring-green-500"
              />
              <div className="ml-3 flex items-center space-x-3">
                <Truck size={24} className="text-orange-600" />
                <span className="font-semibold text-gray-900">Cash on Delivery</span>
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

        {/* Cash on Delivery Information */}
        {paymentInfo.paymentMethod === "cod" && (
          <div className="space-y-6">
            <div className="p-6 bg-orange-50 rounded-xl border border-orange-200">
              <div className="flex items-start space-x-3">
                <Truck className="text-orange-600 mt-0.5" size={20} />
                <div>
                  <div className="font-semibold text-gray-900">Cash on Delivery</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Pay with cash when your order is delivered to your doorstep. Please keep the exact amount ready for
                    a smooth transaction.
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">COD Terms & Conditions:</h4>
              <ul className="text-sm text-gray-600 space-y-2 ml-4">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Payment must be made in cash at the time of delivery
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Additional COD charges may apply (₹50 for orders below ₹500)
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Please inspect your order before making payment
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  COD is available for orders up to ₹50,000
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex items-start space-x-3">
            <Shield className="text-green-600 mt-0.5" size={20} />
            <div>
              <div className="font-semibold text-gray-900">
                {paymentInfo.paymentMethod === "cod" ? "Secure Delivery" : "Your payment is secure"}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {paymentInfo.paymentMethod === "cod"
                  ? "Our delivery partners are trained professionals who will handle your order with care and ensure safe delivery to your doorstep."
                  : "We use industry-standard encryption to protect your payment information. Your card details are never stored on our servers."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
