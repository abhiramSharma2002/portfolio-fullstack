const { getCache, setCache } = require('../config/cache')
const logger                  = require('../utils/logger')

// ── Cache middleware factory ──
// ttl = seconds me cache time
const cacheMiddleware = (key, ttl = 600) => {
  return (req, res, next) => {

    // Cache me check karo
    const cached = getCache(key)

    if (cached) {
      logger.debug('Serving from cache', { key })
      return res.status(200).json({
        success:    true,
        fromCache:  true,
        ...cached,
      })
    }

    // Cache miss — original json override karo
    const originalJson = res.json.bind(res)

    res.json = (data) => {
      // Sirf success response cache karo
      if (data.success) {
        setCache(key, data, ttl)
        logger.debug('Response cached', { key, ttl })
      }
      return originalJson(data)
    }

    next()
  }
}

module.exports = cacheMiddleware