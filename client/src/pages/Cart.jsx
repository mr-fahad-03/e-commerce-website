"use client"

import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react"

const Cart = () => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart()

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity)
  }

  const deliveryCharge = 200
  const totalWithDelivery = cartTotal + (cartItems.length > 0 ? deliveryCharge : 0)

  const formatPrice = (price) => {
    return `Rs ${price.toLocaleString()}`
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any watches to your cart yet.</p>
          <Link to="/" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item._id} className="p-6">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-24 sm:h-24 flex-shrink-0 overflow-hidden rounded-md mb-4 sm:mb-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="sm:ml-6 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                            <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                          </div>
                          <p className="text-lg font-medium text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border rounded-md">
                            <button
                              onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                              className="px-3 py-1 text-gray-600 hover:text-blue-600"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-4 py-1 border-l border-r">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-600 hover:text-blue-600"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="text-red-500 hover:text-red-700 flex items-center"
                          >
                            <Trash2 size={18} className="mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">{formatPrice(cartTotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Charge</span>
                  <span className="text-gray-900">{formatPrice(deliveryCharge)}</span>
                </div>

                <div className="border-t pt-4 flex justify-between font-medium">
                  <span className="text-gray-900">Total</span>
                  <span className="text-blue-600">{formatPrice(totalWithDelivery)}</span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md flex items-center justify-center"
                >
                  Proceed to Checkout
                </Link>

                <Link to="/" className="w-full text-center block mt-4 text-blue-600 hover:text-blue-800">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart

