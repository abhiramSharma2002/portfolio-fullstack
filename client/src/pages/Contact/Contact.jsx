import { useState }  from 'react'
import { motion }    from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import toast         from 'react-hot-toast'
import PageTransition from '../../components/PageTransition/PageTransition'
import axiosInstance  from '../../api/axiosInstance'
import { useAuth }    from '../../context/AuthContext'
import { FiSend, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi'

const Contact = () => {
  const [form,    setForm]    = useState({ name:'', email:'', subject:'', message:'' })
  const [loading, setLoading] = useState(false)
  const { user }              = useAuth()
  const { ref, inView }       = useInView({ triggerOnce: true, threshold: 0.1 })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.message) {
      toast.error('Please fill all fields')
      return
    }
    setLoading(true)
    try {
      await axiosInstance.post('/contact', form)
      toast.success('Message sent! I will get back to you soon 🚀')
      setForm({ name:'', email:'', subject:'', message:'' })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageTransition>
      <main className="content-layer" style={{ paddingTop:'80px' }}>
        <div className="section-container">

          <div className="section-header">
            <span className="section-num">05.</span>
            <h2 className="section-title">Contact</h2>
            <div className="section-line" />
          </div>

          <div ref={ref} style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap:'4rem', alignItems:'start',
          }}>

            {/* Left — Info */}
            <motion.div
              initial={{ opacity:0, x:-30 }}
              animate={inView ? { opacity:1, x:0 } : {}}
              transition={{ duration:0.6 }}
            >
              <h3 style={{
                fontFamily:'var(--font-disp)',
                fontSize:'clamp(1.3rem, 2.5vw, 1.8rem)',
                fontWeight:700, lineHeight:1.3,
                marginBottom:'1rem',
              }}>
                Let's Build Something{' '}
                <span style={{ color:'var(--accent)', textShadow:'var(--glow)' }}>
                  Amazing
                </span>
              </h3>

              <p style={{
                color:'var(--text-dim)', marginBottom:'2rem',
                lineHeight:1.8, fontSize:'0.95rem',
              }}>
                I'm currently open to new opportunities. Whether you have a
                project idea, a job offer, or just want to connect — my inbox
                is always open!
              </p>

              {/* Logged in as */}
              <div style={{
                background:'rgba(0,255,170,0.06)',
                border:'1px solid var(--border2)',
                borderRadius:'8px', padding:'0.8rem 1rem',
                marginBottom:'1.5rem',
                fontFamily:'var(--font-mono)', fontSize:'0.8rem',
                color:'var(--text-muted)',
              }}>
                ✅ Logged in as{' '}
                <span style={{ color:'var(--accent)' }}>{user?.name}</span>
              </div>

              {/* Contact Links */}
              <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                {[
                  { icon:<FiMail size={18}/>,    href:'mailto:abhiramsharma2002@gmail.com',              label:'abhiramsharma2002@gmail.com'           },
                  { icon:<FiLinkedin size={18}/>, href:'https://www.linkedin.com/in/abhiram-sharma-5a4439264/', label:'linkedin.com/in/abhiram-sharma-5a4439264' },
                  { icon:<FiGithub size={18}/>,   href:'https://github.com/abhiramsharma2002',      label:'github.com/abhiramsharma2002'     },
                ].map(({ icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 6 }}
                    style={{
                      display:'flex', alignItems:'center', gap:'1rem',
                      color:'var(--text-dim)', fontSize:'0.88rem',
                      padding:'0.75rem 1rem',
                      background:'var(--surface)', border:'1px solid var(--border)',
                      borderRadius:'8px', textDecoration:'none',
                      transition:'color 0.3s, border-color 0.3s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color        = 'var(--accent)'
                      e.currentTarget.style.borderColor  = 'var(--border2)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color        = 'var(--text-dim)'
                      e.currentTarget.style.borderColor  = 'var(--border)'
                    }}
                  >
                    <span style={{ color:'var(--accent)', display:'flex' }}>{icon}</span>
                    {label}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity:0, x:30 }}
              animate={inView ? { opacity:1, x:0 } : {}}
              transition={{ duration:0.6, delay:0.2 }}
              className="glass-card"
              style={{ padding:'2rem', position:'relative', overflow:'hidden' }}
            >
              <div style={{
                position:'absolute', top:0, left:0, right:0,
                height:'2px',
                background:'linear-gradient(90deg, var(--accent), var(--accent2))',
              }} />

              <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1.2rem' }}>
                {[
                  { key:'name',    label:'// Your Name',    placeholder:'John Doe',              type:'text'  },
                  { key:'email',   label:'// Email',        placeholder:'john@example.com',       type:'email' },
                  { key:'subject', label:'// Subject',      placeholder:'Project Collaboration',  type:'text'  },
                ].map(({ key, label, placeholder, type }) => (
                  <div key={key}>
                    <label className="form-label">{label}</label>
                    <input
                      className="form-input"
                      type={type}
                      placeholder={placeholder}
                      value={form[key]}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    />
                  </div>
                ))}

                <div>
                  <label className="form-label">// Message</label>
                  <textarea
                    className="form-input"
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{ resize:'vertical' }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{  scale: loading ? 1 : 0.98 }}
                  className="btn btn-primary btn-full"
                  style={{ opacity: loading ? 0.7 : 1 }}
                >
                  {loading
                    ? 'Sending...'
                    : <><FiSend size={16}/> Send Message</>
                  }
                </motion.button>
              </form>
            </motion.div>
          </div>

        </div>
      </main>
    </PageTransition>
  )
}

export default Contact