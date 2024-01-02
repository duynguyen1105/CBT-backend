const mongoose = require('mongoose')
const Question = require('./Question')

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, 'Lesson title must be required'],
    },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workspace',
    },
    content: {
      type: String,
      required: [true, 'Lesson content must be required'],
    },
    questions: {
      type: [Question.schema],
      default: [],
      ref: 'Question',
    },
  },
  { timestamps: true }
)

const Lesson = mongoose.model('Lesson', lessonSchema)

module.exports = Lesson
