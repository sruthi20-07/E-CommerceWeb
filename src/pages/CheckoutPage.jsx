import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/ui/Spinner'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { db } from '../firebase/config'

function CheckoutPage() {
  const { cartItems, subtotal, shipping, total, clearCart } = useCart()
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ fullName: '', phone: '', address: '' })
  const [errors, setErrors] = useState({})

  const isPhoneValid = useMemo(() => /^\d{10}$/.test(form.phone.trim()), [form.phone])
  const isNameValid = useMemo(() => form.fullName.trim().length > 0, [form.fullName])
  const isAddressValid = useMemo(() => form.address.trim().length > 0, [form.address])

  const isFormValid = useMemo(() => {
    return isNameValid && isAddressValid && isPhoneValid
  }, [isAddressValid, isNameValid, isPhoneValid])

  const validate = () => {
    const nextErrors = {}
    if (!isNameValid) nextErrors.fullName = 'Full name is required'
    if (!isAddressValid) nextErrors.address = 'Address is required'
    if (!isPhoneValid) nextErrors.phone = 'Phone number must be 10 digits'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const onChange = (event) => {
    const { name } = event.target
    let { value } = event.target

    if (name === 'phone') {
      value = value.replace(/\D/g, '').slice(0, 10)
    }

    setForm((prev) => ({ ...prev, [name]: value }))

    setErrors((prev) => {
      const next = { ...prev }
      if (name === 'fullName') next.fullName = value.trim() ? '' : 'Full name is required'
      if (name === 'address') next.address = value.trim() ? '' : 'Address is required'
      if (name === 'phone') next.phone = /^\d{10}$/.test(value) ? '' : 'Phone number must be 10 digits'
      return next
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return
    if (cartItems.length === 0) return toast.error('Cart is empty')

    setLoading(true)
    try {
      const orderPayload = {
        userId: currentUser?.uid || 'guest',
        customer: form,
        items: cartItems,
        totalPrice: total,
        subtotal,
        shipping,
        total,
        status: 'Placed',
        createdAt: serverTimestamp(),
      }
      const orderRef = await addDoc(collection(db, 'orders'), orderPayload)
      clearCart()
      setForm({ fullName: '', phone: '', address: '' })
      toast.success('Order placed successfully!')
      navigate('/order-success', {
        state: { order: { ...orderPayload, id: orderRef.id, createdAt: Date.now() } },
      })
    } catch {
      toast.error('Could not place order. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-stone-200 bg-white p-6">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="fullName" className="text-sm font-medium">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={onChange}
            className="mt-1 w-full rounded-xl border border-stone-300 p-2.5"
          />
          {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            inputMode="numeric"
            pattern="[0-9]{10}"
            maxLength={10}
            value={form.phone}
            onChange={onChange}
            className="mt-1 w-full rounded-xl border border-stone-300 p-2.5"
            placeholder="9876543210"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="address" className="text-sm font-medium">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            rows="3"
            value={form.address}
            onChange={onChange}
            className="mt-1 w-full rounded-xl border border-stone-300 p-2.5"
          />
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
        </div>
        <button
          type="submit"
          disabled={loading || !isFormValid}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 font-medium text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-stone-400 disabled:opacity-90"
        >
          {loading ? <Spinner /> : null}
          {loading ? 'Placing Order...' : 'Proceed to Payment'}
        </button>
      </form>
    </div>
  )
}

export default CheckoutPage
