"use client"

import { createContext, useState, useEffect, useContext } from "react"
import axios from "axios"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const checkAuthStatus = async () => {
      const userToken = localStorage.getItem("userToken")
      const adminToken = localStorage.getItem("adminToken")

      if (userToken) {
        try {
          axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`
          const { data } = await axios.get("http://localhost:5000/api/users/profile")
          setUser(data)
          setAdmin(null)
        } catch (error) {
          console.error("Error checking user profile:", error)
          localStorage.removeItem("userToken")
          delete axios.defaults.headers.common["Authorization"]
          setUser(null)
        }
      }

      if (adminToken) {
        try {
          axios.defaults.headers.common["Authorization"] = `Bearer ${adminToken}`
          const { data } = await axios.get("http://localhost:5000/api/admin/profile")
          setAdmin(data)
          setUser(null)
        } catch (error) {
          console.error("Error checking admin profile:", error)
          localStorage.removeItem("adminToken")
          delete axios.defaults.headers.common["Authorization"]
          setAdmin(null)
        }
      }

      setLoading(false)
    }

    checkAuthStatus()
  }, [])

  const login = async (email, password) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/login", { email, password })
      localStorage.setItem("userToken", data.token)
      localStorage.removeItem("adminToken")
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`
      setUser(data)
      setAdmin(null)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      }
    }
  }

  const adminLogin = async (email, password) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/admin/login", { email, password })
      localStorage.setItem("adminToken", data.token)
      localStorage.removeItem("userToken")
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`
      setAdmin(data)
      setUser(null)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Admin login failed",
      }
    }
  }

  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/register", { name, email, password })
      localStorage.setItem("userToken", data.token)
      localStorage.removeItem("adminToken") // Clear admin token on register
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`
      setUser(data)
      setAdmin(null)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      }
    }
  }

  const logout = () => {
    localStorage.removeItem("userToken")
    localStorage.removeItem("adminToken") // Clear both tokens on logout
    delete axios.defaults.headers.common["Authorization"]
    setUser(null)
    setAdmin(null)
  }

  const adminLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("userToken") // Clear both tokens on admin logout
    delete axios.defaults.headers.common["Authorization"]
    setAdmin(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        loading,
        login,
        adminLogin,
        register,
        logout,
        adminLogout,
        isAuthenticated: !!user,
        isAdmin: !!admin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

