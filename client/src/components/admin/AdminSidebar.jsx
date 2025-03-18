"use client"

import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut } from "lucide-react"

const AdminSidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { adminLogout } = useAuth()

  const handleLogout = () => {
    adminLogout()
    navigate("/admin/login")
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-full">
      <div className="p-6">
        <Link to="/admin/dashboard" className="flex items-center">
          <span className="text-xl font-bold">WatchCraft Admin</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-1">
          <li>
            <Link
              to="/admin/dashboard"
              className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                isActive("/admin/dashboard")
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <LayoutDashboard size={20} className="mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                isActive("/admin/products")
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Package size={20} className="mr-3" />
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/admin/orders"
              className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                isActive("/admin/orders")
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <ShoppingCart size={20} className="mr-3" />
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                isActive("/admin/users") ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Users size={20} className="mr-3" />
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/settings"
              className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                isActive("/admin/settings")
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Settings size={20} className="mr-3" />
              Settings
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white w-full"
        >
          <LogOut size={20} className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  )
}

export default AdminSidebar

