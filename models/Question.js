const mongoose = require('mongoose')

const CATEGORY_QUESTION = ['TOEIC', 'IELTS']
const TYPE_QUESTION = [
  'SELECT_ONE',
  'SELECT_MANY',
  'MATCHING',
  'DROPDOWN_SELECT',
  'FILL_IN_THE_GAPS',
  'ESSAY',
]
const STATUS_QUESTION = ['DRAFT', 'PUBLISHED']

const answerSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Content must be required'],
  },
  score: {
    type: Number,
    required: [true, 'Score must be required'],
  },
  penaltyScore: {
    type: Number,
  },
  gradingGuide: {
    type: String,
  },
  isCorrect: {
    type: Boolean,
    required: [true, 'IsCorrect must be required'],
  },
  feedback: {
    type: String,
  },
})

const questionSchema = new mongoose.Schema(
  {
    questionTitle: {
      type: String,
      required: [true, 'Title must be required'],
    },
    questionContent: {
      type: String,
      required: [true, 'Content must be required'],
    },
    status: {
      type: String,
      enum: STATUS_QUESTION,
      default: 'DRAFT',
      required: [true, 'Status must be required'],
    },
    category: {
      type: String,
      enum: CATEGORY_QUESTION,
      default: 'TOEIC',
      required: [true, 'Category must be required'],
    },
    questionType: {
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
    answerContent: { type: String },
    gradingGuide: { type: String },
    score: { type: Number },
  },
  { timestamps: true }
)

const Question = mongoose.model('Question', questionSchema)

module.exports = Question
