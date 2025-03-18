"use client"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import { Home, ShoppingBag,Box,Watch, User, History, ShoppingCart } from "lucide-react"

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const { cartCount } = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  // Check if current path is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin')

  // Don't render navbar for admin routes
  if (isAdminRoute) {
    return null
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
              <Watch /> <span className="text-xl ml-2 font-bold text-black">Watch-Hub</span>
              </Link>
            </div>

            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/") ? "text-black" : "text-gray-500 hover:text-black"
                }`}
              >
                <Home size={18} />
                <span>Home</span>
              </Link>
              
              <Link
                to="/shop"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/shop") ? "text-black" : "text-gray-500 hover:text-black"
                }`}
              >
                <ShoppingBag size={18} />
                <span>Shop</span>
              </Link>

              <Link
                to="/orders"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/orders") ? "text-black" : "text-gray-500 hover:text-black"
                }`}
              >
                <Box size={18} />
                <span>Orders</span>
              </Link>

              <Link
                to="/cart"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium relative ${
                  isActive("/cart") ? "text-black" : "text-gray-500 hover:text-black"
                }`}
              >
                <ShoppingCart size={18} />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                    isProfileOpen ? "text-black" : "text-gray-500 hover:text-black"
                  }`}
                >
                  <User size={18} />
                  <span>{isAuthenticated ? user?.name : "Profile"}</span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl z-20">
                    {isAuthenticated ? (
                      <>
                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          My Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Login
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}


                <div className="flex justify-between items-center mt-4 px-5">
            {/* Watch-Hub (Left) */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Watch /> <span className="text-xl ml-2 font-bold text-black">Watch-Hub</span>
            </Link>

            {/* Profile/Login Icon (Right) */}
            <Link
              to={isAuthenticated ? "/profile" : "/login"}
              className={`flex flex-col items-center space-y-1 px-3 py-2 ${
                isActive("/profile") || isActive("/login") ? "text-black" : "text-gray-500"
              }`}
            >
              <div className="flex items-center">
              <User size={24} />
              <span className="text-xs">{isAuthenticated ? "Profile" : "Login"}</span>
              </div>
            </Link>
          </div>

              <div className="-m-5">
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
        <div className="flex justify-around items-center h-16">
          <Link
            to="/"
            className={`flex flex-col items-center space-y-1 px-3 py-2 ${
              isActive("/") ? "text-black" : "text-gray-500"
            }`}
          >
            <Home size={24} />
            <span className="text-xs">Home</span>
          </Link>

          <Link
            to="/shop"
            className={`flex flex-col items-center space-y-1 px-3 py-2 ${
              isActive("/shop") ? "text-black" : "text-gray-500"
            }`}
          >
            <ShoppingBag size={24} />
            <span className="text-xs">Shop</span>
          </Link>

          <Link
            to="/cart"
            className={`flex flex-col items-center space-y-1 px-3 py-2 relative ${
              isActive("/cart") ? "text-black" : "text-gray-500"
            }`}
          >
            <ShoppingCart size={24} />
            <span className="text-xs">Cart</span>
            {cartCount > 0 && (
              <span className="absolute top-0 right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to="/orders"
            className={`flex flex-col items-center space-y-1 px-3 py-2 ${
              isActive("/orders") ? "text-black" : "text-gray-500"
            }`}
          >
            <Box size={24} />
            <span className="text-xs">Orders</span>
          </Link>

         
        </div>
      </nav>
      </div>
      {/* Add padding to main content to account for fixed navbars */}
      <div className="mt-0 md:mt-16 mb-16 md:mb-0" />
    </>
  )
}

export default Navbar

