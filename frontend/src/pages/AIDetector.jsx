import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import axios from 'axios'

const AIDetector = () => {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef(null)

  const handleFile = (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }
    setImage(file)
    setPreview(URL.createObjectURL(file))
    setResult(null)
    setError(null)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  const handleAnalyze = async () => {
    if (!image) return
    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', image)

      const response = await axios.post(
        'http://127.0.0.1:8000/predict/both',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      setResult(response.data)
    } catch (err) {
      setError('Analysis failed. Make sure the AI model server is running!')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setImage(null)
    setPreview(null)
    setResult(null)
    setError(null)
  }

  return (
    <div style={{
      backgroundColor: '#0A0000',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Background gradient */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 0%, rgba(80,0,0,0.4) 0%, transparent 60%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Navbar */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 40,
        padding: '20px 60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(10,0,0,0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(202,181,136,0.1)'
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '22px',
            fontWeight: '600',
            color: '#FEF1E1',
            letterSpacing: '0.1em'
          }}>
            NS<span style={{ color: '#CAB588' }}>.</span>
          </h1>
        </Link>

        <p style={{
          color: '#CAB588',
          fontSize: '11px',
          letterSpacing: '0.3em',
          fontFamily: 'Inter, sans-serif'
        }}>
          AI IMAGE DETECTOR
        </p>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            style={{
              background: 'none',
              border: '1px solid rgba(202,181,136,0.3)',
              color: 'rgba(254,241,225,0.6)',
              padding: '8px 20px',
              fontSize: '10px',
              letterSpacing: '0.2em',
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer'
            }}
          >
            ← BACK
          </motion.button>
        </Link>
      </div>

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '120px 80px 80px',
        maxWidth: '1300px',
        margin: '0 auto'
      }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '60px', textAlign: 'center' }}
        >
          <p style={{
            color: '#CAB588',
            fontSize: '11px',
            letterSpacing: '0.4em',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '16px'
          }}>
            POWERED BY RESNET50 + XCEPTIONNET FEATURE FUSION
          </p>

          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: '600',
            color: '#FEF1E1',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            marginBottom: '20px'
          }}>
            Detect AI Generated
            <br />
            <span style={{ color: '#CAB588' }}>Images Instantly.</span>
          </h1>

          <p style={{
            color: 'rgba(254,241,225,0.5)',
            fontSize: '15px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '300',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: '1.7'
          }}>
            Upload any image and my model will analyze it
            using 3 specialized models trained on 130K+ images,
            inspired by 4 IEEE research papers.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '32px',
          alignItems: 'start'
        }}>

          {/* Left - Upload */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Upload Area */}
            <div
              onClick={() => !preview && fileRef.current.click()}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              style={{
                border: `1px solid ${dragging
                  ? '#CAB588'
                  : 'rgba(202,181,136,0.2)'}`,
                backgroundColor: dragging
                  ? 'rgba(202,181,136,0.05)'
                  : 'rgba(255,255,255,0.02)',
                cursor: preview ? 'default' : 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {preview ? (
                // Image Preview
                <div style={{ width: '100%', position: 'relative' }}>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: '100%',
                      maxHeight: '450px',
                      objectFit: 'contain',
                      display: 'block'
                    }}
                  />
                  {/* Remove button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={(e) => { e.stopPropagation(); reset() }}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(10,0,0,0.8)',
                      border: '1px solid rgba(202,181,136,0.3)',
                      color: '#CAB588',
                      padding: '6px 12px',
                      fontSize: '10px',
                      letterSpacing: '0.2em',
                      fontFamily: 'Inter, sans-serif',
                      cursor: 'pointer'
                    }}
                  >
                    REMOVE
                  </motion.button>
                </div>
              ) : (
                // Upload placeholder
                <div style={{ textAlign: 'center', padding: '60px 40px' }}>
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      fontSize: '48px',
                      marginBottom: '24px'
                    }}
                  >
                    ⬆
                  </motion.div>

                  <p style={{
                    color: '#FEF1E1',
                    fontSize: '16px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '300',
                    marginBottom: '8px'
                  }}>
                    Drop your image here
                  </p>

                  <p style={{
                    color: 'rgba(254,241,225,0.4)',
                    fontSize: '12px',
                    fontFamily: 'Inter, sans-serif',
                    marginBottom: '24px'
                  }}>
                    or click to browse
                  </p>

                  <p style={{
                    color: 'rgba(202,181,136,0.5)',
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    JPG · PNG · JPEG · WEBP
                  </p>
                </div>
              )}
            </div>

            {/* Hidden input */}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={e => handleFile(e.target.files[0])}
              style={{ display: 'none' }}
            />

            {/* Analyze Button */}
            <motion.button
              onClick={handleAnalyze}
              disabled={!image || loading}
              whileHover={image && !loading ? { scale: 1.02 } : {}}
              whileTap={image && !loading ? { scale: 0.98 } : {}}
              style={{
                width: '100%',
                marginTop: '16px',
                backgroundColor: image && !loading ? '#CAB588' : 'rgba(202,181,136,0.1)',
                color: image && !loading ? '#0A0000' : 'rgba(202,181,136,0.3)',
                border: 'none',
                padding: '18px',
                fontSize: '12px',
                letterSpacing: '0.3em',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500',
                cursor: image && !loading ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? 'ANALYZING...' : 'ANALYZE IMAGE'}
            </motion.button>

            {/* Loading bar */}
            {loading && (
              <div style={{
                marginTop: '8px',
                height: '2px',
                backgroundColor: 'rgba(202,181,136,0.1)',
                overflow: 'hidden'
              }}>
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  style={{
                    height: '100%',
                    width: '50%',
                    backgroundColor: '#CAB588'
                  }}
                />
              </div>
            )}

            {/* Error */}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  marginTop: '12px',
                  color: '#F87171',
                  fontSize: '12px',
                  fontFamily: 'Inter, sans-serif',
                  textAlign: 'center'
                }}
              >
                {error}
              </motion.p>
            )}
          </motion.div>

          {/* Right - Results */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              {!result ? (
                // Placeholder
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    border: '1px solid rgba(202,181,136,0.1)',
                    backgroundColor: 'rgba(255,255,255,0.01)',
                    minHeight: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '60px 40px',
                    textAlign: 'center'
                  }}
                >
                  <div style={{
                    width: '60px',
                    height: '60px',
                    border: '1px solid rgba(202,181,136,0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px'
                  }}>
                    <span style={{ fontSize: '24px' }}>🔍</span>
                  </div>

                  <p style={{
                    color: 'rgba(254,241,225,0.4)',
                    fontSize: '14px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '300',
                    lineHeight: '1.7'
                  }}>
                    Upload an image and click
                    <br />
                    "Analyze" to see results
                  </p>
                </motion.div>
              ) : (
                // Results
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                >
                  {/* Primary Result */}
                  <div style={{
                    border: `1px solid ${result.v3_result.label === 'REAL'
                      ? 'rgba(74,222,128,0.4)'
                      : 'rgba(248,113,113,0.4)'}`,
                    backgroundColor: result.v3_result.label === 'REAL'
                      ? 'rgba(74,222,128,0.05)'
                      : 'rgba(248,113,113,0.05)',
                    padding: '40px'
                  }}>
                    <p style={{
                      color: '#CAB588',
                      fontSize: '10px',
                      letterSpacing: '0.3em',
                      fontFamily: 'Inter, sans-serif',
                      marginBottom: '16px'
                    }}>
                      PRIMARY VERDICT
                    </p>

                    <h2 style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '56px',
                      fontWeight: '600',
                      color: result.v3_result.label === 'REAL' ? '#4ADE80' : '#F87171',
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                      marginBottom: '8px'
                    }}>
                      {result.v3_result.label}
                    </h2>

                    <p style={{
                      color: 'rgba(254,241,225,0.5)',
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '300',
                      marginBottom: '24px'
                    }}>
                      {result.v3_result.confidence}% confidence
                    </p>

                    {/* Probability bars */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {/* Real bar */}
                      <div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '6px'
                        }}>
                          <span style={{
                            color: 'rgba(254,241,225,0.5)',
                            fontSize: '11px',
                            letterSpacing: '0.2em',
                            fontFamily: 'Inter, sans-serif'
                          }}>
                            REAL
                          </span>
                          <span style={{
                            color: '#4ADE80',
                            fontSize: '11px',
                            fontFamily: 'Inter, sans-serif'
                          }}>
                            {result.v3_result.real_probability}%
                          </span>
                        </div>
                        <div style={{
                          height: '4px',
                          backgroundColor: 'rgba(255,255,255,0.05)',
                          borderRadius: '2px',
                          overflow: 'hidden'
                        }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.v3_result.real_probability}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                            style={{
                              height: '100%',
                              backgroundColor: '#4ADE80',
                              borderRadius: '2px'
                            }}
                          />
                        </div>
                      </div>

                      {/* Fake bar */}
                      <div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '6px'
                        }}>
                          <span style={{
                            color: 'rgba(254,241,225,0.5)',
                            fontSize: '11px',
                            letterSpacing: '0.2em',
                            fontFamily: 'Inter, sans-serif'
                          }}>
                            AI GENERATED
                          </span>
                          <span style={{
                            color: '#F87171',
                            fontSize: '11px',
                            fontFamily: 'Inter, sans-serif'
                          }}>
                            {result.v3_result.fake_probability}%
                          </span>
                        </div>
                        <div style={{
                          height: '4px',
                          backgroundColor: 'rgba(255,255,255,0.05)',
                          borderRadius: '2px',
                          overflow: 'hidden'
                        }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.v3_result.fake_probability}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            style={{
                              height: '100%',
                              backgroundColor: '#F87171',
                              borderRadius: '2px'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* All 3 Models Comparison */}
                  <div style={{
                    border: '1px solid rgba(202,181,136,0.1)',
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    padding: '32px'
                  }}>
                    <p style={{
                      color: '#CAB588',
                      fontSize: '10px',
                      letterSpacing: '0.3em',
                      fontFamily: 'Inter, sans-serif',
                      marginBottom: '20px'
                    }}>
                      ALL MODELS COMPARISON
                    </p>

                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}>
                      {[
                        {
                          label: 'V1 — CIFAKE Benchmark',
                          accuracy: '97.99%',
                          result: result.v1_result
                        },
                        {
                          label: 'V2 — Real-World Dataset',
                          accuracy: '94.53%',
                          result: result.v2_result
                        },
                        {
                          label: 'V3 — Human Faces',
                          accuracy: '100%',
                          result: result.v3_result
                        },
                      ].map((model) => (
                        <div
                          key={model.label}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '14px 16px',
                            backgroundColor: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(202,181,136,0.08)'
                          }}
                        >
                          <div>
                            <p style={{
                              color: 'rgba(254,241,225,0.7)',
                              fontSize: '12px',
                              fontFamily: 'Inter, sans-serif',
                              marginBottom: '2px'
                            }}>
                              {model.label}
                            </p>
                            <p style={{
                              color: 'rgba(202,181,136,0.4)',
                              fontSize: '10px',
                              letterSpacing: '0.1em',
                              fontFamily: 'Inter, sans-serif'
                            }}>
                              Test Acc: {model.accuracy}
                            </p>
                          </div>

                          <div style={{ textAlign: 'right' }}>
                            <p style={{
                              color: model.result.label === 'REAL' ? '#4ADE80' : '#F87171',
                              fontSize: '14px',
                              fontFamily: 'Playfair Display, serif',
                              fontWeight: '600',
                              marginBottom: '2px'
                            }}>
                              {model.result.label}
                            </p>
                            <p style={{
                              color: 'rgba(254,241,225,0.4)',
                              fontSize: '11px',
                              fontFamily: 'Inter, sans-serif'
                            }}>
                              {model.result.confidence}%
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Model Info */}
                  <div style={{
                    border: '1px solid rgba(202,181,136,0.1)',
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    padding: '24px 32px'
                  }}>
                    <p style={{
                      color: 'rgba(254,241,225,0.4)',
                      fontSize: '12px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '300',
                      lineHeight: '1.6'
                    }}>
                      Analyzed using ResNet50 + XceptionNet
                      Feature Fusion inspired by 4 IEEE research papers.
                      Primary verdict from V3 Human Faces model
                      (100% test accuracy on human face dataset).
                    </p>
                  </div>

                  {/* Try Again */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={reset}
                    style={{
                      width: '100%',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(202,181,136,0.3)',
                      color: 'rgba(202,181,136,0.7)',
                      padding: '14px',
                      fontSize: '11px',
                      letterSpacing: '0.3em',
                      fontFamily: 'Inter, sans-serif',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#CAB588'
                      e.currentTarget.style.color = '#CAB588'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(202,181,136,0.3)'
                      e.currentTarget.style.color = 'rgba(202,181,136,0.7)'
                    }}
                  >
                    TRY ANOTHER IMAGE
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Model Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            marginTop: '60px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2px',
            backgroundColor: 'rgba(202,181,136,0.08)',
            border: '1px solid rgba(202,181,136,0.08)'
          }}
        >
          {[
            { value: '97.99%', label: 'CIFAKE Accuracy' },
            { value: '99.82%', label: 'AUC Score' },
            { value: '130K+', label: 'Training Images' },
            { value: '4', label: 'IEEE Papers' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                backgroundColor: '#0A0000',
                padding: '32px',
                textAlign: 'center'
              }}
            >
              <p style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '36px',
                color: '#CAB588',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                {stat.value}
              </p>
              <p style={{
                color: 'rgba(254,241,225,0.4)',
                fontSize: '10px',
                letterSpacing: '0.25em',
                fontFamily: 'Inter, sans-serif'
              }}>
                {stat.label.toUpperCase()}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default AIDetector