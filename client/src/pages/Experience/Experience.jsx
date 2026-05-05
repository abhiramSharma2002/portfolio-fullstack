import { motion }    from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import PageTransition from '../../components/PageTransition/PageTransition'

const experiences = [
  {
    role:     'Node.js Developer Intern',
    company:  'Kommuno Technologies',
    duration: '4 Months',
    type:     'work',
    tags:     ['Node.js', 'Express.js', 'REST API', 'MongoDB', 'MariaDB'],
    points: [
      'Built and maintained RESTful APIs for production-grade applications',
      'Implemented CRUD operations with MongoDB and MariaDB databases',
      'Collaborated with senior developers to deliver scalable backend solutions',
      'Worked with Express.js to create clean, modular backend architecture',
    ],
  },
  {
    role:     'B.Tech — Computer Science & Engineering',
    company:  'University',
    duration: '2021 – 2025',
    type:     'education',
    tags:     ['DSA', 'DBMS', 'OS', 'Networking', 'OOP', 'Java'],
    points: [
      'Graduated with CGPA of 6.9 / 10 in Computer Science Engineering',
      'Studied core subjects: Data Structures, Algorithms, DBMS, Operating Systems',
      'Built multiple academic projects using Java, Node.js, and web technologies',
      'Gained strong foundation in software engineering principles',
    ],
  },
]

const TimelineCard = ({ exp, index }) => {
  const { ref, inView } = useInView({ triggerOnce:true, threshold:0.1 })

  return (
    <motion.div ref={ref}
      initial={{ opacity:0, x:-30 }}
      animate={inView ? { opacity:1, x:0 } : {}}
      transition={{ delay: index * 0.2, duration:0.6 }}
      style={{ position:'relative', paddingLeft:'clamp(1.5rem, 4vw, 3rem)', marginBottom:'2.5rem' }}
    >
      <div style={{
        position:'absolute',
        left:'-0.45rem', top:'1.5rem',
        width:'13px', height:'13px',
        borderRadius:'50%',
        background: exp.type === 'work' ? 'var(--accent)' : 'var(--accent2)',
        boxShadow: exp.type === 'work' ? '0 0 12px rgba(0,255,170,0.6)' : '0 0 12px rgba(0,212,255,0.6)',
        border:'2px solid var(--bg)', zIndex:1,
      }} />

      <div className="glass-card" style={{ padding:'clamp(1.2rem, 3vw, 1.8rem)' }}>
        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between',
          alignItems:'flex-start', flexWrap:'wrap', gap:'0.5rem', marginBottom:'1rem' }}>
          <div style={{ flex:1, minWidth:'200px' }}>
            <h3 style={{ fontFamily:'var(--font-disp)',
              fontSize:'clamp(0.9rem, 2.5vw, 1.05rem)',
              color:'var(--text)', fontWeight:700 }}>
              {exp.role}
            </h3>
            <p style={{ fontFamily:'var(--font-mono)',
              fontSize:'clamp(0.78rem, 2vw, 0.85rem)',
              color:'var(--accent)', marginTop:'0.2rem' }}>
              @ {exp.company}
            </p>
          </div>
          <span style={{ fontFamily:'var(--font-mono)',
            fontSize:'clamp(0.68rem, 1.8vw, 0.75rem)',
            color:'var(--text-muted)',
            background:'rgba(0,255,170,0.07)',
            border:'1px solid var(--border)',
            padding:'0.3rem 0.75rem',
            borderRadius:'50px', whiteSpace:'nowrap' }}>
            {exp.duration}
          </span>
        </div>

        {/* Tags */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem', marginBottom:'1rem' }}>
          {exp.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>

        {/* Points */}
        <ul style={{ display:'flex', flexDirection:'column', gap:'0.5rem' }}>
          {exp.points.map((pt, i) => (
            <li key={i} style={{ color:'var(--text-dim)',
              fontSize:'clamp(0.82rem, 2vw, 0.88rem)',
              paddingLeft:'1.2rem', position:'relative', lineHeight:1.6 }}>
              <span style={{ position:'absolute', left:0, color:'var(--accent)' }}>▸</span>
              {pt}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

const Experience = () => (
  <PageTransition>
    <main className="content-layer" style={{ paddingTop:'80px' }}>
      <div className="section-container">
        <div className="section-header">
          <span className="section-num">03.</span>
          <h2 className="section-title">Experience</h2>
          <div className="section-line" />
        </div>

        <div style={{ position:'relative' }}>
          <div style={{ position:'absolute', left:'0.65rem', top:0, bottom:0,
            width:'1px', background:'linear-gradient(to bottom, var(--accent), transparent)' }} />
          {experiences.map((exp, i) => (
            <TimelineCard key={exp.role} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </main>
  </PageTransition>
)

export default Experience