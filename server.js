//dotenv
require('dotenv').config()

// Connect DB
const { connectDB } = require('./configs/db')
connectDB()

const express = require('express')
const cors = require('cors')

const app = express()

// Import Routes
const authRoute = require('./routes/guestRoute')
const workspaceRoute = require('./routes/workspaceRoute')
const userRoute = require('./routes/userRoute')
const questionRoute = require('./routes/questionRoute')

const { errorHandler } = require('./middlewares/errorHandler')

const port = process.env.APP_PORT

// Cors
app.use(cors())

// Body Parser
app.use(express.json())

// Mount routes
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/workspaces', workspaceRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/question', questionRoute)

// Error Handling
app.all('*', (req, res, next) => {
  const err = new Error('This route can not be found')
  err.statusCode = 404
  next(err)
})
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
