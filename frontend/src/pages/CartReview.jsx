import React from 'react'
import { Link } from 'react-router-dom'
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
export default function CartReview({ cartItems, updateQuantity, removeItem }) {
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
                          <span className="text-lg text-gray-400 line-through">{item.originalPrice.toFixed(2)} pkr </span>
                        )}
                        <span className="text-2xl font-bold text-green-700">{item.price.toFixed(2)} pkr</span>
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
