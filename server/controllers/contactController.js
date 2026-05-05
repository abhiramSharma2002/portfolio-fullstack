const Message = require('../models/Message')
const logger = require('../utils/logger')
const sendMail = require('../utils/sendMail')

// SEND MESSAGE
const sendMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and message are required',
      })
    }

    // Save in DB
    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
      sentBy: req.user ? req.user._id : null,
    })

    // Send Email
    await sendMail(name, email, message)

    logger.info('New contact message received', {
      id: newMessage._id,
      email,
    })

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
    })
  } catch (error) {
    next(error)
  }
}

// GET ALL MESSAGES (ADMIN)
const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find()
      .populate('sentBy', 'name email')
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  sendMessage,
  getMessages,
}