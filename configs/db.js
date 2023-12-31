const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    mongoose.connect(process.env.DB_URI)
    console.log('DB connection successfully')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

module.exports = { connectDB }
