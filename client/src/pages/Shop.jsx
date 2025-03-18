"use client"

import { useState, useEffect } from "react"
import { Search, ChevronDown } from "lucide-react"
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom"
import { useCart } from "../context/CartContext"
import ProductCard from "../components/ProductCard"

const Shop = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { addToCart } = useCart()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [categories, setCategories] = useState(["all"])

  // Parse query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const categoryParam = params.get("category")

    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [location.search])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("https://e-commerce-api-sepia.vercel.app/api/products")
        setProducts(data)

        // Extract unique categories from products
        const uniqueCategories = ["all", ...new Set(data.map((product) => product.category).filter(Boolean))]
        setCategories(uniqueCategories)

        setLoading(false)
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching products")
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "under50" && product.price < 50000) ||
      (priceRange === "50to100" && product.price >= 50000 && product.price <= 100000) ||
      (priceRange === "over100" && product.price > 100000)

    return matchesSearch && matchesCategory && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return new Date(b.createdAt) - new Date(a.createdAt)
    }
  })

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)

    // Update URL with the selected category
    const params = new URLSearchParams(location.search)
    if (category === "all") {
      params.delete("category")
    } else {
      params.set("category", category)
    }

    navigate({
      pathname: location.pathname,
      search: params.toString(),
    })
  }

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold mb-2">Error</p>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-0 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {selectedCategory === "all" ? "Our Collection" : selectedCategory}
          </h1>
          <p className="mt-2 text-gray-600">
            {selectedCategory === "all"
              ? "Discover our premium selection of luxury timepieces"
              : `Browse our ${selectedCategory.toLowerCase()} collection`}
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>

            {/* Price Range Filter */}
            <div className="relative">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
              >
                <option value="all">All Prices</option>
                <option value="under50">Under Rs 50,000</option>
                <option value="50to100">Rs 50,000 - Rs 100,000</option>
                <option value="over100">Over Rs 100,000</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>

            {/* Sort By */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* No Results Message */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Shop

