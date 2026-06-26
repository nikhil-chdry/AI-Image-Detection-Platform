import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Research', href: '#research' },
    { label: 'Contact', href: '#contact' },
  ]

  const scrollTo = (href) => {
    const element = document.querySelector(href)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      style={{
        backgroundColor: '#030000',
        borderTop: '1px solid rgba(202,181,136,0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Top section */}
      <div
        style={{
          padding: '80px 80px 60px',
          maxWidth: '1100px',
          margin: '0 auto'
        }}
      >
        <div className="flex items-start justify-between">

          {/* Left - Branding */}
          <div style={{ flex: 1 }}>
            {/* Logo */}
            <motion.h2
              whileHover={{ scale: 1.02 }}
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '48px',
                fontWeight: '600',
                color: '#FEF1E1',
                letterSpacing: '0.05em',
                marginBottom: '16px',
                cursor: 'default'
              }}
            >
              NIKHIL SUNDA<span style={{ color: '#CAB588' }}></span>
            </motion.h2>

            <p style={{
              color: 'rgba(254,241,225,0.4)',
              fontSize: '13px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '300',
              lineHeight: '1.7',
              maxWidth: '300px',
              marginBottom: '32px'
            }}>
              Full Stack Developer & AI/ML Engineer
              building intelligent systems at the
              intersection of web and machine learning.
            </p>

            {/* Status badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid rgba(74,222,128,0.2)',
              padding: '8px 16px',
              backgroundColor: 'rgba(74,222,128,0.05)'
            }}>
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
              <span style={{
                color: '#4ADE80',
                fontSize: '10px',
                letterSpacing: '0.2em',
                fontFamily: 'Inter, sans-serif'
              }}>
                OPEN TO WORK
              </span>
            </div>
          </div>

          {/* Middle - Navigation */}
          <div style={{ flex: '0 0 auto', padding: '0 60px' }}>
            <p style={{
              color: '#CAB588',
              fontSize: '10px',
              letterSpacing: '0.3em',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '24px'
            }}>
              NAVIGATION
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}>
              {links.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(254,241,225,0.5)',
                    fontSize: '13px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '300',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'color 0.3s',
                    padding: 0
                  }}
                  onMouseEnter={e => e.target.style.color = '#CAB588'}
                  onMouseLeave={e => e.target.style.color = 'rgba(254,241,225,0.5)'}
                >
                  {link.label}
                </button>
              ))}
              <Link
                to="/ai-detector"
                style={{
                  color: '#CAB588',
                  fontSize: '13px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '400',
                  textDecoration: 'none'
                }}
              >
                AI Detector →
              </Link>
            </div>
          </div>

          {/* Right - Contact */}
          <div style={{ flex: '0 0 auto' }}>
            <p style={{
              color: '#CAB588',
              fontSize: '10px',
              letterSpacing: '0.3em',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '24px'
            }}>
              CONTACT
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              marginBottom: '32px'
            }}>
              <a
                href="mailto:nikhilsunda42@gmail.com"
                style={{
                  color: 'rgba(254,241,225,0.5)',
                  fontSize: '13px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '300',
                  textDecoration: 'none',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={e => e.target.style.color = '#CAB588'}
                onMouseLeave={e => e.target.style.color = 'rgba(254,241,225,0.5)'}
              >
                nikhilsunda42@gmail.com
              </a>

              <a
                href="https://linkedin.com/in/nikhil-chdry"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'rgba(254,241,225,0.5)',
                  fontSize: '13px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '300',
                  textDecoration: 'none',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={e => e.target.style.color = '#CAB588'}
                onMouseLeave={e => e.target.style.color = 'rgba(254,241,225,0.5)'}
              >
                LinkedIn
              </a>

              <a
                href="https://github.com/nikhil-chdry"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'rgba(254,241,225,0.5)',
                  fontSize: '13px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '300',
                  textDecoration: 'none',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={e => e.target.style.color = '#CAB588'}
                onMouseLeave={e => e.target.style.color = 'rgba(254,241,225,0.5)'}
              >
                GitHub
              </a>

              <a
                href="tel:+919799963897"
                style={{
                  color: 'rgba(254,241,225,0.5)',
                  fontSize: '13px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '300',
                  textDecoration: 'none',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={e => e.target.style.color = '#CAB588'}
                onMouseLeave={e => e.target.style.color = 'rgba(254,241,225,0.5)'}
              >
                +91 97999 63897
              </a>
            </div>

            {/* Resume Download */}
            <motion.a
              href="/resume.pdf"
              download="Nikhil_Sunda_Resume.pdf"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'transparent',
                border: '1px solid #CAB588',
                color: '#CAB588',
                padding: '10px 20px',
                fontSize: '10px',
                letterSpacing: '0.25em',
                fontFamily: 'Inter, sans-serif',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#CAB588'
                e.currentTarget.style.color = '#0A0000'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#CAB588'
              }}
            >
              DOWNLOAD RESUME
            </motion.a>
          </div>
        </div>
      </div>

      {/* Gold divider */}
      <div style={{
        height: '1px',
        backgroundColor: 'rgba(202,181,136,0.1)',
        margin: '0 80px'
      }} />

      {/* Bottom section */}
      <div
        style={{
          padding: '32px 80px',
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Copyright */}
        <p style={{
          color: 'rgba(254,241,225,0.25)',
          fontSize: '11px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '300',
          letterSpacing: '0.1em'
        }}>
          © {currentYear} NIKHIL SUNDA. ALL RIGHTS RESERVED.
        </p>

        {/* Built with */}
        <p style={{
          color: 'rgba(254,241,225,0.25)',
          fontSize: '11px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '300',
          letterSpacing: '0.1em'
        }}>
          BUILT WITH REACT · FRAMER MOTION · PYTORCH
        </p>

        {/* Back to top */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            background: 'none',
            border: '1px solid rgba(202,181,136,0.2)',
            color: 'rgba(202,181,136,0.5)',
            padding: '8px 16px',
            fontSize: '10px',
            letterSpacing: '0.2em',
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#CAB588'
            e.currentTarget.style.color = '#CAB588'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(202,181,136,0.2)'
            e.currentTarget.style.color = 'rgba(202,181,136,0.5)'
          }}
        >
          BACK TO TOP ↑
        </motion.button>
      </div>

      {/* Large background text */}
      <div style={{
        position: 'absolute',
        bottom: '-20px',
        left: '50%',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
        userSelect: 'none'
      }}>
        <p style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(80px, 15vw, 180px)',
          fontWeight: '700',
          color: 'rgba(202,181,136,0.03)',
          letterSpacing: '0.1em',
          whiteSpace: 'nowrap'
        }}>
          NIKHIL SUNDA
        </p>
      </div>
    </footer>
  )
}

export default Footer