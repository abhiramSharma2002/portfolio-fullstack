const express = require('express')
const router  = express.Router()

const authRoutes    = require('./authRoutes')
const contactRoutes = require('./contactRoutes')

// ── Mount all v1 routes ──
router.use('/auth',    authRoutes)
router.use('/contact', contactRoutes)

// ── API v1 health check ──
router.get('/health', (req, res) => {
  res.status(200).json({
    success:   true,
    version:   'v1',
    timestamp: new Date().toISOString(),
    uptime:    `${Math.floor(process.uptime())}s`,
  })
})

module.exports = router