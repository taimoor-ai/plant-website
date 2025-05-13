const Cart = require("../models/Cart");
const User = require("../models/Users");
const GuestUser = require("../models/guestUser");

// Helper to find the user from correct model
async function findUser(userId, userType) {
  if (userType === "User") return await User.findById(userId);
  if (userType === "GuestUser") return await GuestUser.findById(userId);
  return null;
}

// Add or update product in cart
exports.addToCart = async (req, res) => {
  const { userId, userType, productId, modelType, quantity } = req.body;

  try {
    const user = await findUser(userId, userType);
    if (!user) return res.status(404).json({ message: "User not found" });

    let cart = await Cart.findOne({
      "user.userId": userId,
      "user.userType": userType
    });

    if (!cart) {
      cart = new Cart({
        user: { userId, userType },
        products: [{ productId, modelType, quantity }],
        totalPrice: 0
      });
    } else {
      const existingProduct = cart.products.find(
        (item) =>
          item.productId.toString() === productId &&
          item.modelType === modelType
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ productId, modelType, quantity });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get cart by user
exports.getCart = async (req, res) => {
  const { userId, userType } = req.params;

  try {
    const user = await findUser(userId, userType);
    if (!user) return res.status(404).json({ message: "User not found" });

    const cart = await Cart.findOne({
      "user.userId": userId,
      "user.userType": userType
    }).populate("products.productId");

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update quantity of a product
exports.updateProductQuantity = async (req, res) => {
  const { userId, userType, productId, modelType, quantity } = req.body;

  try {
    const user = await findUser(userId, userType);
    if (!user) return res.status(404).json({ message: "User not found" });

    const cart = await Cart.findOne({
      "user.userId": userId,
      "user.userType": userType
    });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const product = cart.products.find(
      (item) =>
        item.productId.toString() === productId &&
        item.modelType === modelType
    );

    if (!product) return res.status(404).json({ message: "Product not found" });

    product.quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove a product from cart
exports.removeProduct = async (req, res) => {
  const { userId, userType, productId, modelType } = req.body;

  try {
    const user = await findUser(userId, userType);
    if (!user) return res.status(404).json({ message: "User not found" });

    const cart = await Cart.findOne({
      "user.userId": userId,
      "user.userType": userType
    });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(
      (item) =>
        item.productId.toString() !== productId || item.modelType !== modelType
    );

    await cart.save();
    res.json({ message: "Product removed", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Clear the entire cart
exports.clearCart = async (req, res) => {
  const { userId, userType } = req.params;

  try {
    const user = await findUser(userId, userType);
    if (!user) return res.status(404).json({ message: "User not found" });

    const cart = await Cart.findOne({
      "user.userId": userId,
      "user.userType": userType
    });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = [];
    await cart.save();
    res.json({ message: "Cart cleared", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
