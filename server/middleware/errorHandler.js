const logger = require('../utils/logger')

const errorHandler = (err, req, res, next) => {

  
  if (res.headersSent) {
    return next(err)
  }

  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal Server Error'

  // ── Mongoose Errors ──
  if (err.name === 'CastError') {
    statusCode = 400
    message = 'Invalid ID format'
  }

  if (err.code === 11000) {
    statusCode = 400
    const field = Object.keys(err.keyValue)[0]
    message = `${field} already exists`
  }

  if (err.name === 'ValidationError') {
    statusCode = 400
    message = Object.values(err.errors).map(e => e.message).join(', ')
  }

  // ── JWT Errors ──
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401
    message = 'Invalid token'
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401
    message = 'Token expired'
  }

  // ── Logging ──
  if (statusCode >= 500) {
    logger.error('Server Error', {
      message: err.message,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
      ip: req.ip,
    })
  } else {
    logger.warn('Client Error', {
      message,
      statusCode,
      url: req.originalUrl,
      method: req.method,
      ip: req.ip,
    })
  }

  res.status(statusCode).json({
    success: false,
    message,
  })
}

module.exports = errorHandler