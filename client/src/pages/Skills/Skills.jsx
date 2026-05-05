import { motion }    from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import PageTransition from '../../components/PageTransition/PageTransition'

const skillCategories = [
  {
    title: '⚡ Languages',
    skills: [
      { name: 'Java',       icon: '☕' },
      { name: 'JavaScript', icon: '🟨' },
    ],
  },
  {
    title: '🎨 Frontend',
    skills: [
      { name: 'HTML5',        icon: '🌐' },
      { name: 'CSS3',         icon: '🎨' },
      { name: 'Tailwind CSS', icon: '💨' },
      { name: 'React.js',     icon: '⚛️' },
    ],
  },
  {
    title: '🖥️ Backend',
    skills: [
      { name: 'Node.js',         icon: '🟢' },
      { name: 'Express.js',      icon: '⚙️' },
      { name: 'REST API',        icon: '🔗' },
      { name: 'CRUD Operations', icon: '🔄' },
    ],
  },
  {
    title: '🗄️ Databases',
    skills: [
      { name: 'MongoDB', icon: '🍃' },
      { name: 'MariaDB', icon: '🐬' },
      { name: 'Redis',   icon: '⚡' },
    ],
  },
  {
    title: '🛠️ Tools',
    skills: [
      { name: 'VS Code',       icon: '💻' },
      { name: 'Cursor',        icon: '🤖' },
      { name: 'IntelliJ IDEA', icon: '🧠' },
      { name: 'Termius',       icon: '📡' },
      { name: 'Git',           icon: '🌿' },
      { name: 'GitHub',        icon: '🐙' },
    ],
  },
]

const SkillCard = ({ category, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass-card"
      style={{ padding: 'clamp(1.2rem, 3vw, 1.8rem)' }}
    >
      {/* Category Title */}
      <h3 style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      'clamp(0.72rem, 2vw, 0.82rem)',
        color:         'var(--text-dim)',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        marginBottom:  '1.2rem',
        paddingBottom: '0.75rem',
        borderBottom:  '1px solid var(--border)',
      }}>
        {category.title}
      </h3>

      {/* Skills Grid — responsive columns */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100px, 100%), 1fr))',
        gap:                 'clamp(0.5rem, 2vw, 0.75rem)',
      }}>
        {category.skills.map(({ name, icon }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1 + i * 0.07, duration: 0.4 }}
            whileHover={{ y: -4, scale: 1.04 }}
            style={{
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              justifyContent: 'center',
              gap:            '0.45rem',
              padding:        'clamp(0.75rem, 2vw, 1rem) clamp(0.5rem, 1.5vw, 0.75rem)',
              background:     'rgba(0,255,170,0.04)',
              border:         '1px solid var(--border)',
              borderRadius:   '10px',
              cursor:         'default',
              transition:     'border-color 0.3s ease, background 0.3s ease',
              minHeight:      '80px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--border2)'
              e.currentTarget.style.background  = 'rgba(0,255,170,0.08)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.background  = 'rgba(0,255,170,0.04)'
            }}
          >
            <span style={{ fontSize: 'clamp(1.3rem, 3vw, 1.6rem)' }}>
              {icon}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize:   'clamp(0.62rem, 1.8vw, 0.75rem)',
              color:      'var(--text-dim)',
              textAlign:  'center',
              lineHeight: 1.3,
              wordBreak:  'break-word',
            }}>
              {name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

const Skills = () => (
  <PageTransition>
    <main className="content-layer" style={{ paddingTop: '80px' }}>
      <div className="section-container">

        <div className="section-header">
          <span className="section-num">02.</span>
          <h2 className="section-title">Tech Stack</h2>
          <div className="section-line" />
        </div>

        {/* Outer Grid — categories */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap:                 'clamp(1rem, 3vw, 1.5rem)',
        }}>
          {skillCategories.map((cat, i) => (
            <SkillCard key={cat.title} category={cat} index={i} />
          ))}
        </div>

      </div>
    </main>
  </PageTransition>
)

export default Skills