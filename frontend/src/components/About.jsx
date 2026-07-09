import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={ref}
      style={{
        backgroundColor: '#080000',
        padding: '120px 80px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(ellipse at 20% 50%, rgba(60,0,0,0.4) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div
        className="relative z-10"
        style={{ maxWidth: '1100px', margin: '0 auto' }}
      >
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            color: '#CAB588',
            fontSize: '13px',
            letterSpacing: '0.4em',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '20px'
          }}
        >
          ABOUT ME
        </motion.p>

        {/* Two column layout */}
        <div className="flex gap-20 items-start">

          {/* Left - Big heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ flex: 1 }}
          >
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(36px, 4vw, 60px)',
                fontWeight: '600',
                color: '#FEF1E1',
                lineHeight: '1.1',
                letterSpacing: '-0.02em'
              }}
            >
              Building things
              <br />
              <span style={{ color: '#CAB588' }}>that <span style={{color: '#FFFFF1' }}>Really</span> matter.</span>
            </h2>

            {/* Gold line */}
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '60px' } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{
                height: '1px',
                backgroundColor: '#CAB588',
                margin: '32px 0'
              }}
            />

            {/* Stats */}
            <div style={{ display: 'flex', gap: '40px' }}>
              {[
                { number: '9+', label: 'Projects Built' },
                { number: '2', label: 'Research Paper' },
                { number: '8.03', label: 'CGPA' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <p style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '40px',
                    color: '#CAB588',
                    fontWeight: '600',
                    lineHeight: 1,
                    display:'flex',
                    justifyContent:'center',
                  }}>
                    {stat.number}
                  </p>
                  <p style={{
                    color: 'rgba(254,241,225,0.4)',
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    fontFamily: 'Inter, sans-serif',
                    marginTop: '6px'
                  }}>
                    {stat.label.toUpperCase()}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Bio + Education */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ flex: 1 }}
          >
            <p style={{
              color: 'rgba(254,241,225,0.7)',
              fontSize: '16px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '300',
              lineHeight: '1.8',
              marginBottom: '24px'
            }}>
              B.Tech student in Electrical & Electronics Engineering
              at IIIT Bhubaneswar, with hands-on experience in
              full-stack web development, AI/ML engineering, and
              IoT research.
            </p>

            <p style={{
              color: 'rgba(254,241,225,0.7)',
              fontSize: '16px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '300',
              lineHeight: '1.8',
              marginBottom: '40px'
            }}>
              Published research on IoT-based predictive analytics
              for EV battery systems. Building production-grade
              platforms at the intersection of web and AI.
            </p>

            {/* Education card */}
            <div
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(202,181,136,0.15)',
                padding: '24px',
              }}
            >
              <p style={{
                color: '#CAB588',
                fontSize: '10px',
                letterSpacing: '0.3em',
                fontFamily: 'Inter, sans-serif',
                marginBottom: '12px'
              }}>
                EDUCATION
              </p>
              <p style={{
                color: '#FEF1E1',
                fontSize: '16px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '400',
                marginBottom: '4px'
              }}>
                B.Tech — Electrical & Electronics Engineering
              </p>
              <p style={{
                color: 'rgba(254,241,225,0.4)',
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
              }}>
                IIIT Bhubaneswar · 2023 — 2027
              </p>
              <div
                style={{
                  marginTop: '16px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(202,181,136,0.1)',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <p style={{
                  color: 'rgba(254,241,225,0.4)',
                  fontSize: '12px',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  Relevant: DBMS, OOPs, OS, CN, DSA, NLP
                </p>
                <p style={{
                  color: '#CAB588',
                  fontSize: '13px',
                  fontFamily: 'Playfair Display, serif'
                }}>
                  8.03 
                </p> 
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About