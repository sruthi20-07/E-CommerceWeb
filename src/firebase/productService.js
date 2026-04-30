import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import { db } from './config'
import { products as demoProducts } from '../data/products'

function normalizeProduct(product) {
  return {
    ...product,
    id: String(product.id),
    image: product.image || product.images?.[0] || '',
    images: product.images || (product.image ? [product.image] : []),
  }
}

async function safeFetchProducts(q) {
  try {
    const snapshot = await getDocs(q)
    const firebaseProducts = snapshot.docs.map((doc) => normalizeProduct({ id: doc.id, ...doc.data() }))
    if (firebaseProducts.length === 0) {
      return demoProducts.map(normalizeProduct)
    }
    return firebaseProducts
  } catch {
    return demoProducts.map(normalizeProduct)
  }
}

export async function fetchAllProducts() {
  const q = query(collection(db, 'products'))
  return safeFetchProducts(q)
}

export async function fetchFeaturedProducts() {
  const q = query(collection(db, 'products'), where('featured', '==', true), limit(4))
  return safeFetchProducts(q)
}
