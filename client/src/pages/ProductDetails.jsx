"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import { useCart } from "../context/CartContext"
import { Star, Minus, Plus, ShoppingCart, ArrowLeft, Check } from "lucide-react"

const ProductDetails = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)

  const formatPrice = (price) => {
    return `Rs ${price.toLocaleString()}`
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`)
        setProduct(data)
        setLoading(false)
      } catch (error) {
        setError("Failed to load product details. Please try again later.")
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleQuantityChange = (value) => {
    if (quantity + value > 0) {
      setQuantity(quantity + value)
    }
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAddedToCart(true)

    // Reset the added to cart message after 3 seconds
    setTimeout(() => {
      setAddedToCart(false)
    }, 3000)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error || "Product not found"}</p>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
          Return to Home
        </Link>
      </div>
    )
  }

  // Mock data for multiple images (in a real app, this would come from the API)
  const productImages = [
    product.image,
    "/images/watch-detail-2.jpg",
    "/images/watch-detail-3.jpg",
    "/images/watch-detail-4.jpg",
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8">
        <ArrowLeft size={18} className="mr-2" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="mb-4 overflow-hidden rounded-lg">
            <img
              src={productImages[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`rounded-md overflow-hidden border-2 ${selectedImage === index ? "border-blue-600" : "border-transparent"}`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - view ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-gray-500 mb-4">{product.brand}</p>

          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < product.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">{product.numReviews} reviews</span>
          </div>

          <div className="mb-6">
            <span className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="ml-2 text-gray-500 line-through">{formatPrice(product.oldPrice)}</span>
            )}
          </div>

          <div className="border-t border-b py-6 mb-6">
            <p className="text-gray-700 mb-4">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-gray-600 text-sm">Movement</span>
                <p className="font-medium">{product.movement || "Automatic"}</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">Case Material</span>
                <p className="font-medium">{product.caseMaterial || "Stainless Steel"}</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">Water Resistance</span>
                <p className="font-medium">{product.waterResistance || "100m"}</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">Warranty</span>
                <p className="font-medium">{product.warranty || "2 Years"}</p>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <span className="text-gray-600 mr-4">Availability:</span>
              {product.countInStock > 0 ? (
                <span className="text-green-600 flex items-center">
                  <Check size={16} className="mr-1" />
                  In Stock
                </span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </div>
          </div>

          {product.countInStock > 0 && (
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <span className="text-gray-600 mr-4">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-3 py-2 text-gray-600 hover:text-blue-600"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 border-l border-r">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-3 py-2 text-gray-600 hover:text-blue-600"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full py-3 px-6 rounded-md font-medium flex items-center justify-center ${
                  addedToCart
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check size={18} className="mr-2" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} className="mr-2" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

