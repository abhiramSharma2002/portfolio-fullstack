import { NavLink }     from 'react-router-dom'
import { motion }      from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const footerLinks = [
  { path: '/',           label: 'Home'       },
  { path: '/about',      label: 'About'      },
  { path: '/skills',     label: 'Skills'     },
  { path: '/experience', label: 'Experience' },
  { path: '/projects',   label: 'Projects'   },
  { path: '/contact',    label: 'Contact'    },
]

const socials = [
  {
    icon: <FiGithub   size={18} />,
    href: 'https://github.com/abhiramsharma2002',
    label: 'GitHub',
  },
  {
    icon: <FiLinkedin size={18} />,
    href: 'https://www.linkedin.com/in/abhiram-sharma-5a4439264/',
    label: 'LinkedIn',
  },
  {
    icon: <FiMail     size={18} />,
    href: 'mailto:abhiramsharma2002@gmail.com',
    label: 'Email',
  },
]

const Footer = () => {
  return (
    <footer style={{
      position:   'relative',
      zIndex:     2,
      background: 'var(--bg2)',
      borderTop:  '1px solid var(--border)',
      padding:    '3rem 5% 2rem',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin:   '0 auto',
        display:  'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap:      '2rem',
        marginBottom: '2rem',
      }}>

        {/* ── Brand ── */}
        <div>
          <p style={{
            fontFamily: 'var(--font-disp)',
            fontSize:   '1.4rem',
            fontWeight: 700,
            marginBottom: '0.75rem',
          }}>
            <span className="logo-bracket">&lt;</span>
            AS
            <span className="logo-bracket">/&gt;</span>
          </p>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize:   '0.78rem',
            color:      'var(--text-muted)',
            lineHeight: 1.7,
          }}>
            MERN Stack Developer<br />
            Building scalable web solutions
          </p>
        </div>

        {/* ── Nav Links ── */}
        <div>
          <p style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.75rem',
            color:         'var(--accent)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom:  '1rem',
          }}>
            // Navigate
          </p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {footerLinks.map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  style={{
                    fontFamily:     'var(--font-body)',
                    fontSize:       '0.88rem',
                    color:          'var(--text-dim)',
                    textDecoration: 'none',
                    transition:     'color 0.2s ease',
                  }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-dim)'}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Socials ── */}
        <div>
          <p style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.75rem',
            color:         'var(--accent)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom:  '1rem',
          }}>
            // Connect
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {socials.map(({ icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: 'var(--accent)' }}
                title={label}
                style={{
                  color:      'var(--text-muted)',
                  transition: 'color 0.3s ease',
                  display:    'flex',
                }}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div style={{
        maxWidth:    '1100px',
        margin:      '0 auto',
        paddingTop:  '1.5rem',
        borderTop:   '1px solid var(--border)',
        display:     'flex',
        justifyContent: 'space-between',
        alignItems:  'center',
        flexWrap:    'wrap',
        gap:         '0.5rem',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize:   '0.72rem',
          color:      'var(--text-muted)',
        }}>
          © 2025 Abhiram Sharma — All rights reserved
        </p>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize:   '0.72rem',
          color:      'var(--text-muted)',
        }}>
          Built with{' '}
          <span style={{ color: 'var(--accent)' }}>React</span>
          {' '}+{' '}
          <span style={{ color: 'var(--accent)' }}>Node.js</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer