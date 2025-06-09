const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema(
  {
    user: {
      name: {
        type: String,
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
      enum: ["pending", "dispatch", "delivered", "completed","confirmed","cancelled"],
      default: "pending"
    },
    PaymentMethod: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Orders", ordersSchema);
