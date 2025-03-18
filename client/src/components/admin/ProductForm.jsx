"use client"

import { useState, useEffect } from "react"
import { X, ImageIcon, Package, Star, MessageSquare, Tag } from "lucide-react"

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    oldPrice: "",
    countInStock: "",
    image: "",
    featured: false,
    category: "Casual Watches", // Default category
    rating: 0,
    numReviews: 0,
  })

  const [imagePreview, setImagePreview] = useState("")

  // Available categories
  const categories = ["Smart Watches", "Casual Watches", "Wallets", "Luxury Watches", "Sports Watches", "Accessories"]

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        brand: product.brand || "",
        description: product.description || "",
        price: product.price || "",
        oldPrice: product.oldPrice || "",
        countInStock: product.countInStock || "",
        image: product.image || "",
        featured: product.featured || false,
        category: product.category || "Casual Watches",
        rating: product.rating || 0,
        numReviews: product.numReviews || 0,
      })
      setImagePreview(product.image || "")
    }
  }, [product])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === "checkbox" ? checked : value

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }))

    // Update image preview when image URL changes
    if (name === "image") {
      setImagePreview(value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Convert string values to numbers
    const productData = {
      ...formData,
      price: Number.parseFloat(formData.price),
      oldPrice: formData.oldPrice ? Number.parseFloat(formData.oldPrice) : undefined,
      countInStock: Number.parseInt(formData.countInStock),
      rating: Number.parseFloat(formData.rating),
      numReviews: Number.parseInt(formData.numReviews),
    }

    onSubmit(productData)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{product ? "Edit Product" : "Add New Product"}</h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500 p-2 hover:bg-gray-100 rounded-full transition-colors"
          type="button"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                Brand
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                placeholder="Enter brand name"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center space-x-1">
                  <Tag size={16} />
                  <span>Category</span>
                </div>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                placeholder="Enter product description"
                required
              ></textarea>
            </div>
          </div>

          {/* Image Preview Section */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              {imagePreview ? (
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Product preview"
                  className="mx-auto h-48 w-full object-cover rounded-lg"
                  onError={() => setImagePreview("")}
                />
              ) : (
                <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg">
                  <ImageIcon size={48} className="text-gray-400" />
                </div>
              )}
            </div>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
              placeholder="Enter image URL"
              required
            />
          </div>
        </div>

        {/* Pricing and Stock */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center space-x-1">
                <span className="font-medium">Rs</span>
                <span>Price</span>
              </div>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center space-x-1">
                <span className="font-medium">Rs</span>
                <span>Old Price (Optional)</span>
              </div>
            </label>
            <input
              type="number"
              id="oldPrice"
              name="oldPrice"
              value={formData.oldPrice}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center space-x-1">
                <Package size={16} />
                <span>Stock</span>
              </div>
            </label>
            <input
              type="number"
              id="countInStock"
              name="countInStock"
              value={formData.countInStock}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
              placeholder="0"
              required
            />
          </div>
        </div>

        {/* Ratings and Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center space-x-1">
                <Star size={16} />
                <span>Rating (0-5)</span>
              </div>
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center space-x-1">
                <MessageSquare size={16} />
                <span>Number of Reviews</span>
              </div>
            </label>
            <input
              type="number"
              id="numReviews"
              name="numReviews"
              value={formData.numReviews}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
              required
            />
          </div>
        </div>

        {/* Featured Toggle */}
        <div className="flex items-center space-x-3 py-4">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="h-5 w-5 text-black focus:ring-2 focus:ring-black border-gray-300 rounded transition-colors"
          />
          <label htmlFor="featured" className="text-sm font-medium text-gray-700">
            Mark as Featured Product
          </label>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
          >
            {product ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm

