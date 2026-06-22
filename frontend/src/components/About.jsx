import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import profilePhoto from '../assets/profile.jpg'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={ref}
      style={{
        backgroundColor: '#0A0000',
        padding: '120px 80px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background subtle gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at 80% 50%, rgba(80,0,0,0.3) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div
        className="relative z-10 flex items-center gap-20"
        style={{ maxWidth: '1200px', margin: '0 auto' }}
      >
        {/* Left - Photo */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ flex: '0 0 auto' }}
        >
          {/* Photo container */}
          <div style={{ position: 'relative' }}>
            <img
              src={profilePhoto}
              alt="Nikhil Sunda"
              style={{
                width: '340px',
                height: '420px',
                objectFit: 'cover',
                objectPosition: 'top',
                display: 'block',
                filter: 'grayscale(20%)'
              }}
            />
            {/* Gold border accent */}
            <div
              style={{
                position: 'absolute',
                bottom: '-16px',
                right: '-16px',
                width: '100%',
                height: '100%',
                border: '1px solid #CAB588',
                zIndex: -1
              }}
            />
            {/* Red glow */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(80,0,0,0.4) 0%, transparent 60%)',
                pointerEvents: 'none'
              }}
            />
          </div>
        </motion.div>

        {/* Right - Content */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={isInView ? { opacity: 1, x: 40 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          style={{ flex: 1 }}
        >
          {/* Label */}
          <p
            style={{
              color: '#CAB588',
              fontSize: '15px',
              letterSpacing: '0.4em',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '600',
              marginBottom: '20px'
            }}
          >
            ABOUT ME
          </p>

          {/* Heading */}
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(36px, 4vw, 56px)',
              fontWeight: '600',
              color: '#FEF1E1',
              lineHeight: '1.1',
              marginBottom: '32px',
              letterSpacing: '-0.02em'
            }}
          >
            Building things
            <br />
            <span style={{ color: '#CAB588' }}>that matter.</span>
          </h2>

          {/* Gold line */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '60px' } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              height: '1px',
              backgroundColor: '#CAB588',
              marginBottom: '32px'
            }}
          />

          {/* Bio */}
          <p
            style={{
              color: 'rgba(254,241,225,0.75)',
              fontSize: '16px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '300',
              lineHeight: '1.8',
              marginBottom: '20px',
              maxWidth: '520px'
            }}
          >
            B.Tech student in Electrical & Electronics Engineering at
            IIIT Bhubaneswar (Class of 2027), with hands-on experience
            in full-stack web development, AI/ML engineering, and IoT research.
          </p>

          <p
            style={{
              color: 'rgba(254,241,225,0.75)',
              fontSize: '16px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '300',
              lineHeight: '1.8',
              marginBottom: '40px',
              maxWidth: '520px'
            }}
          >
            Published research on IoT-based predictive analytics for
            EV battery systems. Seeking software development, AI/ML,
            and backend engineering roles.
          </p>

          {/* Stats */}
          <div className="flex gap-12 mb-10">
            {[
              { number: '9+', label: 'Projects Built' },
              { number: '2', label: 'Research Paper' },
              { number: '7.89', label: 'CGPA' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, }}
                animate={isInView ? { opacity: 1, y: 0, } : {}}
                transition={{ delay: 0.8 + i * 0.1 }}
               
              >
              
                    <p
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '36px',
                    color: '#CAB588',
                    fontWeight: '600',
                    lineHeight: 1
                  }}
                >
                  {stat.number}
                </p>
                <p
                  style={{
                    color: 'rgba(254,241,225,0.5)',
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    fontFamily: 'Inter, sans-serif',
                    marginTop: '6px',
                  }}
                >
                  {stat.label.toUpperCase()}
                </p>
              
              </motion.div>
            ))}
          </div>

          {/* Education */}
          <div
            style={{
              borderLeft: '1px solid rgba(202,181,136,0.3)',
              paddingLeft: '20px',
              paddingTop: '20px'
            }}
          >
            <p
              style={{
                color: '#CAB588',
                fontSize: '11px',
                letterSpacing: '0.3em',
                fontFamily: 'Inter, sans-serif',
                marginBottom: '6px'
              }}
            >
              EDUCATION
            </p>
            <p
              style={{
                color: '#FEF1E1',
                fontSize: '15px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '400'
              }}
            >
              B.Tech — Electrical & Electronics Engineering
            </p>
            <p
              style={{
                color: 'rgba(254,241,225,0.5)',
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
                marginTop: '4px'
              }}
            >
              IIIT Bhubaneswar · 2023 - 2027
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About