import React from 'react'
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
export default function OrderSummary({
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
            <span className="font-medium">{subtotal.toFixed(2)} pkr</span>
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
            {currentStep === 3 ? "Continue" : "Continue"}
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
  
  