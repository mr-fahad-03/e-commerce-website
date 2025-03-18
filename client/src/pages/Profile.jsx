import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { User, Mail, Phone, LogOut } from "lucide-react"

const Profile = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-black p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">My Profile</h1>
          <p className="text-gray-300">Manage your account settings and preferences</p>
        </div>

        <div className="p-6">
          {/* User Info Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-100 p-3 rounded-full">
                <User size={24} className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{user?.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-gray-100 p-3 rounded-full">
                <Mail size={24} className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>

            {user?.phone && (
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Phone size={24} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="mt-8 space-y-4">
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <button
              onClick={() => navigate("/orders")}
              className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              View My Orders
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              My Cart
            </button>
          </div>

          {/* Logout Button */}
          <div className="mt-8 pt-6 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile 