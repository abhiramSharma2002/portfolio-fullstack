const NodeCache = require('node-cache')
const logger    = require('../utils/logger')

// ── Cache instance ──
// stdTTL = default time to live (seconds)
const cache = new NodeCache({
  stdTTL:      600,   // 10 min default
  checkperiod: 120,   // har 2 min expired keys check karo
  useClones:   false,
})

// ── Cache events log karo ──
cache.on('set',     (key)      => logger.debug(`Cache SET`,     { key }))
cache.on('del',     (key)      => logger.debug(`Cache DEL`,     { key }))
cache.on('expired', (key)      => logger.debug(`Cache EXPIRED`, { key }))
cache.on('flush',   ()         => logger.debug(`Cache FLUSHED`))

// ── Helper functions ──

// Get
const getCache = (key) => {
  const value = cache.get(key)
  if (value !== undefined) {
    logger.debug(`Cache HIT`, { key })
    return value
  }
  logger.debug(`Cache MISS`, { key })
  return null
}

// Set
const setCache = (key, value, ttl = 600) => {
  cache.set(key, value, ttl)
}

// Delete
const delCache = (key) => {
  cache.del(key)
}

// Clear all
const flushCache = () => {
  cache.flushAll()
}

module.exports = { getCache, setCache, delCache, flushCache }