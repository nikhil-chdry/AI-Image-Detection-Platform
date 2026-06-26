import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, GitFork } from 'lucide-react'
import amcImage from '../assets/amc.png'
import liveBazarImage from '../assets/livebazar.png'
import aiDetectionImage from '../assets/aidetector.png'

const projects = [
  {
    number: '01',
    title: 'AI Image Detection Platform',
    subtitle: 'Featured Project',
    description: 'A full-stack AI-powered web application that detects whether an uploaded image is AI-generated or real. Inspired by 4 IEEE research papers, implementing ensemble CNN approach (ResNet50 + XceptionNet) with Feature Fusion.',
    tech: ['PyTorch', 'ResNet50', 'XceptionNet', 'FastAPI', 'React', 'Node.js', 'MongoDB'],
    metrics: [
      { label: 'Test Accuracy', value: '97.99%' },
      { label: 'AUC Score', value: '99.82%' },
      { label: 'Training Images', value: '120K' },
    ],
    github: 'https://github.com/nikhil-chdry/AI-Image-Detection-Platform',
    live: 'https://ai-image-detection-demo.vercel.app',
    image: aiDetectionImage,
    featured: true
  },
  {
    number: '02',
    title: 'Algorithmic Smart Shop',
    subtitle: 'Full Stack Project',
    description: 'A full-stack e-commerce platform processing 10,000+ products using Python and FastAPI. Engineered a Content-Based Recommendation Engine using Cosine Similarity to calculate product relationships and display relevant suggestions dynamically.',
    tech: ['React', 'Python', 'FastAPI', 'Pandas', 'Scikit-Learn'],
    metrics: [
      { label: 'Products', value: '10K+' },
      { label: 'Algorithm', value: 'Cosine Similarity' },
      { label: 'Stack', value: 'Full Stack' },
    ],
    github: 'https://github.com/nikhil-chdry/algorithmic-smart-shop',
    live: 'https://smart-shop-platform-aaph.vercel.app/',
    image: liveBazarImage,
    featured: false
  },
  {
    number: '03',
    title: 'Water AMC Management System',
    subtitle: 'Real-World Business Solution',
    description: 'A business management platform for a water treatment company handling RO plants, water coolers, and AMC services. Developed scalable backend APIs and responsive frontend interfaces to support daily business operations.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST APIs'],
    metrics: [
      { label: 'Type', value: 'Business Platform' },
      { label: 'Auth', value: 'JWT Secured' },
      { label: 'Stack', value: 'MERN' },
    ],
    github: 'https://github.com/nikhil-chdry/water-amc-system',
    live: 'https://water-amc-green.vercel.app/dashboard',
    image: amcImage,
    featured: false
  },
]

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="projects"
      ref={ref}
      style={{
        backgroundColor: '#080000',
        padding: '120px 80px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(ellipse at 0% 100%, rgba(60,0,0,0.3) 0%, transparent 60%)',
        pointerEvents: 'none'
      }} />

      <div
        className="relative z-10"
        style={{ maxWidth: '1200px', margin: '0 auto' }}
      >
        {/* Header */}
        <div className="flex items-end justify-between mb-24">
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
              SELECTED WORK
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
              Projects that
              <br />
              <span style={{ color: '#CAB588' }}>define me.</span>
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

        {/* Projects */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const ProjectCard = ({ project, index, isInView }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.3 + index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: project.featured
          ? 'rgba(80,0,0,0.2)'
          : 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(202,181,136,0.1)',
        padding: '56px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '6px',
        maxHeight:'400px',
        overflow: 'auto',
      }}
      whileHover={{
        backgroundColor: 'rgba(80,0,0,0.3)',
        borderColor: 'rgba(202,181,136,0.3)'
      }}
    >
      {/* Featured badge */}
      {project.featured && (
        <div
          style={{
            position: 'absolute',
            top: '28px',
            right: '28px',
            backgroundColor: '#CAB588',
            color: '#0A0000',
            fontSize: '9px',
            letterSpacing: '0.2em',
            padding: '6px 14px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '500',
            borderRadius: '2px',
            zIndex: 10
          }}
        >
          FEATURED
        </div>
      )}

      <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
        {/* Left Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Number */}
          <p style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '48px',
            color: 'rgba(202,181,136,0.2)',
            fontWeight: '600',
            lineHeight: 1,
            marginBottom: '32px'
          }}>
            {project.number}
          </p>

          {/* Subtitle */}
          <p style={{
            color: '#CAB588',
            fontSize: '10px',
            letterSpacing: '0.3em',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '16px'
          }}>
            {project.subtitle.toUpperCase()}
          </p>

          {/* Title */}
          <h3 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(24px, 2.5vw, 34px)',
            color: '#FEF1E1',
            fontWeight: '600',
            marginBottom: '24px',
            letterSpacing: '-0.01em',
            lineHeight: '1.2'
          }}>
            {project.title}
          </h3>

          {/* Description */}
          <p style={{
            color: 'rgba(254,241,225,0.6)',
            fontSize: '15px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '300',
            lineHeight: '1.8',
            marginBottom: '40px',
            maxWidth: '520px'
          }}>
            {project.description}
          </p>

          {/* Metrics */}
          <div style={{ display: 'flex', gap: '48px', marginBottom: '40px' }}>
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <p style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '24px',
                  color: '#CAB588',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  {metric.value}
                </p>
                <p style={{
                  color: 'rgba(254,241,225,0.4)',
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {metric.label.toUpperCase()}
                </p>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}>
            {project.tech.map((tech) => (
              <span
                key={tech}
                style={{
                  color: 'rgba(202,181,136,0.7)',
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  fontFamily: 'Inter, sans-serif',
                  border: '1px solid rgba(202,181,136,0.2)',
                  padding: '8px 14px',
                  borderRadius: '3px'
                }}
              >
                {tech.toUpperCase()}
              </span>
            ))}
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '32px' }}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'rgba(254,241,225,0.5)',
                fontSize: '11px',
                letterSpacing: '0.2em',
                fontFamily: 'Inter, sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
                transition: 'color 0.3s',
                padding: '10px 0'
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#CAB588'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(254,241,225,0.5)'}
            >
              <GitFork size={14} />
              VIEW CODE
            </a>

            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#CAB588',
                fontSize: '11px',
                letterSpacing: '0.2em',
                fontFamily: 'Inter, sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
                padding: '10px 0',
                transition: 'opacity 0.3s'
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <ExternalLink size={14} />
              LIVE DEMO
            </a>
          </div>
        </div>

        {/* Right Side - Screenshot */}
        <div
          style={{
            width: '380px',
            flexShrink: 0,
            position: 'relative',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid rgba(202,181,136,0.15)',
            backgroundColor: 'rgba(255,255,255,0.02)'
          }}
        >
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              minHeight: '280px'
            }}
          />
          {/* Subtle overlay on hover */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: hovered ? 'rgba(202,181,136,0.05)' : 'transparent',
              transition: 'background-color 0.3s ease',
              pointerEvents: 'none'
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default Projects