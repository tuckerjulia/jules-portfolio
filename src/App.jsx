import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Nav from './components/Nav'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'
import MissionPage from './pages/MissionPage'
import BeyondPage from './pages/BeyondPage'
import ContactPage from './pages/ContactPage'
import Footer from './components/Footer'
import Cursor from './components/Cursor'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"         element={<Navigate to="/projects" replace />} />
        <Route path="/about"    element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/mission"   element={<MissionPage />} />
        <Route path="/beyond"    element={<BeyondPage />} />
        <Route path="/contact"   element={<ContactPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#F7F4EF' }}>
        <Nav />
        <AnimatedRoutes />
        <Footer />
      </main>
      <Cursor />
    </BrowserRouter>
  )
}
