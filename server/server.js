const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const morgan = require('morgan')
const dotenv = require('dotenv')

const connectDB = require('./config/db')
const errorHandler = require('./middleware/errorHandler')
const { globalLimiter } = require('./middleware/rateLimiter')
const v1Routes = require('./routes/v1/index')

// ── Load ENV FIRST ──
dotenv.config()

// ── Connect DB ──
connectDB()

const app = express()

// ─────────────────────────────────────────────
// 🛡️ Security Headers
// ─────────────────────────────────────────────
app.use(helmet())

// ─────────────────────────────────────────────
// 🚦 Rate Limiting
// ─────────────────────────────────────────────
app.use(globalLimiter)

// ─────────────────────────────────────────────
// 🌐 CORS (PRODUCTION READY)
// ─────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',
  'https://portfolio-fullstack-three-umber.vercel.app',
]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true)

      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      } else {
        console.log('Blocked CORS origin:', origin)
        return callback(null, false)
      }
    },
    credentials: true,
  })
)

// ─────────────────────────────────────────────
// 📦 Body Parsers
// ─────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))

// ─────────────────────────────────────────────
// 🧾 Logger
// ─────────────────────────────────────────────
app.use(morgan('dev'))

// ─────────────────────────────────────────────
// 🍪 Cookies
// ─────────────────────────────────────────────
app.use(cookieParser())

// ─────────────────────────────────────────────
// 🚀 Routes
// ─────────────────────────────────────────────
app.use('/api/v1', v1Routes)

// ─────────────────────────────────────────────
// ❤️ Health Check
// ─────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API Running 🚀',
  })
})

// ─────────────────────────────────────────────
// ❌ Error Handler (LAST)
// ─────────────────────────────────────────────
app.use(errorHandler)

// ─────────────────────────────────────────────
// 🔥 Server Start
// ─────────────────────────────────────────────
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})