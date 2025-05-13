const mongoose = require("mongoose");

const CartSchema = mongoose.Schema(
  {
    user: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "user.userType"
      },
      userType: {
        type: String,
        required: true,
        enum: ["User", "GuestUser"]
      }
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "products.modelType" // Dynamic reference
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
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
