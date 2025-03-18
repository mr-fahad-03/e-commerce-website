import mongoose from "mongoose"

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    oldPrice: {
      type: Number,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: ["Smart Watches", "Casual Watches", "Wallets", "Luxury Watches", "Sports Watches", "Accessories"],
      default: "Casual Watches",
    },
    movement: {
      type: String,
      default: "Automatic",
    },
    caseMaterial: {
      type: String,
      default: "Stainless Steel",
    },
    waterResistance: {
      type: String,
      default: "100m",
    },
    warranty: {
      type: String,
      default: "2 Years",
    },
  },
  {
    timestamps: true,
  },
)

const Product = mongoose.model("Product", productSchema)

export default Product

