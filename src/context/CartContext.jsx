import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext(null)
const CART_STORAGE_KEY = 'urbancart_cart'

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, options = {}) => {
    const quantityToAdd = options.quantity && options.quantity > 0 ? options.quantity : 1
    const selectedSize = options.size || 'Standard'
    const uniqueKey = `${product.id}-${selectedSize}`
    setCartItems((prev) => {
      const existing = prev.find((item) => item.uniqueKey === uniqueKey)
      if (existing) {
        return prev.map((item) =>
          item.uniqueKey === uniqueKey ? { ...item, quantity: item.quantity + quantityToAdd } : item,
        )
      }
      return [
        ...prev,
        {
          ...product,
          image: product.image || product.images?.[0] || '',
          images: product.images || (product.image ? [product.image] : []),
          selectedSize,
          quantity: quantityToAdd,
          uniqueKey,
        },
      ]
    })
    toast.success('Added to cart')
  }

  const updateQuantity = (uniqueKey, quantity) => {
    if (quantity < 1) return
    setCartItems((prev) => prev.map((item) => (item.uniqueKey === uniqueKey ? { ...item, quantity } : item)))
  }

  const removeFromCart = (uniqueKey) => {
    setCartItems((prev) => prev.filter((item) => item.uniqueKey !== uniqueKey))
  }

  const clearCart = () => setCartItems([])

  const values = useMemo(() => {
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = subtotal > 0 ? 8.99 : 0
    const total = subtotal + shipping
    return {
      cartItems,
      itemCount,
      subtotal,
      shipping,
      total,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }
  }, [cartItems])

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
