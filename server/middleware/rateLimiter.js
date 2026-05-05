const rateLimit = require('express-rate-limit')
const logger    = require('../utils/logger')

// ── Auth routes limiter ──
// 10 requests per 15 min
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max:      10,
  message: {
    success: false,
    message: 'Too many attempts — try again after 15 minutes',
  },
  handler: (req, res, next, options) => {
    logger.warn('Rate limit hit — auth', {
      ip:  req.ip,
      url: req.originalUrl,
    })
    res.status(429).json(options.message)
  },
  standardHeaders: true,
  legacyHeaders:   false,
})

// ── Contact route limiter ──
// 5 messages per hour
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max:      5,
  message: {
    success: false,
    message: 'Too many messages — try again after 1 hour',
  },
  handler: (req, res, next, options) => {
    logger.warn('Rate limit hit — contact', {
      ip:     req.ip,
      userId: req.user?._id,
    })
    res.status(429).json(options.message)
  },
  standardHeaders: true,
  legacyHeaders:   false,
})

// ── Global limiter ──
// 100 requests per 10 min
const globalLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max:      100,
  message: {
    success: false,
    message: 'Too many requests — slow down!',
  },
  standardHeaders: true,
  legacyHeaders:   false,
})

module.exports = { authLimiter, contactLimiter, globalLimiter }