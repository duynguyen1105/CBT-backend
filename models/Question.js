const mongoose = require('mongoose')

const TYPE_QUESTION = [
  'SELECT_ONE',
  'SELECT_MANY',
  'MATCHING',
  'DROPDOWN_SELECT',
  'FILL_IN_THE_GAPS',
  'ESSAY',
  'RECORD',
]

const answerSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  score: {
    type: Number,
  },
  penaltyScore: {
    type: Number,
  },
  order: {
    type: Number,
  },
  scorePercent: {
    type: Number,
  },
  isCorrect: {
    type: Boolean,
  },
  feedback: {
    type: String,
  },
})

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title must be required'],
    },
    content: {
      type: String,
      required: [true, 'Content must be required'],
    },
    category: {
      type: String,
      required: [true, 'Category must be required'],
    },
    type: {
      type: String,
      enum: TYPE_QUESTION,
      default: 'SELECT_ONE',
      required: [true, 'Type of question be required'],
    },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workspace',
    },
    answer: [answerSchema],
    blankAnswer: [[answerSchema]],
    answerContent: { type: String },
    label: { type: [String] },
    gradingGuide: { type: String },
    score: { type: Number },
  },
  { timestamps: true }
)

const Question = mongoose.model('Question', questionSchema)

module.exports = Question
