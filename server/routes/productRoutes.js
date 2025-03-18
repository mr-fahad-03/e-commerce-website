import express from "express"
import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"
import { protect, admin } from "../middleware/authMiddleware.js"

const router = express.Router()

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
  }),
)

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error("Product not found")
    }
  }),
)

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
router.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = new Product(req.body)
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  }),
)

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
router.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
      Object.keys(req.body).forEach((key) => {
        product[key] = req.body[key]
      })

      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      res.status(404)
      throw new Error("Product not found")
    }
  }),
)

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
      await product.remove()
      res.json({ message: "Product removed" })
    } else {
      res.status(404)
      throw new Error("Product not found")
    }
  }),
)

export default router

