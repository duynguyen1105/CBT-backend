const mongoose = require('mongoose')

const labelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Label name must be required'],
    },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workspace',
    },
  },
  { timestamps: true }
)

const Label = mongoose.model('Label', labelSchema)

module.exports = Label
