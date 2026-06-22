// ============================================================
// NAVBAR
// Minimal luxury navbar inspired by Gucci
// ============================================================

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Research', href: '#research' },
    { label: 'Contact', href: '#contact' },
  ]

  const scrollTo = (href) => {
    setMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          backgroundColor: scrolled
            ? 'rgba(10, 10, 10, 0.95)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(202, 181, 136, 0.15)'
            : 'none',
          padding: scrolled ? '16px 0' : '24px 0'
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{ padding: '0 40px' }}
        >
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
          >
            <Link to="/">
              <h1
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '22px',
                  fontWeight: '600',
                  color: '#FEF1E1',
                  letterSpacing: '0.1em'
                }}
              >
                NS
                <span style={{ color: '#CAB588' }}>.</span>
              </h1>
            </Link>
          </motion.div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                onClick={() => scrollTo(link.href)}
                style={{
                  color: '#FEF1E1',
                  fontSize: '12px',
                  letterSpacing: '0.2em',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '400',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '4px 0'
                }}
                whileHover={{ color: '#CAB588' }}
              >
                {link.label.toUpperCase()}
                {/* Underline hover effect */}
                <motion.div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: '1px',
                    backgroundColor: '#CAB588',
                    width: 0
                  }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}

            {/* AI Detector CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Link to="/ai-detector">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #CAB588',
                    color: '#CAB588',
                    padding: '8px 20px',
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    fontFamily: 'Inter, sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={e => {
                    e.target.style.backgroundColor = '#CAB588'
                    e.target.style.color = '#0A0A0A'
                  }}
                  onMouseLeave={e => {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.color = '#CAB588'
                  }}
                >
                  TRY AI DETECTOR
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: '#FEF1E1', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 flex flex-col items-center justify-center"
          style={{ backgroundColor: 'rgba(10,10,10,0.98)' }}
        >
          {navLinks.map((link, i) => (
            <motion.button
              key={link.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => scrollTo(link.href)}
              style={{
                color: '#FEF1E1',
                fontSize: '28px',
                letterSpacing: '0.2em',
                fontFamily: 'Playfair Display, serif',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '16px 0'
              }}
            >
              {link.label}
            </motion.button>
          ))}
          <Link to="/ai-detector" onClick={() => setMenuOpen(false)}>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                marginTop: '32px',
                border: '1px solid #CAB588',
                color: '#CAB588',
                padding: '12px 32px',
                fontSize: '12px',
                letterSpacing: '0.3em',
                background: 'none',
                cursor: 'pointer'
              }}
            >
              TRY AI DETECTOR
            </motion.button>
          </Link>
        </motion.div>
      )}
    </>
  )
}

export default Navbar