import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-12 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-stone-600">The page you requested does not exist.</p>
      <Link to="/" className="mt-5 inline-block rounded-xl bg-stone-900 px-5 py-2.5 text-white">
        Go Home
      </Link>
    </div>
  )
}

export default NotFoundPage
