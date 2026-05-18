import { motion } from 'framer-motion'

const ORBS = [
  { size: 320, top: '8%', left: '-8%', delay: 0 },
  { size: 240, top: '45%', right: '-5%', delay: 1.2 },
  { size: 180, bottom: '12%', left: '20%', delay: 0.6 },
]

export default function Scene3DBackground() {
  return (
    <motion.div className="scene-3d-bg" aria-hidden>
      {ORBS.map((orb, i) => (
        <motion.span
          key={i}
          className="scene-orb"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
          }}
          animate={{
            y: [0, -24, 0],
            rotateZ: [0, 8, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}
      <div className="scene-grid-3d" />
    </motion.div>
  )
}
