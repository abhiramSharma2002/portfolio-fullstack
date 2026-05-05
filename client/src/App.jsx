import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// ── Layout Components ──
import Navbar       from './components/Navbar/Navbar'
import Footer       from './components/Footer/Footer'
import MatrixBg     from './components/MatrixBg/MatrixBg'
import Loader       from './components/Loader/Loader'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// ── Pages ──
import Home       from './pages/Home/Home'
import About      from './pages/About/About'
import Skills     from './pages/Skills/Skills'
import Experience from './pages/Experience/Experience'
import Projects   from './pages/Projects/Projects'
import Contact    from './pages/Contact/Contact'
import Login      from './pages/Login/Login'
import Register   from './pages/Register/Register'

function App() {
  const location = useLocation()

  // Login / Register pe Navbar + Footer nahi dikhega
  const hideLayout = ['/login', '/register'].includes(location.pathname)

  return (
    <div className="page-wrapper">

      {/* Dark Matrix Background — sab pages pe */}
      <MatrixBg />

      {/* Noise Grain Overlay */}
      <div className="noise-overlay" />

      {/* Navbar — auth pages pe hide */}
      {!hideLayout && <Navbar />}

      {/* Page Transitions */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          {/* ── Public Routes ── */}
          <Route path="/"           element={<Home />} />
          <Route path="/about"      element={<About />} />
          <Route path="/skills"     element={<Skills />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects"   element={<Projects />} />
          <Route path="/login"      element={<Login />} />
          <Route path="/register"   element={<Register />} />

          {/* ── Protected Route — login required ── */}
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />

          {/* ── 404 Fallback ── */}
          <Route
            path="*"
            element={
              <div className="content-layer" style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-disp)',
                color: 'var(--accent)',
                fontSize: '1.5rem',
                gap: '1rem'
              }}>
                <span style={{ fontSize: '4rem' }}>404</span>
                <span>Page Not Found</span>
                <a href="/" className="btn btn-outline" style={{ marginTop: '1rem' }}>
                  Go Home
                </a>
              </div>
            }
          />

        </Routes>
      </AnimatePresence>

      {/* Footer — auth pages pe hide */}
      {!hideLayout && <Footer />}

    </div>
  )
}

export default App
