"use client"

import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const AdminRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth()

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" />
  }

  return children
}

export default AdminRoute

