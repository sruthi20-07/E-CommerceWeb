import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ui/ProductCard'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'
import FadeInSection from '../components/common/FadeInSection'
import { fetchAllProducts } from '../firebase/productService'

const ALLOWED_CATEGORIES = ['Outerwear', 'Footwear', 'Tops']

function CategoryPage() {
  const { categoryName } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllProducts()
      .then(setProducts)
      .finally(() => setLoading(false))
  }, [])

  const normalizedCategory = useMemo(() => {
    const matched = ALLOWED_CATEGORIES.find(
      (category) => category.toLowerCase() === String(categoryName).toLowerCase(),
    )
    return matched || categoryName
  }, [categoryName])

  const filteredProducts = useMemo(
    () => products.filter((product) => product.category === normalizedCategory),
    [products, normalizedCategory],
  )

  return (
    <div className="space-y-8">
      <FadeInSection className="space-y-3">
        <p className="text-xs uppercase tracking-[0.16em] text-stone-500">Category</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Showing {normalizedCategory} Products
        </h1>
      </FadeInSection>

      {loading ? (
        <LoadingSkeleton cards={8} />
      ) : filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center">
          <p className="text-lg font-medium text-stone-700">No products available in this category</p>
          <Link to="/shop" className="brand-btn mt-6">
            Browse All Products
          </Link>
        </div>
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

export default CategoryPage
