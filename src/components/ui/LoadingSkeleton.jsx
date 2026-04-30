function LoadingSkeleton({ cards = 8 }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: cards }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-2xl border border-stone-200 bg-white p-4">
          <div className="h-44 rounded-xl bg-stone-200" />
          <div className="mt-4 h-4 w-3/4 rounded bg-stone-200" />
          <div className="mt-2 h-4 w-1/2 rounded bg-stone-200" />
          <div className="mt-4 h-9 w-full rounded bg-stone-200" />
        </div>
      ))}
    </div>
  )
}

export default LoadingSkeleton
