import { motion }    from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import PageTransition from '../../components/PageTransition/PageTransition'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

const projects = [
  {
    title:    'Roomify',
    icon:     '🏨',
    desc:     'A full-stack hotel, room and apartment booking platform. Users can browse listings, check availability and book rooms seamlessly. Deployed and live!',
    tech:     [ 'Node.js', 'Express', 'MongoDB', 'REST API'],
    github:   'https://github.com/abhiramsharma/roomify',   // apna sahi link lagao
    live:     'https://roomify-2.onrender.com/',                  // apna deployed link lagao
    featured: true,
  },
  {
  title:    'Task Manager (Kanban Dashboard)',
  icon:     '📊',
  desc:     'A modern task management system with Kanban board, drag-and-drop functionality, real-time filtering, analytics dashboard, and date-based tracking. Users can manage tasks across Todo, In Progress, and Done states with priority control and daily productivity insights. Built with a clean UI, smooth animations, and deployed with CI/CD.',
  tech:     ['React', 'Tailwind CSS', 'Context API', 'Framer Motion', 'Recharts'],
  github:   'https://github.com/abhiramSharma2002/ToDo-App',
  live:     'https://to-do-app-six-green.vercel.app/',
  featured: true,
},
  {
    title:    'Shopora',
    icon:     '👕',
    desc:     'A clothing e-commerce website with product listings, cart management, user authentication and order flow. Built with the MERN stack.',
    tech:     ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    github:   'https://github.com/abhiramsharma/shopora',   // apna sahi link lagao
    live:     null,
    featured: false,
  },
  {
  title:    'Restro App',
  icon:     '🍔',
  desc:     'A fully responsive restaurant website built from scratch with React. Features an animated hero section, interactive food menu with category filtering, smooth scroll animations, table booking form, search overlay, testimonials, and blog section. Deployed live on Vercel.',
  tech:     ['React', 'CSS3', 'Framer Motion', 'React Icons'],
  github:   'https://github.com/abhiramSharma2002/Restro_app',
  live:     'https://restro-app-orcin.vercel.app/',
  featured: true,
},
  {
    title:    'Portfolio Website',
    icon:     '🚀',
    desc:     'This very portfolio — built with MERN stack. Features JWT auth, protected routes, React Query caching, Framer Motion animations and a Node.js REST API backend.',
    tech:     ['React', 'Node.js', 'MongoDB', 'Framer Motion', 'React Query'],
    github:   'https://github.com/abhiramsharma/portfolio', // apna sahi link lagao
    live:     null,
    featured: false,
  },
]

const ProjectCard = ({ project, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="glass-card"
      style={{
        padding:    '1.8rem',
        cursor:     'default',
        position:   'relative',
        overflow:   'hidden',
        border:     project.featured
          ? '1px solid rgba(0,255,170,0.3)'
          : '1px solid var(--border)',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {project.featured && (
        <span style={{
          position:     'absolute',
          top:          '1rem',
          right:        '1rem',
          fontFamily:   'var(--font-mono)',
          fontSize:     '0.68rem',
          color:        'var(--accent)',
          background:   'rgba(0,255,170,0.1)',
          border:       '1px solid var(--border2)',
          padding:      '0.2rem 0.6rem',
          borderRadius: '50px',
        }}>
          ⭐ Featured
        </span>
      )}

      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'1.2rem' }}>
        <span style={{ fontSize: '2rem' }}>{project.icon}</span>
        <div style={{ display:'flex', gap:'0.75rem', alignItems:'center' }}>
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              style={{ color:'var(--text-muted)', display:'flex', transition:'color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <FiGithub size={20} />
            </motion.a>
          )}
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              style={{ color:'var(--text-muted)', display:'flex', transition:'color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <FiExternalLink size={20} />
            </motion.a>
          )}
        </div>
      </div>

      <h3 style={{
        fontFamily:   'var(--font-disp)',
        fontSize:     '1.05rem',
        color:        'var(--text)',
        marginBottom: '0.75rem',
      }}>
        {project.title}
      </h3>

      <p style={{
        color:        'var(--text-dim)',
        fontSize:     '0.87rem',
        lineHeight:   1.7,
        marginBottom: '1.2rem',
      }}>
        {project.desc}
      </p>

      {/* Tech Tags */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
        {project.tech.map(t => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>

      {/* Live Badge — sirf deployed projects ke liye */}
      {project.live && (
        <div style={{
          marginTop:  '1rem',
          paddingTop: '1rem',
          borderTop:  '1px solid var(--border)',
          display:    'flex',
          alignItems: 'center',
          gap:        '0.5rem',
        }}>
          <span style={{
            width:        '8px',
            height:       '8px',
            borderRadius: '50%',
            background:   'var(--accent)',
            boxShadow:    '0 0 6px var(--accent)',
            animation:    'pulse 2s ease infinite',
            display:      'inline-block',
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize:   '0.72rem',
            color:      'var(--accent)',
          }}>
            Live & Deployed
          </span>
        </div>
      )}
    </motion.div>
  )
}

const Projects = () => (
  <PageTransition>
    <main className="content-layer" style={{ paddingTop: '80px' }}>
      <div className="section-container">

        <div className="section-header">
          <span className="section-num">04.</span>
          <h2 className="section-title">Projects</h2>
          <div className="section-line" />
        </div>

        <div style={{
          display:             'grid',
         
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap:                 '1.5rem',
        }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>

      </div>
    </main>
  </PageTransition>
)

export default Projects