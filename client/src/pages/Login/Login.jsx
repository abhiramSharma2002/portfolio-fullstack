import { useState }         from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion }           from 'framer-motion'
import { useAuth }          from '../../context/AuthContext'
import MatrixBg             from '../../components/MatrixBg/MatrixBg'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'

const Login = () => {
  const [form,      setForm]      = useState({ email: '', password: '' })
  const [showPass,  setShowPass]  = useState(false)
  const [errors,    setErrors]    = useState({})
  const { login, loading }        = useAuth()
  const navigate                  = useNavigate()
  const location                  = useLocation()

  // After login — jahan se aaya wahan wapas bhejo
  const from = location.state?.from?.pathname || '/'

  const validate = () => {
    const e = {}
    if (!form.email)    e.email    = 'Email required'
    if (!form.password) e.password = 'Password required'
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      e.email = 'Enter valid email'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})

    const res = await login(form)
    if (res.success) navigate(from, { replace: true })
  }

  return (
    <>
      <MatrixBg />
      <div className="noise-overlay" />

      <div style={{
        minHeight:      '100vh',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        '2rem',
        position:       'relative',
        zIndex:         2,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0,  scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card"
          style={{ width: '100%', maxWidth: '420px', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}
        >
          {/* Top glow line */}
          <div style={{
            position:   'absolute',
            top:0, left:0, right:0,
            height:     '2px',
            background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
          }} />

          {/* Logo */}
          <div style={{ textAlign:'center', marginBottom:'2rem' }}>
            <p style={{
              fontFamily:    'var(--font-disp)',
              fontSize:      '1.6rem',
              fontWeight:    700,
              marginBottom:  '0.5rem',
            }}>
              <span className="logo-bracket">&lt;</span>AS<span className="logo-bracket">/&gt;</span>
            </p>
            <h1 style={{ fontFamily:'var(--font-disp)', fontSize:'1.2rem', color:'var(--text)', marginBottom:'0.3rem' }}>
              Welcome Back
            </h1>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.78rem', color:'var(--text-muted)' }}>
              Login to send a message
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1.2rem' }}>

            {/* Email */}
            <div>
              <label className="form-label">// Email</label>
              <div style={{ position:'relative' }}>
                <FiMail size={16} style={{
                  position:'absolute', left:'0.85rem', top:'50%',
                  transform:'translateY(-50%)', color:'var(--text-muted)',
                }} />
                <input
                  className="form-input"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
              {errors.email && (
                <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem', color:'#ff6b6b', marginTop:'0.3rem' }}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="form-label">// Password</label>
              <div style={{ position:'relative' }}>
                <FiLock size={16} style={{
                  position:'absolute', left:'0.85rem', top:'50%',
                  transform:'translateY(-50%)', color:'var(--text-muted)',
                }} />
                <input
                  className="form-input"
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  style={{ paddingLeft:'2.5rem', paddingRight:'2.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  style={{
                    position:   'absolute', right:'0.85rem', top:'50%',
                    transform:  'translateY(-50%)',
                    background: 'none', border:'none',
                    color:      'var(--text-muted)', cursor:'pointer',
                    display:    'flex',
                  }}
                >
                  {showPass ? <FiEyeOff size={16}/> : <FiEye size={16}/>}
                </button>
              </div>
              {errors.password && (
                <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem', color:'#ff6b6b', marginTop:'0.3rem' }}>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{  scale: loading ? 1 : 0.98 }}
              className="btn btn-primary btn-full"
              style={{ marginTop:'0.5rem', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Logging in...' : 'Login →'}
            </motion.button>
          </form>

          {/* Register Link */}
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize:   '0.78rem',
            color:      'var(--text-muted)',
            textAlign:  'center',
            marginTop:  '1.5rem',
          }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color:'var(--accent)', textDecoration:'none' }}>
              Register
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  )
}

export default Login