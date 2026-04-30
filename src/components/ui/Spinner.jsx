function Spinner({ small = false }) {
  return (
    <span
      className={`inline-block animate-spin rounded-full border-2 border-white/40 border-t-white ${
        small ? 'h-4 w-4' : 'h-5 w-5'
      }`}
      aria-hidden="true"
    />
  )
}

export default Spinner
