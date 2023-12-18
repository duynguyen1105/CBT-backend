const mongoose = require('mongoose')
const User = require('./User')

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name must be required'],
    },
    description: {
      type: String,
      required: [true, 'Description must be required'],
    },
    users: {
      type: [User.schema],
      default: [],
      ref: 'Users',
    },
  },
  { timestamps: true }
)

const ClassModel = mongoose.model('Class', classSchema)

module.exports = ClassModel
