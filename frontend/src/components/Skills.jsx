import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skills = [
  {
    category: 'AI / ML',
    items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'OpenCV', 'NLP', 'Deep Learning', 'CNN', 'FastAPI']
  },
  {
    category: 'Frontend',
    items: ['React.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'JavaScript', 'HTML/CSS']
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'JWT', 'MongoDB']
  },
  {
    category: 'Languages',
    items: ['Python', 'JavaScript', 'C', 'C++', 'SQL', 'Java']
  },
  {
    category: 'Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Postman', 'PyCharm', 'Pandas', 'NumPy']
  },
]

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        backgroundColor: '#050000',
        padding: '120px 80px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background gradient */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(ellipse at 100% 0%, rgba(60,0,0,0.3) 0%, transparent 60%)',
        pointerEvents: 'none'
      }} />

      <div
        className="relative z-10"
        style={{ maxWidth: '1100px', margin: '0 auto' }}
      >
        {/* Header */}
        <div className="flex items-end justify-between mb-16">
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
              TECH STACK
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
              Tools I work
              <br />
              <span style={{ color: '#CAB588' }}>with.</span>
            </motion.h2>
          </div>

          {/* Gold line */}
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

        {/* Skills Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1px',
          backgroundColor: 'rgba(202,181,136,0.1)',
          border: '1px solid rgba(202,181,136,0.1)'
        }}>
          {skills.map((skill, i) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              style={{
                backgroundColor: '#050000',
                padding: '32px 24px',
              }}
            >
              {/* Category */}
              <p style={{
                color: '#CAB588',
                fontSize: '10px',
                letterSpacing: '0.3em',
                fontFamily: 'Inter, sans-serif',
                marginBottom: '20px'
              }}>
                {skill.category.toUpperCase()}
              </p>

              {/* Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {skill.items.map((item, j) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 + j * 0.05 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <div style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: '#CAB588',
                      flexShrink: 0
                    }} />
                    <p style={{
                      color: 'rgba(254,241,225,0.7)',
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '300'
                    }}>
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom marquee - scrolling skills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          style={{
            marginTop: '60px',
            overflow: 'hidden',
            borderTop: '1px solid rgba(202,181,136,0.1)',
            borderBottom: '1px solid rgba(202,181,136,0.1)',
            padding: '16px 0'
          }}
        >
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'flex', gap: '60px', width: 'max-content' }}
          >
          {[...skills.flatMap(s => s.items), ...skills.flatMap(s => s.items)].map((item, i) => (
  <motion.span
    key={i}
    style={{
      fontSize: '12px',
      letterSpacing: '0.3em',
      fontFamily: 'Inter, sans-serif',
      whiteSpace: 'nowrap',
      color: 'rgba(202,181,136,0.4)',
    }}
    animate={{
      color: [
        'rgba(202,181,136,0.3)',
        'rgba(202,181,136,1)',
        'rgba(202,181,136,0.3)'
      ],
      textShadow: [
        '0 0 0px rgba(202,181,136,0)',
        '0 0 20px rgba(202,181,136,0.8), 0 0 40px rgba(202,181,136,0.4)',
        '0 0 0px rgba(202,181,136,0)'
      ]
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay: i * 0.3,
      ease: 'easeInOut'
    }}
  >
    {item.toUpperCase()}
  </motion.span>
))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills