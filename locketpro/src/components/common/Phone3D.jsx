import { useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import heroImg from '../../assets/hero.png'

export default function Phone3D() {
  const ref = useRef(null)
  const [hover, setHover] = useState(false)

  const rotateX = useSpring(8, { stiffness: 120, damping: 20 })
  const rotateY = useSpring(-12, { stiffness: 120, damping: 20 })
  const glowOpacity = useTransform(rotateY, [-20, 20], [0.3, 0.7])

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(x * 28)
    rotateX.set(-y * 18 + 6)
  }

  const handleLeave = () => {
    setHover(false)
    rotateX.set(8)
    rotateY.set(-12)
  }

  return (
    <div
      ref={ref}
      className="phone-3d-scene"
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={handleLeave}
    >
      <motion.div
        className="phone-3d-glow"
        style={{ opacity: hover ? glowOpacity : 0.45 }}
      />
      <motion.div
        className="phone-3d-float"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="phone-3d-device"
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="phone-3d-frame" style={{ transform: 'translateZ(40px)' }}>
            <img src={heroImg} alt="Màn hình Locket Gold đã kích hoạt" />
            <span className="phone-3d-badge">Gold đã kích hoạt</span>
          </div>
          <div className="phone-3d-shadow" style={{ transform: 'rotateX(90deg) translateZ(-20px)' }} />
        </motion.div>
      </motion.div>
    </div>
  )
}
