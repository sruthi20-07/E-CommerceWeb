import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ui/ProductCard'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'
import { fetchAllProducts } from '../firebase/productService'
import FadeInSection from '../components/common/FadeInSection'
import { products as localProducts } from '../data/products' // ✅ ADDED

function ShopPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const [category, setCategory] = useState(searchParams.get('category') || 'All')
  const [maxPrice, setMaxPrice] = useState(5000)
  const [sortBy, setSortBy] = useState('default')

  useEffect(() => {
    fetchAllProducts()
      .then((data) => {
        // ✅ FALLBACK LOGIC
        if (!data || data.length === 0) {
          console.log('Using local products fallback')
          setProducts(localProducts)
        } else {
          setProducts(data)
        }
      })
      .catch(() => {
        setProducts(localProducts) // fallback if error
      })
      .finally(() => setLoading(false))
  }, [])

  const categories = useMemo(
    () => ['All', ...new Set(products.map((product) => product.category).filter(Boolean))],
    [products],
  )

  const filteredProducts = useMemo(() => {
    const base = products.filter(
      (product) => (category === 'All' || product.category === category) && product.price <= maxPrice,
    )
    if (sortBy === 'low') return [...base].sort((a, b) => a.price - b.price)
    if (sortBy === 'high') return [...base].sort((a, b) => b.price - a.price)
    return base
  }, [products, category, maxPrice, sortBy])

  return (
    <div className="space-y-12">
      <FadeInSection className="space-y-3">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Shop Collection</h1>
        <p className="max-w-2xl text-gray-600">Premium curated fashion for modern lifestyle.</p>
      </FadeInSection>

      {/* FILTERS */}
      <FadeInSection className="flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:flex-row md:items-end md:justify-between">
        <div className="w-full md:max-w-xs">
          <label className="text-xs font-medium text-gray-600">Category</label>
          <select
            className="mt-2 w-full rounded-lg border border-gray-300 p-3"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="w-full md:max-w-xs">
          <label className="text-xs font-medium text-gray-600">
            Max Price: ₹{maxPrice}
          </label>
          <input
            type="range"
            min="100"
            max="5000"
            step="100"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="mt-2 w-full accent-orange-500"
          />
        </div>

        <div className="w-full md:max-w-xs">
          <label className="text-xs font-medium text-gray-600">Sort</label>
          <select
            className="mt-2 w-full rounded-lg border border-gray-300 p-3"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>
        </div>
      </FadeInSection>

      {/* PRODUCTS */}
      {loading ? (
        <LoadingSkeleton />
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products available</p>
      ) : (
        <FadeInSection className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </FadeInSection>
      )}
    </div>
  )
}

export default ShopPage