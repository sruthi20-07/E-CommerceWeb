import OrderStatusTracker from './OrderStatusTracker'

function formatOrderDate(createdAt) {
  if (!createdAt) return 'Just now'
  if (typeof createdAt === 'number') return new Date(createdAt).toLocaleString()
  if (createdAt?.toDate) return createdAt.toDate().toLocaleString()
  return 'Just now'
}

function OrderCard({ order }) {
  return (
    <article className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs uppercase tracking-[0.14em] text-stone-500">Order ID: {order.id}</p>
        <p className="text-sm text-stone-600">{formatOrderDate(order.createdAt)}</p>
      </div>

      <div className="mt-4 space-y-2">
        {order.items?.map((item) => (
          <div key={item.uniqueKey || `${item.id}-${item.name}`} className="flex items-center justify-between text-sm">
            <span className="text-stone-700">
              {item.name} x {item.quantity}
            </span>
            <span className="font-medium text-stone-900">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-stone-200 pt-4">
        <span className="text-sm text-stone-600">Total</span>
        <span className="text-lg font-semibold text-stone-900">
          ${Number(order.totalPrice ?? order.total ?? 0).toFixed(2)}
        </span>
      </div>

      <OrderStatusTracker status={order.displayStatus || order.status} />
    </article>
  )
}

export default OrderCard
