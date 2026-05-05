const { createLogger, format, transports } = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')
const path = require('path')
const fs   = require('fs')

// ── logs folder na ho toh banao ──
const logsDir = path.join(__dirname, '../logs')
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir)

// ── Console me colors ──
const consoleFormat = format.combine(
  format.colorize({ all: true }),
  format.timestamp({ format: 'HH:mm:ss' }),
  format.printf(({ timestamp, level, message, ...meta }) => {
    const metaStr = Object.keys(meta).length
      ? '\n' + JSON.stringify(meta, null, 2)
      : ''
    return `[${timestamp}] ${level}: ${message}${metaStr}`
  })
)

// ── File me plain JSON ──
const fileFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.errors({ stack: true }),
  format.json()
)

// ── Daily Rotate — combined.log ──
const combinedTransport = new DailyRotateFile({
  filename:      path.join(logsDir, 'combined-%DATE%.log'),
  datePattern:   'YYYY-MM-DD',
  maxSize:       '10m',
  maxFiles:      '14d',        // 14 din purani files rakho
  format:        fileFormat,
  level:         'info',
})

// ── Daily Rotate — error.log ──
const errorTransport = new DailyRotateFile({
  filename:      path.join(logsDir, 'error-%DATE%.log'),
  datePattern:   'YYYY-MM-DD',
  maxSize:       '10m',
  maxFiles:      '30d',        // errors 30 din rakho
  format:        fileFormat,
  level:         'error',
})

// ── Logger banao ──
const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transports: [
    // Console — hamesha
    new transports.Console({ format: consoleFormat }),
    // Files
    combinedTransport,
    errorTransport,
  ],
  // Uncaught exceptions bhi log karo
  exceptionHandlers: [
    new transports.Console({ format: consoleFormat }),
    new DailyRotateFile({
      filename:    path.join(logsDir, 'exceptions-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      format:      fileFormat,
    }),
  ],
  exitOnError: false,
})

module.exports = logger