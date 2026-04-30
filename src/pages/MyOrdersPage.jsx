import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import OrderCard from '../components/orders/OrderCard'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase/config'

function getDisplayStatus(order) {
  const baseStatus = order.status || 'Placed'
  if (baseStatus !== 'Placed') return baseStatus

  let timestamp = Date.now()
  if (typeof order.createdAt === 'number') timestamp = order.createdAt
  else if (order.createdAt?.toMillis) timestamp = order.createdAt.toMillis()

  const elapsedMinutes = (Date.now() - timestamp) / (1000 * 60)
  if (elapsedMinutes > 5) return 'Delivered'
  if (elapsedMinutes > 2) return 'Processing'
  return 'Placed'
}

function MyOrdersPage() {
  const { currentUser } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      if (!currentUser) {
        setLoading(false)
        return
      }
      try {
        const q = query(collection(db, 'orders'), where('userId', '==', currentUser.uid))
        const snapshot = await getDocs(q)
        const fetchedOrders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setOrders(fetchedOrders)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [currentUser])

  const sortedOrders = useMemo(() => {
    return [...orders]
      .map((order) => ({ ...order, displayStatus: getDisplayStatus(order) }))
      .sort((a, b) => {
        const aTime = a.createdAt?.toMillis ? a.createdAt.toMillis() : Number(a.createdAt || 0)
        const bTime = b.createdAt?.toMillis ? b.createdAt.toMillis() : Number(b.createdAt || 0)
        return bTime - aTime
      })
  }, [orders])

  if (!currentUser) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-stone-200 bg-white p-8 text-center">
        <h1 className="text-2xl font-semibold">Please login to view your orders</h1>
        <Link to="/login" className="brand-btn mt-6">
          Go to Login
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">My Orders</h1>
        <p className="text-stone-600">Track your recent purchases and delivery progress.</p>
      </div>

      {loading ? (
        <div className="flex min-h-[220px] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-stone-300 border-t-stone-800" />
        </div>
      ) : sortedOrders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center">
          <p className="text-lg font-medium text-stone-700">You have no orders yet</p>
          <Link to="/shop" className="brand-btn mt-6">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {sortedOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}

export default MyOrdersPage
