import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
// import Skills from '../components/Skills'
// import Projects from '../components/Projects'
// import Research from '../components/Research'
// import Contact from '../components/Contact'
// import Footer from '../components/Footer'

const Home = () => {
  return (
    <div style={{ backgroundColor: '#0A0000', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
       <About /> 
      {/* <Skills />
      <Projects />
      <Research />
      <Contact />
      <Footer />  */}
    </div>
  )
}

export default Home