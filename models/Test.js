const mongoose = require('mongoose')
const Question = require('./Question')
const ClassModel = require('./Class')

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
    questions: {
      type: [Question.schema],
      default: [],
      ref: 'Question',
    },
    classAssigned: {
      type: [ClassModel.schema],
      default: [],
      ref: 'Class',
    },
  },
  { timestamps: true }
)

const Test = mongoose.model('Test', testSchema)

module.exports = Test
