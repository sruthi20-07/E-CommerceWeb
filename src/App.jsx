import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/layout/Navbar'

const HomePage = lazy(() => import('./pages/HomePage'))
const ShopPage = lazy(() => import('./pages/ShopPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const OrderSuccessPage = lazy(() => import('./pages/OrderSuccessPage'))
const MyOrdersPage = lazy(() => import('./pages/MyOrdersPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const SignupPage = lazy(() => import('./pages/SignupPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function App() {
  return (
    <div className="min-h-screen bg-[#f8f7f4] text-stone-900">
      <Navbar />
      <main className="mx-auto max-w-[1600px] px-6 pb-20 pt-28 lg:px-12">
        <Suspense
          fallback={
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-stone-300 border-t-stone-800" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:productId" element={<ProductDetailPage />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/my-orders" element={<MyOrdersPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
    </div>
  )
}

export default App
