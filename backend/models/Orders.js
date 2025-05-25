const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema(
  {
    user: {
      name: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      }
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "products.modelType",
        },
        modelType: {
          type: String,
          required: true,
          enum: ["accessories", "plants"]
        },
        quantity: {
          type: Number,
          default: 1
        }
      }
    ],
    totalPrice: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Orders", ordersSchema);
