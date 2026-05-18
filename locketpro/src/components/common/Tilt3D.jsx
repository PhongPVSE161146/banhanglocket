import { useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

/**
 * Wrapper 3D — nghiêng theo chuột, dùng cho card / section
 */
export default function Tilt3D({
  children,
  className = '',
  maxTilt = 14,
  scale = 1.02,
  perspective = 1000,
  style,
}) {
  const ref = useRef(null)
  const rotateX = useSpring(0, { stiffness: 180, damping: 22 })
  const rotateY = useSpring(0, { stiffness: 180, damping: 22 })
  const scaleVal = useSpring(1, { stiffness: 200, damping: 20 })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(x * maxTilt * 2)
    rotateX.set(-y * maxTilt * 2)
    scaleVal.set(scale)
  }

  const onLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    scaleVal.set(1)
  }

  return (
    <motion.div
      ref={ref}
      className={`tilt-3d-wrap ${className}`}
      style={{ perspective, ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        className="tilt-3d-inner"
        style={{
          rotateX,
          rotateY,
          scale: scaleVal,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
