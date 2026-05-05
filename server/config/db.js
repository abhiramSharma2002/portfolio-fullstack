const mongoose = require('mongoose')
const logger   = require('../utils/logger')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    })

    logger.info(`MongoDB connected`, {
      host: conn.connection.host,
      db:   conn.connection.name,
    })

    // ── Connection events ──
    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected — retrying...')
    })

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected')
    })

  } catch (err) {
    logger.error('MongoDB connection failed', { error: err.message })
    process.exit(1)
  }
}

module.exports = connectDB