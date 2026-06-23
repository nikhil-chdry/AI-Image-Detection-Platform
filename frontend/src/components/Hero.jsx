import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowDown, GitFork, LinkIcon, Mail } from 'lucide-react'
import profilePhoto from '../assets/profile.jpg'

const Hero = () => {
  const canvasRef = useRef(null)

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
    document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}
      />

      {/* Main Content - Two Column */}
      <div
        className="relative z-10 flex items-center h-full"
        style={{ padding: '0 80px', gap: '60px' }}
      >

        {/* LEFT SIDE - Text Content */}
        <div style={{ flex: 1 }}>

          {/* Tag */}
          <motion.p
            initial={{ opacity: 0, y: 20,x: 0 }}
            animate={{ opacity: 1, y: 0 ,x: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              color: '#CAB588',
              fontSize: '11px',
              letterSpacing: '0.4em',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '300',
              marginBottom: '24px'
            }}
          >
            IIIT BHUBANESWAR · EEE · CLASS OF 2027
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 40,x:0 }}
            animate={{ opacity: 1, y: 0,x:40 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(48px, 6vw, 88px)',
              fontWeight: '600',
              color: '#FEF1E1',
              lineHeight: '1.05',
              letterSpacing: '-0.02em',
            }}
          >
            Nikhil
            <br />
            <span style={{ color: '#CAB588' }}>Sunda</span>
          </motion.h1>

          {/* Gold Line */}
          <motion.div
            initial={{ width: 0,x:0 }}
            animate={{ width: '80px',x:40 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            style={{
              height: '1px',
              backgroundColor: '#CAB588',
              margin: '28px 0',
              boxShadow: '0 0 8px rgba(202,181,136,0.5)'
            }}
          />

          {/* Title */}
          <motion.p
            initial={{ opacity: 0, y: 20,x:0 }}
            animate={{ opacity: 1, y: 0 ,x: 40 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{
              color: 'rgba(254,241,225,0.8)',
              fontSize: 'clamp(14px, 1.5vw, 18px)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '300',
              lineHeight: '1.7',
              maxWidth: '420px',
              marginBottom: '40px'
            }}
          >
            Full Stack Developer & AI/ML Engineer
            building intelligent systems at the
            intersection of web and machine learning.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20,x:0 }}
            animate={{ opacity: 1, y: 0 ,x: 40 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex gap-4 mb-10"
            style={{ display: 'flex', gap: '16px' }}
          >
            <Link to="/ai-detector">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  backgroundColor: '#CAB588',
                  color: '#0A0000',
                  border: 'none',
                  padding: '14px 28px',
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                TRY AI DETECTOR
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToAbout}
              style={{
                backgroundColor: 'transparent',
                color: '#FEF1E1',
                border: '1px solid rgba(254,241,225,0.3)',
                padding: '14px 28px',
                fontSize: '11px',
                letterSpacing: '0.2em',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '400',
                cursor: 'pointer',
              }}
            >
              VIEW WORK
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 40 }}
            transition={{ delay: 1.4 }}
            className="flex gap-5"
            style={{ display: 'flex', gap: '20px', marginTop: '20px' }}
          >
            {[
              { icon: <GitFork size={18} />, href: 'https://github.com/nikhil-chdry' },
              { icon: <LinkIcon size={18} />, href: 'https://linkedin.com/in/nikhil-chdry' },
                 { icon: <Mail size={18} />, href: 'mailto:nikhilsunda42@gmail.com' },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, color: '#CAB588' }}
                style={{
                  color: 'rgba(254,241,225,0.5)',
                  transition: 'color 0.3s'
                }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT SIDE - Photo + Info */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: -100 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{
            flex: '0 0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '32px'
          }}
        >
          {/* Photo */}
          <div style={{ position: 'relative' }}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={profilePhoto}
                alt="Nikhil Sunda"
                style={{
                  width: '280px',
                  height: '340px',
                  objectFit: 'cover',
                  objectPosition: 'top',
                  display: 'block',
                  filter: 'grayscale(10%)'
                }}
              />
              {/* Gold border */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-12px',
                  right: '-12px',
                  width: '100%',
                  height: '100%',
                  border: '1px solid rgba(202,181,136,0.5)',
                  zIndex: -1,
                  pointerEvents: 'none'
                }}
              />
              {/* Bottom gradient */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '40%',
                  background: 'linear-gradient(to top, rgba(50,0,0,0.7) 0%, transparent 100%)',
                  pointerEvents: 'none'
                }}
              />
            </motion.div>
          </div>

          {/* Quick Info Cards */}
          <div style={{ width: '280px' }}>
            {/* CGPA */}
            <motion.div
              whileHover={{ boxShadow: '0 0 12px rgba(202,181,136,0.5)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(202,181,136,0.15)',
                padding: '16px 20px',
                marginBottom: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <p style={{
                color: 'rgba(254,241,225,0.5)',
                fontSize: '11px',
                letterSpacing: '0.2em',
                fontFamily: 'Inter, sans-serif'
              }}>
                CGPA
              </p>
              <p style={{
                color: '#CAB588',
                fontSize: '18px',
                fontFamily: 'Playfair Display, serif',
                fontWeight: '600'
              }}>
                7.89
              </p>
            </motion.div>

            {/* Location */}
            <motion.div
              whileHover={{ boxShadow: '0 0 12px rgba(202,181,136,0.5)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(202,181,136,0.15)',
                padding: '16px 20px',
                marginBottom: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <p style={{
                color: 'rgba(254,241,225,0.5)',
                fontSize: '11px',
                letterSpacing: '0.2em',
                fontFamily: 'Inter, sans-serif'
              }}>
                LOCATION
              </p>
              <p style={{
                color: '#FEF1E1',
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '300'
              }}>
                Bhubaneswar, India
              </p>
            </motion.div>

            {/* Status */}
            <motion.div
            whileHover={{ boxShadow: '0 0 12px rgba(202,181,136,0.5)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(202,181,136,0.15)',
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <p style={{
                color: 'rgba(254,241,225,0.5)',
                fontSize: '11px',
                letterSpacing: '0.2em',
                fontFamily: 'Inter, sans-serif'
              }}>
                STATUS
              </p>
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#4ADE80'
                  }}
                />
                <p style={{
                  color: '#4ADE80',
                  fontSize: '12px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '400'
                }}>
                  Open to Work
                </p>
              </div>
            </motion.div>
          </div>
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
          cursor: 'pointer'
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