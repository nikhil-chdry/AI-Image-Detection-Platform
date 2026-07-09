import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, ExternalLink } from 'lucide-react'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

const handleSubmit = async (e) => {
  e.preventDefault()
  setSent('loading')

  try {
    await emailjs.send(
      'service_0hy8tai',      
      'template_wz2tfjv',     
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      },
      'x00h0KMPJRtltU3PZ'       
    )
    setSent('success')
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 5000)
  } catch (error) {
    setSent('error')
    setTimeout(() => setSent(false), 4000)
  }
}

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        backgroundColor: '#080000',
        padding: '140px 80px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background gradient */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(ellipse at 50% 100%, rgba(80,0,0,0.4) 0%, transparent 60%)',
        pointerEvents: 'none'
      }} />

      <div
        className="relative z-10"
        style={{ maxWidth: '1100px', margin: '0 auto' }}
      >
        {/* Header */}
        <div className="flex items-end justify-between mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{
                color: '#CAB588',
                fontSize: '11px',
                letterSpacing: '0.4em',
                fontFamily: 'Inter, sans-serif',
                marginBottom: '16px'
              }}
            >
              GET IN TOUCH
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(36px, 4vw, 56px)',
                fontWeight: '600',
                color: '#FEF1E1',
                lineHeight: '1.1',
                letterSpacing: '-0.02em'
              }}
            >
              Let's build
              <br />
              <span style={{ color: '#CAB588' }}>something great.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '120px' } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            style={{
              height: '1px',
              backgroundColor: '#CAB588',
              marginBottom: '8px'
            }}
          />
        </div>

        {/* Two column layout */}
        <div
          className="flex gap-20"
          style={{ alignItems: 'flex-start' }}
        >
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ flex: '0 0 360px' }}
          >
            {/* Intro text */}
            <p style={{
              color: 'rgba(254,241,225,0.7)',
              fontSize: '16px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '300',
              lineHeight: '1.8',
              marginBottom: '48px'
            }}>
              I'm currently open to software development,
              AI/ML, and backend engineering roles.
              If you have an opportunity or just want
              to connect, I'd love to hear from you.
            </p>

            {/* Contact details */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              marginBottom: '48px'
            }}>
              {/* Email */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '20px 24px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(202,181,136,0.1)'
              }}>
                <Mail size={18} color="#CAB588" />
                <div>
                  <p style={{
                    color: 'rgba(254,241,225,0.4)',
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    fontFamily: 'Inter, sans-serif',
                    marginBottom: '4px'
                  }}>
                    EMAIL
                  </p>
                  <a
                    href="mailto:nikhilsunda42@gmail.com"
                    style={{
                      color: '#FEF1E1',
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                      textDecoration: 'none',
                      transition: 'color 0.3s'
                    }}
                    onMouseEnter={e => e.target.style.color = '#CAB588'}
                    onMouseLeave={e => e.target.style.color = '#FEF1E1'}
                  >
                    nikhilsunda42@gmail.com
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '20px 24px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(202,181,136,0.1)'
              }}>
                <ExternalLink size={18} color="#CAB588" />
                <div>
                  <p style={{
                    color: 'rgba(254,241,225,0.4)',
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    fontFamily: 'Inter, sans-serif',
                    marginBottom: '4px'
                  }}>
                    LINKEDIN
                  </p>
                  <a
                    href="https://linkedin.com/in/nikhil-chdry"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#FEF1E1',
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                      textDecoration: 'none',
                      transition: 'color 0.3s'
                    }}
                    onMouseEnter={e => e.target.style.color = '#CAB588'}
                    onMouseLeave={e => e.target.style.color = '#FEF1E1'}
                  >
                    linkedin.com/in/nikhil-chdry
                  </a>
                </div>
              </div>

              {/* GitHub */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '20px 24px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(202,181,136,0.1)'
              }}>
                <ExternalLink size={18} color="#CAB588" />
                <div>
                  <p style={{
                    color: 'rgba(254,241,225,0.4)',
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    fontFamily: 'Inter, sans-serif',
                    marginBottom: '4px'
                  }}>
                    GITHUB
                  </p>
                  <a
                    href="https://github.com/nikhil-chdry"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#FEF1E1',
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                      textDecoration: 'none',
                      transition: 'color 0.3s'
                    }}
                    onMouseEnter={e => e.target.style.color = '#CAB588'}
                    onMouseLeave={e => e.target.style.color = '#FEF1E1'}
                  >
                    github.com/nikhil-chdry
                  </a>
                </div>
              </div>
            </div>

            {/* Resume Download */}
            <motion.a
              href="/resume.pdf"
              download="Nikhil_Sunda_Resume.pdf"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                backgroundColor: 'transparent',
                border: '1px solid #CAB588',
                color: '#CAB588',
                padding: '16px 32px',
                fontSize: '11px',
                letterSpacing: '0.25em',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '400',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
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
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ flex: 1 }}
          >
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(202,181,136,0.1)',
              padding: '48px'
            }}>
              <p style={{
                color: '#CAB588',
                fontSize: '11px',
                letterSpacing: '0.3em',
                fontFamily: 'Inter, sans-serif',
                marginBottom: '32px'
              }}>
                SEND A MESSAGE
              </p>

              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px'
                }}
              >
                {/* Name */}
                <div>
                  <label style={{
                    color: 'rgba(254,241,225,0.4)',
                    fontSize: '10px',
                    letterSpacing: '0.25em',
                    fontFamily: 'Inter, sans-serif',
                    display: 'block',
                    marginBottom: '10px'
                  }}>
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(202,181,136,0.15)',
                      color: '#FEF1E1',
                      padding: '14px 16px',
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '300',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(202,181,136,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(202,181,136,0.15)'}
                    placeholder="Nikhil Sunda"
                  />
                </div>

                {/* Email */}
                <div>
                  <label style={{
                    color: 'rgba(254,241,225,0.4)',
                    fontSize: '10px',
                    letterSpacing: '0.25em',
                    fontFamily: 'Inter, sans-serif',
                    display: 'block',
                    marginBottom: '10px'
                  }}>
                    YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(202,181,136,0.15)',
                      color: '#FEF1E1',
                      padding: '14px 16px',
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '300',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(202,181,136,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(202,181,136,0.15)'}
                    placeholder="hello@example.com"
                  />
                </div>

                {/* Message */}
                <div>
                  <label style={{
                    color: 'rgba(254,241,225,0.4)',
                    fontSize: '10px',
                    letterSpacing: '0.25em',
                    fontFamily: 'Inter, sans-serif',
                    display: 'block',
                    marginBottom: '10px'
                  }}>
                    MESSAGE
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(202,181,136,0.15)',
                      color: '#FEF1E1',
                      padding: '14px 16px',
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '300',
                      outline: 'none',
                      resize: 'none',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(202,181,136,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(202,181,136,0.15)'}
                    placeholder="I'd like to discuss an opportunity..."
                  />
                </div>

                {/* Submit */}
                 <motion.button
                   type="submit"
                   disabled={sent === 'loading'}
                  whileHover={{ scale: sent === 'loading' ? 1 : 1.02 }}
                 whileTap={{ scale: sent === 'loading' ? 1 : 0.98 }}
                    style={{
                              backgroundColor: sent === 'success'
                             ? 'rgba(74,222,128,0.1)'
                            : sent === 'error'
                          ? 'rgba(248,113,113,0.1)'
                            : sent === 'loading'
                          ? 'rgba(202,181,136,0.3)'
                         : '#CAB588',
                         color: sent === 'success'
                         ? '#4ADE80'
                         : sent === 'error'
                           ? '#F87171'
                        : sent === 'loading'
                        ? 'rgba(202,181,136,0.5)'
                        : '#0A0000',
                      border: sent === 'success'
                        ? '1px solid #4ADE80'
                        : sent === 'error'
                        ? '1px solid #F87171'
                        : 'none',
                      padding: '16px 32px',
                      fontSize: '11px',
                      letterSpacing: '0.25em',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '500',
                      cursor: sent === 'loading' ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      width: '100%'
                    }}
                  >
                    {sent === 'loading'
                      ? 'SENDING...'
                      : sent === 'success'
                      ? '✓ MESSAGE SENT!'
                      : sent === 'error'
                      ? '✗ FAILED - TRY AGAIN'
                      : 'SEND MESSAGE'
                    }
                  </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact