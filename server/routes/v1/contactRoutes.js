const express = require('express')
const router = express.Router()

const {
  sendMessage,
  getMessages,
} = require('../../controllers/contactController')

const { protect } = require('../../middleware/authMiddleware')
const { contactLimiter } = require('../../middleware/rateLimiter')
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

/*
  POST /api/v1/contact
  Public (no protect) OR optional protect (your choice)
*/
router.post(
  '/',
  contactLimiter,
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required'),

    body('message')
      .trim()
      .notEmpty()
      .withMessage('Message is required')
      .isLength({ max: 1000 })
      .withMessage('Message too long'),

    body('email')
      .optional()
      .isEmail()
      .withMessage('Valid email required'),
  ],
  validate,
  sendMessage
)

/*
  GET /api/v1/contact
  Admin only
*/
router.get('/', protect, getMessages)

module.exports = router