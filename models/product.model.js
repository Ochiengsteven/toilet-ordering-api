const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Toilet name is required"],
      default: "Single door toilet",
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
      required: [true, "Toilet price is required"],
    },
    quantity: {
      type: Number,
      default: 0,
      required: [true, "Toilet quantity is required"],
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    paymentType: {
      type: String,
      enum: ["Cash", "Installments"],
      default: "Cash",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
