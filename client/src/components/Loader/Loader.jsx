import { motion } from 'framer-motion'

const Loader = ({ fullScreen = false, text = 'Loading...' }) => {

  // ── Full Screen Loader ── (app first load pe)
  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position:       'fixed',
          inset:          0,
          background:     'var(--bg)',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          zIndex:         9999,
          gap:            '2rem',
        }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-disp)',
            fontSize:   '2rem',
            fontWeight: 900,
            color:      'var(--text)',
          }}
        >
          <span className="logo-bracket">&lt;</span>
          AS
          <span className="logo-bracket">/&gt;</span>
        </motion.div>

        {/* Animated Bars */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end' }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              animate={{ scaleY: [1, 2.5, 1] }}
              transition={{
                duration: 0.8,
                repeat:   Infinity,
                delay:    i * 0.12,
                ease:     'easeInOut',
              }}
              style={{
                width:           6,
                height:          20,
                background:      'var(--accent)',
                borderRadius:    3,
                transformOrigin: 'bottom',
                boxShadow:       '0 0 10px rgba(0,255,170,0.5)',
              }}
            />
          ))}
        </div>

        {/* Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize:   '0.8rem',
            color:      'var(--text-muted)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
          }}
        >
          {text}
        </motion.p>
      </motion.div>
    )
  }

  // ── Inline Loader ── (component level)
  return (
    <div style={{
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      padding:        '4rem',
      gap:            '6px',
    }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          animate={{ scaleY: [1, 2.5, 1] }}
          transition={{
            duration: 0.8,
            repeat:   Infinity,
            delay:    i * 0.12,
            ease:     'easeInOut',
          }}
          style={{
            width:           5,
            height:          16,
            background:      'var(--accent)',
            borderRadius:    3,
            transformOrigin: 'bottom',
          }}
        />
      ))}
    </div>
  )
}

export default Loader