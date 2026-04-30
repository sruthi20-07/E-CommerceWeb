import { Link, useLocation, useNavigate } from 'react-router-dom'

function OrderSuccessPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const order = location.state?.order

  if (!order) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-stone-200 bg-white p-8 text-center">
        <h1 className="text-2xl font-semibold">No recent order found</h1>
        <p className="mt-2 text-stone-600">Place an order to view confirmation details.</p>
        <button className="brand-btn mt-6" onClick={() => navigate('/shop')}>
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-stone-200 bg-white p-8">
      <h1 className="text-3xl font-semibold tracking-tight">Order Placed Successfully 🎉</h1>
      <p className="mt-2 text-stone-600">Thank you, {order.customer?.fullName}. Your order is confirmed.</p>

      <div className="mt-8 space-y-4">
        {order.items.map((item) => (
          <div key={item.uniqueKey} className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div>
              <p className="font-medium text-stone-900">{item.name}</p>
              <p className="text-sm text-stone-500">
                Qty: {item.quantity} {item.selectedSize ? `| Size: ${item.selectedSize}` : ''}
              </p>
            </div>
            <p className="font-medium text-stone-900">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl bg-stone-50 p-4">
        <div className="flex items-center justify-between text-sm text-stone-600">
          <span>Subtotal</span>
          <span>${order.subtotal.toFixed(2)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-sm text-stone-600">
          <span>Shipping</span>
          <span>${order.shipping.toFixed(2)}</span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-stone-200 pt-3 text-base font-semibold text-stone-900">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>

      <Link to="/my-orders" className="brand-btn-accent mt-8">
        View My Orders
      </Link>
    </div>
  )
}

export default OrderSuccessPage
