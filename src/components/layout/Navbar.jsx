import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'

const navItemClass = ({ isActive }) =>
  `relative py-1 text-[0.82rem] font-medium uppercase tracking-[0.16em] transition ${
    isActive ? 'text-stone-900 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-stone-900' : 'text-stone-600 hover:text-stone-900'
  }`

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { itemCount } = useCart()
  const { currentUser, logout } = useAuth()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-stone-200/70 bg-[#f8f7f4]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 lg:px-12">
        <Link to="/" className="text-2xl font-semibold tracking-tight text-stone-900">
          Urban<span className="text-brand-600">Cart</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          <NavLink to="/" className={navItemClass}>
            Home
          </NavLink>
          <NavLink to="/shop" className={navItemClass}>
            Shop
          </NavLink>
          <NavLink to="/cart" className={navItemClass}>
            Cart ({itemCount})
          </NavLink>
          {currentUser ? (
            <>
              <NavLink to="/my-orders" className={navItemClass}>
                My Orders
              </NavLink>
              <button
                className="text-[0.82rem] font-medium uppercase tracking-[0.16em] text-stone-600 transition hover:text-stone-900"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className={navItemClass}>
              Login
            </NavLink>
          )}
        </nav>

        <button
          className="rounded-full border border-stone-300 p-2 text-stone-700 transition hover:bg-stone-100 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          ☰
        </button>
      </div>

      {mobileOpen && (
        <nav className="space-y-3 border-t border-stone-200 bg-[#f8f7f4] px-6 py-5 md:hidden">
          <NavLink to="/" className="block py-1 text-sm uppercase tracking-[0.14em] text-stone-700" onClick={() => setMobileOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/shop" className="block py-1 text-sm uppercase tracking-[0.14em] text-stone-700" onClick={() => setMobileOpen(false)}>
            Shop
          </NavLink>
          <NavLink to="/cart" className="block py-1 text-sm uppercase tracking-[0.14em] text-stone-700" onClick={() => setMobileOpen(false)}>
            Cart ({itemCount})
          </NavLink>
          {currentUser ? (
            <>
              <NavLink to="/my-orders" className="block py-1 text-sm uppercase tracking-[0.14em] text-stone-700" onClick={() => setMobileOpen(false)}>
                My Orders
              </NavLink>
              <button
                className="block py-1 text-sm uppercase tracking-[0.14em] text-stone-700"
                onClick={() => {
                  logout()
                  setMobileOpen(false)
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="block py-1 text-sm uppercase tracking-[0.14em] text-stone-700" onClick={() => setMobileOpen(false)}>
              Login
            </NavLink>
          )}
        </nav>
      )}
    </header>
  )
}

export default Navbar
