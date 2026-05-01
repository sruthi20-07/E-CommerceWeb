import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

function ProductCard({ product }) {
  const { addToCart } = useCart()
  const productImage = product.image || product.images?.[0]

  return (
    <article className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 p-4">
      <div className="overflow-hidden rounded-xl">
        <img
          src={productImage}
          alt={product.name}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="mt-5 space-y-2 px-1">
        <span className="text-[11px] uppercase tracking-[0.15em] text-stone-500">{product.category}</span>
        <h3 className="text-xl font-medium leading-snug text-stone-900">{product.name}</h3>
        <p className="pt-1 text-lg font-semibold text-stone-900">${product.price.toFixed(2)}</p>
      </div>
      <Link
        to={`/shop/${product.id}`}
        className="brand-btn mt-5 w-full"
      >
        View Details
      </Link>
      <button
        type="button"
        onClick={() => addToCart(product, { quantity: 1 })}
       className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition"
      >
        Add to Cart
      </button>
    </article>
  )
}

export default ProductCard
