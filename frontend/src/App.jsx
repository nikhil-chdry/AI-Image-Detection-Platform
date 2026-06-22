import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import Home from './pages/Home'
// import AIDetector from './pages/AIDetector'


function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <AnimatePresence>
        {loading && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <Routes>
          <Route path="/" element={<Home />} />
          
        </Routes>
      )}
    </>
  )
}

export default App