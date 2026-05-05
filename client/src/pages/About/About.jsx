import { motion }    from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import PageTransition from '../../components/PageTransition/PageTransition'

const About = () => {
  const { ref, inView } = useInView({ triggerOnce:true, threshold:0.1 })

  return (
    <PageTransition>
      <main className="content-layer" style={{ paddingTop:'80px' }}>
        <div className="section-container">

          <div className="section-header">
            <span className="section-num">01.</span>
            <h2 className="section-title">About Me</h2>
            <div className="section-line" />
          </div>

          <div ref={ref} style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap:'clamp(2rem, 5vw, 4rem)',
            alignItems:'start',
          }}>

            {/* Left */}
            <motion.div
              initial={{ opacity:0, x:-30 }}
              animate={inView ? { opacity:1, x:0 } : {}}
              transition={{ duration:0.6 }}
            >
              {[
                <>Hey! I'm <strong style={{color:'var(--text)'}}>Abhiram Sharma</strong>, a passionate full-stack developer specializing in the{' '}<strong style={{color:'var(--accent)'}}>MERN Stack</strong>. I completed my B.Tech in Computer Science & Engineering with a CGPA of{' '}<strong style={{color:'var(--accent)'}}>6.9 / 10</strong>.</>,
                <>During my internship at{' '}<strong style={{color:'var(--accent)'}}>Kommuno Technologies</strong>, I worked as a Node.js Developer — building REST APIs, handling database operations, and shipping production-ready backend features.</>,
                <>I love solving real-world problems with clean, efficient code. Whether it's designing REST APIs, architecting databases, or crafting seamless user experiences — I bring ideas to life.</>,
              ].map((text, i) => (
                <p key={i} style={{ color:'var(--text-dim)', marginBottom:'1.2rem',
                  fontSize:'clamp(0.88rem, 2vw, 0.97rem)', lineHeight:1.9 }}>
                  {text}
                </p>
              ))}

              <div style={{ display:'flex', flexWrap:'wrap', gap:'0.75rem', marginTop:'0.5rem' }}>
                {['🎓 B.Tech CSE (2021–2025)', '⚡ MERN Developer', '🚀 Open to Opportunities'].map(b => (
                  <span key={b} style={{ padding:'0.4rem 1rem',
                    background:'rgba(0,255,170,0.07)', border:'1px solid var(--border2)',
                    borderRadius:'50px', fontFamily:'var(--font-mono)',
                    fontSize:'clamp(0.7rem, 2vw, 0.78rem)', color:'var(--accent)' }}>
                    {b}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity:0, x:30 }}
              animate={inView ? { opacity:1, x:0 } : {}}
              transition={{ duration:0.6, delay:0.2 }}
              className="glass-card"
              style={{ padding:'clamp(1.5rem, 4vw, 2rem)', position:'relative', overflow:'hidden' }}
            >
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px',
                background:'linear-gradient(90deg, var(--accent), var(--accent2), var(--accent3))' }} />

              <div style={{ display:'flex', justifyContent:'center', marginBottom:'2rem' }}>
                <div style={{ width:'90px', height:'90px', borderRadius:'50%',
                  background:'linear-gradient(135deg, rgba(0,255,170,0.2), rgba(0,212,255,0.2))',
                  border:'2px solid var(--accent)', display:'flex',
                  alignItems:'center', justifyContent:'center',
                  boxShadow:'0 0 30px rgba(0,255,170,0.2)' }}>
                  <span style={{ fontFamily:'var(--font-disp)', fontSize:'1.6rem', fontWeight:900, color:'var(--accent)' }}>AS</span>
                </div>
              </div>

              {[
                { label:'// Name',   value:'Abhiram Sharma'  },
                { label:'// Degree', value:'B.Tech CSE'      },
                { label:'// Batch',  value:'2021 – 2025'     },
                { label:'// CGPA',   value:'6.9 / 10'        },
                { label:'// Focus',  value:'MERN Stack'      },
                { label:'// Status', value:'Open to Work 🚀' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display:'flex', justifyContent:'space-between',
                  alignItems:'center', padding:'0.6rem 0', borderBottom:'1px solid var(--border)',
                  flexWrap:'wrap', gap:'0.25rem' }}>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'clamp(0.72rem, 2vw, 0.78rem)', color:'var(--text-muted)' }}>
                    {label}
                  </span>
                  <span style={{ fontSize:'clamp(0.8rem, 2vw, 0.88rem)', color:'var(--accent)', fontWeight:600 }}>
                    {value}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </main>
    </PageTransition>
  )
}

export default About