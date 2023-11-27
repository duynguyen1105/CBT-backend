const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Category name must be required'],
    },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workspace',
    },
  },
  { timestamps: true }
)

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
