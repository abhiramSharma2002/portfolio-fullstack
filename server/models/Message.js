const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: [true, 'Name is required'],
      trim:     true,
    },
    email: {
      type:     String,
      required: [true, 'Email is required'],
      trim:     true,
      lowercase: true,
    },
    subject: {
      type:    String,
      trim:    true,
      default: 'No Subject',
    },
    message: {
      type:     String,
      required: [true, 'Message is required'],
      trim:     true,
      maxlength:[1000, 'Message too long'],
    },
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref:  'User',
    },
    read: {
      type:    Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Message', messageSchema)