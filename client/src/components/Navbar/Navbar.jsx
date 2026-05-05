import { useState, useEffect }     from 'react'
import { NavLink, useNavigate }    from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth }                 from '../../context/AuthContext'
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi'
import { RiLogoutBoxLine }         from 'react-icons/ri'

const navLinks = [
  { path: '/',           label: 'Home'       },
  { path: '/about',      label: 'About'      },
  { path: '/skills',     label: 'Skills'     },
  { path: '/experience', label: 'Experience' },
  { path: '/projects',   label: 'Projects'   },
  { path: '/contact',    label: 'Contact'    },
]

const Navbar = () => {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // ── Body scroll lock when menu open ──
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleLogout = async () => {
    await logout()
    setMenuOpen(false)
    navigate('/')
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position:       'fixed',
          top:            0, left: 0, right: 0,
          zIndex:         1000,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          padding:        scrolled ? '0.7rem 5%' : '1.1rem 5%',
          background:     scrolled ? 'rgba(5,8,16,0.95)' : 'rgba(5,8,16,0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom:   '1px solid var(--border)',
          transition:     'all 0.3s ease',
          boxShadow:      scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        {/* Logo */}
        <NavLink to="/" style={{
          fontFamily:     'var(--font-disp)',
          fontSize:       'clamp(1rem, 3vw, 1.3rem)',
          fontWeight:     700,
          color:          'var(--text)',
          letterSpacing:  '2px',
          textDecoration: 'none',
          flexShrink:     0,
        }}>
          <span className="logo-bracket">&lt;</span>AS<span className="logo-bracket">/&gt;</span>
        </NavLink>

        {/* Desktop Links */}
        <ul style={{
          display:    'flex',
          gap:        '1.5rem',
          alignItems: 'center',
          listStyle:  'none',
        }} className="desktop-nav">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === '/'}
                style={({ isActive }) => ({
                  fontFamily:     'var(--font-mono)',
                  fontSize:       '0.8rem',
                  color:          isActive ? 'var(--accent)' : 'var(--text-dim)',
                  textDecoration: 'none',
                  letterSpacing:  '1px',
                  position:       'relative',
                  paddingBottom:  '4px',
                  transition:     'color 0.3s ease',
                })}
              >
                {({ isActive }) => (
                  <>
                    {isActive && <span style={{ color:'var(--accent)', marginRight:'4px', fontSize:'0.72rem' }}>//</span>}
                    {label}
                    {isActive && (
                      <motion.div layoutId="nav-underline" style={{
                        position:'absolute', bottom:0, left:0, right:0,
                        height:'1px', background:'var(--accent)',
                        boxShadow:'0 0 6px var(--accent)',
                      }} />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}

          {/* Auth */}
          {isAuthenticated ? (
            <li style={{ display:'flex', alignItems:'center', gap:'0.6rem' }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem', color:'var(--text-muted)' }}>
                {user?.name}
              </span>
              <button onClick={handleLogout} style={{
                display:'flex', alignItems:'center', gap:'5px',
                background:'transparent',
                border:'1px solid rgba(255,107,107,0.3)',
                borderRadius:'6px', color:'#ff6b6b',
                fontFamily:'var(--font-mono)', fontSize:'0.75rem',
                padding:'0.3rem 0.7rem', cursor:'pointer', transition:'all 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.background='rgba(255,107,107,0.1)'; e.currentTarget.style.borderColor='#ff6b6b' }}
                onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='rgba(255,107,107,0.3)' }}
              >
                <RiLogoutBoxLine size={13} /> Logout
              </button>
            </li>
          ) : (
            <li>
              <NavLink to="/login" style={{
                fontFamily:'var(--font-mono)', fontSize:'0.78rem',
                color:'var(--accent)', border:'1px solid var(--accent)',
                padding:'0.35rem 1rem', borderRadius:'6px',
                textDecoration:'none', transition:'all 0.3s ease',
              }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(0,255,170,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background='transparent'}
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(p => !p)}
          className="hamburger-btn"
          aria-label="Toggle menu"
          style={{
            display:'none', background:'none', border:'none',
            color:'var(--accent)', cursor:'pointer', padding:'6px',
            borderRadius:'6px',
          }}
        >
          {menuOpen ? <HiOutlineX size={22} /> : <HiOutlineMenuAlt3 size={22} />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position:'fixed', inset:0, zIndex:998,
                background:'rgba(0,0,0,0.5)',
                backdropFilter:'blur(4px)',
              }}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type:'tween', duration:0.3 }}
              style={{
                position:'fixed', top:0, right:0, bottom:0,
                width:'min(280px, 85vw)',
                zIndex:999,
                background:'rgba(8,13,24,0.98)',
                backdropFilter:'blur(20px)',
                borderLeft:'1px solid var(--border)',
                padding:'2rem 1.5rem',
                display:'flex', flexDirection:'column',
                gap:'0.5rem',
                overflowY:'auto',
              }}
            >
              {/* Close + Logo */}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem' }}>
                <span style={{ fontFamily:'var(--font-disp)', fontSize:'1.1rem', color:'var(--text)' }}>
                  <span className="logo-bracket">&lt;</span>AS<span className="logo-bracket">/&gt;</span>
                </span>
                <button onClick={() => setMenuOpen(false)} style={{
                  background:'none', border:'none', color:'var(--text-muted)',
                  cursor:'pointer', padding:'4px', display:'flex',
                }}>
                  <HiOutlineX size={20} />
                </button>
              </div>

              {/* Links */}
              {navLinks.map(({ path, label }, i) => (
                <motion.div key={path}
                  initial={{ opacity:0, x:20 }}
                  animate={{ opacity:1, x:0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <NavLink
                    to={path} end={path === '/'}
                    onClick={() => setMenuOpen(false)}
                    style={({ isActive }) => ({
                      fontFamily:'var(--font-mono)', fontSize:'0.95rem',
                      color: isActive ? 'var(--accent)' : 'var(--text-dim)',
                      textDecoration:'none', display:'block',
                      padding:'0.85rem 0.75rem',
                      borderRadius:'8px',
                      background: isActive ? 'rgba(0,255,170,0.06)' : 'transparent',
                      borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                      transition:'all 0.2s ease',
                    })}
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}

              {/* Mobile Auth */}
              <div style={{ marginTop:'auto', paddingTop:'1.5rem', borderTop:'1px solid var(--border)' }}>
                {isAuthenticated ? (
                  <>
                    <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem', color:'var(--text-muted)', marginBottom:'0.75rem' }}>
                      Logged in as <span style={{ color:'var(--accent)' }}>{user?.name}</span>
                    </p>
                    <button onClick={handleLogout} style={{
                      width:'100%', display:'flex', alignItems:'center',
                      justifyContent:'center', gap:'8px',
                      background:'transparent',
                      border:'1px solid rgba(255,107,107,0.4)',
                      borderRadius:'8px', color:'#ff6b6b',
                      fontFamily:'var(--font-mono)', fontSize:'0.85rem',
                      padding:'0.75rem', cursor:'pointer',
                    }}>
                      <RiLogoutBoxLine size={16} /> Logout
                    </button>
                  </>
                ) : (
                  <NavLink to="/login" onClick={() => setMenuOpen(false)} style={{
                    display:'block', textAlign:'center',
                    fontFamily:'var(--font-mono)', fontSize:'0.88rem',
                    color:'var(--accent)', border:'1px solid var(--accent)',
                    padding:'0.75rem', borderRadius:'8px',
                    textDecoration:'none', transition:'all 0.3s ease',
                  }}>
                    Login
                  </NavLink>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav   { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}

export default Navbar