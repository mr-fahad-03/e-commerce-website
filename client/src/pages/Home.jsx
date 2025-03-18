"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import ProductCard from "../components/ProductCard"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [newArrivals, setNewArrivals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/products")

        // Filter for featured products and new arrivals
        const featured = data.filter((product) => product.featured).slice(0, 4)
        const newest = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8)

        setFeaturedProducts(featured)
        setNewArrivals(newest)
        setLoading(false)
      } catch (error) {
        setError("Failed to load products. Please try again later.")
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://t4.ftcdn.net/jpg/08/11/15/37/360_F_811153701_7gPmVssUpwljTVrE7vlMDzfINZqQuJY6.jpg"
            alt="Luxury watches"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Timeless Elegance on Your Wrist</h1>
            <p className="text-xl mb-8">
              Discover our collection of premium watches that combine craftsmanship, style, and precision.
            </p>
            <a href="#categories" className="btn-primary inline-flex items-center">
              Explore Collection
              <ArrowRight className="ml-2" size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Browse by Category</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Smart Watches Category */}
            <Link to="/shop?category=Smart Watches" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-lg h-80">
                <img
                  src="https://images.unsplash.com/photo-1617043786394-f977fa12eddf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Smart Watches"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Smart Watches</h3>
                  <p className="text-gray-200 mb-4">Technology meets style</p>
                  <span className="inline-flex items-center text-white font-medium">
                    Shop Now
                    <ArrowRight className="ml-2" size={16} />
                  </span>
                </div>
              </div>
            </Link>

            {/* Casual Watches Category */}
            <Link to="/shop?category=Casual Watches" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-lg h-80">
                <img
                  src="https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80"
                  alt="Casual Watches"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Casual Watches</h3>
                  <p className="text-gray-200 mb-4">Everyday elegance</p>
                  <span className="inline-flex items-center text-white font-medium">
                    Shop Now
                    <ArrowRight className="ml-2" size={16} />
                  </span>
                </div>
              </div>
            </Link>

            {/* Vaults Category */}
            <Link to="/shop?category=Vaults" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-lg h-80">
                <img
                  src="https://www.mugart.pk/wp-content/uploads/2022/06/WLT-106-b-min.jpg"
                  alt="Vaults"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Wallets</h3>
                  <p className="text-gray-200 mb-4">Protect your collection</p>
                  <span className="inline-flex items-center text-white font-medium">
                    Shop Now
                    <ArrowRight className="ml-2" size={16} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Watches</h2>
            <Link to="/shop" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
              View All
              <ArrowRight className="ml-1" size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-white mb-4">Special Offer</h2>
                <p className="text-blue-100 mb-6">Get up to 30% off on selected luxury watches. Limited time offer.</p>
                <a
                  href="#"
                  className="bg-white text-blue-600 hover:bg-blue-50 py-2 px-6 rounded-full font-medium inline-block w-max"
                >
                  Shop Now
                </a>
              </div>
              <div className="md:w-1/2">
                <img
                  src="https://c4.wallpaperflare.com/wallpaper/470/835/609/5bd2508aac734-wallpaper-preview.jpg"
                  alt="Special offer on luxury watches"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section id="new-arrivals" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
            <Link to="/shop" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
              View All
              <ArrowRight className="ml-1" size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">All transactions are secure and encrypted for your peace of mind.</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Get your order delivered quickly with our expedited shipping options.</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">All our watches come with a 2-year warranty and authenticity guarantee.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

