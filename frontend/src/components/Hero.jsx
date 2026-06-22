import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowDown } from 'lucide-react'

const Hero = () => {
  const canvasRef = useRef(null)

  // Star field background (same as loading screen)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.02 + 0.003
    }))

    let animId
    let time = 0

    const draw = () => {
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.85
      )
      gradient.addColorStop(0, '#6B0000')
      gradient.addColorStop(0.35, '#3D0000')
      gradient.addColorStop(0.7, '#1A0000')
      gradient.addColorStop(1, '#000000')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      stars.forEach(star => {
        const twinkle = Math.sin(time * star.speed * 80) * 0.3 + 0.7
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${star.opacity * twinkle})`
        ctx.fill()
      })

      time++
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col justify-center h-full"
        style={{ padding: '0 80px' }}
      >
        {/* Tag line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            color: '#CAB588',
            fontSize: '12px',
            letterSpacing: '0.4em',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '300',
            marginBottom: '24px'
          }}
        >
          IIIT BHUBANESWAR · EEE · 2027
        </motion.p>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(48px, 7vw, 96px)',
            fontWeight: '600',
            color: '#FEF1E1',
            lineHeight: '1.05',
            letterSpacing: '-0.02em',
            maxWidth: '800px'
          }}
        >
          Nikhil
          <br />
          <span style={{ color: '#CAB588' }}>Sunda</span>
        </motion.h1>

        {/* Animated line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '120px' }}
          transition={{ duration: 1.2, delay: 0.8 }}
          style={{
            height: '1px',
            backgroundColor: '#CAB588',
            margin: '32px 0',
            boxShadow: '0 0 8px rgba(202,181,136,0.5)'
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{
            color: '#FEF1E1',
            fontSize: 'clamp(16px, 2vw, 22px)',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '300',
            maxWidth: '500px',
            lineHeight: '1.6',
            opacity: 0.85
          }}
        >
          Full Stack Developer & AI/ML Engineer
          building intelligent systems at the
          intersection of web and machine learning.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex gap-4 mt-10"
        >
          {/* Primary CTA */}
          <Link to="/ai-detector">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                backgroundColor: '#CAB588',
                color: '#0A0000',
                border: 'none',
                padding: '14px 32px',
                fontSize: '12px',
                letterSpacing: '0.2em',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              TRY AI DETECTOR
            </motion.button>
          </Link>

          {/* Secondary CTA */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToAbout}
            style={{
              backgroundColor: 'transparent',
              color: '#FEF1E1',
              border: '1px solid rgba(254,241,225,0.3)',
              padding: '14px 32px',
              fontSize: '12px',
              letterSpacing: '0.2em',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '400',
              cursor: 'pointer',
            }}
          >
            VIEW WORK
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 flex flex-col items-center gap-2 z-10"
        style={{
          transform: 'translateX(-50%)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#CAB588'
        }}
      >
        <motion.p
          style={{
            fontSize: '10px',
            letterSpacing: '0.3em',
            color: '#CAB588',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          SCROLL
        </motion.p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={16} color="#CAB588" />
        </motion.div>
      </motion.button>
    </section>
  )
}

export default Hero