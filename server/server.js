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

// Load env FIRST (best practice)
dotenv.config()

// DB connect
connectDB()

const app = express()

// ── Security headers ──
app.use(helmet())

// ── Rate limiting ──
app.use(globalLimiter)

// ── CORS ──
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
)

// ── Body parsers ──
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))

// ── Logs ──
app.use(morgan('dev'))

// ── Cookies ──
app.use(cookieParser())

// ── Routes ──
app.use('/api/v1', v1Routes)

// ── Health check ──
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API Running ',
  })
})

// ── Error handler (must be last) ──
app.use(errorHandler)

// ── Start server ──
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});