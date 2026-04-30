import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Spinner from '../components/ui/Spinner'
import { useCart } from '../context/CartContext'
import { db } from '../firebase/config'
import { products as demoProducts } from '../data/products'

function ProductDetailPage() {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [activeImage, setActiveImage] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    async function loadProduct() {
      try {
        const productDoc = await getDoc(doc(db, 'products', productId))
        if (productDoc.exists()) {
          const data = { id: productDoc.id, ...productDoc.data() }
          const image = data.image || data.images?.[0] || ''
          setProduct(data)
          setActiveImage(image)
        } else {
          const fallback = demoProducts.find((item) => String(item.id) === productId)
          const normalized = fallback
            ? { ...fallback, id: String(fallback.id), images: fallback.images || [fallback.image] }
            : null
          setProduct(normalized)
          setActiveImage(normalized?.image || normalized?.images?.[0] || '')
        }
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [productId])

  const handleAddToCart = async () => {
    setAdding(true)
    addToCart(product, { quantity })
    setTimeout(() => setAdding(false), 400)
  }

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-stone-300 border-t-stone-800" />
      </div>
    )
  }

  if (!product) return <p>Product not found.</p>

  return (
    <section className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <img src={activeImage} alt={product.name} className="h-[430px] w-full rounded-2xl object-cover" />
        <div className="grid grid-cols-4 gap-3">
          {(product.images || [product.image]).map((image) => (
            <button key={image} onClick={() => setActiveImage(image)} className="overflow-hidden rounded-lg border">
              <img src={image} alt={product.name} className="h-20 w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6 rounded-2xl border border-stone-200 bg-white p-6">
        <Link to="/shop" className="text-sm text-brand-600 hover:underline">
          ← Back to Shop
        </Link>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-2xl font-semibold text-brand-600">${product.price.toFixed(2)}</p>
        <p className="text-stone-600">{product.description}</p>

        <div className="space-y-2">
          <p className="text-sm font-medium">Quantity</p>
          <div className="inline-flex items-center gap-3 rounded-full border border-stone-300 px-3 py-2">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="h-8 w-8 rounded-full border border-stone-300"
            >
              -
            </button>
            <span className="min-w-5 text-center text-sm font-medium">{quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQuantity((prev) => prev + 1)}
              className="h-8 w-8 rounded-full border border-stone-300"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={adding}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {adding ? <Spinner /> : null}
          {adding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </section>
  )
}

export default ProductDetailPage
