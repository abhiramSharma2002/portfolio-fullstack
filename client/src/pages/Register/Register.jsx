import { useState }      from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion }        from 'framer-motion'
import { useAuth }       from '../../context/AuthContext'
import MatrixBg          from '../../components/MatrixBg/MatrixBg'
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'

const Register = () => {
  const [form,     setForm]     = useState({ name:'', email:'', password:'', confirm:'' })
  const [showPass, setShowPass] = useState(false)
  const [errors,   setErrors]   = useState({})
  const { register, loading }   = useAuth()
  const navigate                = useNavigate()

  const validate = () => {
    const e = {}
    if (!form.name)     e.name    = 'Name required'
    if (!form.email)    e.email   = 'Email required'
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.password) e.password = 'Password required'
    if (form.password.length < 6)  e.password = 'Min 6 characters'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})

    const res = await register({ name: form.name, email: form.email, password: form.password })
    if (res.success) navigate('/')
  }

  const fields = [
    { key:'name',     label:'// Name',     icon:<FiUser size={16}/>,  type:'text',     placeholder:'Abhiram Sharma'   },
    { key:'email',    label:'// Email',    icon:<FiMail size={16}/>,  type:'email',    placeholder:'you@example.com'  },
    { key:'password', label:'// Password', icon:<FiLock size={16}/>,  type:'password', placeholder:'Min 6 characters' },
    { key:'confirm',  label:'// Confirm',  icon:<FiLock size={16}/>,  type:'password', placeholder:'Repeat password'  },
  ]

  return (
    <>
      <MatrixBg />
      <div className="noise-overlay" />

      <div style={{
        minHeight:'100vh', display:'flex',
        alignItems:'center', justifyContent:'center',
        padding:'2rem', position:'relative', zIndex:2,
      }}>
        <motion.div
          initial={{ opacity:0, y:30, scale:0.97 }}
          animate={{ opacity:1, y:0,  scale:1 }}
          transition={{ duration:0.5, ease:[0.22,1,0.36,1] }}
          className="glass-card"
          style={{ width:'100%', maxWidth:'420px', padding:'2.5rem', position:'relative', overflow:'hidden' }}
        >
          <div style={{
            position:'absolute', top:0, left:0, right:0,
            height:'2px',
            background:'linear-gradient(90deg, var(--accent3), var(--accent), var(--accent2))',
          }} />

          {/* Header */}
          <div style={{ textAlign:'center', marginBottom:'2rem' }}>
            <p style={{ fontFamily:'var(--font-disp)', fontSize:'1.6rem', fontWeight:700, marginBottom:'0.5rem' }}>
              <span className="logo-bracket">&lt;</span>AS<span className="logo-bracket">/&gt;</span>
            </p>
            <h1 style={{ fontFamily:'var(--font-disp)', fontSize:'1.2rem', color:'var(--text)', marginBottom:'0.3rem' }}>
              Create Account
            </h1>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.78rem', color:'var(--text-muted)' }}>
              Register to contact me
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1.1rem' }}>
            {fields.map(({ key, label, icon, type, placeholder }) => (
              <div key={key}>
                <label className="form-label">{label}</label>
                <div style={{ position:'relative' }}>
                  <span style={{
                    position:'absolute', left:'0.85rem', top:'50%',
                    transform:'translateY(-50%)', color:'var(--text-muted)',
                    display:'flex',
                  }}>
                    {icon}
                  </span>
                  <input
                    className="form-input"
                    type={
                      (key === 'password' || key === 'confirm')
                        ? (showPass ? 'text' : 'password')
                        : type
                    }
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    style={{
                      paddingLeft:  '2.5rem',
                      paddingRight: (key === 'password' || key === 'confirm') ? '2.5rem' : '1rem',
                    }}
                  />
                  {(key === 'password') && (
                    <button
                      type="button"
                      onClick={() => setShowPass(p => !p)}
                      style={{
                        position:'absolute', right:'0.85rem', top:'50%',
                        transform:'translateY(-50%)',
                        background:'none', border:'none',
                        color:'var(--text-muted)', cursor:'pointer', display:'flex',
                      }}
                    >
                      {showPass ? <FiEyeOff size={16}/> : <FiEye size={16}/>}
                    </button>
                  )}
                </div>
                {errors[key] && (
                  <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem', color:'#ff6b6b', marginTop:'0.3rem' }}>
                    {errors[key]}
                  </p>
                )}
              </div>
            ))}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{  scale: loading ? 1 : 0.98 }}
              className="btn btn-primary btn-full"
              style={{ marginTop:'0.5rem', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Creating account...' : 'Register →'}
            </motion.button>
          </form>

          <p style={{
            fontFamily:'var(--font-mono)', fontSize:'0.78rem',
            color:'var(--text-muted)', textAlign:'center', marginTop:'1.5rem',
          }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color:'var(--accent)', textDecoration:'none' }}>
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  )
}

export default Register