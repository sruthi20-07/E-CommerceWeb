import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ui/ProductCard'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'
import { fetchAllProducts } from '../firebase/productService'
import FadeInSection from '../components/common/FadeInSection'

function ShopPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const [category, setCategory] = useState(searchParams.get('category') || 'All')
  const [maxPrice, setMaxPrice] = useState(500)
  const [sortBy, setSortBy] = useState('default')

  useEffect(() => {
    fetchAllProducts()
      .then(setProducts)
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
    <div className="space-y-10">
      <FadeInSection className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">Shop Collection</h1>
        <p className="max-w-2xl text-stone-600">Curated essentials inspired by premium fashion houses.</p>
      </FadeInSection>

      <FadeInSection className="flex flex-col gap-6 rounded-2xl border border-stone-200 bg-white p-6 md:flex-row md:items-end md:justify-between">
        <div className="w-full md:max-w-xs">
          <label className="text-xs font-medium uppercase tracking-[0.16em] text-stone-600" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            className="mt-2 w-full rounded-xl border border-stone-300 bg-stone-50 p-3"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:max-w-xs">
          <label className="text-xs font-medium uppercase tracking-[0.16em] text-stone-600" htmlFor="price">
            Max Price: ${maxPrice}
          </label>
          <input
            id="price"
            type="range"
            min="20"
            max="500"
            step="5"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="mt-2 w-full accent-brand-600"
          />
        </div>

        <div className="w-full md:max-w-xs">
          <label className="text-xs font-medium uppercase tracking-[0.16em] text-stone-600" htmlFor="sort">
            Sort By
          </label>
          <select
            id="sort"
            className="mt-2 w-full rounded-xl border border-stone-300 bg-stone-50 p-3"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </FadeInSection>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <FadeInSection className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </FadeInSection>
      )}
    </div>
  )
}

export default ShopPage
