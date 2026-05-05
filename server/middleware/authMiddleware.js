const jwt    = require('jsonwebtoken')
const User   = require('../models/User')
const logger = require('../utils/logger')

const protect = async (req, res, next) => {
  try {
    // ── Cookie se token lo ──
    const token = req.cookies?.token

    if (!token) {
      logger.warn('Auth failed — no token', {
        ip:  req.ip,
        url: req.originalUrl,
      })
      return res.status(401).json({
        success: false,
        message: 'Not authorized — please login',
      })
    }

    // ── Token verify karo ──
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // ── User fetch karo ──
    const user = await User.findById(decoded.id).select('-password')

    if (!user) {
      logger.warn('Auth failed — user not found', { userId: decoded.id })
      return res.status(401).json({
        success: false,
        message: 'User no longer exists',
      })
    }

    // ── req me user attach karo ──
    req.user = user

    logger.debug('Auth success', {
      userId: user._id,
      email:  user.email,
      url:    req.originalUrl,
    })

    next()

  } catch (err) {
    logger.error('Auth middleware error', { error: err.message })

    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token' })
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired — please login again' })
    }

    res.status(500).json({ success: false, message: 'Server error' })
  }
}

module.exports = { protect }