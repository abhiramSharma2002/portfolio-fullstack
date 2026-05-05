const jwt = require('jsonwebtoken')
const User = require('../models/User')
const logger = require('../utils/logger')
const asyncHandler = require('../middleware/asyncHandler')


// Token helper
const sendTokenResponse = (user, statusCode, res) => {
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  )

  res
    .status(statusCode)
    .cookie('token', token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
    .json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
}


// ── REGISTER ──
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    })
  }

  const existing = await User.findOne({ email })

  if (existing) {
    return res.status(400).json({
      success: false,
      message: 'Email already registered',
    })
  }

  const user = await User.create({ name, email, password })

  logger.info('User registered', { email })

  sendTokenResponse(user, 201, res)
})


// ── LOGIN ──
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password required',
    })
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user || !user.password) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    })
  }

  const isMatch = await user.comparePassword(password)

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    })
  }

  logger.info('User login', { email })

  sendTokenResponse(user, 200, res)
})


// ── LOGOUT ──
const logout = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0),
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  })
})


// ── GET ME ──
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  })
})

module.exports = { register, login, logout, getMe }