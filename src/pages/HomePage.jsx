import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProductCard from '../components/ui/ProductCard'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'
import { fetchFeaturedProducts } from '../firebase/productService'
import FadeInSection from '../components/common/FadeInSection'

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProducts()
      .then(setFeaturedProducts)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-24 pb-8">
      <section className="relative -mx-6 min-h-[72vh] overflow-hidden lg:-mx-12">
        <img
          src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1800&q=80"
          alt="Premium fashion hero"
          className="h-[72vh] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
          <p className="text-xs uppercase tracking-[0.28em] text-stone-200">UrbanCart New Season</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">
            Minimal luxury for the modern wardrobe.
          </h1>
          <p className="mt-5 max-w-xl text-sm text-stone-200 sm:text-base">
            Discover timeless silhouettes, premium textures, and elevated everyday essentials.
          </p>
          <Link to="/shop" className="brand-btn-accent mt-9">
            Shop Now
          </Link>
        </div>
      </section>

      <FadeInSection className="space-y-8">
        <h2 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">Featured Products</h2>
        {loading ? (
          <LoadingSkeleton cards={4} />
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </FadeInSection>

      <FadeInSection className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {['Outerwear', 'Footwear', 'Tops'].map((cat) => (
          <Link
            key={cat}
            to={`/category/${cat}`}
            className="group rounded-2xl border border-stone-200 bg-white px-8 py-12 text-center shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-soft"
          >
            <h3 className="text-2xl font-medium tracking-tight">{cat}</h3>
            <p className="mt-3 text-sm text-stone-600">Explore latest {cat.toLowerCase()} arrivals</p>
            <span className="mt-6 inline-block text-xs uppercase tracking-[0.18em] text-stone-500 transition group-hover:text-brand-600">
              Discover
            </span>
          </Link>
        ))}
      </FadeInSection>
    </div>
  )
}

export default HomePage
