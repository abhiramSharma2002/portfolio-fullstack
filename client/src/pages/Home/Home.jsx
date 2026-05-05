import { Link }          from 'react-router-dom'
import { motion }        from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { useInView }     from 'react-intersection-observer'
import PageTransition    from '../../components/PageTransition/PageTransition'
import { FiArrowRight, FiGithub, FiLinkedin } from 'react-icons/fi'

const Home = () => (
  <PageTransition>
    <main style={{ minHeight:'100vh', position:'relative', zIndex:2 }}>

      {/* Hero */}
      <section style={{
        minHeight:   '100vh',
        display:     'flex',
        alignItems:  'center',
        padding:     'clamp(100px, 15vw, 140px) 5% clamp(60px, 8vw, 80px)',
      }}>
        <div style={{
          width:       '100%',
          maxWidth:    '1200px',
          margin:      '0 auto',
          display:     'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap:         'clamp(2rem, 5vw, 4rem)',
          alignItems:  'center',
        }}>

          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
              style={{ fontFamily:'var(--font-mono)', fontSize:'clamp(0.75rem, 2vw, 0.88rem)',
                color:'var(--accent)', letterSpacing:'3px', marginBottom:'1rem' }}
            >
              // Hello, World! I am
            </motion.p>

            <motion.h1
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35 }}
              style={{ fontFamily:'var(--font-disp)',
                fontSize:'clamp(2rem, 7vw, 4rem)',
                fontWeight:900, lineHeight:1.1, marginBottom:'1.2rem' }}
            >
              <span style={{ display:'block' }}>Abhiram</span>
              <span style={{ display:'block', color:'var(--accent)', textShadow:'var(--glow)' }}>Sharma</span>
            </motion.h1>

            <motion.div
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }}
              style={{ fontFamily:'var(--font-mono)',
                fontSize:'clamp(0.85rem, 2.5vw, 1.05rem)',
                color:'var(--text-dim)', marginBottom:'1.5rem',
                display:'flex', alignItems:'center', gap:'8px', flexWrap:'wrap' }}
            >
              <span style={{ color:'var(--accent2)' }}>&gt;_</span>
              <TypeAnimation
                sequence={['MERN Stack Developer',1800,'Node.js Engineer',1800,'REST API Architect',1800,'Backend Enthusiast',1800,'Problem Solver',1800]}
                wrapper="span" speed={55} repeat={Infinity}
                style={{ color:'var(--accent)' }}
              />
              <span className="cursor-blink">|</span>
            </motion.div>

            <motion.p
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.65 }}
              style={{ color:'var(--text-dim)',
                fontSize:'clamp(0.88rem, 2vw, 0.95rem)',
                lineHeight:1.8, marginBottom:'2rem',
                maxWidth:'480px' }}
            >
              Crafting scalable web solutions with the MERN stack.
              Turning ideas into reality, one commit at a time.
            </motion.p>

            <motion.div
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.8 }}
              style={{ display:'flex', gap:'0.85rem', flexWrap:'wrap', marginBottom:'2.5rem' }}
            >
              <Link to="/projects" className="btn btn-primary" style={{ fontSize:'clamp(0.78rem, 2vw, 0.85rem)' }}>
                View Projects <FiArrowRight />
              </Link>
              <Link to="/contact" className="btn btn-outline" style={{ fontSize:'clamp(0.78rem, 2vw, 0.85rem)' }}>
                Contact Me
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1 }}
              style={{ display:'flex', gap:'1.2rem', alignItems:'center', flexWrap:'wrap' }}
            >
              {[
                { icon:<FiGithub size={20}/>,   href:'https://github.com/abhiramSharma2002' },
                { icon:<FiLinkedin size={20}/>, href:'https://linkedin.com/in/abhiramsharma' },
              ].map(({ icon, href }, i) => (
                <motion.a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ y:-3 }}
                  style={{ color:'var(--text-muted)', display:'flex', transition:'color 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.color='var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color='var(--text-muted)'}
                >
                  {icon}
                </motion.a>
              ))}
              <div style={{ width:'40px', height:'1px', background:'var(--border2)' }} />
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', color:'var(--text-muted)', letterSpacing:'2px' }}>
                OPEN TO WORK
              </span>
            </motion.div>
          </div>

          {/* Right — Code Window */}
          <motion.div
            initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }}
            transition={{ delay:0.5, duration:0.7 }}
          >
            <CodeWindow />
          </motion.div>
        </div>
      </section>

      <StatsBar />
    </main>
  </PageTransition>
)

const CodeWindow = () => (
  <div style={{
    background:'var(--surface)', border:'1px solid var(--border2)',
    borderRadius:'16px', overflow:'hidden',
    boxShadow:'0 0 60px rgba(0,255,170,0.08), 0 20px 60px rgba(0,0,0,0.5)',
    position:'relative',
  }}>
    <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px',
      background:'linear-gradient(90deg, transparent, var(--accent), transparent)' }} />

    <div style={{ background:'var(--surface2)', padding:'0.75rem 1rem',
      display:'flex', alignItems:'center', gap:'0.5rem', borderBottom:'1px solid var(--border)' }}>
      {['#ff5f57','#febc2e','#28c840'].map((c,i) => (
        <div key={i} style={{ width:12, height:12, borderRadius:'50%', background:c }} />
      ))}
      <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.78rem', color:'var(--text-muted)', marginLeft:'0.5rem' }}>
        abhiram.js
      </span>
    </div>

    <pre style={{ padding:'clamp(1rem, 3vw, 1.5rem)', fontFamily:'var(--font-mono)',
      fontSize:'clamp(0.75rem, 2vw, 0.85rem)', lineHeight:1.9, overflowX:'auto', margin:0 }}>
      <code>
        <span style={{color:'#ff79c6'}}>const </span>
        <span style={{color:'#50fa7b'}}>developer</span>
        <span style={{color:'var(--text)'}}> = {'{'}</span>{'\n'}
        {'  '}<span style={{color:'#8be9fd'}}>name</span><span style={{color:'var(--text)'}}>: </span>
        <span style={{color:'#f1fa8c'}}>"Abhiram Sharma"</span><span style={{color:'var(--text)'}}>,</span>{'\n'}
        {'  '}<span style={{color:'#8be9fd'}}>role</span><span style={{color:'var(--text)'}}>: </span>
        <span style={{color:'#f1fa8c'}}>"MERN Developer"</span><span style={{color:'var(--text)'}}>,</span>{'\n'}
        {'  '}<span style={{color:'#8be9fd'}}>education</span><span style={{color:'var(--text)'}}>: </span>
        <span style={{color:'#f1fa8c'}}>"B.Tech CSE"</span><span style={{color:'var(--text)'}}>,</span>{'\n'}
        {'  '}<span style={{color:'#8be9fd'}}>batch</span><span style={{color:'var(--text)'}}>: </span>
        <span style={{color:'#f1fa8c'}}>"2021 – 2025"</span><span style={{color:'var(--text)'}}>,</span>{'\n'}
        {'  '}<span style={{color:'#8be9fd'}}>stack</span><span style={{color:'var(--text)'}}>: [</span>
        <span style={{color:'#f1fa8c'}}>"M"</span><span style={{color:'var(--text)'}}>, </span>
        <span style={{color:'#f1fa8c'}}>"E"</span><span style={{color:'var(--text)'}}>, </span>
        <span style={{color:'#f1fa8c'}}>"R"</span><span style={{color:'var(--text)'}}>, </span>
        <span style={{color:'#f1fa8c'}}>"N"</span><span style={{color:'var(--text)'}}>],</span>{'\n'}
        {'  '}<span style={{color:'#8be9fd'}}>status</span><span style={{color:'var(--text)'}}>: </span>
        <span style={{color:'#f1fa8c'}}>"Open to Work 🚀"</span>{'\n'}
        <span style={{color:'var(--text)'}}>{'}'}</span>
      </code>
    </pre>
  </div>
)

const stats = [
  { number:'4+',  label:'Months Experience' },
  { number:'10+', label:'Technologies'      },
  { number:'6.9', label:'CGPA'              },
  { number:'4+',  label:'Projects Built'    },
]

const StatsBar = () => {
  const { ref, inView } = useInView({ triggerOnce:true, threshold:0.2 })
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.6 }}
      style={{ position:'relative', zIndex:2, background:'var(--surface)',
        borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)',
        padding:'clamp(1.5rem, 4vw, 2rem) 5%' }}
    >
      <div style={{
        maxWidth:'1100px', margin:'0 auto',
        display:'grid',
        gridTemplateColumns:'repeat(4, 1fr)',
        gap:'clamp(0.5rem, 2vw, 1rem)',
        textAlign:'center',
      }}>
        {stats.map(({ number, label }, i) => (
          <motion.div key={label}
            initial={{ opacity:0, y:20 }}
            animate={inView ? { opacity:1, y:0 } : {}}
            transition={{ delay: i * 0.1 }}
          >
            <p style={{ fontFamily:'var(--font-disp)',
              fontSize:'clamp(1.4rem, 4vw, 2rem)',
              fontWeight:700, color:'var(--accent)', textShadow:'var(--glow)' }}>
              {number}
            </p>
            <p style={{ fontFamily:'var(--font-mono)',
              fontSize:'clamp(0.6rem, 1.5vw, 0.72rem)',
              color:'var(--text-muted)', letterSpacing:'1px',
              textTransform:'uppercase', marginTop:'0.3rem' }}>
              {label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Home