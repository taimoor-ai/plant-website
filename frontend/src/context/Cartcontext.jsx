
import { createContext, useContext, useState, useEffect } from "react"

// Create the context
const CartContext = createContext()

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

// Cart provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [user,setUser]=useState();
  const handleSetUser=(user)=>{
    setUser(user);
  }
  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        setCart(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart))
    } catch (error) {
      console.error("Error saving cart to localStorage:", error)
    }
  }, [cart])

  // Get total number of items in cart
  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  // Get total price of all items in cart
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    console.log(product)
    setCart((prevCart) => {
      // Check if product already exists in cart
      const existingItemIndex = prevCart.findIndex((item) => item._id === product._id)

      if (existingItemIndex !== -1) {
        // Update quantity if product already exists
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += quantity
        return updatedCart
      } else {
        // Add new product to cart
        return [...prevCart, { ...product, quantity }]
      }
    })
  }

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
   console.log(productId);
   console.log(quantity)
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item._id === productId) {
          return { ...item, quantity: Math.max(1, quantity) }
        }
        return item
      })
    })
  }

  // Remove item from cart
  const removeFromCart = (productId) => {
    console.log(productId)
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId))
  }

  // Clear entire cart
  const clearCart = () => {
    setCart([])
  }

  // Toggle cart visibility
  const toggleCart = () => {
    setIsOpen((prev) => !prev)
  }

  // Close cart
  const closeCart = () => {
    setIsOpen(false)
  }

  // Open cart
  const openCart = () => {
    setIsOpen(true)
  }

  // Context value
  const value = {
    cart,
    isOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartItemsCount,
    getCartTotal,
    toggleCart,
    openCart,
    closeCart,
    handleSetUser,
    user
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
