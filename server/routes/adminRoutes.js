import express from "express"
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import Order from "../models/orderModel.js"
import Product from "../models/productModel.js"
import generateToken from "../utils/generateToken.js"
import { protect, admin } from "../middleware/authMiddleware.js"
import { sendOrderNotification } from "../utils/emailService.js"
import { sendTrackingUpdateEmail } from "../utils/emailService.js"

const router = express.Router()

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password)) && user.isAdmin) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error("Invalid admin credentials")
    }
  }),
)

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private/Admin
router.get(
  "/profile",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error("User not found")
    }
  }),
)

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
router.get(
  "/stats",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const totalOrders = await Order.countDocuments()
    const totalProducts = await Product.countDocuments()
    const totalUsers = await User.countDocuments({ isAdmin: false })

    // Calculate total revenue
    const orders = await Order.find()
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0)

    res.json({
      totalOrders,
      totalProducts,
      totalUsers,
      totalRevenue,
    })
  }),
)

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private/Admin
router.get(
  "/orders",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({}).sort({ createdAt: -1 })
    res.json(orders)
  }),
)

// @desc    Get recent orders
// @route   GET /api/admin/orders/recent
// @access  Private/Admin
router.get(
  "/orders/recent",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({}).sort({ createdAt: -1 }).limit(5)
    res.json(orders)
  }),
)

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
router.put(
  "/orders/:id/status",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
      const previousStatus = order.status
      order.status = req.body.status
      const updatedOrder = await order.save()

      // Send notification email only if status has changed
      if (previousStatus !== req.body.status) {
        try {
          await sendOrderNotification(updatedOrder)
          console.log(`Order status update email sent for order ${updatedOrder._id}`)
        } catch (emailError) {
          console.error("Failed to send order status update email:", emailError)
          // Don't fail the order update if email fails
        }
      }

      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error("Order not found")
    }
  }),
)

// @desc    Update order tracking ID
// @route   PUT /api/admin/orders/:id/tracking
// @access  Private/Admin
router.put(
  "/orders/:id/tracking",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
      const previousTrackingId = order.trackingId
      order.trackingId = req.body.trackingId
      const updatedOrder = await order.save()

      // Send tracking update email only if tracking ID has changed
      if (previousTrackingId !== req.body.trackingId && req.body.trackingId) {
        try {
          await sendTrackingUpdateEmail(updatedOrder)
          console.log(`Tracking update email sent for order ${updatedOrder._id}`)
        } catch (emailError) {
          console.error("Failed to send tracking update email:", emailError)
          // Don't fail the order update if email fails
        }
      }

      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error("Order not found")
    }
  }),
)

// @desc    Send order notification email
// @route   POST /api/admin/orders/:id/notify
// @access  Private/Admin
router.post(
  "/orders/:id/notify",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
      res.status(404)
      throw new Error("Order not found")
    }

    const result = await sendOrderNotification(order)

    if (result.success) {
      res.json({
        message: "Notification sent successfully",
        messageId: result.messageId,
      })
    } else {
      res.status(500)
      throw new Error(`Failed to send notification: ${result.error}`)
    }
  }),
)

export default router

