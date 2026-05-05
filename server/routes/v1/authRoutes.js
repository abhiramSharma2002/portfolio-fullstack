const express    = require('express')
const router     = express.Router()
const { register, login, logout, getMe } = require('../../controllers/authController')
const { protect }     = require('../../middleware/authMiddleware')
const { authLimiter } = require('../../middleware/rateLimiter')
const { body, validationResult } = require('express-validator')

// ── Validation middleware ──
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
    })
  }
  next()
}

// POST /api/v1/auth/register
router.post('/register',
  authLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password min 6 characters'),
  ],
  validate,
  register
)

// POST /api/v1/auth/login
router.post('/login',
  authLimiter,
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required'),
  ],
  validate,
  login
)

// POST /api/v1/auth/logout
router.post('/logout', protect, logout)

// GET /api/v1/auth/me
router.get('/me', protect, getMe)

module.exports = router