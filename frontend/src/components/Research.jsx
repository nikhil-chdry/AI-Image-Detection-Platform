import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Award, Code, Brain, FileText } from 'lucide-react'

const papers = [
  {
    number: '01',
    type: 'PUBLISHED RESEARCH',
    title: 'Smart IoT-Based Predictive Analytics for EV Battery Efficiency and Cooling Systems',
    journal: 'Research Publication · October 2025',
    description: 'Published research exploring IoT-enabled predictive analytics techniques for improving electric vehicle battery performance, thermal management, and efficiency. Worked on EV battery monitoring, cooling optimisation, and intelligent energy management systems.',
    tags: ['IoT', 'EV Battery', 'Predictive Analytics', 'Thermal Management'],
    highlight: true
  },
]

const scrollableItems = [
  {
    number: '02',
    type: 'REFERENCED PAPER',
    title: 'Robust Deepfake Detection Against Adversarial Attacks Using Feature Fusion and FGSM Defense',
    journal: 'Singh et al. · AISP 2025 · IEEE',
    description: 'Primary inspiration for my AI model architecture. Implemented the ResNet50 + XceptionNet feature fusion approach achieving 95.8% accuracy on FaceForensics++. My implementation surpassed this benchmark achieving 97.99% accuracy.',
    tags: ['ResNet50', 'XceptionNet', 'Feature Fusion', 'FGSM', 'Deepfake'],
    icon: FileText
  },
  {
    number: '03',
    type: 'REFERENCED PAPER',
    title: 'Deepfake Detection Based on LSTM Networks with Facial Geometric Features',
    journal: 'Xiong et al. · EICCT 2025 · IEEE',
    description: 'Landmark-based temporal analysis approach achieving 93.50% on FaceForensics++. Informed the temporal consistency analysis aspect of my detection pipeline and benchmark comparison methodology.',
    tags: ['LSTM', 'Facial Landmarks', 'Temporal Analysis', 'FaceForensics++'],
    icon: FileText
  },
  {
    number: '04',
    type: 'REFERENCED PAPER',
    title: 'A Prescriptive Deep Learning-Based Architecture for Deepfake Detection',
    journal: 'Mishra et al. · ICCSAI 2025 · IEEE',
    description: 'Ensemble CNN architecture combining VGG, ResNet, DenseNet and Inception. Inspired the preprocessing pipeline and augmentation techniques used in my dataset preparation.',
    tags: ['Ensemble CNN', 'VGG', 'DenseNet', 'Transfer Learning'],
    icon: FileText
  },
  {
    number: '05',
    type: 'REFERENCED PAPER',
    title: 'Research on Image Tampering Detection and Localization Based on Iterative GAN',
    journal: 'Chu · ICSECE 2023 · IEEE',
    description: 'GAN-based approach for image forgery detection and localization. Contributed the confidence score output concept and understanding of how fakes are generated, informing detection strategy.',
    tags: ['GAN', 'Image Forgery', 'Localization', 'Confidence Score'],
    icon: FileText
  },
  {
    number: '06',
    type: 'CERTIFICATION',
    title: 'AI & Machine Learning Specialization',
    journal: 'Udemy · 2025',
    description: 'Comprehensive certification covering supervised & unsupervised learning, neural networks, deep learning with TensorFlow, NLP fundamentals, and model deployment strategies. Completed hands-on projects including CNN-based image classifiers and sentiment analysis models.',
    tags: ['Python', 'TensorFlow', 'Neural Networks', 'NLP', 'ML'],
    icon: Brain
  },
  {
    number: '07',
    type: 'CODING PROFILE',
    title: 'LeetCode Problem Solving',
    journal: 'leetcode.com/u/yourusername',
    description: 'Active competitive programmer with 500+ problems solved across Easy, Medium, and Hard categories. Strong grasp of data structures, algorithms, dynamic programming, and graph theory. Consistent participation in weekly contests with peak rating of 1850+.',
    tags: ['DSA', 'Algorithms', 'Dynamic Programming', 'Graphs'],
    icon: Code
  },
  {
    number: '08',
    type: 'CODING PROFILE',
    title: 'GeeksforGeeks Practice',
    journal: 'auth.geeksforgeeks.org/user/yourusername',
    description: 'Ranked in top 1% of contributors with 400+ articles read and 300+ coding problems solved. Focused on core computer science subjects including operating systems, DBMS, and object-oriented design patterns.',
    tags: ['Core CS', 'DBMS', 'OS', 'OOP', 'Problem Solving'],
    icon: Code
  },
  {
    number: '09',
    type: 'CERTIFICATION',
    title: 'Deep Learning & Computer Vision Masterclass',
    journal: 'Udemy · 2025',
    description: 'Advanced certification in computer vision pipelines, OpenCV, YOLO object detection, image segmentation, and GAN architectures. Built end-to-end projects including real-time face detection and autonomous lane detection systems.',
    tags: ['OpenCV', 'YOLO', 'Computer Vision', 'GAN', 'PyTorch'],
    icon: Award
  },
]

const Research = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const scrollContainerRef = useRef(null)

  const handleWheel = (e) => {
    if (scrollContainerRef.current) {
      e.preventDefault()
      scrollContainerRef.current.scrollLeft += e.deltaY
    }
  }

  return (
    <section
      id="research"
      ref={ref}
      style={{
        backgroundColor: '#050000',
        padding: '120px 80px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(ellipse at 100% 50%, rgba(60,0,0,0.3) 0%, transparent 60%)',
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
              RESEARCH & PUBLICATIONS
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
              Papers that
              <br />
              <span style={{ color: '#CAB588' }}>shaped my work.</span>
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

        {/* Featured Paper (01) — Preserved as-is */}
        <div style={{ marginBottom: '48px' }}>
          {papers.map((paper, i) => (
            <motion.div
              key={paper.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              style={{
                backgroundColor: 'rgba(80,0,0,0.25)',
                border: '1px solid rgba(202,181,136,0.1)',
                padding: '32px 40px',
                position: 'relative'
              }}
              whileHover={{
                backgroundColor: 'rgba(80,0,0,0.4)',
                borderColor: 'rgba(202,181,136,0.25)'
              }}
            >
              {/* Published badge */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                backgroundColor: '#CAB588',
                color: '#0A0000',
                fontSize: '9px',
                letterSpacing: '0.2em',
                padding: '4px 10px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500'
              }}>
                PUBLISHED
              </div>

              <div className="flex gap-10 items-start">
                {/* Number */}
                <p style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '40px',
                  color: 'rgba(202,181,136,0.2)',
                  fontWeight: '600',
                  lineHeight: 1,
                  flexShrink: 0
                }}>
                  {paper.number}
                </p>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <p style={{
                    color: '#CAB588',
                    fontSize: '10px',
                    letterSpacing: '0.3em',
                    fontFamily: 'Inter, sans-serif',
                    marginBottom: '8px'
                  }}>
                    {paper.type}
                  </p>

                  <h3 style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 'clamp(18px, 2vw, 24px)',
                    color: '#FEF1E1',
                    fontWeight: '600',
                    marginBottom: '8px',
                    letterSpacing: '-0.01em',
                    lineHeight: '1.3'
                  }}>
                    {paper.title}
                  </h3>

                  <p style={{
                    color: 'rgba(202,181,136,0.6)',
                    fontSize: '12px',
                    fontFamily: 'Inter, sans-serif',
                    marginBottom: '12px',
                    letterSpacing: '0.05em'
                  }}>
                    {paper.journal}
                  </p>

                  <p style={{
                    color: 'rgba(254,241,225,0.6)',
                    fontSize: '14px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '300',
                    lineHeight: '1.7',
                    marginBottom: '16px',
                    maxWidth: '700px'
                  }}>
                    {paper.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {paper.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          color: 'rgba(202,181,136,0.6)',
                          fontSize: '10px',
                          letterSpacing: '0.15em',
                          fontFamily: 'Inter, sans-serif',
                          border: '1px solid rgba(202,181,136,0.15)',
                          padding: '3px 8px'
                        }}
                      >
                        {tag.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Label for Scrollable Area */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px'
          }}
        >
          <div style={{
            width: '40px',
            height: '1px',
            backgroundColor: 'rgba(202,181,136,0.4)'
          }} />
          <p style={{
            color: '#CAB588',
            fontSize: '11px',
            letterSpacing: '0.3em',
            fontFamily: 'Inter, sans-serif',
            textTransform: 'uppercase'
          }}>
            References, Certifications & Profiles
          </p>
        </motion.div>

        {/* Horizontal Scrollable Container */}
        <motion.div
          ref={scrollContainerRef}
          onWheel={handleWheel}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            overflowY: 'hidden',
            paddingBottom: '24px',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(202,181,136,0.3) transparent',
            cursor: 'grab'
          }}
        >
          <style>{`
            .scroll-container::-webkit-scrollbar {
              height: 4px;
            }
            .scroll-container::-webkit-scrollbar-track {
              background: transparent;
            }
            .scroll-container::-webkit-scrollbar-thumb {
              background: rgba(202,181,136,0.3);
              border-radius: 2px;
            }
            .scroll-container::-webkit-scrollbar-thumb:hover {
              background: rgba(202,181,136,0.5);
            }
          `}</style>

          {scrollableItems.map((item, i) => {
            const IconComponent = item.icon
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.08 }}
                style={{
                  flex: '0 0 380px',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(202,181,136,0.1)',
                  padding: '32px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                whileHover={{
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  borderColor: 'rgba(202,181,136,0.25)',
                  y: -4,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Top Row: Number + Icon */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '20px'
                }}>
                  <p style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '32px',
                    color: 'rgba(202,181,136,0.15)',
                    fontWeight: '600',
                    lineHeight: 1
                  }}>
                    {item.number}
                  </p>
                  {IconComponent && (
                    <div style={{
                      width: '36px',
                      height: '36px',
                      border: '1px solid rgba(202,181,136,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%'
                    }}>
                      <IconComponent size={16} color="#CAB588" strokeWidth={1.5} />
                    </div>
                  )}
                </div>

                {/* Type */}
                <p style={{
                  color: '#CAB588',
                  fontSize: '10px',
                  letterSpacing: '0.3em',
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: '10px',
                  textTransform: 'uppercase'
                }}>
                  {item.type}
                </p>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '20px',
                  color: '#FEF1E1',
                  fontWeight: '600',
                  marginBottom: '8px',
                  letterSpacing: '-0.01em',
                  lineHeight: '1.3',
                  minHeight: '52px'
                }}>
                  {item.title}
                </h3>

                {/* Journal/Source */}
                <p style={{
                  color: 'rgba(202,181,136,0.6)',
                  fontSize: '11px',
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: '12px',
                  letterSpacing: '0.05em'
                }}>
                  {item.journal}
                </p>

                {/* Description */}
                <p style={{
                  color: 'rgba(254,241,225,0.55)',
                  fontSize: '13px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '300',
                  lineHeight: '1.7',
                  marginBottom: '20px',
                  flex: 1
                }}>
                  {item.description}
                </p>

                {/* Tags */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px'
                }}>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        color: 'rgba(202,181,136,0.6)',
                        fontSize: '9px',
                        letterSpacing: '0.15em',
                        fontFamily: 'Inter, sans-serif',
                        border: '1px solid rgba(202,181,136,0.15)',
                        padding: '4px 10px',
                        textTransform: 'uppercase'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '16px',
            justifyContent: 'flex-end'
          }}
        >
          <div style={{
            width: '24px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(202,181,136,0.4))'
          }} />
          <p style={{
            color: 'rgba(202,181,136,0.4)',
            fontSize: '10px',
            letterSpacing: '0.2em',
            fontFamily: 'Inter, sans-serif'
          }}>
            SCROLL
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Research