import { useMemo, useEffect, useState } from 'react'

const SNOW_CHARS = ['❄', '✦', '·', '❅']

function createFlakes(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    char: SNOW_CHARS[i % SNOW_CHARS.length],
    left: `${Math.random() * 100}%`,
    size: 0.45 + Math.random() * 0.85,
    duration: 12 + Math.random() * 18,
    delay: Math.random() * -20,
    drift: -30 + Math.random() * 60,
    opacity: 0.35 + Math.random() * 0.45,
  }))
}

export default function Snowfall() {
  const [enabled, setEnabled] = useState(true)
  const [count, setCount] = useState(40)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setEnabled(false)
      return
    }

    const updateCount = () => {
      setCount(window.innerWidth < 768 ? 28 : 45)
    }
    updateCount()
    window.addEventListener('resize', updateCount, { passive: true })
    return () => window.removeEventListener('resize', updateCount)
  }, [])

  const flakes = useMemo(() => createFlakes(count), [count])

  if (!enabled) return null

  return (
    <div className="snowfall" aria-hidden>
      {flakes.map((f) => (
        <span
          key={f.id}
          className="snowflake"
          style={{
            left: f.left,
            fontSize: `${f.size}rem`,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            opacity: f.opacity,
            '--drift': `${f.drift}px`,
          }}
        >
          {f.char}
        </span>
      ))}
    </div>
  )
}
