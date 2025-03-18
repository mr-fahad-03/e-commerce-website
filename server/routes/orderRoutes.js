import express from "express"
import asyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"
import { protect } from "../middleware/authMiddleware.js"
import { sendOrderPlacedEmail } from "../utils/emailService.js"

const router = express.Router()

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, itemsPrice, shippingPrice, totalPrice } = req.body

    if (orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error("No order items")
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        itemsPrice,
        shippingPrice,
        totalPrice,
      })

      const createdOrder = await order.save()

      // Send order confirmation email
      try {
        await sendOrderPlacedEmail(createdOrder)
        console.log(`Order confirmation email sent for order ${createdOrder._id}`)
      } catch (emailError) {
        console.error("Failed to send order confirmation email:", emailError)
        // Don't fail the order creation if email fails
      }

      res.status(201).json(createdOrder)
    }
  }),
)

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
router.get(
  "/myorders",
  protect,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
  }),
)

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
      res.json(order)
    } else {
      res.status(404)
      throw new Error("Order not found")
    }
  }),
)

export default router

