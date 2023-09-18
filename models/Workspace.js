const mongoose = require('mongoose')

const STATUS = ['ACTIVE', 'INACTIVE']
const TYPE_WORKSPACE = ['TRIAL', 'PRO']

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name must be required'],
    },
    domain: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Domain must be required'],
    },
    status: {
      type: String,
      enum: STATUS,
      default: 'ACTIVE',
      required: [true, 'Status must be required'],
    },
    typeWorkspace: {
      type: String,
      enum: TYPE_WORKSPACE,
      default: 'TRIAL',
      required: [true, 'Type must be required'],
    },
    storage: {
      type: Number,
      required: [true, 'Type must be required'],
    },
    adminWorkspace: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: 'User',
    },
    ownerWorkspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

const Workspace = mongoose.model('Workspace', workspaceSchema)

module.exports = Workspace
