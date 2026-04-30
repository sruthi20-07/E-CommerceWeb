import { useEffect, useRef, useState } from 'react'

function FadeInSection({ children, className = '' }) {
  const containerRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={containerRef} className={`reveal ${visible ? 'visible' : ''} ${className}`}>
      {children}
    </section>
  )
}

export default FadeInSection
