"use client"

import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { ShoppingCart } from "lucide-react"

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const formatPrice = (price) => {
    return `Rs ${price.toLocaleString()}`
  }

  return (
    <div className="card group">
      <Link to={`/product/${product._id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center">
            <button
              onClick={handleAddToCart}
              className="bg-white text-gray-900 py-2 px-4 rounded-full font-medium flex items-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              <ShoppingCart size={18} className="mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1 truncate">{product.name}</h3>
          <p className="text-gray-500 text-sm mb-2">{product.brand}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleAddToCart}
                className="md:hidden bg-gray-900 text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                <ShoppingCart size={16} />
              </button>
              <span className="font-bold text-gray-900">{formatPrice(product.price)}</span>
            </div>
            {product.oldPrice && (
              <span className="text-gray-500 line-through text-sm">{formatPrice(product.oldPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard

