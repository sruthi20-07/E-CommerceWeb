import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Spinner from '../components/ui/Spinner'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const nextErrors = {}
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Enter a valid email'
    if (form.password.length < 6) nextErrors.password = 'Password must be at least 6 characters'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await login(form.email, form.password)
      toast.success('Logged in successfully')
      navigate('/')
    } catch (error) {
      toast.error(error.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-stone-200 bg-white p-6">
      <h1 className="text-2xl font-bold">Login</h1>
      <form className="mt-5 space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-stone-300 p-2.5"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-stone-300 p-2.5"
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </div>
        <button
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 font-medium text-white transition hover:bg-brand-700 disabled:opacity-60"
        >
          {loading ? <Spinner /> : null}
          {loading ? 'Signing In...' : 'Login'}
        </button>
      </form>
      <p className="mt-4 text-sm text-stone-600">
        New here?{' '}
        <Link to="/signup" className="font-medium text-brand-600 hover:underline">
          Create account
        </Link>
      </p>
    </div>
  )
}

export default LoginPage
