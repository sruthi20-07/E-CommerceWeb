import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, subtotal, shipping, total } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <p className="mt-2 text-stone-600">Looks like you have not added anything yet.</p>
        <Link to="/shop" className="mt-6 inline-block rounded-xl bg-stone-900 px-5 py-2.5 text-white">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
      <section className="space-y-4">
        {cartItems.map((item) => (
          <article
            key={item.uniqueKey}
            className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-4 sm:flex-row"
          >
            <img src={item.image || item.images?.[0]} alt={item.name} className="h-28 w-full rounded-xl object-cover sm:w-28" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-stone-600">Size: {item.selectedSize}</p>
              <p className="mt-1 font-semibold text-brand-600">${item.price.toFixed(2)}</p>
              <div className="mt-3 flex items-center gap-2">
                <button
                  className="rounded border px-2 py-1"
                  onClick={() => updateQuantity(item.uniqueKey, Math.max(1, item.quantity - 1))}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button className="rounded border px-2 py-1" onClick={() => updateQuantity(item.uniqueKey, item.quantity + 1)}>
                  +
                </button>
                <button className="ml-4 text-sm text-red-600 hover:underline" onClick={() => removeFromCart(item.uniqueKey)}>
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-5">
        <h3 className="text-xl font-semibold">Order Summary</h3>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-stone-200 pt-2 text-base font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <Link
          to="/checkout"
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-4 py-2.5 font-medium text-white transition hover:bg-brand-700"
        >
          Proceed to Checkout
        </Link>
      </aside>
    </div>
  )
}

export default CartPage
