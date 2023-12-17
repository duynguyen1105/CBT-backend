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
const workspacesRoute = require('./routes/workspacesRoute')
const usersRoute = require('./routes/usersRoute')
const questionsRoute = require('./routes/questionsRoute')
const categoriesRoute = require('./routes/categoriesRoute')
const labelsRoute = require('./routes/labelsRoute')
const testsRoute = require('./routes/testsRoute')

const { errorHandler } = require('./middlewares/errorHandler')

const port = process.env.APP_PORT

// Cors
app.use(cors())

// Body Parser
app.use(express.json())

// Mount routes
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/workspaces', workspacesRoute)
app.use('/api/v1/users', usersRoute)
app.use('/api/v1/questions', questionsRoute)
app.use('/api/v1/categories', categoriesRoute)
app.use('/api/v1/labels', labelsRoute)
app.use('/api/v1/tests', testsRoute)

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
