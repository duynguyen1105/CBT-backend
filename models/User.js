const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')

const ROLES = ['SUPER_ADMIN', 'ADMIN_WORKSPACE', 'USER']
const GENDER = ['MALE', 'FEMALE']

const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const validateEmail = function (email) {
  return emailPattern.test(email)
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name must be required'],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Email must be required'],
      validate: [validateEmail, 'Please input a valid email address'],
      match: [emailPattern, 'Please input a valid email address'],
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'Password must be required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    role: { type: String, enum: ROLES, default: 'USER' },
    avatar: { type: String },
    gender: {
      type: String,
      enum: GENDER,
      required: [true, 'Gender must be required'],
    },
    nationality: { type: String },
    workspace: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: 'Workspace',
    },
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  try {
    // the user schema is instantiated
    // check if the user has been modified to know if the password has already been hashed
    // Generate a salt
    const salt = await bcrypt.genSalt(10)
    // Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(this.password, salt)
    // Re-assign hashed version over original, plain text password
    this.password = passwordHash
    next()
  } catch (error) {
    next(error)
  }
})
// adminSchema.methods.isValidPassword = async function (newPassword) {
// 	try {
// 		return await bcrypt.compare(newPassword, this.password);
// 	} catch (error) {
// 		throw new Error(error);
// 	}
// };

const User = mongoose.model('User', userSchema)

module.exports = User
