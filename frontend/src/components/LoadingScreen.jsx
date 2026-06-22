import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ============================================================
// STAR FIELD - Pure CSS/Canvas recreation of your background
// ============================================================

const StarField = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Generate stars
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005
    }))

    let animationId
    let time = 0

    const draw = () => {
      // Dark red radial gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.8
      )
      gradient.addColorStop(0, '#8B0000')   // dark red center
      gradient.addColorStop(0.4, '#5C0000') // deeper red
      gradient.addColorStop(0.8, '#2A0000') // very dark red
      gradient.addColorStop(1, '#000000')   // black edges

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw twinkling stars
      stars.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed * 100) * 0.3 + 0.7
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`
        ctx.fill()
      })

      time++
      animationId = requestAnimationFrame(draw)
    }

    draw()

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  )
}

// ============================================================
// LOADING SCREEN
// ============================================================

const LoadingScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState(1)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(2), 1500)
    const t2 = setTimeout(() => setPhase(3), 2500)
    const t3 = setTimeout(() => onComplete(), 3500)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center w-full min-h-screen overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated Star Field Canvas */}
          <StarField />

          {/* Subtle overlay */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}
          />

          {/* Main Content */}
          <div className="relative z-10 text-center px-8">

            {/* Initials */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <h1
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(60px, 12vw, 100px)',
                  fontWeight: '600',
                  letterSpacing: '0.25em',
                  color: '#FFFFF0',
                  textShadow: '0 0 40px rgba(255,255,255,0.4), 0 0 80px rgba(200,0,0,0.3)'
                }}
              >
                NS
              </h1>

              {/* Gold animated line */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.6, ease: 'easeInOut' }}
                style={{
                  height: '1px',
                  backgroundColor: '#CAB588',
                  marginTop: '20px',
                  boxShadow: '0 0 8px rgba(202, 181, 136, 0.6)'
                }}
              />

              {/* Full name - phase 2 */}
              <AnimatePresence>
                {phase >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <p
                      style={{
                        color: '#FEF1E1',
                        fontSize: 'clamp(10px, 2vw, 13px)',
                        letterSpacing: '0.5em',
                        marginTop: '20px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '300'
                      }}
                    >
                      NIKHIL SUNDA
                    </p>
                    <p
                      style={{
                        color: '#CAB588',
                        fontSize: 'clamp(9px, 1.5vw, 11px)',
                        letterSpacing: '0.3em',
                        marginTop: '8px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '300'
                      }}
                    >
                      FULL STACK DEVELOPER · AI/ML ENGINEER
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Loading dots bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-12 flex gap-3 z-10"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.25
                }}
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: '#CAB588',
                  boxShadow: '0 0 6px rgba(202, 181, 136, 0.8)'
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen