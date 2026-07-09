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
      backgroundColor: '#FFFFFF',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    }}>

      {/* Navbar */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 40,
        padding: '20px 60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '22px',
            fontWeight: '700',
            color: '#1a1a1a',
            letterSpacing: '-0.02em'
          }}>
            NS<span style={{ color: '#006633' }}>.</span>
          </h1>
        </Link>

        <p style={{
          color: '#666666',
          fontSize: '11px',
          letterSpacing: '0.2em',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '500',
          textTransform: 'uppercase'
        }}>
          AI Image Detector
        </p>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            style={{
              background: 'none',
              border: '1px solid rgba(0,0,0,0.15)',
              color: '#333333',
              padding: '8px 20px',
              fontSize: '11px',
              letterSpacing: '0.15em',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500',
              cursor: 'pointer',
              borderRadius: '4px',
              textTransform: 'uppercase'
            }}
          >
            ← Back
          </motion.button>
        </Link>
      </div>

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '140px 80px 80px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '60px' }}
        >
          <p style={{
            color: '#006633',
            fontSize: '12px',
            letterSpacing: '0.15em',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '600',
            marginBottom: '16px',
            textTransform: 'uppercase'
          }}>
            Powered by ResNet50 + XceptionNet Feature Fusion
          </p>

          <h1 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: '800',
            color: '#1a1a1a',
            lineHeight: '1.1',
            letterSpacing: '-0.03em',
            marginBottom: '20px'
          }}>
            Detect AI Generated
            <br />
            <span style={{ color: '#006633' }}>Images Instantly.</span>
          </h1>

          <p style={{
            color: '#555555',
            fontSize: '16px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '400',
            maxWidth: '500px',
            lineHeight: '1.7'
          }}>
            Upload any image and my model will analyze it
            using 3 specialized models trained on 130K+ images.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
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
                border: `2px dashed ${dragging
                  ? '#006633'
                  : 'rgba(0,0,0,0.12)'}`,
                backgroundColor: dragging
                  ? 'rgba(0,102,51,0.03)'
                  : '#FAFAFA',
                cursor: preview ? 'default' : 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px'
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
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(0,0,0,0.12)',
                      color: '#333333',
                      padding: '6px 14px',
                      fontSize: '11px',
                      letterSpacing: '0.1em',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '500',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      textTransform: 'uppercase'
                    }}
                  >
                    Remove
                  </motion.button>
                </div>
              ) : (
                // Upload placeholder
                <div style={{ textAlign: 'center', padding: '60px 40px' }}>
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      fontSize: '40px',
                      marginBottom: '24px',
                      color: '#006633'
                    }}
                  >
                    ⬆
                  </motion.div>

                  <p style={{
                    color: '#1a1a1a',
                    fontSize: '16px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500',
                    marginBottom: '8px'
                  }}>
                    Drop your image here
                  </p>

                  <p style={{
                    color: '#888888',
                    fontSize: '13px',
                    fontFamily: 'Inter, sans-serif',
                    marginBottom: '24px'
                  }}>
                    or click to browse
                  </p>

                  <p style={{
                    color: '#999999',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500',
                    textTransform: 'uppercase'
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
                marginTop: '20px',
                backgroundColor: image && !loading ? '#006633' : 'rgba(0,102,51,0.15)',
                color: image && !loading ? '#FFFFFF' : 'rgba(0,102,51,0.4)',
                border: 'none',
                padding: '18px',
                fontSize: '13px',
                letterSpacing: '0.15em',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '600',
                cursor: image && !loading ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                borderRadius: '6px',
                textTransform: 'uppercase'
              }}
            >
              {loading ? 'Analyzing...' : 'Analyze Image'}
            </motion.button>

            {/* Loading bar */}
            {loading && (
              <div style={{
                marginTop: '12px',
                height: '3px',
                backgroundColor: 'rgba(0,102,51,0.1)',
                overflow: 'hidden',
                borderRadius: '2px'
              }}>
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  style={{
                    height: '100%',
                    width: '50%',
                    backgroundColor: '#006633',
                    borderRadius: '2px'
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
                  color: '#dc2626',
                  fontSize: '13px',
                  fontFamily: 'Inter, sans-serif',
                  textAlign: 'center',
                  fontWeight: '500'
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
                    border: '1px solid rgba(0,0,0,0.08)',
                    backgroundColor: '#FAFAFA',
                    minHeight: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '60px 40px',
                    textAlign: 'center',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{
                    width: '60px',
                    height: '60px',
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px',
                    backgroundColor: '#FFFFFF'
                  }}>
                    <span style={{ fontSize: '24px' }}>🔍</span>
                  </div>

                  <p style={{
                    color: '#888888',
                    fontSize: '15px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '400',
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
                  style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                >
                  {/* Primary Result */}
                  <div style={{
                    border: `1px solid ${result.v3_result.label === 'REAL'
                      ? 'rgba(0,102,51,0.2)'
                      : 'rgba(220,38,38,0.2)'}`,
                    backgroundColor: result.v3_result.label === 'REAL'
                      ? 'rgba(0,102,51,0.03)'
                      : 'rgba(220,38,38,0.03)',
                    padding: '40px',
                    borderRadius: '8px'
                  }}>
                    <p style={{
                      color: '#666666',
                      fontSize: '11px',
                      letterSpacing: '0.15em',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '600',
                      marginBottom: '16px',
                      textTransform: 'uppercase'
                    }}>
                      Primary Verdict
                    </p>

                    <h2 style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '48px',
                      fontWeight: '800',
                      color: result.v3_result.label === 'REAL' ? '#006633' : '#dc2626',
                      letterSpacing: '-0.03em',
                      lineHeight: 1,
                      marginBottom: '8px'
                    }}>
                      {result.v3_result.label}
                    </h2>

                    <p style={{
                      color: '#666666',
                      fontSize: '15px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '400',
                      marginBottom: '28px'
                    }}>
                      {result.v3_result.confidence}% confidence
                    </p>

                    {/* Probability bars */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {/* Real bar */}
                      <div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '6px'
                        }}>
                          <span style={{
                            color: '#555555',
                            fontSize: '11px',
                            letterSpacing: '0.1em',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: '600',
                            textTransform: 'uppercase'
                          }}>
                            Real
                          </span>
                          <span style={{
                            color: '#006633',
                            fontSize: '12px',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: '600'
                          }}>
                            {result.v3_result.real_probability}%
                          </span>
                        </div>
                        <div style={{
                          height: '6px',
                          backgroundColor: 'rgba(0,0,0,0.06)',
                          borderRadius: '3px',
                          overflow: 'hidden'
                        }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.v3_result.real_probability}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                            style={{
                              height: '100%',
                              backgroundColor: '#006633',
                              borderRadius: '3px'
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
                            color: '#555555',
                            fontSize: '11px',
                            letterSpacing: '0.1em',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: '600',
                            textTransform: 'uppercase'
                          }}>
                            AI Generated
                          </span>
                          <span style={{
                            color: '#dc2626',
                            fontSize: '12px',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: '600'
                          }}>
                            {result.v3_result.fake_probability}%
                          </span>
                        </div>
                        <div style={{
                          height: '6px',
                          backgroundColor: 'rgba(0,0,0,0.06)',
                          borderRadius: '3px',
                          overflow: 'hidden'
                        }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.v3_result.fake_probability}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            style={{
                              height: '100%',
                              backgroundColor: '#dc2626',
                              borderRadius: '3px'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* All 3 Models Comparison */}
                  <div style={{
                    border: '1px solid rgba(0,0,0,0.08)',
                    backgroundColor: '#FAFAFA',
                    padding: '32px',
                    borderRadius: '8px'
                  }}>
                    <p style={{
                      color: '#666666',
                      fontSize: '11px',
                      letterSpacing: '0.15em',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '600',
                      marginBottom: '20px',
                      textTransform: 'uppercase'
                    }}>
                      All Models Comparison
                    </p>

                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}>
                      {[
                        {
                          label: 'V1 — CIFAKE Benchmark',
                          accuracy: '96.50%',
                          result: result.v1_result
                        },
                        {
                          label: 'V2 — Real-World Dataset',
                          accuracy: '94.53%',
                          result: result.v2_result
                        },
                        {
                          label: 'V3 — Human Faces',
                          accuracy: '90%',
                          result: result.v3_result
                        },
                      ].map((model) => (
                        <div
                          key={model.label}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '16px 18px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid rgba(0,0,0,0.06)',
                            borderRadius: '6px'
                          }}
                        >
                          <div>
                            <p style={{
                              color: '#1a1a1a',
                              fontSize: '13px',
                              fontFamily: 'Inter, sans-serif',
                              fontWeight: '500',
                              marginBottom: '2px'
                            }}>
                              {model.label}
                            </p>
                            <p style={{
                              color: '#888888',
                              fontSize: '11px',
                              letterSpacing: '0.05em',
                              fontFamily: 'Inter, sans-serif',
                              fontWeight: '400'
                            }}>
                              Test Acc: {model.accuracy}
                            </p>
                          </div>

                          <div style={{ textAlign: 'right' }}>
                            <p style={{
                              color: model.result.label === 'REAL' ? '#006633' : '#dc2626',
                              fontSize: '14px',
                              fontFamily: 'Inter, sans-serif',
                              fontWeight: '700',
                              marginBottom: '2px'
                            }}>
                              {model.result.label}
                            </p>
                            <p style={{
                              color: '#888888',
                              fontSize: '12px',
                              fontFamily: 'Inter, sans-serif',
                              fontWeight: '500'
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
                    border: '1px solid rgba(0,0,0,0.08)',
                    backgroundColor: '#FAFAFA',
                    padding: '24px 32px',
                    borderRadius: '8px'
                  }}>
                    <p style={{
                      color: '#666666',
                      fontSize: '13px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '400',
                      lineHeight: '1.7'
                    }}>
                      Analyzed using ResNet50 + XceptionNet
                      feature fusion model trained on 130K+ images.
                      Primary verdict from V3 Human Faces model
                      (90% test accuracy on human face dataset).
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
                      border: '1px solid rgba(0,0,0,0.15)',
                      color: '#333333',
                      padding: '16px',
                      fontSize: '12px',
                      letterSpacing: '0.15em',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      borderRadius: '6px',
                      textTransform: 'uppercase'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#006633'
                      e.currentTarget.style.color = '#006633'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)'
                      e.currentTarget.style.color = '#333333'
                    }}
                  >
                    Try Another Image
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
            marginTop: '80px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            backgroundColor: 'rgba(0,0,0,0.08)',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '8px',
            overflow: 'hidden'
          }}
        >
          {[
            { value: '96.50%', label: 'CIFAKE Accuracy' },
            { value: '90%', label: 'AUC Score' },
            { value: '130K+', label: 'Training Images' },
            { value: '4', label: 'IEEE Papers' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                backgroundColor: '#FFFFFF',
                padding: '40px 32px',
                textAlign: 'center'
              }}
            >
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '32px',
                color: '#006633',
                fontWeight: '800',
                marginBottom: '8px',
                letterSpacing: '-0.02em'
              }}>
                {stat.value}
              </p>
              <p style={{
                color: '#888888',
                fontSize: '11px',
                letterSpacing: '0.1em',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500',
                textTransform: 'uppercase'
              }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default AIDetector