const mongoose = require('mongoose')

const timeSetting = new mongoose.Schema({
  startTime: {
    type: Date,
  },
  finishTime: {
    type: Date,
  },
  duration: {
    type: Number,
  },
})

const displaySetting = new mongoose.Schema({
  showScore: {
    type: Boolean,
  },
  showAnswer: {
    type: Boolean,
  },
  showFeedback: {
    type: Boolean,
  },
})

const testSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title must be required'],
    },
    description: {
      type: String,
      required: [true, 'Description must be required'],
    },
    timeSetting,
    password: { type: String },
    displayOptions: {
      afterSubmit: displaySetting,
      afterDeadline: displaySetting,
    },
    content: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: 'Question',
    },
  },
  { timestamps: true }
)

const Test = mongoose.model('Test', testSchema)

module.exports = Test
